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
    //  27 rounds before 3 secs left
    const msLeft = Math.max(30000 - 1000 * (prevRound.score + 1), 3000);
    const colorA = GameLogic._random24();
    //  40 rounds before fully random
    const colorB = GameLogic._random24(colorA, Math.max(4 - (prevRound.score + 1) / 10, 0));
    let round = {
      score: prevRound.score + 1,
      msLeft,
      colorA,
      colorB,
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

  static _random24(mixer, percent=0) {
    const mixR = 128;
    const mixG = 128;
    const mixB = 128;
    const mixerR = mixer ? mixer >> 16 : 0;
    const mixerG = mixer ? (mixer >> 8) % 256 : 0;
    const mixerB = mixer ? mixer % 256 : 0;
    let red = Math.floor(Math.pow(2, 8) * Math.random());
    let green = Math.floor(Math.pow(2, 8) * Math.random());
    let blue = Math.floor(Math.pow(2, 8) * Math.random());

    // mix the color
    red = Math.floor((red + mixR + mixerR * percent) / (mixer ? 2 + percent : 2));
    green = Math.floor((green + mixG + mixerG * percent) / (mixer ? 2 + percent : 2));
    blue = Math.floor((blue + mixB + mixerB * percent) / (mixer ? 2 + percent : 2));
    return (red << 16) + (green << 8) + blue;
  }

  static _shuffle(o){
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

}

export default GameLogic;