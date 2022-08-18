import { EventEmitter } from 'events';
import { LedOptionsInterface } from '../../../../shared/domain/interfaces/led.interface';
import { SocketIoService } from '../../services/socket-io.service';
import { LedEventsInterface } from './interfaces/led.events.interface';

export class LedEvents extends EventEmitter implements LedEventsInterface {
  socketIoService: SocketIoService;

  constructor() {
    super();
    this.socketIoService = new SocketIoService();
  }
  start(config: LedOptionsInterface): void {
    try {
      for (const address of config.addresses) {
        this.socketIoService.newStrip(address);
      }

      this.on(
        'on',
        (output: { gpioPin: number; ledNumber: number; color: number }) => {
          this.socketIoService?.turnLedOn(
            output.gpioPin,
            output.ledNumber,
            output.color,
          );
        },
      );

      this.on('off', (output: { gpioPin: number; ledNumber: number }) => {
        this.socketIoService?.turnLedOff(output.gpioPin, output.ledNumber);
      });

      this.on('allOn', (output: { gpioPin: number; color: number }) => {
        this.socketIoService?.turnAllOn(output.gpioPin, output.color);
      });

      this.on('allOff', (output: { gpioPin: number }) => {
        this.socketIoService?.turnAllOff(output.gpioPin);
      });

      this.on(
        'intervalOn',
        (output: {
          gpioPin: number;
          from: number;
          to: number;
          color: number;
        }) => {
          this.socketIoService?.turnIntervalOn(
            output.gpioPin,
            output.from,
            output.to,
            output.color,
          );
        },
      );

      this.on(
        'intervalOff',
        (output: { gpioPin: number; from: number; to: number }) => {
          this.socketIoService?.turnIntervalOff(
            output.gpioPin,
            output.from,
            output.to,
          );
        },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
