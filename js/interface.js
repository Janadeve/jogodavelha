var canClick = true; // - Flag of allow click in player of game
var currentField; // - Current clicked field
var currentCoordinates = {col: "", row: ""};
var bestCoordinates = "";
var timeToThink = 600; // Para simular o processamento da máquina (muito rápida incomoda)

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
	if(getCurrentPlayer() == "O" && getGameMode() == 1){
		$("#resultModal .message").html("<center><i class='nes-icon trophy'></i> A Inteligência artificial ganhou!</center>");
	}else{
		$("#resultModal .message").html("<center><i class='nes-icon trophy'></i> Jogador " + getCurrentPlayer() + " ganhou!</center>");
	}
	$("#resultModal").show();
}

function fillInterfaceMatrix(col, row, player){
	//Add the X or O into the field
	$("#player .field[data-col = '" + col + "'][data-row='" + row + "']").html("<span class='marker'>" + player + "</span>");
}

function isFilledField(){
	var result;
	$(getCurrentField()).contents().length == 0 ? result = false : result = true;
	return result;
}

function doMove(element){
	//Se o modo de jogo é com a IA colocamos o overlay para esperar ela jogar
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
					//Retirando a tela overlay
					$(".overlay-loading").fadeOut();
					//Mostrando a Modal de Ganhador
					showWinner(getMtx(), getCurrentPlayer());
					//Colocando Pontos pro jogador
					addScoreToPlayer(getCurrentPlayer());
					//Preenchendo o placar na interface
					if(getCurrentPlayer() == "X"){
						$("#numScoreX").html(getScore().player1);
					}else if(getCurrentPlayer() == "O"){
						$("#numScoreO").html(getScore().player2);
					}
				//Se o jogador não ganhou
				}else{
					//Se não existir mais campos
					if(getAvailableFields(getMtx()).length == 0){
						//Setando ultimo ganhador como null
						setLastWinner(null);
						//Trocando o jogador
						toggleCurrentPlayer();
						$(".overlay-loading").fadeOut();
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
				$(".overlay-loading").fadeOut();
				alert("Campo Preenchido");	
				setIABlocked(true);
				toggleCanClick();
				return false;
			}	
		}else{
			$(".overlay-loading").fadeOut();
			alert("Aguarde o processamento");
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

		//Mudando o jogador - Nesse caso impossivel ganhar 
		//pois a matrix está quase completa (agora tem 8 espaços somente)
		toggleCurrentPlayer();

		$(".overlay-loading").fadeOut();
	}else{
		setTimeout(function(){
			var auxMtx = getMtx().slice(0);
			//Caso tenha campos disponiveis
			if(getAvailableFields(getMtx())){
				//Procura a melhor jogada
				bestCoordinates = minimax(auxMtx, "O", 0).coordinates;

				//Retirando o Loading
				$(".overlay-loading").fadeOut();

				// Preenche todas as matrizes e coordenadas
				fillMatrix(bestCoordinates.col, bestCoordinates.row, "O");
				fillInterfaceMatrix(bestCoordinates.col, bestCoordinates.row, "O");
				setCurrentCoordinates(bestCoordinates.col, bestCoordinates.row);


				setTimeout(function(){
					//Caso a máquina ganhe
					if(hasSequence(getMtx(), "O")){
						setLastWinner("O")
						addScoreToPlayer("O");
						$("#numScoreO").html(getScore().player2);
						$(".overlay-loading").fadeOut();
						showWinner();
					//Caso ela não ganhe
					}else{
						//Troca o jogador
						toggleCurrentPlayer();
						//Setando ultimo jogador como null
						setLastWinner(null);
						$(".overlay-loading").fadeOut();
						if(getAvailableFields(getMtx()).length == 0){
							showTieResult();	
						}
					}
				}, 600);
			}else{
				//Setando ultimo jogador como null
				setLastWinner(null);
				//Trocando o jogador
				toggleCurrentPlayer();
				$(".overlay-loading").fadeOut();
				showTieResult();
			}
		}, timeToThink); // Tempo para fazer a máquina esperar, quando é muito rápida o jogador se incomoda	
		
	}
}

function setHighLightInScore(player){
	if(player == 'X'){
		$("#player1Name").addClass("currentPlayerNameScore blink-infinite");
		$("#player2Name").removeClass("currentPlayerNameScore blink-infinite");
	}else if(player == 'O'){
		$("#player1Name").removeClass("currentPlayerNameScore blink-infinite");
		$("#player2Name").addClass("currentPlayerNameScore blink-infinite");
	}
}


function showTieResult(){
	$("#resultModal .message").html("<i class='nes-icon close'></i> Deu velha!");
	$("#resultModal").show();
}

function blinkElement(element) {
    $(element).fadeOut(500);
    $(element).fadeIn(500);
}

function applyXCursor(element){
	$(element).css("cursor", 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NTIzQzRDQUM2NUFFQzExOTVGQUMyMDdGMENDRDczOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMDAxODNEMjVBQzcxMUVDOEE5N0Q3ODYzREJFMDM0NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMDAxODNEMTVBQzcxMUVDOEE5N0Q3ODYzREJFMDM0NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY1MjNDNENBQzY1QUVDMTE5NUZBQzIwN0YwQ0NENzM4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY1MjNDNENBQzY1QUVDMTE5NUZBQzIwN0YwQ0NENzM4Ii8+IDwvcmRmOkRlc2NyaXB0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"),auto');
}

function applySettings(){
	//Aplicando o nível de profundidade da IA
	maxProfundidade = $("#depthAI").val();

	alert("Alterações aplicadas com sucesso!")
	// $("#applySettingsModal .message").html("<center><i class='nes-icon trophy'></i> As configuração foram aplicadas com sucesso!</center>");

	// //Abre a modal de sucesso.
	// $("#applySettingsModal").show();
}

function toggleSettingsBox(){
	//Caso o painel esteja fechado abre
	if($("#settings #settingsBox").css("display") == "none"){
		onChangeAIDepth();

		//Abre o painel de settings
		$("#settings #settingsBox").slideDown();
	//Se estiver aberto então fecha.
	}else{
		$("#settings #settingsBox").slideUp();
	}
}

function onChangeAIDepth(){
	//Pegando o nível a cada change
	maxProfundidade = $("#depthAI").val();
	//Escrevendo o nível na label.
	if(maxProfundidade == 8){
		$("#settingsBox #labelValueDepth").html(maxProfundidade + ": Imbatível");
	}else if(maxProfundidade >= 6){
		$("#settingsBox #labelValueDepth").html(maxProfundidade + ": Especialista");
	}else if(maxProfundidade == 5){
		$("#settingsBox #labelValueDepth").html(maxProfundidade + ": Forte");
	}else if(maxProfundidade >= 3){
		$("#settingsBox #labelValueDepth").html(maxProfundidade + ": Fraca");
	}else if(maxProfundidade < 3){
		$("#settingsBox #labelValueDepth").html(maxProfundidade + ": Burra");
	}
}


