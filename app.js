/* GAME FUNCTION
-Player must guess a number between a min and a max
-Player gets a limited amount of guesses
-Notify player of remaining guesses
-Notify the player of the correct answer if they lose
-Let player choose to play again 
*/

//GAME VALUES
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min, max);
    guessesLeft = 3; 

// UI ELEMENTS
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'), 
      maxNum = document.querySelector('.max-num'), 
      guessBtn = document.getElementById('guess-btn'), 
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message');

//ASSIGN MIN AND MAX VALUES
minNum.textContent = min;
maxNum.textContent = max;

//EVENT LISTENER FOR PLAY AGAIN
game.addEventListener('mousedown', function (e){
    if (e.target.className === 'play-again'){
        window.location.reload();
    } else{

    }
})

//EVENT LISTENER FOR SUBMIT
guessBtn.addEventListener ('click', function (){
    let guess = parseInt(guessInput.value);
    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //Check for winning number
    if (guess === winningNum){
        gameOver (true, `YOU WIN! ${winningNum} is correct!`);
        
    } else {
        guessesLeft -= 1; //subtracts 1 guess each time
        
        if (guessesLeft === 0){
            gameOver (false, `Game over. You lost. The correct answer is ${winningNum}.`); 
            guessInput.disabled = true;
        } else {
            setMessage (`You have ${guessesLeft} tries left.`, 'red');
            guessInput.value = '';
        }
    }
});
// SET MESSAGE FUNCTION
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}

//GAME OVER FUNCTIONS
function gameOver (won, msg){
    let color;
        won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);
    //play again
    guessBtn.value = 'Play again?';
    guessBtn.className += 'play-again';
}

//RANDOMIZE WINNING NUMBER EACH TIME. 
function getRandomNum (min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//wrapping in Math.floor forces the number to round down. 
