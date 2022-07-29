import { Edge, Gpio, Options } from 'onoff';

export class Button {
  public gpio: Gpio;
  constructor(gpioPin: number, gpioEdge: Edge, gpioOptions?: Options) {
    this.gpio = new Gpio(gpioPin, 'in', gpioEdge, gpioOptions);
  }
}
