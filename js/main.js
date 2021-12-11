$(document).ready(function($) {
	if(getLastWinner() == 'O'){
		setTimeout(function(){
			setTimeout(function(){
				doMoveAI();
				alert("Entrei aqui");
			}, 600);
		}, 600);
	}else if(getLastWinner() == null && getCurrentPlayer() == 'O'){
		doMoveAI();
	}
	//Bind (listener) click of fields
	$(".field").click(function(){
		doMove(this);
		if(!hasWinner(getMtx(), 'X') && !getIABlocked()){
			$(".overlay-loading").fadeIn();
			setTimeout(function(){
				toggleCurrentPlayer();
				setTimeout(function(){
					doMoveAI();
				}, 600);
			}, 600);	
		}
	});
});