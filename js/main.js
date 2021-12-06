$(document).ready(function($) {
	//Bind (listener) click of fields
	$(".field").click(function(){
		doMove(this);
		setTimeout(function(){
			toggleCurrentPlayer();
			setTimeout(function(){
				doMoveAI();
			}, 300);
		}, 300);
	});
});