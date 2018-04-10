import { Router } from 'express';

import router from '../core/router';
import validator from '../core/validator';
import { SUCCESS, LIST, ERROR } from '../core/response';

import ProjectService from '../services/project.service';
import schemas from '../schemas/project.schemas';
import keywordSchemas from '../schemas/keyword.schemas';
import CODE from '../constants/Code.enum';
import TextService from '../services/text.service';
import StatisticsService from '../services/statistics.service';
import PackageService from '../services/package.service';

class ProjectCtrl {
  static router = Router();

  @router('/:projectId/keywords', 'post')
  @validator(keywordSchemas.create)
  static add_keyword(req, res) {
    const { projectId } = req.params;
    const { text, translates } = req.body;

    TextService.get_text_key(text, projectId).then(
      (id) => {
        return TextService.create(text, id, projectId, translates, true);
      },
    ).then(
      (textDoc) => {
        return ProjectService.add_keyword(projectId, textDoc._id);
      },
    ).then(
      SUCCESS(req, res, '[ProjectCtrl.create]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.create]')
    );
  }

  @router('/', 'post')
  @validator(schemas.create)
  static create(req, res) {
    let { _id } = req.user;
    let { name } = req.body;

    ProjectService.create(_id, name).then(
      SUCCESS(req, res, '[ProjectCtrl.create]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.create]')
    );
  }

  @router('/:projectId/keywords', 'get')
  static list_project_keywords(req, res) {
    let { projectId } = req.params;

    ProjectService.get_one(projectId).then(
      (proj) => {
        if (proj) {
          let { keywords } = proj;
          return TextService.list_by_ids(keywords);
        }
        return Promise.reject(CODE.PROJECT_NOT_EXIST);
      }
    ).then(
      SUCCESS(req, res, '[ProjectCtrl.list_project_keywords]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.list_project_keywords]')
    );
  }

  @router('/:projId/texts/stat', 'get')
  static get_project_texts_stat(req, res) {
    const { projId } = req.params;

    StatisticsService.stat_project_text(projId).then(
      SUCCESS(req, res, '[ProjectCtrl.get_project_texts_stat]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.get_project_texts_stat]')
    );
  }

  @router('/:projId/texts', 'get')
  static get_project_texts(req, res) {
    const { projId } = req.params;
    const { current = 1, size = 10 } = req.query;

    TextService.count_project_texts(projId).then(
      count => {
        let skip = (current - 1) * size;
        if (skip < count) {
          return TextService.list_project_texts(projId, skip, parseInt(size)).then((list) => {
            return Promise.resolve({
              list,
              page: {
                current: current,
                size: size,
                total: count
              },
            })
          });
        }
        return Promise.resolve({
          list: [],
          page: {
            current: current,
            size: size,
            total: count
          },
        });
      }
    ).then(
      LIST(req, res, '[ProjectCtrl.get_project_texts]'),
    ).catch(
      ERROR(req, res, '[ProjectCtrl.get_project_texts]'),
    );
  }

  @router('/:projId/languages', 'get')
  static get_project_languages(req, res) {
    const { projId } = req.params;
    PackageService.list_project_languages(projId).then(
      SUCCESS(req, res, '[ProjectCtrl.get_project_texts]'),
    ).catch(
      ERROR(req, res, '[ProjectCtrl.get_project_texts]'),
    );
  }

  @router('/:projId', 'get')
  static get_one(req, res) {
    let { _id } = req.user;
    let { projId } = req.params;

    ProjectService.get_one(projId).then(
      SUCCESS(req, res, '[ProjectCtrl.get_one]'),
    ).catch(
      ERROR(req, res, '[ProjectCtrl.get_one]'),
    );
  }

  @router('/', 'get')
  @validator(schemas.query)
  static query(req, res) {
    let { _id } = req.user;
    let { current = 1, size = 10, self } = req.query;

    let id = self === '' ? _id : undefined;
    ProjectService.count(id).then(
      (count) => {
        if (count < (current - 1) * size) {
          return Promise.resolve({
            list: [],
            page: {
              current: current,
              size: size,
              total: count
            },
          });
        } else {
          return ProjectService.list(id, current, size).then(
            (list) => {
              return Promise.resolve({
                list: list,
                page: {
                  current: current,
                  size: size,
                  total: count
                }
              });
            },
          );
        }
      }
    ).then(
      LIST(req, res, '[ProjectCtrl.query_docs]'),
    ).catch(
      ERROR(req, res, '[ProjectCtrl.query_docs]'),
    );
  }

  @router('/:projId', 'delete')
  static delete_one(req, res) {
    let { _id } = req.user;
    let { projId } = req.params;

    ProjectService.delete(projId, _id).then(
      SUCCESS(req, res, '[DocCtrl.get_one_doc]')
    ).catch(
      ERROR(req, res, '[DocCtrl.get_one_doc]')
    );
  }
}

export default ProjectCtrl;
