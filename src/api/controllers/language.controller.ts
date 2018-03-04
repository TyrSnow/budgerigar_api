import DocSrv from '../services/doc.service'

import { SUCCESS, ERROR } from '../tools/response';

export default class LanguageCtrl {
  static create(req, res) {
    let { _id } = req.user;
    let { name } = req.body;

    DocSrv.create_one(_id, name).then(
      SUCCESS(req, res, '[DocCtrl.create]')
    ).catch(
      ERROR(req, res, '[DocCtrl.create]')
    )
  }
  static get_one_doc(req, res) {
    let { _id } = req.user;
    let { docId } = req.params;

    DocSrv.get_doc_info(_id, docId).then(
      SUCCESS(req, res, '[DocCtrl.get_one_doc]')
    ).catch(
      ERROR(req, res, '[DocCtrl.get_one_doc]')
    )
  }
  static query_docs(req, res) {
      let { _id } = req.user;
      let { i = 1, s = 10 } = req.query;

      DocSrv.count_user_doc(_id).then(
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
                  return DocSrv.list_user_doc(_id, i, s).then(
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
          SUCCESS(req, res, '[DocCtrl.query_docs]')
      ).catch(
          ERROR(req, res, '[DocCtrl.query_docs]')
      )
  }
}