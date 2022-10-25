/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { kioskBuilder } from 'alive-kiosk';
import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import { handleLoading } from './handler/leds.handler';
import { handleVideoEnd, handleVideoSelection } from './handler/video.handler';
import { handleLanguageSelection } from './handler/language.handler';
import { handleIdle } from './handler/idle.handler';
import {
  ButtonEventsEnum,
  ButtonTypeEnum,
  IpcRendererChannelEnum,
  LoggerEventsEnum,
  VideoStateEnum,
} from 'alive-kiosk/build/src/shared/enums/index';
import {
  StripLedsUtils,
  VideoUtils,
  LanguageUtils,
  LoggerUtils,
  IdleUtils,
} from 'alive-kiosk/build/src/shared/utils/index';

let kiosk: KioskType;
let loggerUtils: LoggerUtils;
let ledUtils: StripLedsUtils;
let videoUtils: VideoUtils;
let languageUtils: LanguageUtils;
let idleUtils: IdleUtils;

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

  win.webContents.openDevTools();
  // console.warn(app.getGPUFeatureStatus());

  win.webContents.on('did-finish-load', async () => {
    /**
     * start kiosk in idle mode
     */
    handleIdle(idleUtils, videoUtils, win);

    kiosk.buttons?.on(
      ButtonEventsEnum.BOTH,
      (output: { gpioNumber: number; value: number; type: ButtonTypeEnum }) => {
        loggerUtils.debug(
          `Botão do GPIO: ${output.gpioNumber} - Valor: ${output.value}`,
        );

        handleLoading(kiosk, output, ledUtils, () => {
          idleUtils.state = VideoStateEnum.PLAYING;
          switch (output.type) {
            case ButtonTypeEnum.VIDEO:
              handleVideoSelection(kiosk, output, videoUtils, win, idleUtils);
              break;
            case ButtonTypeEnum.LANGUAGE:
              handleLanguageSelection(
                output,
                languageUtils,
                videoUtils,
                win,
                idleUtils,
              );
              break;
          }
        });
      },
    );

    ipcMain.on(IpcRendererChannelEnum.VideoHasEnded, (evt, _) => {
      handleVideoEnd(idleUtils, videoUtils, win);
    });
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
  ledUtils = new StripLedsUtils(kiosk);
  videoUtils = new VideoUtils(kiosk);
  languageUtils = new LanguageUtils(kiosk);
  loggerUtils = new LoggerUtils(kiosk);
  idleUtils = new IdleUtils(kiosk);

  await app.whenReady();
  await createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};

init();
