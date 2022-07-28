import { ConfigInterface } from '../../domain/interfaces/config.interface';

export declare interface ConfigApiInterface {
  set: (configPath: string) => Promise<void>;
  get: () => ConfigInterface;
}
