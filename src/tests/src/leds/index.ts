import { Led } from './led.model';

const greenLed = new Led(4);

const blinkLed = () => {
  if (greenLed.readSync() === 0) {
    greenLed.writeSync(1);
  } else {
    greenLed.writeSync(0);
  }
};

const blinkInterval = setInterval(blinkLed, 250);

function endBlink() {
  clearInterval(blinkInterval);
  greenLed.writeSync(0);
  greenLed.unexport();
}

setTimeout(endBlink, 5000);
