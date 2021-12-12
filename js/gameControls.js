function startGame(event){
	if($("#startBtn").hasClass('is-disabled')){
		document.getElementById('select-game-mode-modal').showModal();
		event.preventDefault();
	}else{
		//Colocando X para começar primeiro
		setCurrentPlayer("X");

		// Retirando o overlay do player
		$("#playerOverlay").hide();

		//Esconde o painel de escolha dos modos do jogo
		// $("#gameModeBtn1, #gameModeBtn2").css("visibility", "hidden");
		$("#gameModeBtn1, #gameModeBtn2").hide();
		$("#controlBar").css("padding-bottom", "3rem");

		//Não deixa trocar o modo de jogo no meio da partida
		$("#gameModeBtn1, #gameModeBtn2").attr('disabled','disabled');
		$("#gameModeBtn1 input, #gameModeBtn2 input").attr('disabled','disabled');

		//Inativando o botão de start 
		$("#startBtn").removeClass('is-primary');
		$("#startBtn").addClass('is-disabled');

		//Ativando o botão de cancelar
		$("#goBackBtn").removeClass('is-disabled');
		$("#goBackBtn").addClass('is-warning');

		//Trocando a visualização dos botões (cancelar / start)
		$("#goBackBtn").show()
		$("#startBtn").hide()

		//Escondendo a seleção do tipo de jogo (sozinho ou vs IA)
		$("#selectGameModeScreen").hide();

		//Definindo o nome dos jogadores no placas
		if(getGameMode() == 1){
			$("#player2Name").html("IA (Máquina): ");
		}else{
			$("#player2Name").html("Jogador O: ");
		}

		//Mostrando o Placar
		$("#placar").slideDown();		
	}

}

function goBack(){
	if($("#goBackBtn").hasClass('is-disabled')){
		event.preventDefault();
	}else{
		//Retirando a modal de aviso de ganhador
		$("#resultModal").hide();

		$("#playerOverlay").show();

		//Mostra o painel de escolha dos modos do jogo
		$("#selectGameModeScreen").show();
		$("#gameModeBtn1, #gameModeBtn2").show();
		$("#controlBar").css("padding-bottom", "0");


		$("#gameModeBtn1, #gameModeBtn2").removeAttr('disabled');
		$("#gameModeBtn1 input, #gameModeBtn2 input").removeAttr('checked');
		$("#gameModeBtn1 input, #gameModeBtn2 input").removeAttr('disabled');

		$("#gameModeBtn1 input + span, #gameModeBtn2 input + span").css('color', '#212529');
		$("#gameModeBtn1 input + span::before, #gameModeBtn2 input + span::before").css('color', '#212529');

		$("#goBackBtn").removeClass('is-warning');
		$("#goBackBtn").addClass('is-disabled');

		$("#goBackBtn").hide()
		$("#startBtn").show()

		//Limpando o placar	do sistema e da tela
		initScore();
		$("#numScoreX").html("0");
		$("#numScoreO").html("0");

		//Escondendo o placar
		$("#placar").slideUp();


		initInterfaceMatrix();
		initGameMatrix();
	}
}