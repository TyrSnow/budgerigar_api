import * as log4js from 'log4js';
import { PackageModel } from '../models/Package.d';
import Package from '../models/Package.model';
import CODE from '../constants/Code.enum';
import mask_object from '../tools/maskObject';
let log = log4js.getLogger('default');

class PackageService {
  static create(
    project_id: string,
    user_id: string,
    name: string,
    desc: string,
  ): Promise<PackageModel.IPackage> {
    log.debug('[PackageService.create]Input arguments: ', arguments);
    let pack = new Package({
      name,
      desc,
      project_id,
    });
    
    return pack.save();
  }

  static list_project_packages(
    project_id: string,
  ): Promise<Array<PackageModel.IPackage>> {
    log.debug('[PackageService.list_project_packages]Input arguments: ', arguments);
    return Package.find({
      project: project_id,
    }).exec();
  }

  static get_package(
    package_id: string
  ): Promise<PackageModel.IPackage> {
    log.debug('[PackageService.get_package]Input arguments: ', arguments);
    return Package.findOne({
      _id: package_id,
    }).exec();
  }

  static update_package_info(
    package_id: string,
    pack: object,
  ): Promise<boolean> {
    log.debug('[PackageService.update_package_info]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, mask_object(pack, ['name', 'desc'])).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    )
  }

  static update_package_template(
    package_id: string,
    template: object,
  ): Promise<boolean> {
    log.debug('[PackageService.update_package_template]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, mask_object(template, ['head', 'line', 'foot'])).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    );
  }

  static append_texts(
    package_id: string,
    text_ids: Array<string>,
  ): Promise<boolean> {
    log.debug('[PackageService.append_texts]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, {
      $addToSet: {
        texts: text_ids,
      }
    }).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    );
  }

  static remove_text(
    package_id: string,
    text_id: string,
  ): Promise<boolean> {
    log.debug('[PackageService.remove_text]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, {
      $pull: text_id,
    }).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    );
  }

  static get_project_id(
    package_id: string,
  ): Promise<string> {
    log.debug('[PackageService.get_project_id]Input arguments: ', arguments);
    return Package.findOne({
      _id: package_id,
    }, {
      project_id: 1,
    }).then(
      res => {
        if (res) {
          return Promise.resolve(res.project_id);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    )
  }
}

export default PackageService;
