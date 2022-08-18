import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import StripLedsUtils from 'alive-kiosk/build/src/shared/utils/strip-leds.utils';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';

export const handleLoading = (
  kiosk: KioskType,
  output: { gpioNumber: number; value: number },
  ledUtils: StripLedsUtils,
  done: () => void | null,
) => {
  const connection = getConnectionForButton(
    kiosk.config.connections || [],
    output.gpioNumber,
  );

  if (connection && connection.stripLeds) {
    if (output.value === 1) {
      if (ledUtils.isBlocked) return;
      ledUtils.setLoadingStripLeds(connection.stripLeds);
      ledUtils.startLoading(done);
    } else {
      ledUtils.stopLoading();
    }
  }
};
