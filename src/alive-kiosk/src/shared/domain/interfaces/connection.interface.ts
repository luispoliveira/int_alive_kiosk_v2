export interface ConnectionInterface {
  button?: number;
  stripLeds?: { gpioNumber: number; ledsNumbers: number[] };
  video?: string;
}
