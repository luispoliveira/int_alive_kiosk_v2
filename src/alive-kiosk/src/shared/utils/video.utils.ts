import { VideoInterface } from '../domain/interfaces/video.interface';
import { LanguagesEnum } from '../enums/languages.enum';
import { KioskType } from '../infra/types/kiosk.type';

export default class VideoUtils {
  kiosk: KioskType;
  videos: VideoInterface | undefined;
  currentLanguage: LanguagesEnum = LanguagesEnum.PT;
  currentVideoId = '1';

  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
    this.changeLanguage(
      this.kiosk.config.base?.defaultLanguage || LanguagesEnum.PT,
    );
  }

  setVideos(videos: VideoInterface) {
    this.videos = videos;
  }

  changeLanguage(language: LanguagesEnum) {
    this.currentLanguage = language;
    const videos = this.kiosk.config.videos;
    if (!videos) return;
    const languageVideos = videos[language];
    if (!languageVideos) return;
    this.setVideos(languageVideos);
    console.log("🚀 ~ file: video.utils.ts ~ line 29 ~ VideoUtils ~ changeLanguage ~ languageVideos", languageVideos)
  }

  getIdleVideoPath() {
    if (!this.videos) return null;
    return this.videos.idle.path;
  }

  getVideoPath(videoId: string) {
    console.log(
      '🚀 ~ file: video.utils.ts ~ line 37 ~ VideoUtils ~ getVideoPath ~ this.videos',
      this.videos,
    );
    this.currentVideoId = videoId;
    if (!this.videos) return null;
    return this.videos[videoId].path;
  }
}
