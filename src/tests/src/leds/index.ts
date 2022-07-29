import { Led } from './led.model';

const greenLed = new Led(4);

const blinkLed = () => {
  if (greenLed.gpio.readSync() === 0) {
    greenLed.gpio.writeSync(1);
  } else {
    greenLed.gpio.writeSync(0);
  }
};

const blinkInterval = setInterval(blinkLed, 250);

function endBlink() {
  clearInterval(blinkInterval);
  greenLed.gpio.writeSync(0);
  greenLed.gpio.unexport();
}

setTimeout(endBlink, 5000);
