import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';

export const handleVideo = (
  kiosk: KioskType,
  currentLanguage: string,
  output: { gpioNumber: number; value: number },
  videoUtils: VideoUtils,
) => {
  if (output.value === 0) return;

  const connection = getConnectionForButton(
    kiosk.config.connections || [],
    output.gpioNumber,
  );

  if (connection && connection.video) {
    return videoUtils.getVideoPath(currentLanguage, connection.video);
  }
};
