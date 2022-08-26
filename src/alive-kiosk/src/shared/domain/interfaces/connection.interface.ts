import { LanguagesEnum } from '../../enums/languages.enum';

export interface ConnectionInterface {
  button?: number;
  stripLeds?: { gpioNumber: number; ledsNumbers: number[] };
  video?: {
    id: string;
    timestamp?: number;
  };
}
