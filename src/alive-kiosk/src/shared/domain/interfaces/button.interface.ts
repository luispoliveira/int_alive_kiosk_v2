import { Edge, Options } from 'onoff';

export interface ButtonInterface {
  gpioPin: number;
  gpioEdge?: Edge;
  gpioOptions?: Options;
}

export interface ButtonOptionsInterface {
  addresses: ButtonInterface[];
}
