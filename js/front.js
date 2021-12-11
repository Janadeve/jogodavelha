var canClick = true; // - Flag of allow click in player of game
var currentField; // - Current clicked field
var currentCoordinates = {col: "", row: ""};
var bestCoordinates = "";

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

function initInterfaceMatrix(){
	$("#player .field").each(function(){
		$(this).html("");
	});
}

function showWinner(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("<center>Jogador " + getCurrentPlayer() + " ganhou!</center>");
	resultModal.show();
	return false;
}

function toggleCanClick(){
	canClick ? canClick = false : canClick = true;
	return canClick;
}

function fillInterfaceMatrix(col, row, player){
	//Add the X or O into the field
	$("#player .field[data-col = '" + col + "'][data-row='" + row + "']").html("<span class='marker'>" + player + "</span>");
	setTimeout(function(){
		$(".overlay-loading").fadeOut();
	}, 1500);
}

function isFilledField(){
	var result;
	$(getCurrentField()).contents().length == 0 ? result = false : result = true;
	return result;
}

function doMove(element){
	if(getCanClick()){
			toggleCanClick();
			col = $(element).data("col");
			row = $(element).data("row");
			setCurrentCoordinates(col, row);
			setCurrentField(element);
			if(!isFilledField()){
				fillInterfaceMatrix(col, row, "X");
				fillMatrix(col, row, "X");
				if(hasSequence(getMtx(), "X")){
					setLastWinner("X")
					showWinner();
				}	
				toggleCanClick();
				setIABlocked(false);
			}else{
				console.log("Campo Preenchido");	
				setIABlocked(true);
				toggleCanClick();
				return false;
			}	
		}else{
			console.log("Aguarde o processamento");
			toggleCanClick();
			setIABlocked(true);
			return false;
		}
}

function doMoveAI(){
	$(".overlay-loading").fadeIn();
	if(getAvailableFields(getMtx()).length == 9){
		randNumberCol = Math.floor(Math.random() * 3);
		randNumberRow = Math.floor(Math.random() * 3);

		setCurrentPlayer('O');
		fillMatrix(randNumberCol, randNumberRow, "O");
		fillInterfaceMatrix(randNumberCol, randNumberRow, "O");
		setCurrentCoordinates(randNumberCol, randNumberRow);

		setTimeout(function(){
			if(hasSequence(getMtx(), "O")){
				setLastWinner("O")
				showWinner();
			}
		}, 600);
	}else{
		if(!getIABlocked()){
			var auxMtx = getMtx().slice(0);
			bestCoordinates = minimax(auxMtx, "O").coordinates;
			if(getAvailableFields(getMtx()).length == 0){
				showTieResult();
			}else if(bestCoordinates == undefined){
				var resultModal = new bootstrap.Modal($('#resultModal'));
				$("#resultModal p").html("DESISTO!!! Você me pegou, mas estou treinando muito, logo vou te vencer.");
				resultModal.show();
			}else{
				setCurrentPlayer('O');
				fillMatrix(bestCoordinates.col, bestCoordinates.row, "O");
				fillInterfaceMatrix(bestCoordinates.col, bestCoordinates.row, "O");
				setCurrentCoordinates(bestCoordinates.col, bestCoordinates.row);
				setTimeout(function(){
					if(hasSequence(mtx, "O")){
						setLastWinner("O")
						showWinner();
					}else if(getAvailableFields(getMtx()).length == 0){
						setLastWinner(null);
						showTieResult();
					}
				}, 600);
				
			}

			$(".overlay-loading").fadeOut();
		}
		
	}
}

function showTieResult(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("Tie - Deu velha!");
	resultModal.show();
}


