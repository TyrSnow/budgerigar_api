import ProjectService from '../services/project.service';
import KeywordService from '../services/keyword.service';

import { SUCCESS, LIST, ERROR } from '../tools/response';

export default class KeywordController {
  static create(req, res) {
    const { projId } = req.params;
    const { _id } = req.user;
    const { text, translates } = req.body;

    ProjectService.validMember(projId, _id).then(
      () => KeywordService.create(projId, _id, text, translates)
    ).then(
      SUCCESS(req, res, '[KeywordController.create]')
    ).catch(
      ERROR(req, res, '[KeywordController.create]')
    )
  }
}