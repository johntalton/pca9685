const makePwmDriver = require('adafruit-i2c-pwm-driver');
const readline = require('readline');
/*
const profiles = [
  s1123: {
    at: 50,
    min: 100,
    max: 480,
    range: 180
  },
  sg92r: {
    at: 50,
    min: 150,
    max: 600,
    range: 180
  }
];
*/

class ServoFactory {
  static servo(pwm, id, profile){
    return new Servo(pwm, id, profile);
  }
}

class Servo {
  constructor(pwm, id, profile) {
    this.pwm = pwm;
    this.profile = profile;
    this.id = id;
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function handle(cmd) {
  const angle =  parseInt(cmd);
  if(angle === NaN) {
    console.log('parse failed: ', cmd.toString());
    ask();
    return;
  }

  console.log('setting value to : ', angle);
  const id = 0;;
  pwmDriver.setPWM(id, 0, angle);
  ask();
}

function ask() {
  rl.question('>', handle);
}

let servoMin = 150;
let servoMax = 600;

const pwmDriver = makePwmDriver({address: 0x40, device: '/dev/i2c-1', debug: true });

pwmDriver.setPWMFreq(50).then(()=> {
  console.log('freq set, ask...');
  setTimeout(() => {ask();}, 1000);
});




