$(document).ready(function($) {
	//Bind (listener) click of fields
	$(".field").click(function(){
		if($(this).css("cursor") == "not-allowed"){
			event.preventDefault();
		}else{
			doMove(this);		
		}
	});

	$("#selectGameModeScreen #gameMode1").click(function(){
		if($(this).css("cursor") == "not-allowed"){
			event.preventDefault();
		}else{
			setGameMode(1);		
		}
	});

	$("#selectGameModeScreen #gameMode2").click(function(){
		if($(this).css("cursor") == "not-allowed"){
			event.preventDefault();
		}else{
			setGameMode(2);		
		}
	});

	$("#selectGameModeScreen #newGame").click(function(){
		$("#selectGameModeScreen #gameMode1, #selectGameModeScreen #gameMode2").css({
			"cursor": 'pointer',
			"pointer-events": 'auto'
		});
	});
});