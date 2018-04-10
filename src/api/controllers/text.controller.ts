import { Router } from 'express';

import router from '../core/router';
import validator from '../core/validator';
import fuzzy from '../tools/fuzzy';
import { SUCCESS, LIST, ERROR } from '../core/response';
import TextService from '../services/text.service';

class TextCtrl {
  static router = Router();

  @router('/:textId/translates', 'put')
  static create(req, res) {
    const { _id } = req.user;
    const { textId } = req.params;
    const { lang, text } = req.body;

    TextService.add_translate(textId, lang, text).then(
      SUCCESS(req, res, '[TextCtrl.create]'),
    ).catch(
      ERROR(req, res, '[TextCtrl.create]'),
    );
  }

}

export default TextCtrl;
