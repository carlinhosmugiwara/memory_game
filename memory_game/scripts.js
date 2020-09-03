const cards = document.querySelectorAll('.memory-card');

let flipLock = false; // this is to prevent a third card from flipping
let hasFlipped = false; 
let firstCard, secondCard;

// defining function to flip the cards
function flipCard() {
  if (flipLock) return;
  if (this === firstCard) return;

  this.classList.add('flip'); // adding the flip action

  if (!hasFlipped) {
    // rule for the first click
    hasFlipped = true;
    firstCard = this;

    return;
  }

  // rule for the second click
  secondCard = this;

  checkForMatch();
}
//defining function to check if the pair is a match
function checkForMatch() {
  let isAMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isAMatch ? disableCards() : unflipCards(); // if it's a match, then the pair must stay flipped
}
// defining the function that will prevent cards from being reached by players 
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetPairs();
}
// defining function to unflip the cards 
function unflipCards() {
  flipLock = true; // the moment that the function gets invoked this happens

  // setting the time for the action to occur
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetPairs();
  }, 800);
}
// defining the function to reset the pairs
function resetPairs() {
  [hasFlipped, flipLock] = [false, false];
  [firstCard, secondCard] = [null, null];
}
/* defining the function that will position the cards randomly 
   this function has a different style because it is gonna be invoked as the game starts*/
(function shuffle() {
  cards.forEach(card => { // loopimg trhough the cards
    let randomPosition = Math.floor(Math.random() * 12); // generating random positions for the cards
    card.style.order = randomPosition;
  });
})();
// enabling the player to interact with the cards
cards.forEach(card => card.addEventListener('click', flipCard));
