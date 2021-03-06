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

  componentDidUpdate () {
    //  Fade
    if (this.state.msChangeProgressLeft > 0){
      const animationTime = 500;
      const fps = 1 / 25;
      const timePassed = new Date().getTime() - this.state.msChangeTime;
      setTimeout(() => {
        this.setState({
          msChangeProgressLeft: 1 - (timePassed / animationTime)
        });
      }, fps);
    }
  }

  _handleGameStore (data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.msLeft !== undefined && data.id === this.state.id){
      const msChange = Math.round((data.msLeft - this.state.msLeft) / 1000) * 1000;
      if (msChange){
        data.msChangeTime = new Date().getTime();
        data.msChange = msChange;
        data.msChangeProgressLeft = 1;
      }
    }

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

  _getMSChangeStyle (msChange, msChangeProgressLeft) {
    let style = {};

    if (!msChange){
      style.visibility = 'hidden';
    } else {
      msChangeProgressLeft = Math.pow(Math.max(msChangeProgressLeft, 0), 0.5);
      style.opacity = msChangeProgressLeft;
      style.WebkitTransform = `scale(${1 + 0.2 * (1 - msChangeProgressLeft)})`;
      style.transform = `scale(${1 + 0.2 * (1 - msChangeProgressLeft)})`;
    }

    if (msChange < 0) {
      style.color = '#ea6052';
    } else if (msChange > 0) {
      style.color = '#2ecc71';
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

        </div>

        <div>
          <div className='box background-fade' style={{background: this._intToHexColor(this.state.colorA)}} />
          <div className='symbol plus'>+</div>
          <div className='box background-fade' style={{background: this._intToHexColor(this.state.colorB)}} />
        </div>


        <div
          className='score-change'
          key={this.state.msChangeTime}
          style={this._getMSChangeStyle(this.state.msChange, this.state.msChangeProgressLeft)}>
          {this.state.msChange > 0 ? '+' : ''}{parseFloat(this.state.msChange / 1000).toFixed(1)}
          <span className='secs'> secs</span>
        </div>

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
