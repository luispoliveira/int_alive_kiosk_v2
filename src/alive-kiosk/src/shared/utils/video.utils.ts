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
  }

  getIdleVideoPath() {
    if (!this.videos) return null;
    return this.videos.idle.path;
  }

  getVideoPath(videoId: string) {
    this.currentVideoId = videoId;
    if (!this.videos) return null;
    return this.videos[videoId].path;
  }

  getNextVideoId() {
    if (!this.videos) return null;
    const videoIds = Object.keys(this.videos);
    videoIds.splice(videoIds.indexOf('idle'), 1);
    console.log(
      '🚀 ~ file: video.utils.ts ~ line 45 ~ VideoUtils ~ getNextVideoId ~ videoIds',
      videoIds,
    );
    const currentIndex = videoIds.indexOf(this.currentVideoId);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= videoIds.length) {
      return videoIds[0];
    }
    return videoIds[nextIndex];
  }
}
