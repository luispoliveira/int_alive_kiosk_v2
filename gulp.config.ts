// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });

export const gulpConfig = {
  projectName: process.env.PROJECT_NAME,
  ssh: {
    ignoreError: false,
    sshConfig: {
      host: process.env.SSH_HOST,
      port: 22,
      username: process.env.SSH_USER,
      password: process.env.SSH_PASSWORD,
    },
  },
};
