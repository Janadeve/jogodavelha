var mtx = [["", "", ""],["", "", ""],["", "", ""]]; // - Matrix of round game
var typeOfMarker = 'X'; // - Flag of type of current marker

function getTypeOfMarker(){
	return typeOfMarker;
}

function toggleTypeOfMarker(){
	typeOfMarker == 'X' ? typeOfMarker = 'O' : typeOfMarker = 'X';
}

function getMtx(){
	return mtx;
}

function setMtx(value){
	mtx = value;
}

function checkIfHasSequence(row, col){
	var result;

	//Check horizontal sequence
	mtx[row][0] == mtx[row][1] && mtx[row][0] == mtx[row][2] ?  result = true : result = false;

	//Check vertical sequence
	if(result == false){
		mtx[0][col] == mtx[1][col] && mtx[0][col] == mtx[2][col] ?  result = true : result = false;
	}

	//Check if has diagonal possibility
	if(result == false){
		if(!((row == 0 && col == 1) || (row == 1 && col == 0) || (row == 1 && col == 2) || (row == 2 && col == 1))){
			if(row == col){
				mtx[0][0] == mtx[1][1] && mtx[0][0] == mtx[2][2] ? result = true : result = false;	
			}
			if(row+col == 2){
				mtx[0][2] == mtx[1][1] && mtx[0][2] == mtx[2][0] ? result = true : result = false;	
			}
		}
	}

	return result;
}