import { Edge, Gpio, Options } from 'onoff';

export class Led extends Gpio {
  constructor(gpioPin: number, gpioEdge?: Edge, gpioOptions?: Options) {
    super(gpioPin, 'out', gpioEdge, gpioOptions);
  }
}
