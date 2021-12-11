function startGame(event){
	if($("#startBtn").hasClass('is-disabled')){
		document.getElementById('select-game-mode-modal').showModal();
		event.preventDefault();
	}else{
		$("#playerOverlay").hide();
		$("#gameModeBtn1, #gameModeBtn2").attr('disabled','disabled');
		$("#gameModeBtn1 input, #gameModeBtn2 input").attr('disabled','disabled');

		$("#startBtn").removeClass('is-success');
		$("#startBtn").addClass('is-disabled');

		$("#goBackBtn").removeClass('is-disabled');
		$("#goBackBtn").addClass('is-warning');

		$("#goBackBtn").show()
		$("#startBtn").hide()
	}

}

function goBack(){
	if($("#goBackBtn").hasClass('is-disabled')){
		event.preventDefault();
	}else{
		$("#playerOverlay").show();
		$("#gameModeBtn1, #gameModeBtn2").removeAttr('disabled');
		$("#gameModeBtn1 input, #gameModeBtn2 input").removeAttr('disabled');

		$("#goBackBtn").removeClass('is-warning');
		$("#goBackBtn").addClass('is-disabled');

		$("#goBackBtn").hide()
		$("#startBtn").show()

		initInterfaceMatrix();
		initGameMatrix();
	}
};