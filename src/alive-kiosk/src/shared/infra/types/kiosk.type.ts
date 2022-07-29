import { ButtonEventsInterface } from '../../../Modules/Button/infra/events/interfaces/button.events.interface';
import { LedEventsInterface } from '../../../Modules/Led/infra/events/interfaces/led.events.interface';
import { ConfigInterface } from '../../domain/interfaces/config.interface';

export type KioskType = {
  config: ConfigInterface;
  buttons?: ButtonEventsInterface;
  leds?: LedEventsInterface;
};
