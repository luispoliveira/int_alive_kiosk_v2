import { Edge, Gpio, Options } from 'onoff';
import { ButtonInterface } from '../../../shared/domain/interfaces/button.interface';
import { ButtonTypeEnum } from '../../../shared/enums/button-type.enum';

export class GpioOnOffService {
  gpio: Gpio;
  gpioPin: number;
  gpioEdge: Edge;
  gpioOptions: Options | undefined;
  type: ButtonTypeEnum;

  constructor(config: ButtonInterface) {
    try {
      this.gpioPin = config.gpioPin;
      this.gpioEdge = config.gpioEdge;
      if (config.gpioOptions) this.gpioOptions = config.gpioOptions;
      this.gpio = new Gpio(this.gpioPin, 'in', this.gpioEdge, this.gpioOptions);
      this.type = config.type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  unexport(): void {
    this.gpio.unexport();
  }
}
