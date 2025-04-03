const images = [
  { name: "Arnold", src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Arnold_Schwarzenegger_1974.jpg" },
  { name: "Lou", src: "https://www.x-rep.com/wp-content/uploads/2020/04/LouFerrignoConcCurlNeveux.jpg" },
  { name: "Scott", src: "https://fuerzamaximawilliam.files.wordpress.com/2013/10/larry-scott.jpg" },
  { name: "Sergio", src: "https://1.bp.blogspot.com/_5YH9MpGHcuQ/Sr5o6fYT9II/AAAAAAAABLA/SrTEu7c-wfI/w1200-h630-p-k-no-nu/sergiooliva5.jpg" },
  { name: "LaRoca", src: "https://notinor.com/jujuy/wp-content/uploads/2016/11/Dwayne-Johnson-2.jpg" },
  { name: "Franco", src: "img/Fracko1-690x1024.jpg" }
];

const gameBoard = document.querySelector(".memory-game");
let firstCard, secondCard;
let lockBoard = false;

function createCards() {
  gameBoard.innerHTML = "";
  let cardsArray = [...images, ...images];
  cardsArray.sort(() => Math.random() - 0.5);

  cardsArray.forEach(({ name, src }) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.framework = name;

    card.innerHTML = `
                    <img class="card-face card-front" src="${src}" alt="${name}">
                    <img class="card-face card-back" src="https://i.pinimg.com/originals/9f/27/50/9f2750b762d5f725c98d43945ceb2b83.jpg" alt="Back">
                `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
  resetBoard();
  createCards();
}

resetButton.addEventListener("click", resetGame);

createCards();