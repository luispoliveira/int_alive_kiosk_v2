import { ipcRenderer } from 'electron';

const video: any = document.createElement('video');

const init = () => {
  video.autoplay = true;
  video.type = 'video/mp4';
  video.onended = () => {
    ipcRenderer.send('videoHasEnded', undefined);
  };

  const container = document.querySelector(`#container`);
  if (container) {
    container.appendChild(video);
  }
};

init();

ipcRenderer.on(
  'playVideo',
  (e, params: { videoPath: string; timestamp?: number }) => {
    video.src = params.videoPath;
    video.currentTime = params.timestamp || 0;
    video.play();
  },
);
