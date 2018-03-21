import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { SUCCESS, LIST, ERROR } from '../tools/response';

import TextService from '../services/text.service';
import PackageService from '../services/package.service';
import ProjectService from '../services/project.service';
import schemas from '../schemas/package.schemas';

class PackageCtrl {
  static router = Router();

  @router('/:package_id/texts', 'post')
  static add_text(req, res) {
    const { _id } = req.user;
    const { text, key } = req.body;
    const { package_id } = req.params;

    let project;
    PackageService.get_project_id(package_id).then(
      (project_id) => {
        project = project_id;
        return ProjectService.validMember(project_id, _id);
      },
    ).then(
      () => {
        if (key) {
          return Promise.resolve(key);
        }
        return TextService.generate_text_key(text);
      }
    ).then(
      (key) => TextService.create(text, key, project),
    ).then(
      (textDoc) => {
        return PackageService.append_texts(package_id, [textDoc._id]);
      },
    ).then(
      SUCCESS(req, res, '[PackageCtrl.add_text]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.add_text]')
    );
  }

  @router('/', 'post')
  @validator(schemas.create)
  static create_package(req, res) {
    const { _id } = req.user;
    const { project, name, desc } = req.body;

    ProjectService.validMember(project, _id).then(
      () => {
        return PackageService.create(project, _id, name, desc);
      }
    ).then(
      SUCCESS(req, res, '[PackageCtrl.create]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.create]')
    );
  }

  @router('/', 'get')
  static list_packages(req, res) {
    const { _id } = req.user;
    const { project } = req.query;

    ProjectService.validMember(project, _id).then(
      () => {
        return PackageService.list_project_packages(project);
      }
    ).then(
      SUCCESS(req, res, '[PackageCtrl.list_packages]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.list_packages]')
    );
  }
}

export default PackageCtrl;
