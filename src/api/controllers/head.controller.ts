import HeadService from '../services/head.service';

import { SUCCESS, ERROR } from '../tools/response'

class HeadCtrl {
  static create(req, res) {
    const { urls } =req.body;
    HeadService.create(urls).then(
      SUCCESS(req, res, '[HeadCtrl.create]'),
    ).catch(
      ERROR(req, res, '[HeadCtrl.create]'),
    );
  }

  static list(req, res) {
    HeadService.list().then(
      SUCCESS(req, res, '[HeadCtrl.list]'),
    ).catch(
      ERROR(req, res, '[HeadCtrl.list]'),
    );
  }
}

export default HeadCtrl;
