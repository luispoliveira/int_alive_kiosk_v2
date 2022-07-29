import { BinaryValue, Edge, Gpio, Options } from 'onoff';

export class Led {
  public gpio: Gpio;
  constructor(gpioPin: number, gpioEdge?: Edge, gpioOptions?: Options) {
    this.gpio = new Gpio(gpioPin, 'out', gpioEdge, gpioOptions);
  }
}

export class LedUtils {
  public static changeState(leds: Led[], value: BinaryValue) {
    leds.forEach((led) => {
      led.gpio.writeSync(value);
    });
  }
}
