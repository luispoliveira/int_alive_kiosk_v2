import { LedOptionsInterface } from '../../../../../shared/domain/interfaces/led.interface';

export declare interface LedEventsInterface {
  start: (config: LedOptionsInterface) => void;
  on(
    event: 'on',
    listener: (output: {
      gpioPin: number;
      ledNumber: number;
      color: number;
    }) => void,
  ): this;
  on(
    event: 'off',
    listener: (output: { gpioPin: number; ledNumber: number }) => void,
  ): this;

  on(
    event: 'allOn',
    listener: (output: { gpioPin: number; color: number }) => void,
  ): this;
  on(event: 'allOff', listener: (output: { gpioPin: number }) => void): this;
  on(
    envet: 'intervalOn',
    listener: (output: {
      gpioPin: number;
      from: number;
      to: number;
      color: number;
    }) => void,
  ): this;
  on(
    envet: 'intervalOff',
    listener: (output: { gpioPin: number; from: number; to: number }) => void,
  ): this;

  emit(event: 'on', output: unknown): boolean;
  emit(event: 'off', output: unknown): boolean;
  emit(event: 'allOn', output: unknown): boolean;
  emit(event: 'allOff', output: unknown): boolean;
  emit(event: 'intervalOn', output: unknown): boolean;
  emit(event: 'intervalOff', output: unknown): boolean;
}
