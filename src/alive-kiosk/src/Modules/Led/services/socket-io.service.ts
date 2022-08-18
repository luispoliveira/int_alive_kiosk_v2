import { io, Socket } from 'socket.io-client';
import { LedInterface } from '../../../shared/domain/interfaces/led.interface';
export class SocketIoService {
  socket: Socket;

  constructor() {
    try {
      this.socket = io('ws://localhost:3000');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  newStrip(config: LedInterface): void {
    this.socket.emit('new-strip', config);
  }

  turnLedOn(gpioPin: number, ledNumber: number, color: number): void {
    this.socket.emit('on', { gpioPin, ledNumber, color });
  }

  turnLedOff(gpioPin: number, ledNumber: number): void {
    this.socket.emit('off', { gpioPin, ledNumber });
  }

  turnAllOn(gpioPin: number, color: number): void {
    this.socket.emit('allOn', { gpioPin, color });
  }

  turnAllOff(gpioPin: number): void {
    this.socket.emit('allOff', { gpioPin });
  }

  turnIntervalOn(
    gpioPin: number,
    from: number,
    to: number,
    color: number,
  ): void {
    this.socket.emit('intervalOn', { gpioPin, from, to, color });
  }

  turnIntervalOff(gpioPin: number, from: number, to: number): void {
    this.socket.emit('intervalOff', { gpioPin, from, to });
  }
}
