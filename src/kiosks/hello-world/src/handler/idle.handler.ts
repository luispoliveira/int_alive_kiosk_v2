import { IpcRendererChannelEnum } from 'alive-kiosk/build/src/shared/enums/ipc-renderer-channel.enum';
import IdleUtils from 'alive-kiosk/build/src/shared/utils/idle.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import { BrowserWindow } from 'electron';

export const handleIdle = (
  idleUtils: IdleUtils,
  videoUtils: VideoUtils,
  win: BrowserWindow,
) => {
  const videoPath = videoUtils.getIdleVideoPath();
  if (videoPath) {
    idleUtils.setIdle();
    win.webContents.send(IpcRendererChannelEnum.PlayVideo, {
      videoPath: videoPath,
    });
  }
};
