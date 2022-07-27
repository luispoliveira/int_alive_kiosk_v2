/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
// import { kioskBuilder } from 'alive-kiosk';
// import { IKiosk } from 'alive-kiosk/build/src/shared/infra/kioskBuilder';

// let kiosk: IKiosk;

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
    //..
  });

  win.webContents.on('render-process-gone', (e, details) => {
    app.relaunch();
    app.quit();
  });
};

const init = async () => {
  // TODO: Remove kiosk variable from global...
  // By adding kioskbuilder here (before was on win creation), there is a huge decrease of segmentation fault and other types of error
  // kiosk = await kioskBuilder(__dirname);
  await app.whenReady();
  await createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};

init();
