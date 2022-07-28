import { BinaryValue } from 'onoff';
import { Led } from '../leds/led.model';
import { Button } from './button.model';

const greenLed = new Led(4);
const button = new Button(17, 'both');

const handleButtonPush = (err: unknown, value: BinaryValue) => {
  if (err) {
    console.error(`There was an error: ${err}`);
    return;
  }

  greenLed.writeSync(value);
};

button.watch(handleButtonPush);

const unexportOnClose = () => {
  greenLed.writeSync(0);
  greenLed.unexport();
  button.unexport();
};

process.on('SIGINT', unexportOnClose);
