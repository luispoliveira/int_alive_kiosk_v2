import { Edge, Gpio, Options } from 'onoff';
import { ButtonInterface } from '../../../shared/domain/interfaces/button.interface';

export class GpioOnOffService {
  gpioButton: Gpio;
  gpioPin: number;
  gpioEdge: Edge | undefined;
  gpioOptions: Options | undefined;

  constructor(config: ButtonInterface) {
    this.gpioPin = config.gpioPin;
    if (config.gpioEdge) this.gpioEdge = config.gpioEdge;
    if (config.gpioOptions) this.gpioOptions = config.gpioOptions;
    this.gpioButton = new Gpio(
      this.gpioPin,
      'in',
      this.gpioEdge,
      this.gpioOptions,
    );
  }

  unexport(): void {
    this.gpioButton.unexport();
  }
}
