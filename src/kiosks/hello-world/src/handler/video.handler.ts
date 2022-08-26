import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import { BrowserWindow } from 'electron';

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
