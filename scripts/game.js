let grid;
let game;
let ifc;

let player1;
let player2;

// Start game button

function startGame(player1, player2) {
	this.gameOn = 1;
	document.getElementById('active-player').classList.remove('hidden');

	document.getElementById('winner').classList.add('hidden');
	document.getElementById('title').classList.add('hidden');

	if (!player1 || !player2) {
		player1 = document.getElementById('player1').value;
		player2 = document.getElementById('player2').value;
	}

	grid = new Grid();

	game = new Game(player1, player2, grid);

	ifc = new Interface(game);

	game.setPlayers(player1, player2);

	game.setIfc(ifc);

	ifc.newGame(grid, player1, player2);
}

// Players
function Player(name, color) {
	this.name = name;
	this.color = color;

	this.showInfo = () => {};

	this.play = () => {};
}

// Game
function Game(player1, player2, grid) {
	this.player1 = player1;
	this.player2 = player2;
	this.grid = grid;
	this.active = Math.floor(Math.random() * 2) + 1;
	this.gameOn = 1;

	this.activePlayer;
	this.ifc;

	this.setIfc = (ifc) => {
		this.ifc = ifc;
		this.activePlayer = this['player' + this.active];
		ifc.printPlayer(this.activePlayer);
	};

	this.setPlayers = (name1, name2) => {
		this.player1 = new Player(name1, 'red');
		this.player2 = new Player(name2, 'yellow');
	};

	this.setPlay = (square) => {
		if (this.gameOn === 0) return;
		square.style.backgroundColor = this.activePlayer.color;
	};

	this.unsetPlay = (square) => {
		if (this.gameOn === 0) return;
		square.style.backgroundColor = 'white';
	};

	this.play = (square, col, rows) => {
		if (this.gameOn === 0) return;
		for (let i = rows - 1; i >= 0; i--) {
			let lowestSquare = document.getElementById('square-' + i + col);
			if (lowestSquare.style.backgroundColor === '') {
				let activeColor = this.activePlayer.color;
				lowestSquare.style.backgroundColor = activeColor;
				this.checkResult(activeColor, grid.cols, grid.rows);
				this.switchPlayer(this.ifc);
				square.style.backgroundColor = this.activePlayer.color;
				break;
			}
		}
	};

	this.switchPlayer = (ifc) => {
		if (this.gameOn === 0) return;
		this.active === 1 ? (this.active = 2) : (this.active = 1);
		this.activePlayer = this['player' + this.active];
		ifc.printPlayer(this.activePlayer);
	};

	/* 
	this.checkResultTest = (color, cols, rows) => {
		let sameColor;
		let resetColor;
		let varJ;

		//Check rows
		for (let i = 0; i < rows; i++) {
			sameColor = 0;
			resetColor = 0;
			varJ = 3;
			for (let j = 0; j < cols; j++) {
				varJ < cols / 2 ? (varJ += j) : (varJ -= j);
				console.log(varJ);
				let square = document.getElementById('square-' + i + varJ);
				if (square !== null && square.style.backgroundColor == color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					if (resetColor == 0) {
						resetColor = 1;
					} else {
						resetColor = 0;
						sameColor = 0;
					}
				}
			}
		}

		//Check cols
		for (let i = 0; i < cols; i++) {
			sameColor = 0;
			resetColor = 0;
			varJ = 3;
			for (let j = 0; j < rows; j++) {
				varJ < rows / 2 ? (varJ += j) : (varJ -= j);
				console.log(varJ);
				let square = document.getElementById('square-' + varJ + i);
				if (square !== null && square.style.backgroundColor == color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					if (resetColor == 0) {
						resetColor = 1;
					} else {
						resetColor = 0;
						sameColor = 0;
					}
				}
			}
		}
	};
 */

	this.checkResult = (color, cols, rows) => {
		let sameColor = 0;
		// Check rows
		for (let i = 0; i < rows; i++) {
			sameColor = 0;
			for (let j = 0; j < cols; j++) {
				let square = document.getElementById('square-' + i + j);
				if (square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
		}

		// Check cols
		for (let i = 0; i < cols; i++) {
			sameColor = 0;
			for (let j = 0; j < rows; j++) {
				let square = document.getElementById('square-' + j + i);
				if (square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
		}

		// Check diag left
		for (let i = 0; i < cols + 1; i++) {
			sameColor = 0;
			for (let j = 0; j < rows; j++) {
				let square = document.getElementById('square-' + j + (j + i));
				console.log('square-' + j + (j + i));
				if (square !== null && square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
			sameColor = 0;
			for (let j = 0; j < rows; j++) {
				let square = document.getElementById('square-' + (j + i) + j);
				console.log('square-' + (j + i) + j);
				if (square !== null && square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
		}

		// Check diag right
		for (let i = cols + 1; i >= 0; i--) {
			sameColor = 0;
			for (let j = rows; j >= 0; j--) {
				let square = document.getElementById('square-' + j + (i - j));
				console.log('square-' + j + (i - j));
				if (square !== null && square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
			sameColor = 0;
			for (let j = rows; j >= 0; j--) {
				let square = document.getElementById('square-' + (i - j) + j);
				console.log('square-' + (i - j) + j);
				if (square !== null && square.style.backgroundColor === color) {
					sameColor++;
					this.check4(sameColor);
				} else {
					sameColor = 0;
				}
			}
		}
	};

	this.check4 = (number) => {
		if (number === 4) {
			this.setWinner(this.activePlayer);
		}
	};

	this.setWinner = (player) => {
		this.gameOn = 0;
		document.getElementById('active-player').classList.add('hidden');

		let winnerText = document.getElementById('winner');

		winnerText.classList.remove('hidden');
		winnerText.innerHTML = `<h3>${player.name} a gagné !!</h3>
								<button type="button" onclick="startGame('${this.player1.name}', '${this.player2.name}');">Rejouer</button>
								<button type="button" onclick="document.location.reload();">Nouveaux joueurs</button>`;
	};
}
