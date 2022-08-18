import { KioskType } from '../infra/types/kiosk.type';

export default class VideoUtils {
  kiosk: KioskType;

  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
  }

  getIdleVideoPath(language: string) {
    const videos = this.kiosk.config.videos;
    if (!videos) return null;
    const languageConfig = videos[language];
    if (!languageConfig) return null;
    return languageConfig.idle.path;
  }

  getVideoPath(language: string, videoId: string) {
    const videos = this.kiosk.config.videos;
    if (!videos) return null;
    const languageConfig = videos[language];
    if (!languageConfig) return null;
    return languageConfig[videoId].path;
  }
}
