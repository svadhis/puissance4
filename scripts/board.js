// Plateau de jeu
function Grid() {
	this.cols = 7;
	this.rows = 6;

	this.drawGrid = (game, boardAnim) => {
		// Ligne de jeu
		const backPlay = document.createElement('div');
		backPlay.setAttribute('id', 'backplay');

		const play = document.createElement('table');
		play.setAttribute('id', 'play');
		play.setAttribute('class', 'mx-auto play shadow mb-4 slide-in-blurred-bottom');

		document.getElementById('board').innerHTML = '';

		document.getElementById('board').appendChild(backPlay);
		document.getElementById('backplay').appendChild(play);

		this.drawLine(game, 'play', 'play', 'play block');

		// Tableau
		const grid = document.createElement('table');
		grid.setAttribute('id', 'grid');
		grid.setAttribute('class', 'mx-auto ' + boardAnim);

		document.getElementById('board').appendChild(grid);

		// Lignes
		for (let i = 0; i < this.rows; i++) {
			this.drawLine(game, i, 'grid', 'square block');
		}
	};

	this.drawLine = (game, i, table, classes) => {
		const row = document.createElement('tr');
		const rowId = 'row-' + i;

		row.setAttribute('id', rowId);

		document.getElementById(table).appendChild(row);

		// Colonnes
		for (let j = 0; j < this.cols; j++) {
			const square = new Square(i, classes, this.rows);
			square.drawSquare(game, i, j);
		}
	};
}

// Cases
function Square(type, classes, rows) {
	this.classes = classes;

	this.drawSquare = (game, row, col) => {
		const cell = document.createElement('td');
		cell.setAttribute('id', 'cell-' + row + col);
		document.getElementById('row-' + row).appendChild(cell);

		const backSquare = document.createElement('div');
		backSquare.setAttribute('id', 'backSquare-' + row + col);
		backSquare.setAttribute('class', 'blocksquare backsquare');

		const square = document.createElement('div');
		square.setAttribute('id', 'square-' + row + col);
		square.setAttribute('class', classes);

		document.getElementById('cell-' + row + col).appendChild(backSquare);
		document.getElementById('backSquare-' + row + col).appendChild(square);

		if (type === 'play') {
			square.addEventListener('mouseover', () => {
				game.setPlay(square);
			});
			square.addEventListener('mouseout', () => {
				game.unsetPlay(square);
			});
			square.addEventListener('click', () => {
				game.play(square, col, rows);
			});
		}
	};
}
