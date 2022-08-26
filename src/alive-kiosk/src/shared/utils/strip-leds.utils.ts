import { LedStateEnum } from '../enums/led-state.enum';
import { LoadingStateEnum } from '../enums/loading-state.enum';
import { KioskType } from '../infra/types/kiosk.type';
import { sleep } from './sleep';

export default class StripLedsUtils {
  kiosk: KioskType;
  stripLeds: { gpioNumber: number; ledsNumbers: number[] } | undefined;
  loadingState: LoadingStateEnum = LoadingStateEnum.DONE;
  toRun = false;
  isBlocked = false;
  indexCount = 0;

  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  setLoadingStripLeds(stripLeds: {
    gpioNumber: number;
    ledsNumbers: number[];
  }) {
    this.stripLeds = stripLeds;
  }

  unsetLoadingStripLeds() {
    this.stripLeds = undefined;
  }

  async startLoading(done: () => void | null) {
    if (!this.stripLeds) return;
    this.isBlocked = true;
    this.toRun = true;
    this.loadingState = LoadingStateEnum.LOADING;
    this.changeStripState(LedStateEnum.OFF);
    const loadingTime = this.kiosk.config.base?.loadingTime || 1000;
    const sleepTime = Math.floor(
      loadingTime / this.stripLeds.ledsNumbers.length,
    );
    while (this.toRun) {
      this.runLoading(done);
      await sleep(sleepTime);
    }
  }

  stopLoading() {
    this.changeStripState(LedStateEnum.OFF);
    this.toRun = false;
    this.indexCount = 0;
    this.isBlocked = false;
    this.unsetLoadingStripLeds();
  }

  async runLoading(done: () => void | null) {
    if (!this.stripLeds) return;
    try {
      if (this.loadingState === LoadingStateEnum.DONE) return;
      if (this.indexCount === this.stripLeds.ledsNumbers.length) {
        this.loadingState = LoadingStateEnum.DONE;
        this.changeStripState(LedStateEnum.OFF);
        await sleep(250);
        if (done) {
          done();
        }
        this.changeStripState(LedStateEnum.ON);
        await sleep(1000);
        this.changeStripState(LedStateEnum.OFF);
        this.stopLoading();
        return;
      }
      const led = this.stripLeds.ledsNumbers[this.indexCount];
      if (led === undefined) return; //está === undefined para não apanhar no caso em que o led é 0
      this.changeLedState(led, LedStateEnum.ON);
      this.indexCount++;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  changeStripState(state: LedStateEnum, color = 0xffffff) {
    if (!this.stripLeds) return;

    switch (state) {
      case LedStateEnum.ON:
        this.kiosk.leds?.emit('intervalOn', {
          gpioPin: this.stripLeds.gpioNumber,
          from: this.stripLeds.ledsNumbers[0],
          to: this.stripLeds.ledsNumbers[this.stripLeds.ledsNumbers.length - 1],
          color,
        });
        return;
      case LedStateEnum.OFF:
        this.kiosk.leds?.emit('intervalOff', {
          gpioPin: this.stripLeds.gpioNumber,
          from: this.stripLeds.ledsNumbers[0],
          to: this.stripLeds.ledsNumbers[this.stripLeds.ledsNumbers.length - 1],
        });
        return;
    }
  }

  changeLedState(ledNumber: number, state: LedStateEnum, color = 0xffffff) {
    if (!this.stripLeds) return;

    switch (state) {
      case LedStateEnum.ON:
        this.kiosk.leds?.emit('on', {
          gpioPin: this.stripLeds.gpioNumber,
          ledNumber: ledNumber,
          color,
        });
        return;
      case LedStateEnum.OFF:
        this.kiosk.leds?.emit('off', {
          gpioPin: this.stripLeds.gpioNumber,
          ledNumber: ledNumber,
        });
        return;
    }
  }
}
