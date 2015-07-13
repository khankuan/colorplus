import {
  alt,
  Actions
} from './dep';


class Game {
  constructor() {
    this.bindListeners({
      onStartGame: Actions.App.startGame,
      onDecrementTime: Actions.Game.decrementTime,
      onNextRound: Actions.Game.nextRound
    });

    this.state = {};
  }

  onStartGame (round) {
    this.setState(round);
  }

  onDecrementTime (time) {
    this.setState({
      msLeft: this.state.msLeft - time
    });
  }

  onNextRound (round) {
    this.setState(round);
  }
}

export default alt.createStore(Game, 'Game');