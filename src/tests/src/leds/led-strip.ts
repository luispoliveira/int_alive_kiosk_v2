import { Led } from './led.model';
import { sleep } from './sleep';

const ledStrip = new Led(21);

/**
 * 24 bits for grb color
 * 8 bits for each color
 */
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
//function to convert hex color to rgb bits
const hexToGrb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16),
        b: parseInt(result[3], 16),
      }
    : undefined;
};

//function convert number to bits
const numberTo8Bits = (number: number) => {
  const bits = [];
  for (let i = 0; i < 8; i++) {
    bits.push(number & 1);
    number = number >> 1;
  }
  return bits.join('');
};
const convertGrbToBits = (grb?: { g: number; r: number; b: number }) => {
  if (!grb) {
    return undefined;
  }
  const bits = [];
  bits.push(numberTo8Bits(grb.g));
  bits.push(numberTo8Bits(grb.r));
  bits.push(numberTo8Bits(grb.b));
  return bits.join('');
};

const convertHextoGrbBits = (hex: string) => {
  const grb = hexToGrb(hex);
  return convertGrbToBits(grb);
};

const bitBanging = async (bits?: string) => {
  if (!bits) {
    return;
  }
  for (const bit of bits) {
    console.log('bit', bit);
    if (bit === '1') {
      ledStrip.on();
    } else {
      ledStrip.off();
    }
    await sleep(0.6);
  }
};

for (const color of colors) {
  const grbBits = convertHextoGrbBits(color);
  bitBanging(grbBits);
}

const unexportOnClose = () => {
  // ledStrip.gpio.unexport();
};

process.on('SIGINT', unexportOnClose);
