import { LanguagesEnum } from '../../enums/languages.enum';

export interface BaseInterface {
  loadingTime?: number;
  defaultLanguage?: LanguagesEnum;
}
