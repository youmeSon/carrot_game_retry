'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder()
  .withCarrotCount(20)
  .withBugCount(20)
  .withGameDuration(20)
  .build();

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

