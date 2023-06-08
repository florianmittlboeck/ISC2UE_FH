'use strict';
/*
    
*/
'use strict';

let words = ['hangman', 'javascript', 'programming', 'toeasy'];
let randomWord = '';
let hiddenWord = '';
let attempts = 0;
let canvas = document.querySelector('#hangmanCanvas');
let ctx = canvas.getContext('2d');
let guessInput = document.querySelector('#guessInput');
let checkButton = document.querySelector('.checkGuess');
let wordDisplay = document.querySelector('#word');
let resultDisplay = document.querySelector('#result');

let hangmanParts = [
        function () { ctx.beginPath(); ctx.moveTo(50, 350); ctx.lineTo(150, 350); ctx.stroke(); }, // Base
        function () { ctx.beginPath(); ctx.moveTo(100, 350); ctx.lineTo(100, 50); ctx.stroke(); }, // Pole
        function () { ctx.beginPath(); ctx.moveTo(100, 50); ctx.lineTo(250, 50); ctx.stroke(); }, // Beam
        function () { ctx.beginPath(); ctx.moveTo(250, 50); ctx.lineTo(250, 100); ctx.stroke(); }, // Rope
        function () { ctx.beginPath(); ctx.arc(250, 130, 30, 0, Math.PI * 2); ctx.stroke(); }, // Head
        function () { ctx.beginPath(); ctx.moveTo(250, 160); ctx.lineTo(250, 270); ctx.stroke(); }, // Body
        function () { ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(200, 150); ctx.stroke(); }, // Left Arm
        function () { ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(300, 150); ctx.stroke(); }, // Right Arm
        function () { ctx.beginPath(); ctx.moveTo(250, 270); ctx.lineTo(200, 320); ctx.stroke(); }, // Left Leg
        function () { ctx.beginPath(); ctx.moveTo(250, 270); ctx.lineTo(300, 320); ctx.stroke(); } // Right Leg
];

checkButton.addEventListener('click', checkGuess);

function startGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  hiddenWord = '_'.repeat(randomWord.length);
  wordDisplay.innerText = hiddenWord;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  guessInput.disabled = false;
  checkButton.disabled = false;
  resultDisplay.innerText = '';
  attempts = 0;
}

function checkGuess() {
  let guess = guessInput.value.toLowerCase();
  let correctGuess = false;
  let newHiddenWord = '';

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === guess) {
      newHiddenWord += guess;
      correctGuess = true;
    } else {
      newHiddenWord += hiddenWord[i];
    }
  }

  hiddenWord = newHiddenWord;
  wordDisplay.innerText = hiddenWord;

  if (hiddenWord === randomWord) {
    resultDisplay.innerText = 'Congratulations! You guessed the word!';
    guessInput.disabled = true;
    checkButton.disabled = true;
  } else if (correctGuess) {
    resultDisplay.innerText = 'Correct guess!';
  } else {
    resultDisplay.innerText = 'Wrong guess. Try again.';
    attempts++;
    drawHangman();
  }

  guessInput.value = '';
  guessInput.focus();
}

function drawHangman() {
  hangmanParts[attempts]();

  if (attempts === hangmanParts.length - 1) {
    resultDisplay.innerText = 'Game over. The word was: ' + randomWord;
    endGame();
  }
}

function endGame() {
  guessInput.style.display = 'none';
  checkButton.style.display = 'none';
}

window.onload = startGame;
