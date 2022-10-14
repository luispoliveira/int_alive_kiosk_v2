import { IpcRendererChannelEnum } from '../enums/ipc-renderer-channel.enum';
import { VideoStateEnum } from '../enums/video-state.enum';
import { KioskType } from '../infra/types/kiosk.type';

export default class IdleUtils {
  state: VideoStateEnum | null = null;
  kiosk: KioskType;
  idleVideoCount = 1;

  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  increateIdleVideoCount() {
    this.idleVideoCount++;
  }

  resetIdleVideoCount() {
    this.idleVideoCount = 1;
  }

  runIdle(): boolean {
    if (this.state === VideoStateEnum.IDLE) return false;
    if (!this.kiosk.config.base?.idleVideoNumber) return false;
    return this.idleVideoCount === this.kiosk.config.base?.idleVideoNumber;
  }

  setIdle() {
    if (this.state === VideoStateEnum.IDLE) return;
    this.state = VideoStateEnum.IDLE;
    this.idleVideoCount = 1;
  }
}
