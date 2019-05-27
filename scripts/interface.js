function Interface(game) {
	this.player1 = game.player1;
	this.player2 = game.player2;

	this.newGame = (grid, player1, player2) => {
		document.getElementById('newgame').style.display = 'none';

		grid.drawGrid(game);

		const instructions = document.getElementById('instructions');

		instructions.classList.remove('hidden');
	};

	this.printPlayer = (player) => {
		document.getElementById('active-player').innerHTML = `<h5>${player.name}, à toi de jouer !</h5>`;
	};

	this.printWinner = (player) => {};
}
