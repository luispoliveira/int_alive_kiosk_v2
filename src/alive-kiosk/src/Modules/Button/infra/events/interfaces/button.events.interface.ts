import { ButtonOptionsInterface } from '../../../../../shared/domain/interfaces/button.interface';

export declare interface ButtonEventsInterface {
  start: (config: ButtonOptionsInterface) => void;
  on(event: 'rising', listener: (output: number) => void): this;
  on(event: 'falling', listener: (output: number) => void): this;
  on(event: 'both', listener: (output: number) => void): this;
  emit(event: 'rising', output: unknown): boolean;
  emit(event: 'falling', output: unknown): boolean;
  emit(event: 'both', output: unknown): boolean;
}
