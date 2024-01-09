//Gerenciamento de estados globais
//2  conjuntes de variaveis
const state = {

    view: {
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        lives: 3,
        currentTime: 40,
        },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

};

//Tempo
function countDown() {
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        endGame();

    } 
}

//Audio 
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

//Remove a classe inimiga e adiciona
function randomSquare() {
    state.view.squares.forEach((square) => { square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
           if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
           } else {
                state.values.hitPosition = null;
                playSound("error");
                decreaseLives();
           }
        });

        square.addEventListener("touchstart", () => {
            if(square.id === state.values.hitPosition) {
                 state.values.result++
                 state.view.score.textContent = state.values.result;
                 state.values.hitPosition = null;
                 playSound("hit");
            } else {
                 state.values.hitPosition = null;
                 playSound("error");
                 decreaseLives();
            }
         });
    });
}

function decreaseLives() {
    state.values.lives--;
    state.view.lives.textContent = state.values.lives;

    if (state.values.lives === 0) {
        endGame();
    }
}

function endGame() {
    
    /* Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=89170">Pixabay</a> */
    playSound("failure");
    setTimeout(() => {
        alert("Game over!\nYour score: " + state.values.result + "\nRecarregue a página para começar novamente!");
    }, 1000);
    
  }

//Funcao de inicio ou principal

function initialize() {

    addListenerHitBox();
}

initialize();

