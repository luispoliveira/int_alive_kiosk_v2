import { LanguagesEnum } from '../../enums/languages.enum';
import { BaseInterface } from './base.interface';
import { ButtonOptionsInterface } from './button.interface';
import { ConnectionInterface } from './connection.interface';
import { LedOptionsInterface } from './led.interface';
import { VideoOptionsInterface } from './video.interface';

export interface ConfigInterface {
  base?: BaseInterface;
  languages?: LanguagesEnum[];
  videos?: VideoOptionsInterface;
  buttons?: ButtonOptionsInterface;
  leds?: LedOptionsInterface;
  connections?: ConnectionInterface[];
}
