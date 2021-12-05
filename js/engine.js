var mtx = [["", "", ""],["", "", ""],["", "", ""]]; // - Matrix of round game
var currentPlayer = 'X';
var turns = 0;

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
		initGame();

		return true;
	}else{
		return false;
	}	
}

function initGame(){
	initMatrizes();
	setCurrentPlayer('X');
	resetTurns();
}


function fillMatrix(){
	var mtx = getMtx();

	//Getting matrix's indexes of clicked field
	var row = getCurrentCoordinates().row;
	var col = getCurrentCoordinates().col;

	//Fill the matrix with X or O
	mtx[row][col] = getCurrentPlayer();
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