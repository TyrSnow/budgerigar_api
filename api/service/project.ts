import { service } from "../core/injector";
import * as log4js from 'log4js';
import { ProjectModel } from '../models/project/index.d';
import Project from '../models/project';
import Member from '../models/project/member';
import CODE from '../constants/code';
import PROJECT_AUTH from "../constants/project.auth";

let log = log4js.getLogger('default');

@service()
class ProjectService {
  create(
    userId: string,
    name: string,
    desc: string = '',
    open?: boolean,
  ): Promise<ProjectModel.Project> {
    let project = new Project({
      name,
      desc,
      open,
      members: [{
        user_id: userId,
        auth: PROJECT_AUTH.OWNER,
      }],
    });

    return project.save().catch((err) => {
      if (err.code === 11000) {
        if (err.errmsg.indexOf('name') !== -1) {
          return Promise.reject(CODE.DUMPLICATE_NAME);
        }
      }
      return Promise.reject(err);
    })
  }
}

export default ProjectService;
