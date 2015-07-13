import React from 'react';
import {
  Stores,
  Actions
} from './dep';


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = Stores.Game.getState();

    const greyRGB = (127 << 16) + (127 << 8) + 127;
    this.state.options = [greyRGB, greyRGB, greyRGB, greyRGB];
    this.state.colorA = greyRGB;
    this.state.colorB = greyRGB;
  }

  componentWillMount () {
    this._handleGameStore = this._handleGameStore.bind(this);
    Stores.Game.listen(this._handleGameStore);
  }

  componentWillUnmount () {
    Stores.Game.unlisten(this._handleGameStore);
  }

  _handleGameStore (data) {
    this.setState(data);
  }

  _intToHexColor (d) {
    let hex = Number(d).toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    return '#' + hex;
  }


  render (){
    return (
      <div>
        <p
          style={{visibility: this.props.enabled ? 'visible' : 'hidden'}}>
          Time Left: {parseFloat(this.state.msLeft / 1000).toFixed(2)}
        </p>

        <div style={{background: this._intToHexColor(this.state.colorA)}}>&nbsp;</div>
        <span>+</span>
        <div style={{background: this._intToHexColor(this.state.colorB)}}>&nbsp;</div>

        <p>Choose!</p>
        {
          this.state.options.map((color, i) => {
            return (
              <div
                key={i}
                style={{cursor: 'pointer', background: this._intToHexColor(color)}}
                onClick={Actions.Game.pickOption.bind(null, i)}>
                &nbsp;
              </div>
            );
          })
        }

      </div>
    );
  }

}


Game.propTypes = {
  enabled: React.PropTypes.bool
};


export default Game;
