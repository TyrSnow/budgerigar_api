import * as log4js from 'log4js';
import { PackageModel } from '../models/Package';
import Package from '../models/Package.model';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

/**
 * 对语言包的管理
*/
class PackageService {
  /**
   * 创建一个语言包
   * @param projId 
   * @param userId 
   * @param name 
   */
  static create(
    project_id: string,
    creator: string,
    name: string,
  ): Promise<PackageModel.IPackage> {
    log.debug('[PackageService.create]Input arguments: ', arguments);
    let pack = new Package({
      name,
      creator,
      project_id,
    });

    return pack.save();
  }

  static list(
    project_id: string,
  ): Promise<Array<PackageModel.IPackage>> {
    log.debug('[PackageService.list]Input arguments: ', arguments);

    return Package.find({
      project_id,
    }).exec();
  }
}

export default PackageService;
