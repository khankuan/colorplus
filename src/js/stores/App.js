import {
  alt,
  Actions
} from './dep';

import GameStore from './Game';

class App {
  constructor() {
    this.bindListeners({
      onInit: Actions.App.init,
      onStartGame: Actions.App.startGame,
      onEndGame: Actions.Game.endGame,
      onNewHighScore: Actions.App.newHighScore
    });

    this.state = {
      appState: 'WAITING', //  'WAITING', 'STARTED', 'ENDED'
      highScore: 0
    };
  }

  onInit (data) {
    this.setState({highScore: data.highScore || 0});
  }

  onStartGame () {
    this.setState({appState: 'STARTED'});
  }

  onEndGame () {
    this.setState({appState: 'ENDED'});
  }

  onNewHighScore (highScore) {
    this.setState({highScore});
  }
}


export default alt.createStore(App, 'App');