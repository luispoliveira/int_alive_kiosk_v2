/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { kioskBuilder } from 'alive-kiosk';
import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { LedUtils } from './utils/leds.utils';
import { getConnectionForButton } from 'alive-kiosk/build/src/shared/utils/config-connections.utils';
import { handleLoading } from './handlers/leds.handler';

let kiosk: KioskType;
let ledUtils: LedUtils;

const createWindow = async () => {
  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    show: true,
    transparent: false,
    backgroundColor: '#000000000000',
    webPreferences: {
      webSecurity: false,
      webgl: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(join(__dirname, './index.html'));
  win.once('ready-to-show', () => win.show());

  // win.webContents.openDevTools();
  // console.warn(app.getGPUFeatureStatus());

  win.webContents.on('did-finish-load', async () => {
    kiosk.buttons?.on(
      'both',
      (output: { gpioNumber: number; value: number }) => {
        console.log(
          `Botão do GPIO: ${output.gpioNumber} - Valor: ${output.value}`,
        );
        handleLoading(kiosk, output, ledUtils);
      },
    );
  });

  win.webContents.on('render-process-gone', (e, details) => {
    app.relaunch();
    app.quit();
  });
};

const init = async () => {
  // TODO: Remove kiosk variable from global...
  // By adding kioskbuilder here (before was on win creation), there is a huge decrease of segmentation fault and other types of error
  kiosk = await kioskBuilder(__dirname);

  ledUtils = new LedUtils(kiosk);
  await app.whenReady();
  await createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};

init();
