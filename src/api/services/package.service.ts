import * as log4js from 'log4js';
import { PackageModel } from '../models/Package.d';
import Package from '../models/Package.model';
import CODE from '../constants/Code.enum';
import mask_object from '../tools/maskObject';
import { TextModel } from '../models/Text';
import subObject from '../tools/subObject';
let log = log4js.getLogger('default');

class PackageService {
  /**
   * 创建一个语言包
   * @param project_id 
   * @param user_id 
   * @param name 
   * @param desc 
   */
  static create(
    project_id: string,
    user_id: string,
    name: string,
    desc: string,
    languages: Array<string>,
  ): Promise<PackageModel.IPackage> {
    log.debug('[PackageService.create]Input arguments: ', arguments);
    let pack = new Package({
      name,
      desc,
      project_id,
      languages,
    });
    
    return pack.save().then(
      (pack) => {
        return Promise.resolve(pack.populate('languages', 'code'));
      },
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('project_id_1_name_1') !== -1) {
            return Promise.reject(CODE.DUMPLICAT_PACKAGE_NAME);
          }
        }
        return Promise.reject(err);
      }
    );
  }

  /**
   * 删除一个语言包
   * @param package_id 
   * @param user_id 
   */
  static delete_package(
    package_id: string,
    user_id: string,
  ): Promise<boolean> {
    log.debug('[PackageService.delete_package]Input arguments: ', arguments);
    return Package.findOneAndRemove({
      _id: package_id,
    }).then(
      pack => {
        if (pack) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      },
    );
  }

  /**
   * 列出项目下的语言包
   * @param project_id 
   */
  static list_project_packages(
    project_id: string,
  ): Promise<Array<PackageModel.IPackage>> {
    log.debug('[PackageService.list_project_packages]Input arguments: ', arguments);
    return Package.find({
      project_id,
    }, {
      name: 1,
      languages: 1,
      desc: 1,
      texts: 1,
    }).populate('languages', 'code').exec();
  }

  /**
   * 获得一个语言包详情
   * @param package_id 
   */
  static get_package(
    package_id: string
  ): Promise<PackageModel.IPackage> {
    log.debug('[PackageService.get_package]Input arguments: ', arguments);
    return Package
      .findOne({
        _id: package_id,
      })
      .populate('texts', 'text key translates')
      .populate('languages', 'code name desc')
      .exec();
  }

  /**
   * 更新一个语言包的资料
   * @param package_id 
   * @param pack 只有其中的name、desc、languages字段会生效
   */
  static update_package_info(
    package_id: string,
    pack: object,
  ): Promise<boolean> {
    log.debug('[PackageService.update_package_info]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, mask_object(pack, ['name', 'desc', 'languages'])).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      },
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('project_id_1_name_1') !== -1) {
            return Promise.reject(CODE.DUMPLICAT_PACKAGE_NAME);
          }
        }
        return Promise.reject(err);
      },
    );
  }

  /**
   * 更新一个语言包的输出模板
   * @param package_id 
   * @param template 
   */
  static update_package_template(
    package_id: string,
    template: object,
  ): Promise<boolean> {
    log.debug('[PackageService.update_package_template]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, subObject('template', template)).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      }
    );
  }

  /**
   * 向语言包中添加语句
   * @param package_id 
   * @param text_id 
   */
  static append_text(
    package_id: string,
    text_id: string,
  ): Promise<boolean> {
    log.debug('[PackageService.append_texts]Input arguments: ', arguments);
    return Package.findOneAndUpdate({
      _id: package_id,
    }, {
      $push: {
        texts: text_id,
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

  static list_package_text(
    package_id,
  ): Promise<Array<TextModel.IText>> {
    log.debug('[PackageService.list_package_text]Input arguments: ', arguments);
    return Package
      .findOne({
        _id: package_id,
      }, 'texts')
      .populate('texts')
      .then((pack) => {
        if (pack) {
          return Promise.resolve(<TextModel.IText[]>pack.texts);
        }
        return Promise.reject(CODE.PACKAGE_NOT_EXIST);
      });
  }

  /**
   * 将语句从语言包中移除
   * @param package_id 
   * @param text_id 
   */
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

  /**
   * 获得语言包对应的项目id
   * @param package_id 
   */
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
