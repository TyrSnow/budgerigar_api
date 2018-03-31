import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import fuzzy from '../tools/fuzzy';
import { SUCCESS, LIST, ERROR } from '../tools/response';
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
