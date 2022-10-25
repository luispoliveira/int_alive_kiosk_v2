import { EventEmitter } from 'events';
import { ButtonOptionsInterface } from '../../../../shared/domain/interfaces';
import { GpioOnOffService } from '../../services/gpio.service';
import { ButtonEventsInterface } from './interfaces/button.events.interface';

export class ButtonEvents
  extends EventEmitter
  implements ButtonEventsInterface
{
  constructor() {
    super();
  }
  start(config: ButtonOptionsInterface): void {
    const addresses = config.addresses;

    try {
      for (const address of addresses) {
        const gpioOnOffService = new GpioOnOffService(address);

        gpioOnOffService.gpio.watch((err, value) => {
          console.log(
            `Button ${gpioOnOffService.gpioEdge} ${address.gpioPin} is ${value}`,
          );
          this.emit(gpioOnOffService.gpioEdge, {
            gpioNumber: address.gpioPin,
            value,
            type: address.type,
          });
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
