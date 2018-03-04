import ProjectService from '../services/project.service';
import PackageService from '../services/package.service';

import { SUCCESS, LIST, ERROR } from '../tools/response';

class PackageController {
  
  static create(req, res) {
    const { name } = req.body;
    const { _id } = req.user;
    const { projId } = req.params;

    ProjectService.validMember(projId, _id).then(
      () => PackageService.create(projId, _id, name),
    ).then(
      SUCCESS(req, res, '[PackageController.create]'),
    ).catch(
      ERROR(req, res, '[PackageController.create]'),
    );
  }

  static list(req, res) {
    const { _id } = req.user;
    const { projId } = req.params;

    ProjectService.validMember(projId, _id).then(
      () => PackageService.list(projId),
    ).then(
      SUCCESS(req, res, '[PackageController.list]'),
    ).catch(
      ERROR(req, res, '[PackageController.list]'),
    );
  }
}

export default PackageController;
