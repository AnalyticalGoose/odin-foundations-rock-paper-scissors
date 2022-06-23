
// Text UI elements
const gameText = document.querySelector('.gameText')
const leftScore = document.querySelector('.left')
const rightScore = document.querySelector('.right')

// Group of 'RPS' buttons and the reset button
const buttons = document.getElementById('buttons')
const resetBtn = document.getElementById('reset')

const choices = ["thump", "pawper", "slicers"]
let result = ""
let playerScore = 0
let computerScore = 0
let playerSelection = ""

// Event listener on button <div> & allocates to player selection var
function playGame() {
    gameText.textContent = 'Pick your weapon!'
    buttons.addEventListener('click', function (event) {
        playerSelection = event.target.id;          
        playRound(playerSelection)
    })
}   

function playRound (playerSelection) {
    // Returns random selection for computer
    let computerSelection = computerPlay()

    for (let i = 1; i < choices.length; i++) {
        if (playerSelection === computerSelection) {
            return
        }
        // Evaluates the index of choices to cover multiple lose conditions - 
        // thump (index 0) loses to pawper (index 1) for example. Same with 2,1 2,0. 
        else if ((choices.indexOf(playerSelection)) < (choices.indexOf(computerSelection))) {
            computerScore++
            rightScore.textContent = computerScore
            checkScore() 
            return
        }
        // This is the only exception to the above rule & needs a seperate statement
        else if (playerSelection === "thump" && computerSelection === "slicers") {
            playerScore++
            leftScore.textContent = playerScore
            checkScore() 
            return
        }
        else 
            playerScore++
            leftScore.textContent = playerScore
            checkScore() 
            return
    }
}

function computerPlay () {
    let index = Math.floor(Math.random()*choices.length);
    return choices[index]
}

// Checks for win/lose conditions between rounds
function checkScore() {
    if (playerScore >= 5) {
        buttons.style.display = 'none';
        gameText.textContent = "You Win!!!";
        endGame();
    }
    else if (computerScore >= 5) {
        buttons.style.display = 'none';
        gameText.textContent = "You lose!!!";
        endGame();
    }
    else return
}

// Listens to reset button, resets scores to 0, unhides the RPS buttons & restarts the game
function endGame() {
    resetBtn.addEventListener('click', function (event) {     
        playerScore = 0
        leftScore.textContent = playerScore
        computerScore = 0
        rightScore.textContent = computerScore
        playerSelection = ""
        buttons.style.display = 'block';
        playGame()
    })
}

playGame()
