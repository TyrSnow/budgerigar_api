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
import CODE from '../constants/Code.enum';
import StatisticsService from '../services/statistics.service';

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

  @router('/:package_id', 'put')
  @validator(schemas.update_info)
  static update_package_info(req, res) {
    const { package_id } = req.params;
    const pack = req.body;
    
    PackageService.update_package_info(package_id, pack).then(
      SUCCESS(req, res, '[PackageCtrl.update_package_info]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.update_package_info]')
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

  @router('/:package_id/texts/stat', 'get')
  static get_package_text_stat(req, res) {
    const { package_id } = req.params;

    StatisticsService.stat_package_text(package_id).then(
      SUCCESS(req, res, '[PackageCtrl.get_package_text_stat]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.get_package_text_stat]')
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
      SUCCESS(req, res, '[PackageCtrl.get_package]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.get_package]')
    );
  }

  @router('/', 'post')
  @validator(schemas.create)
  static create_package(req, res) {
    const { _id } = req.user;
    const { project, name, desc, languages } = req.body;

    ProjectService.validMember(project, _id).then(
      () => {
        return PackageService.create(project, _id, name, desc, languages);
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

    PackageService.list_project_packages(project).then(
      SUCCESS(req, res, '[PackageCtrl.list_packages]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.list_packages]')
    );
  }

  @router('/:package_id', 'delete')
  static delete_package(req, res) {
    const { package_id } = req.params;
    const { _id } = req.user;

    PackageService.get_project_id(package_id).then(
      (project_id) => ProjectService.validAdmin(project_id, _id).catch(err => {
        return Promise.reject(CODE.NEED_ADMIN);
      }),
    ).then(
      () => PackageService.delete_package(package_id, _id),
    ).then(
      SUCCESS(req, res, '[PackageCtrl.delete_package]'),
    ).catch(
      ERROR(req, res, '[PackageCtrl.delete_package]')
    );
  }

}

export default PackageCtrl;
