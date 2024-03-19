const categories = {
    animals: ['cat', 'dog', 'elephant', 'lion', 'tiger'],
    countries: ['usa', 'uk', 'china', 'india', 'russia'],
    fruits: ['apple', 'banana', 'orange', 'grape', 'kiwi'],
    movies: ['avatar', 'titanic', 'inception', 'interstellar', 'joker']
};

let currentWord;
let guessesLeft;
let guessedLetters;
let score = 0;

function startGame(category) {
    const words = categories[category];
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessesLeft = 6;
    guessedLetters = new Set();
    displayWord();
    updateGuessesLeft();
    document.getElementById('message').innerText = '';
}

function displayWord() {
    const wordDisplay = currentWord.split('').map(letter => {
        if (guessedLetters.has(letter)) {
            return letter;
        } else {
            return '_';
        }
    }).join(' ');
    document.getElementById('word-display').innerText = wordDisplay;
}

function updateGuessesLeft() {
    document.getElementById('guesses-left').innerText = `Guesses left: ${guessesLeft}`;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (!guess.match(/[a-z]/)) {
        alert('Please enter a valid letter (a-z).');
        return;
    }

    if (guessedLetters.has(guess)) {
        alert('You already guessed that letter.');
        return;
    }

    guessedLetters.add(guess);

    if (currentWord.includes(guess)) {
        if (checkWin()) {
            document.getElementById('message').innerText = 'Congratulations! You win!';
            score += 10; // Increase score by 10 for every win
            document.getElementById('score').innerText = `Score: ${score}`;
            startGame(); // Start a new game after win
        }
    } else {
        guessesLeft--;
        updateGuessesLeft();
        if (guessesLeft === 0) {
            document.getElementById('message').innerText = `Game over. The word was: ${currentWord}`;
            score = 0; // Reset score to 0 after losing a game
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    }

    displayWord();
}

function checkWin() {
    return currentWord.split('').every(letter => guessedLetters.has(letter));
}