import React from 'react';
import cx from 'classnames';

import {
  Stores,
  Actions
} from './dep';


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = Stores.Game.getState();

    const greyRGB = (224 << 16) + (224 << 8) + 224;
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

  _handleHovering (i, on) {
    if (!on){
      this.setState({hovering: null});
    } else {
      this.setState({hovering: i});
    }
  }


  render (){
    const danger = this.state.msLeft < 5000;

    return (
      <div className='game'>
        <div
          className={cx({
            'time': true,
            'time-danger': danger
          })}
          style={{
            visibility: this.props.enabled ? 'visible' : 'hidden'
          }}>
          {parseFloat(this.state.msLeft / 1000).toFixed(2).split('.').join(':')}
        </div>

        <div className='box background-fade' style={{background: this._intToHexColor(this.state.colorA)}} />
        <div className='symbol plus'>+</div>
        <div className='box background-fade' style={{background: this._intToHexColor(this.state.colorB)}} />

        <div className='symbol equals'>=</div>
        {
          this.state.options.map((color, i) => {
            return (
              <div
                key={i}
                className={cx({
                  'box-option': true,
                  'background-fade': true,
                  'box-option-hover': this.state.hovering === i
                })}
                style={{cursor: 'pointer', background: this._intToHexColor(color)}}
                onMouseOver={this._handleHovering.bind(this, i, true)}
                onMouseLeave={this._handleHovering.bind(this, i, false)}
                onTouchEnd={this._handleHovering.bind(this, i, false)}
                onTouchCancel={this._handleHovering.bind(this, i, false)}
                onMouseUp={this._handleHovering.bind(this, i, false)}
                onClick={Actions.Game.pickOption.bind(null, i)} />
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
