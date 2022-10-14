import { LedOptionsInterface } from '../../../../../shared/domain/interfaces/led.interface';
import { LedEventsEnum } from '../enums/led.events.enum';

export declare interface LedEventsInterface {
  start: (config: LedOptionsInterface) => void;
  on(
    event: LedEventsEnum.ON,
    listener: (output: {
      gpioPin: number;
      ledNumber: number;
      color: number;
    }) => void,
  ): this;
  on(
    event: LedEventsEnum.OFF,
    listener: (output: { gpioPin: number; ledNumber: number }) => void,
  ): this;

  on(
    event: LedEventsEnum.ALL_ON,
    listener: (output: { gpioPin: number; color: number }) => void,
  ): this;
  on(
    event: LedEventsEnum.ALL_OFF,
    listener: (output: { gpioPin: number }) => void,
  ): this;
  on(
    envet: LedEventsEnum.INTERVAL_ON,
    listener: (output: {
      gpioPin: number;
      from: number;
      to: number;
      color: number;
    }) => void,
  ): this;
  on(
    envet: LedEventsEnum.INTERVAL_OFF,
    listener: (output: { gpioPin: number; from: number; to: number }) => void,
  ): this;

  emit(event: LedEventsEnum.ON, output: unknown): boolean;
  emit(event: LedEventsEnum.OFF, output: unknown): boolean;
  emit(event: LedEventsEnum.ALL_ON, output: unknown): boolean;
  emit(event: LedEventsEnum.ALL_OFF, output: unknown): boolean;
  emit(event: LedEventsEnum.INTERVAL_ON, output: unknown): boolean;
  emit(event: LedEventsEnum.INTERVAL_OFF, output: unknown): boolean;
}
