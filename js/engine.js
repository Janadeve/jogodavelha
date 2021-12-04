var mtx = [["", "", ""],["", "", ""],["", "", ""]]; // - Matrix of round game
var currentPlayer = 'X';

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

function hasSequence(coordinates){
	var result;

	//Check horizontal sequence
	mtx[coordinates.row][0] == mtx[coordinates.row][1] && mtx[coordinates.row][0] == mtx[coordinates.row][2] ?  result = true : result = false;

	//Check vertical sequence
	if(result == false){
		mtx[0][coordinates.col] == mtx[1][coordinates.col] && mtx[0][coordinates.col] == mtx[2][coordinates.col] ?  result = true : result = false;
	}

	//Check if has diagonal possibility
	if(result == false){
		if(!((coordinates.row == 0 && coordinates.col == 1) || (coordinates.row == 1 && coordinates.col == 0) || (coordinates.row == 1 && coordinates.col == 2) || (coordinates.row == 2 && coordinates.col == 1))){
			if(coordinates.row == coordinates.col){
				mtx[0][0] == mtx[1][1] && mtx[0][0] == mtx[2][2] ? result = true : result = false;	
			}
			if(coordinates.row+coordinates.col == 2){
				mtx[0][2] == mtx[1][1] && mtx[0][2] == mtx[2][0] ? result = true : result = false;	
			}
		}
	}

	return result;
}