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

//Check horizontal sequence
function checkH(row, col){
	var result;
	mtx[row][0] == mtx[row][1] && mtx[row][0] == mtx[row][2] ?  result = true : result = false;
	return result;
}