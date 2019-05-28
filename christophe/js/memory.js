class Cards {
    constructor(parentElement, numberOfCards) {
        this.width = '125px';
        this.height = '200px';
        this.numberOfCards = numberOfCards;
        this.parentElement = parentElement;
        this.flipButton = document.querySelector('button');
        // 12 images
        this.images = ['🌞', '🏠', '✨', '✌️', '😉', '💻', '🌊', '🚗', '👻', '😱', '🔫', '🌴'];
        this.shuffledDuplicatedImages = [];
        this.cardsList = [];
        this.flippedCards = [];
    }

    createCard(id) {
        const card = document.createElement('div');
        card.style.width = this.width;
        card.style.height = this.height;
        card.classList.add('card');
        card.id = `card${id}`;

        this.parentElement.appendChild(card);

        return card;
    }

    createCards() {
        for (let n = 0; n < this.numberOfCards; n++) {
            this.cardsList.push(this.createCard(n));
        }
    }

    mainEvent() {
        this.cardsList.forEach((card, n) => {
            card.addEventListener('click', (event) => {
                card.classList.toggle('flip');
                if (card.innerHTML == "") card.innerHTML = this.shuffledDuplicatedImages[n];
                else card.innerHTML = "";
                this.flippedCards.push(card);
                this.manageFlippedCards();
            });
        });
    }

    manageFlippedCards(card) {
        if (this.flippedCards.length == 2) {
            const [firstCard, secondCard] = [this.flippedCards[0], this.flippedCards[1]];

            if ((firstCard.innerHTML == secondCard.innerHTML) && firstCard.id != secondCard.id) {
                console.log('good');

                setTimeout(() => {
                    const cloneFirst = firstCard.cloneNode(true);
                    firstCard.parentNode.replaceChild(cloneFirst, firstCard);
                    const cloneSecond = secondCard.cloneNode(true);
                    secondCard.parentNode.replaceChild(cloneSecond, secondCard);
                }, 400);

                this.flippedCards = [];
            } else {
                setTimeout(() => {
                    this.flipCards(this.flippedCards);
                    this.flippedCards = [];
                }, 1000);
            }
        }
    }

    flipCards(cardsToFlip) {
        cardsToFlip.forEach(card => {
            card.classList.toggle('flip');
            // n is referenced from the function "mainEvent"
            if (card.innerHTML == "") card.innerHTML = this.shuffledDuplicatedImages[n];
            else card.innerHTML = "";
        });
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
        this.createCards();
        this.shuffleAndDuplicateImages('hard');
        this.mainEvent();
    }
}


const memory = document.querySelector('.memory');

let cards = new Cards(memory, 8);
cards.start();