$(document).ready(function($) {
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

	function toggleCanClick(){
		canClick ? canClick = false : canClick = true;
		return canClick;
	}

	function hasWinner(){
		if(hasSequence(getCurrentCoordinates()) == true){
			showWinner();
			initGame();

			return true;
		}else{
			return false;
		}	
	}

	function showWinner(){
		var resultModal = new bootstrap.Modal($('#resultModal'));
		$("#resultModal p").html("Jogador " + getCurrentPlayer() + " ganhou!");
		resultModal.show();
	}

	function initGame(){
		initMatrizes();
		setCurrentPlayer('X');
	}

	function initMatrizes(){
		setMtx([["", "", ""],["", "", ""],["", "", ""]]); 
		$("#player .field").each(function(){
			$(this).html("");
		});
	}

	function fillMatrix(){
		var mtx = getMtx();

		//Getting matrix's indexes of clicked field
		var row = $(getCurrentField()).data("row");
		var col = $(getCurrentField()).data("col");

		//Fill the matrix with X or O
		mtx[row][col] = getCurrentPlayer();
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

	//Bind (listener) click of fields
	$(".field").click(function(){
		if(getCanClick()){
			//Block the click
			toggleCanClick();
			setCurrentField(this);

			//Check if field has content
			if(!isFilledField()){
				fillInterfaceMatrix(this);
				fillMatrix();
				//If there isn't Winner
				if(!hasWinner()){
					toggleCurrentPlayer();
				}
				//Release the Click
				toggleCanClick();
			}else{
				console.log("Campo Preenchido");	
				toggleCanClick();
			}	
		}else{
			console.log("Aguarde o processamento");
		}
		
	});

});