import { Edge, Gpio, Options } from 'onoff';

export class Button extends Gpio {
  constructor(gpioPin: number, gpioEdge: Edge, gpioOptions?: Options) {
    super(gpioPin, 'in', gpioEdge, gpioOptions);
  }
}
