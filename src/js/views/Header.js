import React from 'react';
import {
  Stores,
  Actions
} from './dep';


class Header extends React.Component {

  render (){
    return (
      <div>

        <span>COLOR +</span>

        <div>

          <div>
            <span>SCORE</span>
            <span>{this.props.gameStore.score || 0}</span>
          </div>

          <div>
            <span>BEST</span>
            <span>{Math.max(this.props.appStore.highScore || 0, this.props.gameStore.score || 0)}</span>
          </div>

        </div>

        <div>
          <p>Plus the two colors and guess the final color!</p>
          <a onClick={Actions.App.startGame}>New Game</a>
        </div>

      </div>
    );
  }

}

Header.propTypes = {
  appStore: React.PropTypes.object,
  gameStore: React.PropTypes.object
};

export default Header;
