import { Edge, Options } from 'onoff';
import { ButtonTypeEnum } from '../../enums';

export interface ButtonInterface {
  gpioPin: number;
  gpioEdge: Edge;
  gpioOptions?: Options;
  type: ButtonTypeEnum;
}

export interface ButtonOptionsInterface {
  addresses: ButtonInterface[];
}
