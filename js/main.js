$(document).ready(function($) {
	var canClick = true; // - Flag of allow click in player of game
	var currentField; // - Current clicked field

	function toggleCanClick(){
		canClick ? canClick = false : canClick = true;
		return canClick;
	}

	function getCanClick(){
		return canClick;
	}

	function getCurrentField(){
		return currentField;
	}

	function setCurrentField(clickedElement){
		currentField = clickedElement;
	}


	//Bind (listener) click of fields
	$(".field").click(function(){
		if(getCanClick()){
			toggleCanClick();
			setCurrentField(this);

			//Check if field has content
			if($(getCurrentField()).contents().length == 0){
				//Add the X or O into the field
				$(this).html("<span class='marker'>" + getTypeOfMarker() + "</span>");

				//Ensure the correct synchrony between functions (Orchestration)
				setTimeout(function(){
					var mtx = getMtx();
					var resultModal = new bootstrap.Modal($('#resultModal'));

					//Getting matrix's indexes of clicked field
					var row = $(getCurrentField()).data("row");
					var col = $(getCurrentField()).data("col")

					//Fill the matrix with X or O
					mtx[row][col] = getTypeOfMarker();

					//Check sequences of clicked field
					result = checkIfHasSequence(row, col);

					if(result == true){
						$("#resultModal p").html("Jogador " + getTypeOfMarker() + " ganhou!");
						resultModal.show();

						setMtx([["", "", ""],["", "", ""],["", "", ""]]); 
						$("#player .field").each(function(){
							$(this).html("");
						});
					}

					toggleTypeOfMarker();
					toggleCanClick();
				},500);

			}else{
				console.log("Campo Preenchido");	
				toggleCanClick();
			}	
		}else{
			console.log("Aguarde o processamento");
		}
		
	});

});