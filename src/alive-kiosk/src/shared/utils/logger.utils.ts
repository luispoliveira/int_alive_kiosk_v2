import { LoggerEventsEnum } from '../enums';
import { KioskType } from '../infra/types/kiosk.type';

export class LoggerUtils {
  kiosk: KioskType;
  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  fatal(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.FATAL, { message });
  }

  error(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.ERROR, { message });
  }

  warn(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.WARN, { message });
  }

  info(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.INFO, { message });
  }

  debug(message: string) {
    this.kiosk?.logger?.emit(LoggerEventsEnum.DEBUG, { message });
  }
}
