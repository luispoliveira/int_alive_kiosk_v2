import { LanguagesEnum } from '../enums/languages.enum';
import { KioskType } from '../infra/types/kiosk.type';

export default class LanguageUtils {
  kiosk: KioskType;
  languages: LanguagesEnum[];
  defaultLanguage = LanguagesEnum.PT;
  index = 0;

  constructor(kiosk: KioskType) {
    this.kiosk = kiosk;
    if (!this.kiosk.config.languages)
      throw new Error('Config languages not found');
    this.languages = this.kiosk.config.languages;
  }

  changeLanguage() {
    this.index = (this.index + 1) % this.languages.length;
    this.defaultLanguage = this.languages[this.index];
    return this.defaultLanguage;
  }
}
