'use strict';
import PopUp from './popup.js';
import Game from './game.js';


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(20, 20, 20);
game.setStopListener((reason) => {
  let message;
  switch(reason) {
    case 'cancel':
      message = 'Replay❓';
      break;
    case 'win':
      message = 'YOU WON 🎉';
      break;
    case 'lose':
      message = 'YOU LOST 💩';
      break;
    default:
      throw new Error('unvalid message');
  }
  gameFinishBanner.showWithText(message);
})

