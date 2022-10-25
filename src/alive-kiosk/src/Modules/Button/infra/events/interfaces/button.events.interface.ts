import { ButtonOptionsInterface } from '../../../../../shared/domain/interfaces';
import { ButtonEventsEnum, ButtonTypeEnum } from '../../../../../shared/enums';

export declare interface ButtonEventsInterface {
  start: (config: ButtonOptionsInterface) => void;
  on(
    event: ButtonEventsEnum.RISING,
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  on(
    event: ButtonEventsEnum.FALLING,
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  on(
    event: ButtonEventsEnum.BOTH,
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  emit(event: ButtonEventsEnum.RISING, output: unknown): boolean;
  emit(event: ButtonEventsEnum.FALLING, output: unknown): boolean;
  emit(event: ButtonEventsEnum.BOTH, output: unknown): boolean;
}
