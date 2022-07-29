import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { sleep } from './sleep';

export class LedUtils {
  leds: number[] = [];
  loadingState = 'done';
  indexCount = 0;
  toRun = false;
  kiosk: KioskType;
  blocked = false;
  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  setLoadingLeds(leds: number[]) {
    this.leds = leds;
  }

  unsetLoadingLeds() {
    this.leds = [];
  }

  async startLoading() {
    this.blocked = true;
    this.toRun = true;
    this.loadingState = 'loading';
    this.changeState(this.leds, 0);
    while (this.toRun) {
      this.runLoading();
      await sleep(250);
    }
  }

  stopLoading() {
    this.toRun = false;
    this.indexCount = 0;
    this.blocked = false;
    this.changeState(this.leds, 0);
    this.leds = [];
  }

  async runLoading() {
    try {
      if (this.loadingState === 'done') return;
      if (this.indexCount === this.leds.length) {
        this.loadingState = 'done';
        this.changeState(this.leds, 0);
        await sleep(250);
        this.changeState(this.leds, 1);
        await sleep(1500);
        this.changeState(this.leds, 0);
        this.stopLoading();
        return;
      }
      const led = this.leds[this.indexCount];
      this.kiosk.leds?.emit('on', led);
      this.indexCount++;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  changeState(leds: number[], state: number) {
    leds.forEach((led) => {
      switch (state) {
        case 0:
          this.kiosk.leds?.emit('off', led);
          break;
        case 1:
          this.kiosk.leds?.emit('on', led);
          break;
      }
    });
  }
}
