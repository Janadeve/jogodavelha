$(document).ready(function($) {
	//Bind (listener) click of fields
	$(".field").click(function(){
		if(getCanClick()){
			//Block the click
			toggleCanClick();

			incrementTurns();
			setCurrentField(this);

			//Check if field has content
			if(!isFilledField()){
				fillInterfaceMatrix(this);
				fillMatrix();

				//Check if has Winner
				if(!hasWinner()){
					if(isGameOver()){
						var resultModal = new bootstrap.Modal($('#resultModal'));
						$("#resultModal p").html("Game Over!");
						resultModal.show();
						initGame();
					}
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