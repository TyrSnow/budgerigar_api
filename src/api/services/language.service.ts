import * as log4js from 'log4js';

import { LanguageModel } from '../models/Language.d';
import Language from '../models/Language.model';
import CODE from '../constants/Code.enum';
import fuzzy from '../tools/fuzzy';

let log = log4js.getLogger('default');

class LanguageService {
  static create(
    name: string,
    code: string,
    creator: string,
    desc?: string,
    flag?: string,
  ): Promise<LanguageModel.ILanguage> {
    log.debug('[LanguageService.create]Input arguments: ', arguments);
    const language = new Language({
      name,
      desc,
      creator,
      code,
      flag,
    });

    return language.save().catch(
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('code') !== -1) {
            return Promise.reject(CODE.DUMPLICATE_LANGUAGE_CODE);
          }
        }
        return Promise.reject(err);
      }
    );
  }

  static query_language_by_name(
    name: string,
    limit: number = 5,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_language_by_name]Input arguments: ', arguments);
    let key = fuzzy(name);
    return Language.find({
      name: key,
    }, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
    }).limit(limit).exec();
  }

  static query_language_by_name_or_code(
    name: string,
    limit: number = 5,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_language_by_name]Input arguments: ', arguments);
    let key = fuzzy(name);
    return Language.find({
      $or: [{
        name: key,
      }, {
        code: key,
      }],
    }, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
    }).limit(limit).exec();
  }

  static query_language_by_code(
    code: string,
    limit: number = 5,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_language_by_code]Input arguments: ', arguments);
    let key = fuzzy(code);
    return Language.find({
      code: key,
    }, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
    }).limit(limit).exec();
  }

  static count_languages(
  ): Promise<number> {
    log.debug('[LanguageService.count_languages]Input arguments: ', arguments);
    return Language.count({}).exec();
  }

  static query_languages(
    skip: number,
    size: number,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_languages]Input arguments: ', arguments);
    return Language.find().skip(skip).limit(size).exec();
  }

  static list_languages(
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_languages]Input arguments: ', arguments);
    return Language.find({}, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
      flag: 1,
    }).exec();
  }
}

export default LanguageService;
