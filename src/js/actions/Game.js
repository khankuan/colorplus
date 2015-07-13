import {
  alt,
  GameLogic
} from './dep';

import AppActions from './App';

class Game {

  startGame () {
    this.actions.nextRound();
  }

  decrementTime (time) {
    this.dispatch(time);

    if (alt.stores.Game.state.msLeft - time < 0){
      this.actions.endGame();
    }
  }

  endGame () {
    GameLogic.endGame();
    this.dispatch();
  }

  pickOption (optionIndex) {
    const gameState = alt.stores.Game.state;
    const correct = GameLogic.isCorrectColor(gameState.colorA, gameState.colorB, gameState.options[optionIndex]);
    if (!correct){
      this.actions.endGame();
    } else {
      this.actions.nextRound(alt.stores.Game.state);

      //  Check highscpre
      const oldHighScore = localStorage.getItem('highScore');
      const score = alt.stores.Game.state.score;
      if (!oldHighScore || score > oldHighScore){
        localStorage.setItem('highScore', score);
        AppActions.newHighScore(score);
      }
    }
  }

  nextRound (prevRound) {
    const round = GameLogic.nextRound(prevRound);
    this.dispatch(round);
  }
}

export default alt.createActions(Game);