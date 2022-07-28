import { EventEmitter } from 'events';
import { ButtonOptionsInterface } from '../../../../shared/domain/interfaces/button.interface';
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

    for (const address of addresses) {
      const gpioOnOffService = new GpioOnOffService(address);

      gpioOnOffService.gpioButton.watch((err, value) => {
        switch (gpioOnOffService.gpioEdge) {
          case 'rising':
            console.log(`Button Rising ${address.gpioPin} is ${value}`);
            this.emit('rising', gpioOnOffService.gpioPin);
            break;
          case 'both':
            console.log(`Button Both ${address.gpioPin} is ${value}`);
            this.emit('rising', gpioOnOffService.gpioPin);
            break;
          case 'falling':
            console.log(`Button Falling ${address.gpioPin} is ${value}`);
            this.emit('rising', gpioOnOffService.gpioPin);
            break;
        }
      });

      process.on('SIGINT', () => {
        gpioOnOffService.unexport();
      });
    }
  }
}
