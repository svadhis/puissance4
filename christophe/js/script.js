class Cards {
    constructor(element, numberOfCards) {
        this.width = '125px';
        this.height = '200px';
        this.numberOfCards = numberOfCards;
        this.images = ['🌞', '🏠', '✨', '✌️', '😉', '💻', '🌊', '🚗', '👻', '😱', '🔫', '🌴'];
        this.element = element;
        this.cards = [];
        this.elements = [];
    }

    createCard(image, id) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.id = 'card' + id;
        card.style.width = this.width;
        card.style.height = this.height;

        this.element.appendChild(card);

        this.addEventToCard(card, image);

        return card;
    }

    addEventToCard(card, image) {
        card.addEventListener('click', (e) => {
            card.classList.toggle('flip');
            if (card.innerHTML == "") card.innerHTML = image;
            else card.innerHTML = "";
            this.elements.push(e.target);
            this.stopClicks();
        });
    }

    createCards() {
        const images = this.shuffleImages();
        for (let n = 0; n < this.numberOfCards; n++) {
            this.createCard(images[n], n);
        }
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    duplicateImages(difficulty = 'hard') {
        const shuffledImages = [];
        const foo = [];
        for (let n = 0; n < this.images.length; n++) foo.push(n);
        this.shuffle(foo);


        for (const n of foo.slice(0, this.numberOfCards / 2)) {
            shuffledImages.push(this.images[n]);
            shuffledImages.push(this.images[n]);

            if (difficulty == 'medium') shuffledImages.push(this.images[n]);

            if (difficulty == 'easy') {
                shuffledImages.push(this.images[n]);
                shuffledImages.push(this.images[n]);
            }
        }

        return shuffledImages;
    }

    shuffleImages() {
        const images = this.duplicateImages();

        return this.shuffle(images);

    }

    stopClicks() {
        if (this.elements.length == 2) {

            this.areCardsEqual();
            this.elements = [];
        }
    }

    flipCards() {

    }

    areCardsEqual() {
        if ((this.elements[0].innerHTML == this.elements[1].innerHTML) && (this.elements[0].id != this.elements[1].id)) {
            console.log("%cBien vu disait l'aveugle", "color: blue;");
        }
    }

    start() {
        this.createCards();
    }
}

const memory = document.querySelector('.memory');

let cards = new Cards(memory, 20);
cards.start();