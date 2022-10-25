import { LoggerEventsEnum } from '../enums';
import { KioskType } from '../infra/types/kiosk.type';

export class LoggerUtils {
  kiosk: KioskType;
  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  fatal(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.FATAL, {
      format: message,
      params: [],
    });
  }

  error(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.ERROR, {
      format: message,
      params: [],
    });
  }

  warn(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.WARN, {
      format: message,
      params: [],
    });
  }

  info(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.INFO, {
      format: message,
      params: [],
    });
  }

  debug(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.DEBUG, {
      format: message,
      params: [],
    });
  }
}
