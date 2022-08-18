const ws281x = require('rpi-ws281x-native-fixed');
import { sleep } from './sleep';

const options = {
  stripType: 'ws2812',
  gpio: 17,
};
const channel = ws281x(6, options);

const colors = [
  0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff,
];

const changeColor = async () => {
  for (let i = 0; i < channel.count; i++) {
    channel.array[i] = colors[i];
    ws281x.render();
    await sleep(500);
  }
};

changeColor();
