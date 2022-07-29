import { Gpio, Options } from 'onoff';
import { LedInterface } from '../../../shared/domain/interfaces/led.interface';

export class GpioOnOffService {
  gpio: Gpio;
  gpioPin: number;
  gpioOptions: Options | undefined;

  constructor(config: LedInterface) {
    try {
      this.gpioPin = config.gpioPin;
      if (config.gpioOptions) this.gpioOptions = config.gpioOptions;
      this.gpio = new Gpio(this.gpioPin, 'out', undefined, this.gpioOptions);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  unexport(): void {
    this.gpio.unexport();
  }

  turnLedOn(): void {
    this.gpio.write(1);
  }

  turnLedOff(): void {
    this.gpio.write(0);
  }
}
