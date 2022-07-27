import { series, src } from 'gulp';
import { gulpConfig } from '../../../gulp.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GulpSSH = require('gulp-ssh');

const SSH = new GulpSSH(gulpConfig.ssh);

const remoteProjectPath = `/home/pi/hello-world`;

const cpScripts = () =>
  src(['start.sh', 'setup-pm2.sh']).pipe(SSH.dest(remoteProjectPath));

const execScripts = () =>
  SSH.shell([
    `chmod +x ${remoteProjectPath}/start.sh`,
    `chmod +x ${remoteProjectPath}/setup-pm2.sh`,
    `cd ${remoteProjectPath} && ./setup-pm2.sh`,
  ]);

export const setupPm2 = series(cpScripts, execScripts);
