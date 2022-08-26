import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import LanguageUtils from 'alive-kiosk/build/src/shared/utils/language.utils';
import { BrowserWindow } from 'electron';

export const handleLanguageSelection = (
  output: { gpioNumber: number; value: number },
  languageUtils: LanguageUtils,
  videoUtils: VideoUtils,
  win: BrowserWindow,
) => {
  if (output.value === 0) return;

  const language = languageUtils.changeLanguage();
  videoUtils.changeLanguage(language);
  const videoPath = videoUtils.getVideoPath(videoUtils.currentVideoId);
  if (videoPath) {
    console.log('🚀 ~ file: video.handler.ts ~ line 22 ~ videoPath', videoPath);
    win.webContents.send('playVideo', {
      videoPath: videoPath,
    });
  }
};
