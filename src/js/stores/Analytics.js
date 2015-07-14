import {
  alt,
  Actions
} from './dep';

class Analytics {
  constructor() {
    if (!window._shouldTrack){
      return;
    }

    this.bindListeners({
      onStartGame: Actions.App.startGame,
      onNewHighScore: Actions.App.newHighScore
    });

    this.state = {};
  }

  onStartGame () {
    window._gaq.push(['_trackEvent', 'game', 'new']);
  }

  onNewHighScore (highScore) {
    window._gaq.push(['_trackEvent', 'game', 'highscore', null, highScore]);
  }

}

export default alt.createStore(Analytics, 'Analytics');