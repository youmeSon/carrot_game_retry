'use strict';
import PopUp from './popup.js';
import {GameBuilder, Reason} from './game.js';
import * as sound from'./sound.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .withCarrotCount(20)
  .withBugCount(20)
  .withGameDuration(20)
  .build();

game.setStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'Replay❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON 🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST 💩';
      sound.playBug();
      break;
    default:
      throw new Error('unvalid message');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});

