var canClick = true; // - Flag of allow click in player of game
var currentField; // - Current clicked field
var currentCoordinates = {col: "", row: ""};

function getCurrentCoordinates(){
	return currentCoordinates;
}

function setCurrentCoordinates(coordinates){
	currentCoordinates = coordinates;
}

function getCurrentField(){
	return currentField;
}

function setCurrentField(clickedElement){
	currentField = clickedElement;
	setCurrentCoordinates({row: $(currentField).data("row"), col: $(currentField).data("col")});
}

function getCanClick(){
	return canClick;
}

function showWinner(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("Jogador " + getCurrentPlayer() + " ganhou!");
	resultModal.show();
}

function toggleCanClick(){
	canClick ? canClick = false : canClick = true;
	return canClick;
}

function fillInterfaceMatrix(element){
	//Add the X or O into the field
	$(element).html("<span class='marker'>" + getCurrentPlayer() + "</span>");
}

function isFilledField(){
	var result;
	$(getCurrentField()).contents().length == 0 ? result = false : result = true;
	return result;
}

function initMatrizes(){
	setMtx([["", "", ""],["", "", ""],["", "", ""]]); 
	$("#player .field").each(function(){
		$(this).html("");
	});
}

function isGameOver(){
	result = false;
	if(turns == 9){
		result = true;
	}
	return result;
}