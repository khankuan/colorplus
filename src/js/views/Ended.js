import React from 'react';
import {
  Stores,
  Actions
} from './dep';


class Ended extends React.Component {

  render (){
    return (
      <div>

        <p>GAME OVER!</p>

        <div>
          <a onClick={Actions.App.startGame}>TRY AGAIN</a>
        </div>

        <div>
          <button>SHARE ({this.props.gameStore.score})</button>
        </div>

      </div>
    );
  }

}

Ended.propTypes = {
  gameStore: React.PropTypes.object
};

export default Ended;
