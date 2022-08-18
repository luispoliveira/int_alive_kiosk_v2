import { BaseInterface } from './base.interface';
import { ButtonOptionsInterface } from './button.interface';
import { ConnectionInterface } from './connection.interface';
import { LedOptionsInterface } from './led.interface';

export interface ConfigInterface {
  base?: BaseInterface;
  buttons?: ButtonOptionsInterface;
  leds?: LedOptionsInterface;
  connections?: ConnectionInterface[];
}
