import { ButtonEventsInterface } from '../../../Modules/Button/infra/events/interfaces/button.events.interface';
import { LedEventsInterface } from '../../../Modules/Led/infra/events/interfaces/led.events.interface';
import { LoggerEventsInterface } from '../../../Modules/Logger/infra/events/interfaces/logger.events.interface';
import { ConfigInterface } from '../../domain/interfaces';

export type KioskType = {
  config: ConfigInterface;
  logger?: LoggerEventsInterface;
  buttons?: ButtonEventsInterface;
  leds?: LedEventsInterface;
};
