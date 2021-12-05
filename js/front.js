var canClick = true; // - Flag of allow click in player of game
var currentField; // - Current clicked field
var currentCoordinates = {col: "", row: ""};

function doMove(element){
	if(getCanClick()){
			toggleCanClick();
			incrementTurns();
			var col, row;
			col = $(element).data("col");
			row = $(element).data("row");
			setCurrentCoordinates(col, row);
			setCurrentField(element);
			if(!isFilledField()){
				fillInterfaceMatrix(col, row);
				fillMatrix();
				if(!hasWinner()){
					if(isGameOver()){
						var resultModal = new bootstrap.Modal($('#resultModal'));
						$("#resultModal p").html("Game Over!");
						resultModal.show();
						initGame();
					}
					toggleCurrentPlayer();
				
				toggleCanClick();
			}else{
				console.log("Campo Preenchido");	
				toggleCanClick();
			}	
		}else{
			console.log("Aguarde o processamento");
		}
	}
}

function getCurrentCoordinates(){
	return currentCoordinates;
}

function setCurrentCoordinates(col, row){
	currentCoordinates = {col: col, row: row};
}

function getCurrentField(){
	return currentField;
}

function setCurrentField(element){
	currentField = element;
}

function getCanClick(){
	return canClick;
}

function showWinner(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("<center>Jogador " + getCurrentPlayer() + " ganhou!</center>");
	resultModal.show();
}

function toggleCanClick(){
	canClick ? canClick = false : canClick = true;
	return canClick;
}

function fillInterfaceMatrix(col, row){
	//Add the X or O into the field
	$("#player .field[data-col = '" + col + "'][data-row='" + row + "']").html("<span class='marker'>" + getCurrentPlayer() + "</span>");
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