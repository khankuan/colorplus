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

  componentWillUpdate (nextProps, nextState){
    if (this.state.msLeft !== undefined && this.state.id === nextState.id){
      const msChange = Math.round((nextState.msLeft - this.state.msLeft) / 1000) * 1000;
      if (msChange){
        this.setState({
          msChangeTime: new Date().getTime(),
          msChange
        });
      }
    }
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

  _getMSChangeStyle (msChange) {
    let style = {};

    if (msChange < 0) {
      style.color = '#ea6052';
      style.marginTop = '12px';
    } else if (msChange > 0) {
      style.color = '#2ecc71';
      style.marginTop = '-12px';
    } else {
      style.visibility = 'hidden';
    }

    return style;
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
          <div className='ms-left'>{parseFloat(this.state.msLeft / 1000).toFixed(1).split('.').join(':')}</div>

          <div
            className='score-change'
            key={this.state.msChangeTime}
            style={this._getMSChangeStyle(this.state.msChange)}>
            {this.state.msChange > 0 ? '+' : ''}{parseFloat(this.state.msChange / 1000).toFixed(1)}
            <span className='secs'> secs</span>
          </div>

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
