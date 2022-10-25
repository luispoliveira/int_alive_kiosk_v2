import { LoggerInterface } from '../../../../../shared/domain/interfaces';
import { LoggerEventsEnum } from '../../../../../shared/enums';

export interface LoggerEventsInterface {
  start: (config: LoggerInterface) => void;

  on(
    event: LoggerEventsEnum.FATAL,
    listener: (output: { message: string }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.ERROR,
    listener: (output: { message: string }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.WARN,
    listener: (output: { message: string }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.INFO,
    listener: (output: { message: string }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.DEBUG,
    listener: (output: { message: string }) => void,
  ): this;

  emit(event: LoggerEventsEnum.FATAL, output: unknown): boolean;
  emit(event: LoggerEventsEnum.ERROR, output: unknown): boolean;
  emit(event: LoggerEventsEnum.WARN, output: unknown): boolean;
  emit(event: LoggerEventsEnum.DEBUG, output: unknown): boolean;
  emit(event: LoggerEventsEnum.INFO, output: unknown): boolean;
}
