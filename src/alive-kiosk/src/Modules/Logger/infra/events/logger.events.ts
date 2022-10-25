import { EventEmitter } from 'events';
import { LoggerInterface } from '../../../../shared/domain/interfaces';
import { LoggerEventsEnum, LoggerModeEnum } from '../../../../shared/enums';
import { BunyanService } from '../../services/bunyan.service';
import { LoggerEventsInterface } from './interfaces/logger.events.interface';

export class LoggerEvents
  extends EventEmitter
  implements LoggerEventsInterface
{
  bunyanService: BunyanService | undefined;
  constructor() {
    super();
  }

  start(config?: LoggerInterface) {
    this.bunyanService = new BunyanService();

    this.on(LoggerEventsEnum.FATAL, (output: { message: string }) => {
      this.bunyanService?.fatal(output.message);
    });

    this.on(LoggerEventsEnum.ERROR, (output: { message: string }) => {
      this.bunyanService?.error(output.message);
    });

    this.on(LoggerEventsEnum.WARN, (output: { message: string }) => {
      this.bunyanService?.warn(output.message);
    });

    this.on(LoggerEventsEnum.INFO, (output: { message: string }) => {
      if (
        config?.kioskLoggerMode === LoggerModeEnum.DEBUG ||
        config?.kioskLoggerMode === LoggerModeEnum.INFO
      )
        this.bunyanService?.info(output.message);
    });

    this.on(LoggerEventsEnum.DEBUG, (output: { message: string }) => {
      if (config?.kioskLoggerMode === LoggerModeEnum.DEBUG)
        this.bunyanService?.debug(output.message);
    });
  }
}
