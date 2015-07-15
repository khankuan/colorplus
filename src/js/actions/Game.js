import {
  alt,
  GameLogic
} from './dep';

import AppActions from './App';

class Game {

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
    const round = GameLogic.nextRound(gameState, gameState.options[optionIndex]);

    this.dispatch(round);

    if (round.msLeft < 0){
      this.actions.endGame();
    }

    //  Check highscpre
    const oldHighScore = localStorage.getItem('highScore');
    const score = alt.stores.Game.state.score;
    if (!oldHighScore || score > oldHighScore){
      localStorage.setItem('highScore', score);
      AppActions.newHighScore(score);
    }
  }
}

export default alt.createActions(Game);