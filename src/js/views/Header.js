import React from 'react';
import {
  Stores,
  Actions
} from './dep';


class Header extends React.Component {

  render (){
    return (
      <div>

        <span className='title' style={{color: '#E74C3C'}}>C</span>
        <span className='title' style={{color: '#16A085'}}>O</span>
        <span className='title' style={{color: '#F39C12'}}>L</span>
        <span className='title' style={{color: '#8E44AD'}}>O</span>
        <span className='title' style={{color: '#3498DB'}}>R</span>
        <span className='title' style={{color: '#34495E'}}>+</span>

        <div className='scores'>

          <div className='score'>
            <p>SCORE</p>
            <p className='score-amt'>{this.props.gameStore.score || 0}</p>
          </div>

          <div className='score'>
            <p>&nbsp;&nbsp;BEST&nbsp;&nbsp;</p>
            <p className='score-amt'>{Math.max(this.props.appStore.highScore || 0, this.props.gameStore.score || 0)}</p>
          </div>

        </div>

        <div className='intro'>
          <div>
            <span style={{color: '#3498DB'}}>Add </span>
            <span style={{color: '#34495E'}}>& </span>
            <span style={{color: '#16A085'}}>Guess </span>
            <span style={{color: '#8E44AD'}}>the </span>
            <span style={{color: '#E74C3C'}}>combined </span>
            <span style={{color: '#F39C12'}}>color!</span>
          </div>
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
