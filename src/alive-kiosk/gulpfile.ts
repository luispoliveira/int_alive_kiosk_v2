import { gulpConfig } from '../../gulp.config';
import { dest, parallel, series, src, watch } from 'gulp';
import run from 'gulp-run-command';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GulpSSH = require('gulp-ssh');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require('del');

const SSH = new GulpSSH(gulpConfig.ssh);

const projectPath = `/home/${gulpConfig.ssh.sshConfig.username}/${gulpConfig.projectName}/alive-kiosk`;
const projectPathWebSocket = `/home/${gulpConfig.ssh.sshConfig.username}/web-sockets/alive-kiosk`;

export const cleanupLocal = () => del(['./build/']);
export const cleanupRemote = () => SSH.exec([`rm -rf ${projectPath}/build`]);
export const cleanupRemoteWebSocket = () =>
  SSH.exec([`rm -rf ${projectPathWebSocket}/build`]);

export const cleanup = parallel(
  cleanupLocal,
  cleanupRemote,
  cleanupRemoteWebSocket,
);

const build = async () => run('npm run build')();

const deployAliveKioskBuild = () =>
  src(['./build*/**', 'package.json']).pipe(SSH.dest(`${projectPath}`));

const deployAliveKioskBuildWebSocket = () =>
  src(['./build*/**', 'package.json']).pipe(
    SSH.dest(`${projectPathWebSocket}`),
  );

export const deploy = parallel(
  deployAliveKioskBuild,
  deployAliveKioskBuildWebSocket,
);

// const cpAruco = () =>
//   src(['./src/Modules/Camera/services/qrcode/aruco/lib*/**']).pipe(
//     dest(`./build/Modules/Camera/services/qrcode/aruco`),
//   );

export const watchTask = () =>
  watch(['./src/**/*.ts'], series(cleanup, build, deploy)); //TODO: add cpAruco
