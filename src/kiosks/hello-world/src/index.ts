/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { kioskBuilder } from 'alive-kiosk';
import { KioskType } from 'alive-kiosk/build/src/shared/infra/types/kiosk.type';
import StripLedsUtils from 'alive-kiosk/build/src/shared/utils/strip-leds.utils';
import VideoUtils from 'alive-kiosk/build/src/shared/utils/video.utils';
import { handleLoading } from './handler/leds.handler';
import { handleVideoEnd, handleVideoSelection } from './handler/video.handler';
import { ButtonTypeEnum } from 'alive-kiosk/build/src/shared/enums/button-type.enum';
import { handleLanguageSelection } from './handler/language.handler';
import LanguageUtils from 'alive-kiosk/build/src/shared/utils/language.utils';
import { handleIdle } from './handler/idle.handler';
import IdleUtils from 'alive-kiosk/build/src/shared/utils/idle.utils';
import { VideoStateEnum } from 'alive-kiosk/build/src/shared/enums/video-state.enum';

let kiosk: KioskType;
let ledUtils: StripLedsUtils;
let videoUtils: VideoUtils;
let languageUtils: LanguageUtils;
let idleUtils: IdleUtils;
let idleTimeout: NodeJS.Timeout;

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
    idleUtils = new IdleUtils(win);
    /**
     * start kiosk in idle mode
     */
    handleIdle(idleUtils, videoUtils);
    idleTimeout = setTimeout(() => {
      handleIdle(idleUtils, videoUtils);
    }, kiosk.config.base?.idleTimeout || 60 * 1000);

    kiosk.buttons?.on(
      'both',
      (output: { gpioNumber: number; value: number; type: ButtonTypeEnum }) => {
        idleTimeout.refresh();
        console.log(
          `Botão do GPIO: ${output.gpioNumber} - Valor: ${output.value}`,
        );

        handleLoading(kiosk, output, ledUtils, () => {
          idleUtils.state = VideoStateEnum.PLAYING;
          switch (output.type) {
            case ButtonTypeEnum.VIDEO:
              handleVideoSelection(kiosk, output, videoUtils, win);
              break;
            case ButtonTypeEnum.LANGUAGE:
              handleLanguageSelection(output, languageUtils, videoUtils, win);
              break;
          }
        });
      },
    );

    ipcMain.on('videoHasEnded', (evt, _) => {
      console.log('Video has ended');
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

  await app.whenReady();
  await createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};

init();
