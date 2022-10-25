import { LoggerInterface } from '../../../../../shared/domain/interfaces';
import { LoggerEventsEnum } from '../../../../../shared/enums';

export interface LoggerEventsInterface {
  start: (config: LoggerInterface) => void;

  on(
    event: LoggerEventsEnum.FATAL,
    listener: (output: { format: any; params: any[] }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.ERROR,
    listener: (output: { format: any; params: any[] }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.WARN,
    listener: (output: { format: any; params: any[] }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.INFO,
    listener: (output: { format: any; params: any[] }) => void,
  ): this;
  on(
    event: LoggerEventsEnum.DEBUG,
    listener: (output: { format: any; params: any[] }) => void,
  ): this;

  emit(event: LoggerEventsEnum.FATAL, output: unknown): boolean;
  emit(event: LoggerEventsEnum.ERROR, output: unknown): boolean;
  emit(event: LoggerEventsEnum.WARN, output: unknown): boolean;
  emit(event: LoggerEventsEnum.DEBUG, output: unknown): boolean;
  emit(event: LoggerEventsEnum.INFO, output: unknown): boolean;
}
