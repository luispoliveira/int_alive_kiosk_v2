import { LedInterface } from '../../../shared/domain/interfaces/led.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ws2812 = require('rpi-ws281x-native-fixed');

export class Ws2812Service {
  channel: {
    array: number[];
  };
  gpioPin: number;

  constructor(config: LedInterface) {
    try {
      this.gpioPin = config.options.gpio;
      this.channel = ws2812(config.numberLeds, config.options);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  turnLedOn(ledNumber: number, color: number): void {
    this.channel.array[ledNumber] = color;
    ws2812.render();
  }

  turnLedOff(ledNumber: number): void {
    this.channel.array[ledNumber] = 0;
    ws2812.render();
  }

  turnAllOn(color: number): void {
    this.channel.array.fill(color);
    ws2812.render();
  }

  turnAllOff(): void {
    this.channel.array.fill(0);
    ws2812.render();
  }
}
