$(document).ready(function($) {

	var mtx = [["", "", ""],["", "", ""],["", "", ""]]; //Matrix of markers
	var currentField; //Clicked Field

	function getCurrentField(){
		return currentField;
	}

	function setCurrentField(clickedElement){
		currentField = clickedElement;
	}

	function getMtx(){
		return mtx;
	}

	//Check horizontal sequence
	function checkH(row, col){
		var hasSequence = false;

		if(mtx[row][0] == mtx[row][1] && mtx[row][0] == mtx[row][2]){
			hasSequence = true;
		}

		return hasSequence;
	}

	//Bind (listener) click of fields
	$(".field").click(function(){

		//Add the X or O into the field
		$(this).html("<span class='marker'>X</span>");
		setCurrentField(this);

		//Ensure the correct synchrony between functions (Orchestration)
		setTimeout(function(){
			var mtx = getMtx();

			//Getting matrix's indexes of clicked field
			var row = $(getCurrentField()).data("row");
			var col = $(getCurrentField()).data("col")

			//Fill the matrix with X or O
			mtx[row][col] = 'X';

			//Check the horizontal sequence of clicked field
			result = checkH(row, col);

			if(result == true){
				alert("Você Ganhou!")
			}
		},500);
		
	});

});