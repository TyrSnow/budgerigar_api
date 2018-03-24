import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import fuzzy from '../tools/fuzzy';
import { SUCCESS, LIST, ERROR } from '../tools/response';

import LanguageService from '../services/language.service';
import schemas from '../schemas/language.schemas';

class LanguageCtrl {
  static router = Router();

  @router('/', 'post')
  @validator(schemas.create)
  static create(req, res) {
    const { _id } = req.user;
    const { name, code, desc, flag } = req.body;

    LanguageService.create(name, code, _id, desc, flag).then(
      SUCCESS(req, res, '[LanguageCtrl.create]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.create]'),
    );
  }

  @router('/batch', 'post')
  static create_ones(req, res) {
    const { _id } = req.user;
    const { data } = req.body;

    LanguageService.create_ones(data, _id).then(
      SUCCESS(req, res, '[LanguageCtrl.create_ones]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.create_ones]'),
    );
  }

  @router('/names', 'get')
  @validator(schemas.query_names)
  static query_names(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_name(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]'),
    );
  }

  
  @router('/codes', 'get')
  @validator(schemas.query_names)
  static query_codes(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_code(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]'),
    );
  }

  @router('/keys', 'get')
  static query_keys(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_name_or_code(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]'),
    );
  }

  @router('/', 'get')
  static list_all(req, res) {
    const { current = 1, size = 10, all } = req.query; // 分页
    const { key } = req.query; // 搜索参数
    
    let query:any;
    if (key) {
      let _key = fuzzy(key);
      query = {
        $or: [{
          name: _key,
        }, {
          code: _key,
        }, {
          desc: _key,
        }],
      };
    } else {
      query = {};
    }

    if (all || (all === '')) {
      LanguageService.list_languages(query).then(
        SUCCESS(req, res, '[LanguageCtrl.query_names]'),
      ).catch(
        ERROR(req, res, '[LanguageCtrl.query_names]'),
      );
    } else {
      let total;
      LanguageService.count_languages(query).then(
        count => {
          total = count;
          let skip = (current - 1) * size;
          if (skip < total) {
            return LanguageService.query_languages(skip, size - 0, query);
          }
          return Promise.resolve([]);
        }
      ).then(
        arr => {
          return Promise.resolve({
            list: arr,
            page: {
              current,
              size,
              total,
            },
          });
        }
      ).then(
        LIST(req, res, '[LanguageCtrl.query_names]'),
      ).catch(
        ERROR(req, res, '[LanguageCtrl.query_names]'),
      );
    }
  }

  @router('/:language_id', 'delete')
  static delete_one(req, res) {
    const { _id } = req.user;
    const { language_id } = req.params;

    LanguageService.delete_language(language_id, _id).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]'),
    );
  }

  @router('/:language_id', 'put')
  @validator(schemas.update)
  static update_one(req, res) {
    const { _id } = req.user;
    const { language_id } = req.params;

    LanguageService.update_language(language_id, _id, req.body).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]')
    );
  }
}

export default LanguageCtrl;
