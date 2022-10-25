import Logger from 'bunyan';
export class BunyanService extends Logger {
  constructor() {
    super({
      name: 'KIOSK',
      streams: [
        {
          level: 'fatal',
          type: 'rotating-file',
          path: './logs/kiosk-error.log',
          period: '1d',
          count: 7,
        },
        {
          level: 'error',
          type: 'rotating-file',
          path: './logs/kiosk-error.log',
          period: '1d',
          count: 7,
        },
        {
          level: 'warn',
          type: 'rotating-file',
          path: './logs/kiosk-error.log',
          period: '1d',
          count: 7,
        },
        {
          level: 'info',
          stream: process.stdout,
        },
        {
          level: 'debug',
          stream: process.stdout,
        },
      ],
      serializers: Logger.stdSerializers,
    });
  }
}
