export const gulpConfig = {
  projectName: 'hello-word',
  ssh: {
    ignoreError: false,
    sshConfig: {
      host: process.env.SSH_HOST || 'alive.local',
      port: 22,
      username: process.env.SSH_USERNAME || 'pi',
      password: process.env.SSH_PASSWORD || 'alive',
    },
  },
};
