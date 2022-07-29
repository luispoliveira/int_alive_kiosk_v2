import { Options } from 'onoff';

export interface LedInterface {
  gpioPin: number;
  gpioOptions?: Options;
}

export interface LedOptionsInterface {
  addresses: LedInterface[];
}
