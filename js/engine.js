// var mtx = [["O", "", "O"],["O", "X", "O"],["X", "", "X"]]; // - Matrix of round game
var mtx = [["", "", ""],["", "", ""],["", "", ""]]; // - Matrix of round game
var currentPlayer = 'X';
var IABlocked = false;
var lastWinner = null;
var gameMode = ""; //1 = Player vs Computer; 2 = Player vs Player
var score = {player1: 0, player2: 0};

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

	$("#gameModeBtn"+newGameMode+ " input").attr("checked", "checked");

	$("#startBtn").removeClass("is-disabled");
	$("#startBtn").addClass("is-success");

	if(newGameMode == 1){
		
	}

	if(newGameMode == 2){
		
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
	if(getCurrentPlayer() == 'X'){
		setCurrentPlayer('O');
	}else{
		setCurrentPlayer('X');
	}
}

function toggleCurrentPlayer(){
	currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
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
				myAvailFields.push({"row": row, "col": col, "idx": cont});
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

var numTimesEnterFunction = 0;
function minimax(newBoard, player){
	console.log(numTimesEnterFunction++);
  	var availFields = getAvailableFields(newBoard);


  	//Essa verificação faz economizar processamento
  	//Antes percorria toda a matriz mesmo quando achava a sequencia
  	if (hasSequence(newBoard, "X")){
     	return {score:-10};
  	}else if (hasSequence(newBoard, "O")){
    	return {score:10};
  	}else if (availFields.length === 0){
    	return {score:0};
  	}

  	setMoves([]);

	// Percorrer os locais disponíveis
	for (var i = 0; i < availFields.length; i++){
		let auxMoves = getMoves();
		//Crie um objeto para cada um e armazene o índice desse ponto que foi armazenado como um número na chave de índice do objeto
	  	var move = {};
	  	move.coordinates = {row: "", col: ""};
	  	move.coordinates.row = availFields[i].row;
	  	move.coordinates.col = availFields[i].col;
	  	setCurrentCoordinates(move.coordinates.col, move.coordinates.row);
	  	move.idx = availFields[i].idx;

	 	// Definir o local vazio para o jogador atual
	  	newBoard[availFields[i].row][availFields[i].col] = player;

	  	// Se coletar a pontuação resultante da chamada do minimax no oponente do jogador atual
	  	if (player == "O"){
	    	var result = minimax(newBoard, "X");
	    	move.score = result.score;
	  	}else{
	    	var result = minimax(newBoard, "O");
	    	move.score = result.score;
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
	console.log(score);
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

	success = hasHorizontalSequence(newBoard, player);

	if(success == false){
		success = hasVerticalSequence(newBoard, player);
	}

	if(success == false){
		success = hasDiagonalSequence(newBoard, player);
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