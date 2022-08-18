import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import { BrowserWindow } from 'electron';

export const handleLanguageSelection = (
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

  if (connection && connection.language) {
    videoUtils.changeLanguage(connection.language);
    const videoPath = videoUtils.getVideoPath(videoUtils.currentVideoId);
    //reset do video
    if (videoPath) {
      win.webContents.send('playVideo', videoPath);
    }
  }
};
