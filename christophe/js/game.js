class Cards {
	constructor(parentElement, numberOfCards) {
		this.width = '125px';
		this.height = '200px';
		this.numberOfCards = numberOfCards;
		this.parentElement = parentElement;
		this.flipButton = document.querySelector('button');
		// 12 images
		this.images = [ '🌞', '🏠', '✨', '✌️', '😉', '💻', '🌊', '🚗', '👻', '😱', '🔫', '🌴' ];
		this.shuffledDuplicatedImages = [];
		this.cardsList = [];
		this.flippedCards = [];
		this.goodCards = [];
	}

	createCard(id) {
		const card = document.createElement('div');
		card.style.width = this.width;
		card.style.height = this.height;
		card.classList.add('card');
		card.id = `card${id}`;
		this.parentElement.appendChild(card);

		this.cardsList.push(card);

		return card;
	}

	createCards() {
		for (let n = 0; n < this.numberOfCards; n++) {
			this.createCard(n).addEventListener('click', (event) => {
				this.clickEventHandler(event, n);
			});
		}
	}

	clickEventHandler({ target }, n) {
		// destructuring assignment
		if (this.flippedCards.length == 2) {
			// On ne fait rien
		} else {
			this.flipAction(n, target);
			this.flippedCards.push(target);
		}
	}

	autoFlip() {
		const interval = setInterval(() => {
			if (this.flippedCards.length == 2) {
				clearInterval(interval);
				if (this.cardsEqual(this.flippedCards)) {
					this.autoFlip();
				}
				setTimeout(() => {
					this.flipCards(this.flippedCards);
					this.flippedCards = [];
					this.autoFlip();
				}, 1000);
			}
		}, 2);
	}

	cardsEqual(cards) {
		const [ firstCard, secondCard ] = [ cards[0], cards[1] ];

		if (firstCard.innerHTML == secondCard.innerHTML && firstCard.id != secondCard.id) {
			setTimeout(() => {
				const cloneFirst = firstCard.cloneNode(true);
				firstCard.parentNode.replaceChild(cloneFirst, firstCard);
				const cloneSecond = secondCard.cloneNode(true);
				secondCard.parentNode.replaceChild(cloneSecond, secondCard);
				return true;
			}, 400);
		}
	}

	winCondition() {
		const check = (card) => {
			return card.classList.contains('flip');
		};

		return this.cardsList.every(check);
	}

	flipCards(targets) {
		targets.forEach((target, n) => {
			this.flipAction(n, target);
		});
	}

	flipAction(n, target) {
		target.classList.toggle('flip');
		if (target.innerHTML == '') target.innerHTML = this.shuffledDuplicatedImages[n];
		else target.innerHTML = '';
	}

	shuffleAndDuplicateImages(difficulty = 'hard') {
		// hard = 2 x images ; medium = 3 x images ; easy = 4 x images ;

		const foo = this.images.map((image, n) => n);
		shuffle(foo);
		const difficulties = { hard: 2, medium: 3, easy: 4 };

		if (difficulty == 'hard') {
			for (const n of foo.slice(0, this.numberOfCards / difficulties.hard)) {
				this.shuffledDuplicatedImages.push(this.images[n]);
				this.shuffledDuplicatedImages.push(this.images[n]);
			}
		}

		shuffle(this.shuffledDuplicatedImages);
	}

	start() {
		this.shuffleAndDuplicateImages();
		this.createCards();
		this.autoFlip();
		const interval = setInterval(() => {
			if (this.winCondition()) {
				clearInterval(interval);
				console.log('you won gg.');
			}
		}, 2);
	}
}

const memory = document.querySelector('.memory');

let cards = new Cards(memory, 8);
cards.start();
