import { LedOptionsInterface } from '../../../../../shared/domain/interfaces/led.interface';

export declare interface LedEventsInterface {
  start: (config: LedOptionsInterface) => void;
  on(event: 'on', listener: (gpioPin: number) => void): this;
  on(event: 'off', listener: (gpioPin: number) => void): this;
  emit(event: 'on', output: number): boolean;
  emit(event: 'off', output: number): boolean;
}
