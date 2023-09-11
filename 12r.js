
const score = JSON.parse(localStorage.getItem('score')) || {
  Wins:0,
  looses:0,
  ties:0
};
let isAutoPlaying = false;
let intervalID; 

function autoPlay(){
  if(!isAutoPlaying){
    intervalID = setInterval(() =>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    autoPlayButton.innerHTML = 'Stop playing';

  }else{
    clearInterval(intervalID);
    isAutoPlaying = false;
    autoPlayButton.innerHTML = 'Auto play';
  }
}

document.querySelector('.js-Rock-button')
.addEventListener('click' , () => {
  playGame('Rock');
});

document.querySelector('.js-Paper-button')
.addEventListener('click' , () => {
  playGame('Paper');
});

document.querySelector('.js-Scissors-button')
.addEventListener('click' , () => {
  playGame('Scissors');
});

const autoPlayButton = document.querySelector('.js-auto-play-button');
autoPlayButton.addEventListener('click' , () => {autoPlay();});

document.body.addEventListener('keydown' , (event) => {
  if (event.key==='r'){
    playGame('Rock');
  }
  else if(event.key==='p'){
    playGame('Paper');
  } 
  else if (event.key==='s'){
    playGame('Scissors');
  } 
  else if(event.key=== 'a'){
    autoPlay();
  }
  else if(event.key=== 'Backspace'){
    resetScore();
  }
});

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove==='Rock'){
    if(computerMove==='Rock'){
      result='Tie.';
    }
    else if(computerMove==='Paper'){
      result='You loose.';
    }
    else if(computerMove==='Scissors'){
      result='You win!';
    }
  }
  else if (playerMove==='Scissors'){
    if (computerMove==='Scissors'){
      result='Tie.';
    }
    else if(computerMove==='Paper'){
      result='You win!';
    }
    else if (computerMove==='Rock'){
      result='You loose.';
    }
  }
  else if (playerMove==='Paper'){
    if (computerMove==='Paper'){
      result='Tie.';
    }
    else if(computerMove==='Scissors'){
      result='You loose.';
    }
    else if (computerMove==='Rock'){
      result='You win!';
    }
  }

  if(result === 'You win!'){
    score.Wins += 1;
  }
  else if (result==='You loose.'){
    score.looses += 1;
  }
  else if (result==='Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  /*
  alert(`You pick ${playerMove} and the computer picks ${computerMove}. ${result}
Wins: ${score.Wins},Looses: ${score.looses
  },Ties: ${score.ties}`);*/

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-playGame')
    .innerHTML = ` You 
      <img src="emojis/${playerMove}-emoji.png" class="move-icon">
      <img src="emojis/${computerMove}-emoji.png" class="move-icon">
      Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins},Losses: ${score.looses
  },Ties: ${score.ties}`;
}

document.querySelector('.js-reset-button')
.addEventListener('click' , () => {
  showResetMess();
});

function showResetMess(){
  document.querySelector('.js-resetMess')
    .innerHTML = `<p>Are you sure you want to reset the score?</p>
    <button onclick=" 
    resetScore(); 
    hideMess();" class="yes-button">
      Yes
    </button>
    <button onclick="hideMess();" class="no-button">
      No
    </button>`
}

function resetScore(){
  score.Wins = 0;
  score.looses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result')
        .innerHTML = '  ';
  document.querySelector('.js-playGame')
        .innerHTML = '' 
}

function hideMess(){
  document.querySelector('.js-resetMess')
      .innerHTML = ' ';
}

function pickComputerMove() {
  const random = Math.random();
  let computerMove='';

  if ( random >= 0 && random < 1/3 ){
     computerMove = 'Rock';
  }
  else if (random >= 1/3 && random < 2/3){
     computerMove = 'Paper';
  }
  else if (random >= 2/3 && random < 1){
     computerMove ='Scissors';
  }
  return computerMove;
}