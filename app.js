/*
GAME:
Player must guess number between 1 and 10 
Player has 3 guesses
Tell player how many guesses he has left 
Tell player correct answer if he doesn't guess the number in 3 guesses 
Ask player if he wants to play again
*/

//Number variables 
//if creating more variables you can omit type if values are separated by commas
// end with semicolon
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min,max),
    guessesLeft = 2;

    console.log(winningNum);

//UI Elements
const gameFormUI = document.querySelector(".container"),
      minNumUI = document.querySelector(".min-num"),
      maxNumUI = document.querySelector(".max-num"),
      guessBtnUI = document.querySelector(".btn"),
      guessInputUI = document.querySelector("#number"),
      messageUI = document.getElementById("message"); 
              

//Assign min and max variables to UI
maxNumUI.textContent = max;
minNumUI.textContent = min;

//listen for button click, PLAY AGAIN button
//value of guessInputUI is a string. Change to int to do number comparison 
guessBtnUI.addEventListener('click', clickPlayBtn);
//start to play again event
gameFormUI.addEventListener('mousedown', playAgain);



function clickPlayBtn(event){
    let inputNum = parseInt(guessInputUI.value);

    //if no or wrong number entered show Materialize alert
    // 'SUBMIT' logic not to show alert when the game is restarted by button click
    if(isNaN(inputNum) || inputNum < 1 || inputNum > 10 && event.target.textContent ==="SUBMIT"){
        guessInputUI.onClick = M.toast({html: `Please enter number between ${min} and ${max}`});
    } 

    //check if we got winning number 
    if(guessesLeft <= 0){
        // Game over. No more tries.
        guessInputUI.disabled = true;  
        guessBtnUI.textContent = "PLAY AGAIN";
        playerMessage(`Wrong guess. Game Over. The correct number was ${winningNum}.`, '#b30000');
    }

    if(inputNum === winningNum){
        playerMessage("You are right!", 'green');
        guessBtnUI.textContent = "PLAY AGAIN";
        //disable input
        guessInputUI.disabled = true;
    } else if(inputNum != winningNum && inputNum < 10 && inputNum > 1 && guessesLeft > 0){
        playerMessage(`${inputNum} is a wrong guess. Guesses Left: ${guessesLeft}`, '#b30000');
        setTimeout(clearMessage, 2000);
        guessesLeft -= 1;
    } 

    guessInputUI.value = '';

    event.preventDefault();
};

// message for the player
function playerMessage(msg,color){
    messageUI.textContent = msg;
    messageUI.style.color = color;
}

// clear message for timeout
function clearMessage(){
    messageUI.textContent = "";
}

// when button says PLAY AGAIN reload the game on next click
function playAgain(event){
    if(event.target.textContent ==="PLAY AGAIN"){
        window.location.reload();
    }
}

function getRandomNum(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
}

/*
// message for the player
function playerMessage(won,msg){
    let color;
    won === true ? "green" : '#b30000';

    guessInputUI.disabled = true;

    
    messageUI.textContent = msg;
    messageUI.style.color = color;
} */

