import { ButtonOptionsInterface } from './button.interface';
import { ConnectionInterface } from './connection.interface';
import { LedOptionsInterface } from './led.interface';

export interface ConfigInterface {
  buttons?: ButtonOptionsInterface;
  leds?: LedOptionsInterface;
  connections?: ConnectionInterface[];
}
