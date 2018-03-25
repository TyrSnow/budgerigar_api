import * as log4js from 'log4js';

import { LanguageModel } from '../models/Language.d';
import Language from '../models/Language.model';
import CODE from '../constants/Code.enum';
import fuzzy from '../tools/fuzzy';
import mask_object from '../tools/maskObject';

let log = log4js.getLogger('default');

class LanguageService {
  /**
   * 创建单个的语言
   * @param name 
   * @param code 
   * @param creator 
   * @param desc 
   * @param flag 
   */
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

  /**
   * 批量创建语言
   * @param list 
   * @param creator 
   */
  static create_ones(
    list: Array<any>,
    creator: string,
  ): Promise<boolean> {
    log.debug('[LanguageService.create_ones]Input arguments: ', arguments);
    return Language.create.apply(Language, list.map(lang => {
      lang.creator = creator;
      return lang;
    })).catch(err => {
      return Promise.reject(CODE.OPERATIONS_PART_COMPLETE);
    });
  }

  /**
   * 使用名字查询语言
   * @param name 
   * @param limit 
   */
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

  /**
   * 使用名字或code查询语言
   * @param name 
   * @param limit 
   */
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
      }, {
        desc: key,
      }],
    }, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
    }).limit(limit).exec();
  }

  /**
   * 使用code查询语言
   * @param code 
   * @param limit 
   */
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

  /**
   * 语言总数
   * @param query 
   */
  static count_languages(
    query: object,
  ): Promise<number> {
    log.debug('[LanguageService.count_languages]Input arguments: ', arguments);
    return Language.count(query).exec();
  }

  /**
   * 分页语言列表
   * @param skip 
   * @param size 
   * @param query 
   */
  static query_languages(
    skip: number,
    size: number,
    query: object,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_languages]Input arguments: ', arguments);
    return Language
      .find(query)
      .populate('creator', 'name')
      .skip(skip)
      .limit(size)
      .exec();
  }

  /**
   * 无分页语言列表
   * @param query 
   */
  static list_languages(
    query: string,
  ): Promise<Array<LanguageModel.ILanguage>> {
    log.debug('[LanguageService.query_languages]Input arguments: ', arguments);
    return Language.find(query, {
      _id: 1,
      name: 1,
      code: 1,
      desc: 1,
      flag: 1,
    }).exec();
  }

  /**
   * 删除一个语言
   * @param language_id 
   * @param user 
   */
  static delete_language(
    language_id: string,
    user: string,
  ): Promise<boolean> {
    log.debug('[LanguageService.delete_language]Input arguments: ', arguments);
    return Language.findOneAndRemove({
      _id: language_id,
    }).then(
      (language) => {
        if (language) {
          log.log(`[Operation]Delete language(${language_id}) by ${user}: ${JSON.stringify(language)}`);
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.LANGUAGE_NOT_EXIST);
      }
    )
  }

  static update_language(
    language_id: string,
    user: string,
    language: any,
  ): Promise<boolean> {
    log.debug('[LanguageService.update_language]Input arguments: ', arguments);
    return Language.findOneAndUpdate({
      _id: language_id,
    }, mask_object(language, [
      'name',
      'code',
      'desc',
      'flag',
    ])).then(
      _language => {
        if (_language) {
          log.log(`[Operation]Update language(${language_id}) by ${user} and origin data: ${JSON.stringify(_language)}`);
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.LANGUAGE_NOT_EXIST);
      }
    )
  }
}

export default LanguageService;
