var mtx = [["", "", ""],["", "", ""],["", "", ""]]; // - Matrix of round game
var currentPlayer = 'X';
var turns = 0;
var IABlocked = false;

function getIABlocked(){
	return IABlocked;
}

function setIABlocked(novoValor){
	IABlocked = novoValor;
}


function getTurns(){
	return turns;
}

function incrementTurns(){
	turns++ 
}

function resetTurns(){
	turns = 0; 
}

function getCurrentPlayer(){
	return currentPlayer;
}

function setCurrentPlayer(player){
	currentPlayer = player;
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

function hasWinner(){
	if(hasSequence()){
		showWinner();
		setIABlocked(true);
		return true;
	}else{
		return false;
	}	
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

function winning(board, player){
	if (
	(board[0][0] == player && board[0][1] == player && board[0][2] == player) ||
	(board[1][0] == player && board[1][1] == player && board[1][2] == player) ||
	(board[2][0] == player && board[2][1] == player && board[2][2] == player) ||
	(board[0][0] == player && board[1][0] == player && board[2][0] == player) ||
	(board[1][0] == player && board[1][1] == player && board[1][2] == player) ||
	(board[2][0] == player && board[2][2] == player && board[2][2] == player) ||
	(board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
	(board[2][0] == player && board[2][2] == player && board[2][0] == player)){
		return true;
	}else{
		return false;
	}
}

var moves = [];

function getMoves(){
	return moves;
}

function setMoves(newMoves){
	moves = newMoves;
}

function minimax(newBoard, player){
	//available spots
  	var availFields = getAvailableFields(newBoard);

  	// checks for the terminal states such as win, lose, and tie and returning a value accordingly
  	if (winning(newBoard, "X")){
     	return {score:-10};
  	}
  	else if (winning(newBoard, "O")){
    	return {score:10};
  	}else if (availFields.length === 0){
    	return {score:0};
  	}

  	setMoves([]);

	// loop through available spots
	for (var i = 0; i < availFields.length; i++){
		let auxMoves = getMoves();
		//create an object for each and store the index of that spot that was stored as a number in the object's index key
	  	var move = {};
	  	move.coordinates = {row: "", col: ""};
	  	move.coordinates.row = availFields[i].row;
	  	move.coordinates.col = availFields[i].col;
	  	move.idx = availFields[i].idx;

	 	// set the empty spot to the current player
	  	newBoard[availFields[i].row][availFields[i].col] = player;

	  	//if collect the score resulted from calling minimax on the opponent of the current player
	  	if (player == "O"){
	    	var result = minimax(newBoard, "X");
	    	move.score = result.score;
	  	}else{
	    	var result = minimax(newBoard, "O");
	    	move.score = result.score;
	  	}

	  	//reset the spot to empty
	    newBoard[availFields[i].row][availFields[i].col] = "";

	    auxMoves.push(move);
		setMoves(auxMoves);
    
  	}

	// if it is the computer's turn loop over the moves and choose the move with the highest score
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
		// else loop over the moves and choose the move with the lowest score
    	var bestScore = 10000;
    	for(var i = 0; i < moves.length; i++){
      		if(moves[i].score < bestScore){
        		bestScore = moves[i].score;
        		bestMove = moves[i];
      		}
   		 }
  	}

	// return the chosen move (object) from the array to the higher depth
  	return bestMove;
}

function initGame(){
	setIABlocked(false);
	initMatrizes();
	setCurrentPlayer('X');
	resetTurns();
}


function fillMatrix(col, row, player){
	var mtx = getMtx();

	//Fill the matrix with X or O
	mtx[row][col] = player;
}

function hasHorizontalSequence(){
	var coordinates = getCurrentCoordinates();
	mtx[coordinates.row][0] == mtx[coordinates.row][1] && mtx[coordinates.row][0] == mtx[coordinates.row][2] ?  success = true : success = false;
	return success;	
}

function hasVerticalSequence(){
	var coordinates = getCurrentCoordinates();
	mtx[0][coordinates.col] == mtx[1][coordinates.col] && mtx[0][coordinates.col] == mtx[2][coordinates.col] ?  success = true : success = false;
	return success;
}

function hasDiagonalSequence(){
	var coordinates = getCurrentCoordinates();
	if(!((coordinates.row == 0 && coordinates.col == 1) || (coordinates.row == 1 && coordinates.col == 0) || (coordinates.row == 1 && coordinates.col == 2) || (coordinates.row == 2 && coordinates.col == 1))){
		if(coordinates.row == coordinates.col){
			mtx[0][0] == mtx[1][1] && mtx[0][0] == mtx[2][2] ? success = true : success = false;	
		}
		if(coordinates.row+coordinates.col == 2){
			mtx[0][2] == mtx[1][1] && mtx[0][2] == mtx[2][0] ? success = true : success = false;	
		}
	}
	return success;
}


function hasSequence(){
	var success = false;

	success = hasHorizontalSequence();

	if(success == false){
		success = hasVerticalSequence();
	}

	if(success == false){
		success = hasDiagonalSequence();
	}

	return success;
}