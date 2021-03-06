// var mtx = [["O", "", "O"],["O", "X", "O"],["X", "", "X"]]; // - Matrix of round game
var mtx = [	["", "", ""],
			["", "", ""],
			["", "", ""]]; // - Matrix of round game

var currentPlayer = 'X';
var IABlocked = false;
var lastWinner = null;
var gameMode = ""; //1 = Player vs Computer; 2 = Player vs Player
var score = {player1: 0, player2: 0};
var isMinimaxRuning = false;

// Pode ir de 0 até 8, pois é a quantidade de campos que temos (0-4 = Facil demais)(5-6 = Médio)(7-8 = Imbativel)
var maxProfundidade = 8; 

function getScore(){
	return score;
}

function addScoreToPlayer(player){
	if(player == "X"){
		score.player1++;
	}else if(player == "O"){
		score.player2++;
	}

	return true;
}

function initScore(){
	score.player1 = 0;
	score.player2 = 0;

	return true;
}

function getGameMode(){
	return gameMode;
} 

//Quando troca o modo de jogo voltamos para o X e o jogo reseta
function setGameMode(newGameMode){
	gameMode = newGameMode;

	$("#startBtn").removeClass("is-disabled");
	$("#startBtn").addClass("is-primary");
	$("#startBtn").css("visibility", "visible");
	$("#startBtn").addClass("blink");

	if(newGameMode == 1){
		$("#gameModeBtn1 span").css("color", "#0897db");
		$("#gameModeBtn2 span").css("color", "#22223D");
	}else if(newGameMode == 2){
		$("#gameModeBtn1 span").css("color", "#22223D");
		$("#gameModeBtn2 span").css("color", "#0897db");
	}



	$("#player").css("pointer-events", "auto");

	setCurrentPlayer('X');
	setLastWinner(null);
}

function getLastWinner(){
	return lastWinner;
}

function setLastWinner(winner){
	lastWinner = winner;
}

function getIABlocked(){
	return IABlocked;
}

function setIABlocked(novoValor){
	IABlocked = novoValor;
}

function getCurrentPlayer(){
	return currentPlayer;
}

function setCurrentPlayer(player){
	currentPlayer = player;
}

function toggleCurrentPlayer(){
	currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
	setHighLightInScore(currentPlayer);
}

function getMtx(){
	return mtx;
}

function setMtx(value){
	mtx = value;
}

function getAvailableFields(newBoard){
	myAvailFields = [];
	var col = 0;
	var row = 0;
	var cont = 0;
	newBoard.forEach(function(item){
		item.forEach(function(subItem){
			if(subItem == ""){
				myAvailFields.push({"row": row, "col": col});
			}
			col++;
			cont++;
		});
		col = 0;
		row++;
	});
	return myAvailFields;
}

var moves = [];

function getMoves(){
	return moves;
}

function setMoves(newMoves){
	moves = newMoves;
}

function minimax(newBoard, player, profundidade){
	//Flag para controlar se a função ainda está na sua recursividade
	isMinimaxRuning = true;
	// console.log(numTimesEnterFunction++); //CONSOLE LOG DEIXA AS COISAS LENTAS
  	var availFields = getAvailableFields(newBoard);
  	//Essa verificação faz economizar processamento
  	//Antes percorria toda a matriz mesmo quando achava a sequencia
  	if (hasSequence(newBoard, "X")){
     	return {score:-10 + profundidade};
  	}else if (hasSequence(newBoard, "O")){
    	return {score:10 - profundidade};
  	}else if (availFields.length === 0){
    	return {score:0};
  	}

  	setMoves([]);

	// Percorrer os locais disponíveis
	for (var i = 0; i < availFields.length; i++){
		let auxMoves = getMoves();
		//Crie um objeto para cada um e armazene o índice desse 
		//ponto que foi armazenado como um número na chave de índice do objeto
	  	var move = {};
	  	move.coordinates = {row: "", col: ""};
	  	move.coordinates.row = availFields[i].row;
	  	move.coordinates.col = availFields[i].col;
	  	setCurrentCoordinates(move.coordinates.col, move.coordinates.row);

	 	// Definir o local vazio para o jogador atual
	  	newBoard[availFields[i].row][availFields[i].col] = player;


	  	if(profundidade+1 < maxProfundidade){
		  	// Se coletar a pontuação resultante da chamada do minimax no oponente do jogador atual
		  	if (player == "O"){
		    	var result = minimax(newBoard, "X", profundidade+1);
		    	move.score = result.score;
		  	}else{
		    	var result = minimax(newBoard, "O", profundidade+1);
		    	move.score = result.score;
		  	}
		}else{
			move.score = 0;
		}

	  	//Redefina o local para vazio
	    newBoard[availFields[i].row][availFields[i].col] = "";

	    //Coloca no array de movimentos auxiliar
	    auxMoves.push(move);
		setMoves(auxMoves);
    
  	}

	// se for a vez do computador, faça um loop sobre os movimentos e escolha o lance com a maior pontuação
  	var bestMove;
  	if(player === "O"){
	    var bestScore = -10000;
	    for(var i = 0; i < moves.length; i++){
	    	if(moves[i].score > bestScore){
	        	bestScore = moves[i].score;
	        	bestMove = moves[i];
	      	}
	    }
  	}else{
		// Senão faz um loop sobre os movimentos e escolhe o movimento com a pontuação mais baixa
    	var bestScore = 10000;
    	for(var i = 0; i < moves.length; i++){
      		if(moves[i].score < bestScore){
        		bestScore = moves[i].score;
        		bestMove = moves[i];
      		}
   		 }
  	}
  	isMinimaxRuning = false;
  	return bestMove;
}

function removeOverlay(){
	$(".overlay-loading").fadeOut();
	$(".modal-backdrop.show").hide()
}

function initGame(){
	//Retirando a modal de aviso de ganhador
	$("#resultModal").hide();
	
	//Reiniciando as Matrizes
	initGameMatrix();
	initInterfaceMatrix();

	//Liberando o Click do usuario
	setCanClick(true);

	if(lastWinner == 'X'){
		setCurrentPlayer('X');	
		removeOverlay();
	}else if(lastWinner == 'O'){
		setCurrentPlayer('O');
		removeOverlay();
		if(getGameMode() == 1){
			setTimeout(function(){
				doMoveAI();
			}, 600);
		}
	}else{
		removeOverlay();
		if(getGameMode() == 1 && getCurrentPlayer() == 'O'){
			setTimeout(function(){
				doMoveAI();
			}, 600);
		}
	}
}

function initGameMatrix(){
	setMtx([["", "", ""],["", "", ""],["", "", ""]]); 
}

function fillMatrix(col, row, player){
	var mtx = getMtx();

	//Fill the matrix with X or O
	mtx[row][col] = player;
}

function hasHorizontalSequence(newBoard, player){
	var coordinates = getCurrentCoordinates();
	newBoard[coordinates.row][0] == newBoard[coordinates.row][1] && newBoard[coordinates.row][0] == newBoard[coordinates.row][2] && newBoard[coordinates.row][0] == player ?  success = true : success = false;
	return success;	
}

function hasVerticalSequence(newBoard, player){
	var coordinates = getCurrentCoordinates();
	newBoard[0][coordinates.col] == newBoard[1][coordinates.col] && newBoard[0][coordinates.col] == newBoard[2][coordinates.col] && newBoard[0][coordinates.col] == player ?  success = true : success = false;
	return success;
}

function hasDiagonalSequence(newBoard, player){
	var coordinates = getCurrentCoordinates();
		if(coordinates.row == coordinates.col){
			newBoard[0][0] == newBoard[1][1] && newBoard[0][0] == newBoard[2][2] &&  newBoard[0][0] == player ? success = true : success = false;	
		}else if(coordinates.row+coordinates.col == 2){
			newBoard[0][2] == newBoard[1][1] && newBoard[0][2] == newBoard[2][0] && newBoard[0][2] == player ? success = true : success = false;	
		}
	return success;
}

function hasSequence(newBoard, player){
	var success = false;

	// Caso seja o minimax que esteja testando mandamos ele para a função
	// que testa todas as possibilidades. 
	// Caso não fazemos uma verificação com menos processamento  
	if(isMinimaxRuning){
		success = hasWinnerMiniMax(newBoard, player)
	}else{
		success = hasHorizontalSequence(newBoard, player);

		if(success == false){
			success = hasVerticalSequence(newBoard, player);
		}

		if(success == false){
			success = hasDiagonalSequence(newBoard, player);
		}
	}

	return success;
}

function hasWinner(newBoard, player){
	if(hasSequence(newBoard, player)){
		setLastWinner(getCurrentPlayer());
		showWinner();
		setIABlocked(true);
		return true;
	}else{
		return false;
	}	
}


//Função que buscar em todas as possibilidades.
//Ela é necessária para o algoritmo MINIMAX fazer
//todas as suas simulações.
function hasWinnerMiniMax(board, player){
if (
 	(board[0][0] == player && board[0][1] == player && board[0][2] == player) ||
 	(board[1][0] == player && board[1][1] == player && board[1][2] == player) ||
 	(board[2][0] == player && board[2][1] == player && board[2][2] == player) ||
 	(board[0][0] == player && board[1][0] == player && board[2][0] == player) ||
 	(board[0][1] == player && board[1][1] == player && board[2][1] == player) ||
 	(board[0][2] == player && board[1][2] == player && board[2][2] == player) ||
 	(board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
 	(board[2][0] == player && board[1][1] == player && board[0][2] == player)
 ){
 	return true;
 }else{
 	return false;
 }
}