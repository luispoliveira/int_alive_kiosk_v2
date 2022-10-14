import { ButtonOptionsInterface } from '../../../../../shared/domain/interfaces/button.interface';
import { ButtonTypeEnum } from '../../../../../shared/enums/button-type.enum';
import { ButtonEventsEnum } from '../enums/button-events.enum';

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
