import { ButtonEvents } from '../../Modules/Button/infra/events/button.events';
import { LedEvents } from '../../Modules/Led/infra/events/led.events';
import { ConfigApi } from '../config/config.api';
import { KioskType } from './types/kiosk.type';

export const kioskBuilder = async (rootPath: string): Promise<KioskType> => {
  const configApi = new ConfigApi();
  await configApi.set(`${rootPath}/config/config.json`);

  const config = configApi.get();
  if (!config)
    throw new Error('config.json was not loaded. Make sure it exists');

  const kiosk: KioskType = {
    config,
  };

  if (config.buttons) {
    const buttonEvents = new ButtonEvents();
    buttonEvents.start(config.buttons);
    kiosk.buttons = buttonEvents;
  }

  if (config.leds) {
    const ledEvents = new LedEvents();
    ledEvents.start(config.leds);
    kiosk.leds = ledEvents;
  }

  console.info(
    `Alive Kiosk started with:`,
    Object.keys(kiosk)
      .map((key) => key)
      .join(' '),
  );

  return kiosk;
};
