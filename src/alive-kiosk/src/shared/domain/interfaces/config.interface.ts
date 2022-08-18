import { BaseInterface } from './base.interface';
import { ButtonOptionsInterface } from './button.interface';
import { ConnectionInterface } from './connection.interface';
import { LedOptionsInterface } from './led.interface';
import { VideoOptionsInterface } from './video.interface';

export interface ConfigInterface {
  base?: BaseInterface;
  videos?: VideoOptionsInterface;
  buttons?: ButtonOptionsInterface;
  leds?: LedOptionsInterface;
  connections?: ConnectionInterface[];
}
