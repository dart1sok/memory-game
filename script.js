const board = document.getElementById("board");
const attemptsEl = document.getElementById("attempts");
const matchesEl = document.getElementById("matches");
const resetBtn = document.getElementById("reset");

const cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let gameState = {
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  canFlip: true,
};

function initGame() {
  const gameCards = [...cards, ...cards].sort(() => Math.random() - 0.5);

  board.innerHTML = "";

  gameState = {
    flippedCards: [],
    matchedPairs: 0,
    attempts: 0,
    canFlip: true,
  };

  updateStats();

  gameCards.forEach((symbol, index) => {
    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    const cardInner = document.createElement("div");
    cardInner.className = "memory-card-inner";

    const cardBack = document.createElement("div");
    cardBack.className = "memory-card-back";
    cardBack.textContent = "?";

    const cardFront = document.createElement("div");
    cardFront.className = "memory-card-front";
    cardFront.textContent = symbol;

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);
    col.appendChild(card);
    board.appendChild(col);

    card.addEventListener("click", () => flipCard(card));
  });
}

function flipCard(card) {
  if (
    !gameState.canFlip ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  )
    return;

  card.classList.add("flipped");
  gameState.flippedCards.push(card);

  if (gameState.flippedCards.length === 2) {
    gameState.canFlip = false;
    gameState.attempts++;
    updateStats();

    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = gameState.flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    gameState.matchedPairs++;
    updateStats();

    gameState.flippedCards = [];
    gameState.canFlip = true;

    if (gameState.matchedPairs === cards.length) {
      setTimeout(() => {
        alert(`Вітаємо! Ви знайшли всі пари за ${gameState.attempts} спроб!`);
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      gameState.flippedCards = [];
      gameState.canFlip = true;
    }, 1000);
  }
}

function updateStats() {
  attemptsEl.textContent = gameState.attempts;
  matchesEl.textContent = gameState.matchedPairs;
}

resetBtn.addEventListener("click", initGame);

initGame();
