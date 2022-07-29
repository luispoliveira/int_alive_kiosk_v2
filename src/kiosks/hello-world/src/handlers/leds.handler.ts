import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import { LedUtils } from '../utils/leds.utils';

export const handleLoading = (
  kiosk: KioskType,
  output: { gpioNumber: number; value: number },
  ledUtils: LedUtils,
) => {
  const connection = getConnectionForButton(
    kiosk.config.connections || [],
    output.gpioNumber,
  );

  if (connection) {
    if (output.value === 1) {
      if (ledUtils.blocked) return;
      ledUtils.setLoadingLeds(connection.leds || []);
      ledUtils.startLoading();
    } else {
      ledUtils.stopLoading();
    }
  }
};
