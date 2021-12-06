$(document).ready(function($) {
	//Bind (listener) click of fields
	$(".field").click(function(){
		doMove(this);
		$(".overlay-loading").fadeIn();
		setTimeout(function(){
			toggleCurrentPlayer();
			setTimeout(function(){
				doMoveAI();
			}, 600);
		}, 600);
	});
});