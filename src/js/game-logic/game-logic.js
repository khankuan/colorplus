import Actions from '../actions';

let started;
let prevTime;

class GameLogic {

  static startGame () {
    started = true;
    prevTime = new Date().getTime();

    //  Only decrease at animation frame
    function step(timestamp) {
      if (started){
        const curTime = new Date().getTime();
        if (curTime - prevTime > 50){ //  Not more than once per 50 ms
          Actions.Game.decrementTime(curTime - prevTime);
          prevTime = curTime;
        }
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);

    return this.nextRound();
  }

  static isCorrectColor (colorA, colorB, chosen){
    return chosen === GameLogic.colorAverage(colorA, colorB);
  }

  static colorAverage(a, b) {
    let blue = Math.floor((a % 256 + b % 256) / 2);
    a = a >> 8;
    b = b >> 8;
    let green = Math.floor((a % 256 + b % 256) / 2);
    a = a >> 8;
    b = b >> 8;
    let red = Math.floor((a % 256 + b % 256) / 2);

    return (red << 16) + (green << 8) + blue;
  }

  static nextRound (prevRound = {score: -1}) {
    const msLeft = Math.max(15000 - 1000 * (prevRound.score + 1), 2000);
    let round = {
      score: prevRound.score + 1,
      msLeft,
      colorA: GameLogic._random24(),
      colorB: GameLogic._random24(),
      options: []
    };

    round.ans = GameLogic.colorAverage(round.colorA, round.colorB);
    round.options.push(round.ans);
    round.options.push(GameLogic._random24());
    round.options.push(GameLogic._random24());
    round.options.push(GameLogic._random24());

    GameLogic._shuffle(round.options);

    return round;
  }

  static endGame () {
    started = false;
  }

  static _random24() {
    const mixR = 160;
    const mixG = 128;
    const mixB = 128;
    let red = Math.floor(Math.pow(2, 8) * Math.random());
    let green = Math.floor(Math.pow(2, 8) * Math.random());
    let blue = Math.floor(Math.pow(2, 8) * Math.random());

    // mix the color
    red = (red + mixR) >> 1;
    green = (green + mixG) >> 1;
    blue = (blue + mixB) >> 1;
    return (red << 16) + (green << 8) + blue;

    //return Math.floor(Math.pow(2, 24) * Math.random());
  }

  static _shuffle(o){
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

}

export default GameLogic;