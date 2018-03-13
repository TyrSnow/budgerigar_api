import * as log4js from 'log4js';
import { ProjectModel } from '../models/Project/index.d';
import Project from '../models/Project/index';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

class ProjectService {
  /**
   * 创建一个新项目
   * @param userId 
   * @param name 
   */
  static create(
    userId: string,
    name: string
  ): Promise<ProjectModel.IProject> {
    log.debug('[ProjectService.create]Input arguments: ', arguments);
    let doc = new Project({
      name: name,
      creator: userId,
      admins: [userId],
      members: [userId],
    });
    return doc.save().then(
      _doc => Promise.resolve(_doc),
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('name') !== -1) {
            return Promise.reject(CODE.PROEJCT_NAME_ALREADY_EXIST);
          }
        }
        return Promise.reject(err);
      }
    );
  }

  /**
   * 列出某个用户可以访问的项目
   * @param userId 
   * @param index 
   * @param size 
   */
  static list(
    userId: string,
    index: number,
    size: number
  ): Promise<ProjectModel.IProject[]> {
    log.debug('[ProjectService.list]Input arguments: ', arguments);
    return Project.where("members")
    .in([userId])
    .skip(size * (index - 1))
    .limit(size - 0)
    .exec()
    .then(
      res => Promise.resolve(res)
    )
  }

  /**
   * 查出某个用户可以访问的项目个数
   * @param userId 
   */
  static count(
    userId: string
  ): Promise<number> {
    log.debug('[ProjectService.count]Input arguments: ', arguments);
    return Project.where("members")
    .in([userId])
    .count()
    .exec();
  }

  /**
   * 获取指定的项目
   * @param userId 
   * @param projId 
   */
  static get_one(
    userId: string,
    projId: string
  ): Promise<ProjectModel.IProject> {
    log.debug('[ProjectService.get_one]Input arguments: ', arguments);
    return Project.findOne({
      _id: projId
    }).then(
      (res) => {
        if (res) {
          if (res.members.indexOf(userId) !== -1) {
            return Promise.resolve(res);
          } else {
            return Promise.reject(CODE.NO_AUTH_TO_ACCESS_PROJECT);
          }
        } else {
          return Promise.reject(CODE.PROJECT_NOT_EXIST);
        }
      }
    )
  }

  /**
   * 删除一个指定的项目
   * @param projId 
   */
  static delete(
    projId: string,
    userId: string,
  ): Promise<ProjectModel.IProject> {
    log.debug('[ProjectService.delete]Input arguments: ', arguments);
    return Project.findOneAndRemove({
      _id: projId,
      admins: userId,
    }).then(
      (doc) => {
        if (doc) {
          return Promise.resolve(doc);
        } else {
          return Promise.reject(CODE.PROJECT_NOT_EXIST);
        }
      }
    );
  }

  /**
   * 判断一个用户是否对一个项目有访问权限
   * @param projId 
   * @param userId 
   */
  static validMember(
    projId: string,
    userId: string,
  ): Promise<void> {
    log.debug('[ProjectService.validMember]Input arguments: ', arguments);
    return Project.count({
      _id: projId,
      members: userId,
    }).then(count => {
      if (count === 0) {
        return Promise.reject(CODE.NO_AUTH_TO_ACCESS_PROJECT);
      }
      return Promise.resolve();
    });
  }

  /**
   * 判断用户是不是项目管理员
   * @param projId 
   * @param userId 
   */
  static validAdmin(
    projId: string,
    userId: string,
  ): Promise<void> {
    log.debug('[ProjectService.validAdmin]Input arguments: ', arguments);
    return Project.count({
      _id: projId,
      admins: userId,
    }).then(count => {
      if (count === 0) {
        return Promise.reject(CODE.NO_AUTH_TO_ACCESS_PROJECT);
      }
      return Promise.resolve();
    });
  }
}

export default ProjectService;
