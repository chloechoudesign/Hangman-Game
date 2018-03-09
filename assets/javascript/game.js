// GLOBAL VARIABLES
// ==================================================================
// Arrays and Variables for holding data
var wordOptions = ['santa', 'reindeer', 'mistletoe', 'gingerbread', 'stocking', 'chimney', 'elf', 'sleigh', 'ornaments', 'fireplace', 'holly', 'snowman', 'eggnog', 'rudolph'];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongLetters = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var guessesLeft = 9;


// FUNCTIONS(Reusable block of code)
// ==================================================================
function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    //  Reset
    guessedLetter = 9;
    wrongLetters = [];
    blanksAndSuccess = [];

    // Populate blanks and successes with right number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    }

    // Change HTML to reflect round conditions
    $('#currentWord').html('Guess the word: ' + blanksAndSuccess.join(" "));
    $('#guessesRemaining').html('Guess Left: ' + guessesLeft);
    $('#guessed').html('Letters already guessed: ');
    $('#winCounter').html('Wins: ' + winCounter);
    $('#lossCounter').html('Losses: ' + lossCounter);

    // Testing
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccess);
};

function checkLetters(letter) {
    // Check if letter exists in code at all
    var isLetterInWord = false;

    for(var i = 0; i < numBlanks; i++) {
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // Check where in word letter exists, then populate out blanksAndSuccess array
    if(isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccess[i] = letter;
            }
        }
    }

    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

    console.log(blanksAndSuccess);
}

function roundComplete() {
    console.log("Win Count: " + winCounter);
    console.log("Loss Count: " + lossCounter);
    console.log("Guesses Left: " + guessesLeft);

    // Update HTML to reflect the most recent count stats
    $('#currentWord').html('Guess the word: ' + blanksAndSuccess.join(" "));
    $('#guessesRemaining').html('Guess Left: ' + guessesLeft);
    $('#guessed').html('Letters already guessed: ' + wrongLetters.join(" "));

    // Check if user won
    if(lettersInWord.toString() == blanksAndSuccess.toString()) {
        winCounter++;
        alert("You won! The answer is " + selectedWord);

        // Update the win counter in HTML
        $('#winCounter').html('Wins: ' + winCounter);
        startGame();
    }

    // Check if user lost
    else if(guessesLeft == 0){
        lossCounter++;
        alert("You lost! The answer is " + selectedWord);

        // Update the loss counter in HTML
        $('#lossCounter').html('Losses: ' + lossCounter);
        startGame();
    }
}


// MAIN PROCESS
// ==================================================================

$(document).ready(function() {

    // Initiates the game
    startGame();

    // Register keyclicks
    $(document).keypress(function(event) {
        
        var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        checkLetters(letterGuessed);
        roundComplete();


        // Testing
        console.log(letterGuessed);
    });
});




