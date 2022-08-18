import { Edge, Options } from 'onoff';
import { ButtonTypeEnum } from '../../enums/button-type.enum';

export interface ButtonInterface {
  gpioPin: number;
  gpioEdge: Edge;
  gpioOptions?: Options;
  type: ButtonTypeEnum;
}

export interface ButtonOptionsInterface {
  addresses: ButtonInterface[];
}
