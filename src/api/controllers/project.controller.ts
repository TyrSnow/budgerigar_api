import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { SUCCESS, LIST, ERROR } from '../tools/response';

import ProjectService from '../services/project.service';
import schemas from '../schemas/project.schemas';

class ProjectCtrl {
  static router = Router();

  @router('/', 'post')
  @validator(schemas.create)
  static create(req, res) {
    let { _id } = req.user;
    let { name } = req.body;

    ProjectService.create(_id, name).then(
      SUCCESS(req, res, '[ProjectCtrl.create]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.create]')
    )
  }

  @router('/:projId', 'get')
  static get_one(req, res) {
    let { _id } = req.user;
    let { projId } = req.params;

    ProjectService.get_one(_id, projId).then(
      SUCCESS(req, res, '[DocCtrl.get_one_doc]')
    ).catch(
      ERROR(req, res, '[DocCtrl.get_one_doc]')
    )
  }

  @router('/', 'get')
  @validator(schemas.query)
  static query(req, res) {
    let { _id } = req.user;
    let { current = 1, size = 10 } = req.query;

    ProjectService.count(_id).then(
      (count) => {
        if (count < (current - 1) * size) {
          return Promise.resolve({
            list: [],
            page: {
              current: current,
              size: size,
              total: count,
            }
          })
        } else {
          return ProjectService.list(_id, current, size).then(
            (list) => {
              return Promise.resolve({
                list: list,
                page: {
                  current: current,
                  size: size,
                  total: count
                }
              })
            }
          )
        }
      }
    ).then(
      LIST(req, res, '[DocCtrl.query_docs]')
    ).catch(
      ERROR(req, res, '[DocCtrl.query_docs]')
    )
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
