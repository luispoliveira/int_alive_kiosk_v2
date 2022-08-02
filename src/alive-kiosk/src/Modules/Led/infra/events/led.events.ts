import { EventEmitter } from 'events';
import { LedOptionsInterface } from '../../../../shared/domain/interfaces/led.interface';
import { GpioOnOffService } from '../../services/gpio.service';
import { LedEventsInterface } from './interfaces/led.events.interface';

export class LedEvents extends EventEmitter implements LedEventsInterface {
  leds: GpioOnOffService[] = [];

  constructor() {
    super();
  }
  start(config: LedOptionsInterface): void {
    try {
      const addresses = config.addresses;
      for (const address of addresses) {
        const gpioOnOffService = new GpioOnOffService(address);
        this.leds.push(gpioOnOffService);
      }

      this.on('on', (gpioPin: number) => {
        this.leds.find((led) => led.gpioPin === gpioPin)?.turnLedOn();
      });

      this.on('off', (gpioPin: number) => {
        this.leds.find((led) => led.gpioPin === gpioPin)?.turnLedOff();
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
