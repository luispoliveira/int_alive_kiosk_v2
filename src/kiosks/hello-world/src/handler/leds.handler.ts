import { KioskType } from 'alive-kiosk/src/shared/infra/types/kiosk.type';
import { getConnectionForButton } from 'alive-kiosk/src/shared/utils/config-connections.utils';
import StripLedsUtils from 'alive-kiosk/src/shared/utils/strip-leds.utils';

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
