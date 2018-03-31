import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { SUCCESS, LIST, TEXT, ERROR } from '../tools/response';

import TextService from '../services/text.service';
import PackageService from '../services/package.service';
import ProjectService from '../services/project.service';
import schemas from '../schemas/package.schemas';
import OutputService from '../services/output.service';
import { TextModel } from '../models/Text';

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
        if (key) { // 指定key
          return Promise.resolve(key);
        }
        return TextService.get_text_key(text, project);
      }
    ).then(
      (key) => TextService.create(text, key, project),
    ).then(
      (textDoc) => {
        return PackageService.append_text(package_id, textDoc._id);
      },
    ).then(
      SUCCESS(req, res, '[PackageCtrl.add_text]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.add_text]')
    );
  }

  @router('/:package_id/template', 'put')
  static update_package_template(req, res) {
    const { package_id } = req.params;
    
    PackageService.update_package_template(package_id, req.body).then(
      SUCCESS(req, res, '[PackageCtrl.update_package_template]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.update_package_template]'),
    );
  }

  @router('/:package_id/outputs', 'get')
  static get_package_output(req, res) {
    let { package_id } = req.params;
    let { lang } = req.query;

    PackageService.get_package(package_id).then(
      (pack) => {
        let { texts, template } = pack;
        if (template.header) {
          res.set(template.header);
        }
        return Promise.resolve(OutputService.render(<TextModel.IText[]>texts, lang, template));
      },
    ).then(
      TEXT(req, res, '[PackageCtrl.get_package_texts]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.get_package_texts]'),
    );
  }

  @router('/:package_id/texts', 'get')
  static get_package_texts(req, res) {
    let { package_id } = req.params;
    let { current, size } = req.query;

    PackageService.list_package_text(package_id).then(
      SUCCESS(req, res, '[PackageCtrl.get_package_texts]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.get_package_texts]'),
    );
  }

  @router('/:package_id', 'get')
  static get_package(req, res) {
    let { package_id } = req.params;
    let { _id } = req.user;
    
    PackageService.get_project_id(package_id).then(
      (project_id) => ProjectService.validMember(project_id, _id),
    ).then(
      () => PackageService.get_package(package_id),
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
