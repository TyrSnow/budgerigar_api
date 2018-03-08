import * as log4js from 'log4js';
import { ProjectModel } from '../models/Project';
import Project from '../models/Project.model';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

/**
 * 对语言包的管理
*/
class KeywordService {
  /**
   * 创建关键词
   * @param projId 
   * @param userId 
   * @param name
   * @param trans
   */
  static create(
    project_id: string,
    creator: string,
    name: string,
    translates: [any]
  ): Promise<ProjectModel.IProject> {
    log.debug('[KeywordService.create]Input arguments: ', arguments);

    return Project.findOneAndUpdate({
      _id: project_id
    }, {
      $push: {
        keywords: {
          text: name,
          translates,
        }
      }
    }).then(
      project => {
        if (project) {
          return Promise.resolve(project);
        }
        return Promise.reject(CODE.PROJECT_NOT_EXIST);
      }
    )
  }

}

export default KeywordService;
