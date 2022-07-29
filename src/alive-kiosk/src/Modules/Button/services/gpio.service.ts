import { Edge, Gpio, Options } from 'onoff';
import { ButtonInterface } from '../../../shared/domain/interfaces/button.interface';

export class GpioOnOffService {
  gpio: Gpio;
  gpioPin: number;
  gpioEdge: Edge;
  gpioOptions: Options | undefined;

  constructor(config: ButtonInterface) {
    try {
      this.gpioPin = config.gpioPin;
      this.gpioEdge = config.gpioEdge;
      if (config.gpioOptions) this.gpioOptions = config.gpioOptions;
      this.gpio = new Gpio(this.gpioPin, 'in', this.gpioEdge, this.gpioOptions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  unexport(): void {
    this.gpio.unexport();
  }
}
