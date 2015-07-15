import React from 'react';
import {
  Stores,
  Actions
} from './dep';


class Ended extends React.Component {

  handleShare () {
    let message = `I scored ${this.props.gameStore.score} points at COLOR+, a game where you guess a combination of colors! #colorplus ${window.location}`;
    const w = 600;
    const h = 300;
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '', `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=${h},width=${w},top=${top},left=${left}`);
  }

  handleFbShare () {
    let message = `I scored ${this.props.gameStore.score} points at COLOR+, a game where you guess a combination of colors! #colorplus`.toString();
    // const w = 600;
    // const h = 300;
    // const left = (screen.width / 2) - (w / 2);
    // const top = (screen.height / 2) - (h / 2);
    FB.ui({
      method: 'feed',
      description: message,
      caption: 'COLOR+ ~ can you score higher than me??',
      link: 'http://khankuan.github.io/colorplus',
      picture: 'http://khankuan.github.io/colorplus/picture.png'
    }, function(response){});
  }

  render (){
    return (
      <div className='ended'>
        <p className='game-over'>GAME OVER!</p>

        <div>
          <a onClick={Actions.App.startGame}>TRY AGAIN</a>
        </div>

        <br />
        <br />

        <div>
          <a onClick={this.handleShare.bind(this)}
             target='_blank'>
             Share on Twitter
          </a>
        </div>

        <br />
        <br />

        <div>
          <a onClick={this.handleFbShare.bind(this)}
            target='_blank'>
            Share on Facebook
          </a>
        </div>

      </div>
    );
  }

}

Ended.propTypes = {
  gameStore: React.PropTypes.object
};

export default Ended;
