import IdleUtils from 'alive-kiosk/build/src/shared/utils/idle.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';

export const handleIdle = (idleUtils: IdleUtils, videoUtils: VideoUtils) => {
  const videoPath = videoUtils.getIdleVideoPath();
  console.log("🚀 ~ file: idle.handler.ts ~ line 6 ~ handleIdle ~ videoPath", videoPath)
  if (videoPath) {
    idleUtils.setIdle(videoPath);
  }
};
