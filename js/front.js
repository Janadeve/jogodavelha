var canClick = true; // - Flag of allow click in player of game
var currentField; // - Current clicked field
var currentCoordinates = {col: "", row: ""};
var bestCoordinates = "";

function getCurrentCoordinates(){
	return currentCoordinates;
}

function setCurrentCoordinates(col, row){
	currentCoordinates = {col: col, row: row};
}

function getCurrentField(){
	return currentField;
}

function setCurrentField(element){
	currentField = element;
}

function getCanClick(){
	return canClick;
}

function setCanClick(value){
	canClick = value;
}

function toggleCanClick(){
	canClick ? canClick = false : canClick = true;
	return canClick;
}

function initInterfaceMatrix(){
	$("#player .field").each(function(){
		$(this).html("");
	});
}

function showWinner(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("<center>Jogador " + getCurrentPlayer() + " ganhou!</center>");
	resultModal.show();
	return false;
}

function fillInterfaceMatrix(col, row, player){
	//Add the X or O into the field
	$("#player .field[data-col = '" + col + "'][data-row='" + row + "']").html("<span class='marker'>" + player + "</span>");
	setTimeout(function(){
		$(".overlay-loading").fadeOut();
	}, 1500);
}

function isFilledField(){
	var result;
	$(getCurrentField()).contents().length == 0 ? result = false : result = true;
	return result;
}

function doMove(element){
	if(getGameMode() == 1){
		$(".overlay-loading").fadeIn();
	}
	if(getCanClick()){
			//Travando o click durante o processamento
			toggleCanClick();
			//Setando o campo selecionado
			setCurrentField(element);

			//CAMPO NÃO PREENCHIDO
			if(!isFilledField()){
				//Capturando as coordenadas do campo clicado
				col = $(element).data("col");
				row = $(element).data("row");

				//Set as coordenadas do campo selecionado
				setCurrentCoordinates(col, row);

				//Preenchedo a matrix da interface
				fillInterfaceMatrix(col, row, getCurrentPlayer());
				//Preenchendo a matrix da engine
				fillMatrix(col, row, getCurrentPlayer());

				//Jogador Venceu
				if(hasWinner(getMtx(), getCurrentPlayer())){
					setLastWinner(getCurrentPlayer())
					showWinner(getMtx(), getCurrentPlayer());

				//Se o jogador não ganhou
				}else{
					//Se não existir mais campos
					if(getAvailableFields(getMtx()).length == 0){
						//Setando ultimo jogador como null
						setLastWinner(null);
						//Trocando o jogador
						toggleCurrentPlayer();
						showTieResult();
					}else{
						//Liberando a proxima jogada
						toggleCanClick();
						//Trocando o jogador
						toggleCurrentPlayer();

						//Caso esteja jogando com a máquina
						if(getGameMode() == 1){
							//Liberando a AI
							setIABlocked(false);
							setTimeout(function(){
								//Mandando a AI jogar
								doMoveAI();
							}, 600);
						}

					}
					
				}	

			// CAMPO PREENCHIDO
			}else{
				console.log("Campo Preenchido");	
				setIABlocked(true);
				toggleCanClick();
				return false;
			}	
		}else{
			console.log("Aguarde o processamento");
			toggleCanClick();
			setIABlocked(true);
			return false;
		}
}

function doMoveAI(){
	$(".overlay-loading").fadeIn();
	setCurrentPlayer('O');
	//Verificando se a matrix está vazia
	if(getAvailableFields(getMtx()).length == 9){
		// Pegando numeros aleatorios para a máquina;
		randNumberCol = Math.floor(Math.random() * 3);
		randNumberRow = Math.floor(Math.random() * 3);

		//Preenchendo matrizes e coordenadas
		fillMatrix(randNumberCol, randNumberRow, "O");
		fillInterfaceMatrix(randNumberCol, randNumberRow, "O");
		setCurrentCoordinates(randNumberCol, randNumberRow);

		//Mudando o jogador - Nesse caso impossivel ganhar pois a matrix está quase completa
		toggleCurrentPlayer();
	}else{
		var auxMtx = getMtx().slice(0);

		//Caso tenha campos disponiveis
		if(getAvailableFields(getMtx())){
			//Procura a melhor jogada
			bestCoordinates = minimax(auxMtx, "O").coordinates;

			// Preenche todas as matrizes e coordenadas
			fillMatrix(bestCoordinates.col, bestCoordinates.row, "O");
			fillInterfaceMatrix(bestCoordinates.col, bestCoordinates.row, "O");
			setCurrentCoordinates(bestCoordinates.col, bestCoordinates.row);


			setTimeout(function(){
				//Caso a máquina ganhe
				if(hasSequence(getMtx(), "O")){
					setLastWinner("O")
					showWinner();
				//Caso ela não ganhe
				}else{
					//Troca o jogador
					toggleCurrentPlayer();
				}
			}, 600);
		}else{
			//Setando ultimo jogador como null
			setLastWinner(null);
			//Trocando o jogador
			toggleCurrentPlayer();
			showTieResult();
		}
		

		$(".overlay-loading").fadeOut();
		
	}
}

function showTieResult(){
	var resultModal = new bootstrap.Modal($('#resultModal'));
	$("#resultModal p").html("Tie - Deu velha!");
	resultModal.show();
}

function blinkElement(element) {
    $(element).fadeOut(500);
    $(element).fadeIn(500);
}





