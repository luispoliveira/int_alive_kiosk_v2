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

    this.on(
      LoggerEventsEnum.FATAL,
      (output: { format: any; params: any[] }) => {
        console.log('Fatal');
        this.bunyanService?.fatal(output.format, ...output.params);
      },
    );

    this.on(
      LoggerEventsEnum.ERROR,
      (output: { format: any; params: any[] }) => {
        console.log('Error');
        this.bunyanService?.error(output.format, ...output.params);
      },
    );

    this.on(LoggerEventsEnum.WARN, (output: { format: any; params: any[] }) => {
      console.log('Warning');
      this.bunyanService?.warn(output.format, ...output.params);
    });

    this.on(LoggerEventsEnum.INFO, (output: { format: any; params: any[] }) => {
      if (
        config?.kioskLoggerMode === LoggerModeEnum.DEBUG ||
        config?.kioskLoggerMode === LoggerModeEnum.INFO
      )
        this.bunyanService?.info(output.format, ...output.params);
    });

    this.on(
      LoggerEventsEnum.DEBUG,
      (output: { format: any; params: any[] }) => {
        if (config?.kioskLoggerMode === LoggerModeEnum.DEBUG)
          this.bunyanService?.debug(output.format, ...output.params);
      },
    );
  }
}
