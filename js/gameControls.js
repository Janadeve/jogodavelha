function newGame(){
	$("#controlBar #gameModeBtn1").addClass('btn-secondary');
	$("#controlBar #gameModeBtn2").addClass('btn-secondary');

	$("#controlBar #gameModeBtn1").css('opacity', '1');
	$("#controlBar #gameModeBtn2").css('opacity', '1');
	$("#newGameBtn").hide();


	$("#controlBar #gameModeBtn2, #controlBar #gameModeBtn1").css('pointer-events', 'auto');

	initGame();
}

function startGame(){
	$("#playerOverlay").hide();
	$("#controlBar #gameModeBtn2, #controlBar #gameModeBtn1").css('opacity', '0');
	$("#controlBar #newGameBar").hide();
	$("#goBackBtn").show();

}

function goBack(){

	$("#goBackBtn").hide();
	$("#playerOverlay").show();
	$("#startBtn").hide();
	$("#newGameBtn").show();

	initInterfaceMatrix();
	initGameMatrix();
	
	
};