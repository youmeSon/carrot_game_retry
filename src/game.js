'use strict';
import Field from './field.js';
import * as sound from'./sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel'
});
// Builder pattern
export class GameBuilder {
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withGameDuration(duration) {
    this.gameDurtation = duration;
    return this;
  }

  build() {
    return new Game(
      this.carrotCount,
      this.bugCount,
      this.gameDurtation
    )
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDuration = gameDuration;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if(this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      };
    });
  }
    setStopListener(onGameStop) {
      this.onGameStop = onGameStop;
    };

    start() {
      this.started = true;
      this.init();
      this.showStopButton();
      this.showTimerAndScore();
      this.startGameTimer();
      sound.playBg();
    };

    stop(reason) {
      this.started = false;
      this.stopGameTimer();
      this.hideGameButton();
      sound.stopBg();
      this.onGameStop && this.onGameStop(reason);
    }

    init() {
      this.score = 0;
      this.gameScore.innerText = this.carrotCount;
      this.gameField.init();
    };

    onItemClick = (item) => {
      if(!this.started) {
        return;
      }
      if(item === 'carrot') {
        this.score++;
        this.updateScoreBoard();
        if(this.score == this.carrotCount) {
          this.stop(Reason.win);
        }
      } else if(item === 'bug') {
        this.stop(Reason.lose);
      }
    };

    showStopButton() {
      const icon = document.querySelector('.fas');
      icon.classList.add('fa-stop');
      icon.classList.remove('fa-play');
      this.gameBtn.style.visibility = 'visible';
    };

    showTimerAndScore() {
      this.gameTimer.style.visibility = 'visible';
      this.gameScore.style.visibility = 'visible';
    };

    startGameTimer() {
      let remainingTimeSec = this.gameDuration;
      this.updateTimerText(remainingTimeSec);
      this.timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
          clearInterval(this.timer);
          this.stop(this.carrotCount == this.score ? Reason.win : Reason.lose);
          return;
        }
        this.updateTimerText(--remainingTimeSec);
      }, 1000);
    };

    updateTimerText(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      this.gameTimer.innerText = `${minutes}:${seconds}`;
    };
    
    hideGameButton() {
      this.gameBtn.style.visibility = 'hidden';
    };

    stopGameTimer() {
      clearInterval(this.timer);
    }
    
    updateScoreBoard() {
      this.gameScore.innerText = this.carrotCount - this.score;
    }

  };
