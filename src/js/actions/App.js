import {
  alt,
  GameLogic
} from './dep';

class App {
  init () {
    this.dispatch({
      highScore: localStorage.getItem('highScore')
    });
  }

  startGame () {
    this.dispatch(GameLogic.startGame());
  }

  newHighScore (highScore) {
    this.dispatch(highScore);
  }
}

export default alt.createActions(App);