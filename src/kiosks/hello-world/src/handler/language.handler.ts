import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import LanguageUtils from 'alive-kiosk/build/src/shared/utils/language.utils';
import { BrowserWindow } from 'electron';
import { IpcRendererChannelEnum } from 'alive-kiosk/build/src/shared/enums/ipc-renderer-channel.enum';
import IdleUtils from 'alive-kiosk/build/src/shared/utils/idle.utils';

export const handleLanguageSelection = (
  output: { gpioNumber: number; value: number },
  languageUtils: LanguageUtils,
  videoUtils: VideoUtils,
  win: BrowserWindow,
  idleUtils: IdleUtils,
) => {
  if (output.value === 0) return;

  const language = languageUtils.changeLanguage();
  videoUtils.changeLanguage(language);
  const videoPath = videoUtils.getVideoPath(videoUtils.currentVideoId);
  idleUtils.resetIdleVideoCount();
  if (videoPath) {
    console.log('🚀 ~ file: video.handler.ts ~ line 22 ~ videoPath', videoPath);
    win.webContents.send(IpcRendererChannelEnum.PlayVideo, {
      videoPath: videoPath,
    });
  }
};
