import { Options } from 'onoff';

export interface LedInterface {
  numberLeds: number;
  options: {
    gpio: number;
    dma?: number;
    freq?: number;
    invert?: boolean;
    brightness?: number;
    stripType?: string;
  };
}

export interface LedOptionsInterface {
  addresses: LedInterface[];
}
