import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
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
      ERROR(req, res, '[LanguageCtrl.create]')
    );
  }

  @router('/names', 'get')
  @validator(schemas.query_names)
  static query_names(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_name(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]')
    );
  }

  
  @router('/codes', 'get')
  @validator(schemas.query_names)
  static query_codes(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_code(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]')
    );
  }

  @router('/keys', 'get')
  static query_keys(req, res) {
    const { key } = req.query;

    LanguageService.query_language_by_name_or_code(key).then(
      SUCCESS(req, res, '[LanguageCtrl.query_names]'),
    ).catch(
      ERROR(req, res, '[LanguageCtrl.query_names]')
    );
  }

  @router('/', 'get')
  static list_all(req, res) {
    const { current = 1, size = 10, all } = req.query;
    
    if (all || (all === '')) {
      LanguageService.list_languages().then(
        SUCCESS(req, res, '[LanguageCtrl.query_names]'),
      ).catch(
        ERROR(req, res, '[LanguageCtrl.query_names]')
      );
    } else {
      let total;
      LanguageService.count_languages().then(
        count => {
          total = count;
          let skip = (current - 1) * size;
          if (skip < total) {
            return LanguageService.query_languages(skip, size);
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
        ERROR(req, res, '[LanguageCtrl.query_names]')
      );
    }
  }
}

export default LanguageCtrl;
