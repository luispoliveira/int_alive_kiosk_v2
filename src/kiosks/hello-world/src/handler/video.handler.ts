import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import { BrowserWindow } from 'electron';
import { VideoStateEnum } from 'alive-kiosk/build/src/shared/enums/video-state.enum';
import IdleUtils from 'alive-kiosk/build/src/shared/utils/idle.utils';

export const handleVideoSelection = (
  kiosk: KioskType,
  output: { gpioNumber: number; value: number },
  videoUtils: VideoUtils,
  win: BrowserWindow,
) => {
  if (output.value === 0) return;
  const connection = getConnectionForButton(
    kiosk.config.connections || [],
    output.gpioNumber,
  );
  console.log('🚀 ~ file: video.handler.ts ~ line 18 ~ connection', connection);

  if (connection && connection.video) {
    const videoPath = videoUtils.getVideoPath(connection.video.id);
    if (videoPath) {
      console.log(
        '🚀 ~ file: video.handler.ts ~ line 22 ~ videoPath',
        videoPath,
      );
      win.webContents.send('playVideo', {
        videoPath: videoPath,
        timestamp: connection.video.timestamp,
      });
    }
  }
};

export const handleVideoEnd = (
  idleUtils: IdleUtils,
  videoUtils: VideoUtils,
  win: BrowserWindow,
) => {
  if (idleUtils.state === VideoStateEnum.IDLE) {
    const videoPath = videoUtils.getIdleVideoPath();
    if (videoPath) {
      win.webContents.send('playVideo', {
        videoPath: videoPath,
        timestamp: 0,
      });
    }
  }

  if (idleUtils.state === VideoStateEnum.PLAYING) {
    const nextVideoId = videoUtils.getNextVideoId();
    if (nextVideoId) {
      const videoPath = videoUtils.getVideoPath(nextVideoId);
      if (videoPath) {
        idleUtils.state = VideoStateEnum.PLAYING;
        win.webContents.send('playVideo', {
          videoPath: videoPath,
          timestamp: 0,
        });
      }
    }
  }
};
