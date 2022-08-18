import { ButtonOptionsInterface } from '../../../../../shared/domain/interfaces/button.interface';
import { ButtonTypeEnum } from '../../../../../shared/enums/button-type.enum';

export declare interface ButtonEventsInterface {
  start: (config: ButtonOptionsInterface) => void;
  on(
    event: 'rising',
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  on(
    event: 'falling',
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  on(
    event: 'both',
    listener: (output: {
      gpioNumber: number;
      value: number;
      type: ButtonTypeEnum;
    }) => void,
  ): this;
  emit(event: 'rising', output: unknown): boolean;
  emit(event: 'falling', output: unknown): boolean;
  emit(event: 'both', output: unknown): boolean;
}
