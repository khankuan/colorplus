import React from 'react';
import {
  Stores,
  Actions
} from './dep';

import Game from './Game';
import Header from './Header';
import Ended from './Ended';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appStore: Stores.App.getState(),
      gameStore: Stores.Game.getState()
    };
  }

  componentWillMount () {
    this._handleAppStore = this._handleAppStore.bind(this);
    this._handleGameStore = this._handleGameStore.bind(this);
    Stores.App.listen(this._handleAppStore);
    Stores.Game.listen(this._handleGameStore);
  }

  componentWillUnmount () {
    Stores.App.unlisten(this._handleAppStore);
    Stores.Game.unlisten(this._handleGameStore);
  }

  _handleAppStore (data) {
    this.setState({appStore: data});
  }

  _handleGameStore (data) {
    this.setState({gameStore: data});
  }

  _handleStartGame () {
    Actions.App.startGame();
  }

  render(){

    return (
      <div className='app'>
        <Header
          appStore={this.state.appStore}
          gameStore={this.state.gameStore} />

        <div className='container'>
          <Game enabled={this.state.appStore.appState === 'STARTED'} />

          {this.state.appStore.appState === 'ENDED' ?

          <Ended gameStore={this.state.gameStore} />

          : null}

        </div>
      </div>
    );
  }

}

export default App;
