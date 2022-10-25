import {
  BaseInterface,
  ButtonOptionsInterface,
  ConnectionInterface,
  LedOptionsInterface,
  LoggerInterface,
  VideoOptionsInterface,
} from '.';
import { LanguagesEnum } from '../../enums';

export interface ConfigInterface {
  base?: BaseInterface;
  logger?: LoggerInterface;
  languages?: LanguagesEnum[];
  videos?: VideoOptionsInterface;
  buttons?: ButtonOptionsInterface;
  leds?: LedOptionsInterface;
  connections?: ConnectionInterface[];
}
