import { BinaryValue } from 'onoff';
import { Button } from '../buttons/button.model';
import { StripLedModel } from './models/strip-led.model';

const gpioPin = 17;
const numberLeds = 20;
const stripLeds = new StripLedModel(gpioPin, numberLeds);

const button1 = new Button(27, 'both');
const button2 = new Button(22, 'both');

button1.gpio.watch((err, value: BinaryValue) => {
  console.log(`Button value: ${value}`);
  if (value === 1) {
    stripLeds.turnIntervalOn(0, 9, 0xff0000);
  } else {
    stripLeds.turnIntervalOff(0, 9);
  }
});

button2.gpio.watch((err, value: BinaryValue) => {
  console.log(`Button value: ${value}`);
  if (value === 1) {
    stripLeds.turnIntervalOn(10, 19, 0x00ff00);
  } else {
    stripLeds.turnIntervalOff(10, 19);
  }
});

const unexportOnClose = () => {
  stripLeds.finalize();
  button1.gpio.unexport();
  button2.gpio.unexport();
};

process.on('SIGINT', unexportOnClose);
