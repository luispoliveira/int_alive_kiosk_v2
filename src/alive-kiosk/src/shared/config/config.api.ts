import { ConfigInterface } from '../domain/interfaces';
import { file } from '../utils';
import { ConfigApiInterface } from './interfaces/config.api.interface';

export class ConfigApi implements ConfigApiInterface {
  private config!: ConfigInterface;

  public async set(configPath: string): Promise<void> {
    try {
      this.config = await file.read<ConfigInterface>(configPath);
    } catch (err: any) {
      throw new Error(`${err.message}`);
    }
  }

  public get(): ConfigInterface {
    return this.config;
  }
}
