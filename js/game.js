const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'cardflamengo',
  'cardbotinha',
  'cardcoringao',
  'cardcruzeiro',
  'cardgalo',
  'cardpalmeiras',
  'cardgremio',
  'cardvasco',
  'cardsaopaulo',
  'cardfluzao',
  'DEYVINJOKERINVERSO'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';
let startTime = null;


const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  const modal = document.getElementById('modal');
  const playerNameSpan = document.getElementById('playerName');
  const playerTimeSpan = document.getElementById('playerTime');
  const restartBtn = document.getElementById('restartBtn');
  const closeBtn = document.getElementById('closeBtn');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    const endTime = new Date(); 
    const elapsedTimeInSeconds = (endTime - startTime) / 1000; 
    const minutes = Math.floor(elapsedTimeInSeconds / 60);
    const seconds = Math.floor(elapsedTimeInSeconds % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; 
    playerNameSpan.textContent = localStorage.getItem('player'); 
    playerTimeSpan.textContent = formattedTime; 
    modal.style.display = 'block'; 
  }

  restartBtn.onclick = () => {
    modal.style.display = 'none'; 
    window.location.reload();
  }

  closeBtn.onclick = () => {
    modal.style.display = 'none'; 
  }
}


const clearBoard = () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.classList.remove('reveal-card');
    card.classList.remove('disabled-card'); 
  });

  firstCard = '';
  secondCard = '';
}



const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  startTime = new Date();
  const duplicateCharacters = [...characters, ...characters];
  let hasDeyvinJoker = false; 

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);

    if (character === 'DEYVINJOKERINVERSO' && hasDeyvinJoker) {
      return;
    }

    grid.appendChild(card);

    if (character === 'DEYVINJOKERINVERSO') {
      hasDeyvinJoker = true; 
    }
  });
}


const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
