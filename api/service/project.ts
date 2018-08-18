import { service } from "../core";
import * as log4js from 'log4js';
import { ProjectModel } from '../models/project/index.d';
import Project from '../models/project';
import Member from '../models/project/member';
import CODE from '../constants/code';
import PROJECT_AUTH from "../constants/project.auth";
import { Schema } from "mongoose";

let log = log4js.getLogger('default');

@service()
class ProjectService {
  create(
    user_id: string,
    name: string,
    desc: string = '',
    open?: boolean,
  ): Promise<ProjectModel.Project> {
    let project = new Project({
      name,
      desc,
      open,
      creator: user_id,
      members: [{
        _id: user_id,
        auth: PROJECT_AUTH.OWNER,
      }],
    });

    return project.save().catch((err) => {
      if (err.code === 11000) {
        if (err.errmsg.indexOf('name') !== -1) {
          return Promise.reject(CODE.PROEJCT_NAME_ALREADY_EXIST);
        }
      }
      return Promise.reject(err);
    })
  }

  find_projects_by_owner(
    creator: string,
    size: number = 10,
    current: number = 1,
  ): Promise<ResponseList<ProjectModel.Project>> {
    const query = {
      creator,
    };
    let skip = (current - 1) * size;
    return Project.count({
      creator,
    }).then(
      (total) => {
        if (total < skip) {
          return Promise.resolve({
            list: [],
            page: {
              size,
              current,
              total,
            },
          });
        }
        return Project
          .find(query, {
            __v: 0,
          })
          .skip(skip)
          .limit(size)
          .populate('members.user creator', '_id name head')
          .then((list) => {
            return Promise.resolve({
              list,
              page: {
                size,
                current,
                total,
              },
            });
          });
      },
    );
  }

  valid_user_auth(
    project_id: string,
    user_id: string,
    auth: PROJECT_AUTH,
  ) {
    return Project.findById(project_id).then((res) => {
      if (res) {
        if (res.valid_auth(auth, user_id)) {
          return Promise.resolve(res);
        }
        return Promise.reject(CODE.LOW_AUTH_TO_ACCESS_PROJECT);
      }
      return Promise.reject(CODE.PROJECT_NOT_EXIST);
    })
  }

  get_selective_detail(
    project: ProjectModel.Project,
  ) {
    return project.populate('members._id creator', '_id name head').execPopulate();
  }
}

export default ProjectService;
