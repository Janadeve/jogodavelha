$(document).ready(function($) {
	//Bind (listener) click of fields
	$(".field").click(function(){
		if($(this).css("cursor") == "not-allowed"){
			event.preventDefault();
		}else{
			doMove(this);		
		}
	});
;


});