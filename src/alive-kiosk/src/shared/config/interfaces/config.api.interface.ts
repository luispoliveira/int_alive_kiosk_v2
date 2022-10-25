import { ConfigInterface } from '../../domain/interfaces';

export declare interface ConfigApiInterface {
  set: (configPath: string) => Promise<void>;
  get: () => ConfigInterface;
}
