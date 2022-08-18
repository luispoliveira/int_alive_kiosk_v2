import { dest, parallel, series, src, watch } from 'gulp';
import run from 'gulp-run-command';
import { gulpConfig } from '../../gulp.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GulpSSH = require('gulp-ssh');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require('del');

const SSH = new GulpSSH(gulpConfig.ssh);

const remoteProjectPath = `/home/${gulpConfig.ssh.sshConfig.username}/web-sockets`;

// export const deployAssets = () =>
//   src('assets/**').pipe(SSH.dest(`${remoteProjectPath}/assets`));

export const cleanupLocal = () => del(['build']);
export const cleanupRemote = () =>
  SSH.exec([
    `rm -rf ${remoteProjectPath}/*.js`,
    `rm -rf ${remoteProjectPath}/*.html`,
    `rm -rf ${remoteProjectPath}/*.css`,
    `rm -rf ${remoteProjectPath}/config`,
  ]);
export const cleanup = parallel(cleanupLocal, cleanupRemote);
const build = async () => run('npm run build')();

const kioskFilesToBuildFolder = () =>
  src(['./config*/**', 'package.json']).pipe(dest('build'));

const kioskFilesToBuildSrcFolder = () =>
  src(['src/**/*.html', 'src/**/*.css', 'build/src/**']).pipe(dest('build'));

const kioskToRemote = () => src(['build/**']).pipe(SSH.dest(remoteProjectPath));

export const watchTask = () =>
  watch(
    [`./src/**/*.ts`, `./src/**/*.html`, `./src/**/*.css`],
    series(
      parallel(cleanup),
      build,
      kioskFilesToBuildFolder,
      kioskFilesToBuildSrcFolder,
      () => del('build/src'),
      kioskToRemote,
    ),
  );
