import * as log4js from 'log4js';
import { LanguageModel } from '../models/Language';
import Language from '../models/Language.model';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

class LanguageService {
  static create(
    name: string,
    code: string,
    flag: string,
    country: string,
  ): Promise<LanguageModel.ILanguage> {
    log.debug('[LanguageService.create]Input arguments: ', arguments);
    let lang = new Language({
      name,
      code,
      flag,
      country,
    });
    
    return lang.save();
  }

  static list(): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.create]Input arguments: ', arguments);
    return Language.find().exec();
  }
}

export default LanguageService;
