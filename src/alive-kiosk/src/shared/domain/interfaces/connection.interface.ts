export interface ConnectionInterface {
  button?: number;
  stripLeds?: { gpioNumber: number; ledsNumbers: number[] };
  video?: {
    id: string;
    timestamp?: number;
  };
}
