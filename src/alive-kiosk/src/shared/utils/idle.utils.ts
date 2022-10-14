import { IpcRendererChannelEnum } from '../enums/ipc-renderer-channel.enum';
import { VideoStateEnum } from '../enums/video-state.enum';

export default class IdleUtils {
  state: VideoStateEnum | null = null;
  win: any;

  constructor(win: any) {
    this.win = win;
  }

  setIdle(idleVideoPath: string) {
    if (this.state === VideoStateEnum.IDLE) return;
    this.state = VideoStateEnum.IDLE;
    this.win.webContents.send(IpcRendererChannelEnum.PlayVideo, {
      videoPath: idleVideoPath,
    });
  }
}
