import { ipcRenderer } from 'electron';
import { IpcRendererChannelEnum } from 'alive-kiosk/build/src/shared/enums/ipc-renderer-channel.enum';

const video: any = document.createElement('video');

const init = () => {
  video.autoplay = true;
  video.type = 'video/mp4';
  video.onended = () => {
    ipcRenderer.send(IpcRendererChannelEnum.VideoHasEnded, undefined);
  };

  const container = document.querySelector(`#container`);
  if (container) {
    container.appendChild(video);
  }
};

init();

ipcRenderer.on(
  IpcRendererChannelEnum.PlayVideo,
  (e, params: { videoPath: string; timestamp?: number }) => {
    video.src = params.videoPath;
    video.currentTime = params.timestamp || 0;
    video.play();
  },
);
