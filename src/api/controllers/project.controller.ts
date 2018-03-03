import ProjectService from '../services/project.service'

import { SUCCESS, LIST, ERROR } from '../tools/response'

export default class ProjectCtrl {
  static create(req, res) {
    let { _id } = req.user;
    let { name } = req.body;

    ProjectService.create(_id, name).then(
      SUCCESS(req, res, '[ProjectCtrl.create]')
    ).catch(
      ERROR(req, res, '[ProjectCtrl.create]')
    )
  }

  static get_one(req, res) {
    let { _id } = req.user;
    let { projId } = req.params;

    ProjectService.get_one(_id, projId).then(
      SUCCESS(req, res, '[DocCtrl.get_one_doc]')
    ).catch(
      ERROR(req, res, '[DocCtrl.get_one_doc]')
    )
  }

  static query(req, res) {
    let { _id } = req.user;
    let { i = 1, s = 10 } = req.query;

    ProjectService.count(_id).then(
      (count) => {
        if (count < (i - 1) * s) {
          return Promise.resolve({
            list: [],
            page: {
              i: i,
              s: s,
              c: count
            }
          })
        } else {
          return ProjectService.list(_id, i, s).then(
            (list) => {
              return Promise.resolve({
                list: list,
                page: {
                  i: i,
                  s: s,
                  c: count
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
}