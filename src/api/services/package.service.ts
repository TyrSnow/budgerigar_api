import * as log4js from 'log4js';
import { ProjectModel } from '../models/Project/index.d';
import Project from '../models/Project/index';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

class PackageService {

  static create(
    project: ProjectModel.IProject,
    package_name: string,
    package_desc: string,
  ) {
    project.packages.push({
      name: package_name,
      desc: package_desc,
    });

    return project.save();
  }
}

export default PackageService;
