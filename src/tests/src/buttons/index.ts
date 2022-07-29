import { BinaryValue } from 'onoff';
import { Led, LedUtils } from '../leds/led.model';
import { Button } from './button.model';

const button = new Button(23, 'both');
const greenLed = new Led(17);
const redLed = new Led(18);
const blueLed = new Led(27);
const yellowLed = new Led(22);

const leds = [greenLed, redLed, blueLed, yellowLed];

let runLoading = false;
let indexCount = 0;
let loadingState = 'done';
const loading = async () => {
  if (loadingState === 'done') return;

  if (!runLoading) {
    LedUtils.changeState(leds, 0);
    return;
  }

  if (indexCount === leds.length) {
    LedUtils.changeState(leds, 0);
    await sleep(250);
    LedUtils.changeState(leds, 1);
    loadingState = 'done';
    return;
  }
  const led = leds[indexCount];
  led.gpio.writeSync(1);
  indexCount++;
};

const loadingInterval = setInterval(loading, 250);

button.gpio.watch((err, value: BinaryValue) => {
  console.log(`Button value: ${value}`);
  if (value === 1) {
    runLoading = true;
    loadingState = 'loading';
  } else {
    LedUtils.changeState(leds, 0);
    runLoading = false;
    indexCount = 0;
  }
});

const unexportOnClose = () => {
  clearInterval(loadingInterval);
  leds.forEach((led) => {
    led.gpio.writeSync(0);
    led.gpio.unexport();
  });
  button.gpio.unexport();
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

process.on('SIGINT', unexportOnClose);
