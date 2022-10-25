import { LanguagesEnum } from '../../enums';

export interface BaseInterface {
  loadingTime?: number;
  defaultLanguage?: LanguagesEnum;
  idleVideoNumber?: number;
}
