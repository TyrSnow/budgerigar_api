import * as log4js from 'log4js';
import * as pinyin from 'pinyin';
import { TextModel } from '../models/Text.d';
import Text from '../models/Text.model';
import CODE from '../constants/Code.enum';
import mask_object from '../tools/maskObject';
let log = log4js.getLogger('default');

class TextService {
  /**
   * 录入语句
   * @param text 
   * @param key 
   * @param project_id 
   * @param translates 
   */
  static create(
    text: string,
    key: string,
    project_id: string,
    translates?: Array<TextModel.ITranslate>,
  ): Promise<TextModel.IText> {
    log.debug('[TextService.create]Input arguments: ', arguments);
    const text_doc = new Text({
      text,
      key,
      project_id,
      translates,
    });
    
    return text_doc.save().then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        if (err.code === 11000) {
            if (err.errmsg.indexOf('text') !== -1) {
                return Promise.reject(CODE.PROJECT_TEXT_DUMPLATE);
            }
        }
        return Promise.reject(err);
      },
    );
  }

  /**
   * 根据文字拼音生成一个key
   * @param text 
   */
  static generate_text_key(
    text: string,
  ): Promise<string> {
    log.debug('[TextService.generate_text_key]Input arguments: ', arguments);
    let pys = pinyin(text, {
      // segment: true,
      style: pinyin.STYLE_TONE2,
    });

    return pys.map(wordPy => wordPy[0]).join('');
  }
  
  /**
   * 返回一个语句的key
   * @param text 
   * @param project_id 
   */
  static get_text_key(
    text: string,
    project_id,
  ): Promise<string> {
    return Text.findOne({
      text,
      project_id,
    }).then(
      (res) => {
        if (res) {
          return Promise.resolve(res.key);
        }
        return Promise.resolve(TextService.generate_text_key(text));
      },
    );
  }

  /**
   * 获得系统中存在的同样的句子
   * @param text 
   */
  static list_same_texts(
    text: string,
  ): Promise<Array<TextModel.IText>> {
    log.debug('[TextService.list_same_texts]Input arguments: ', arguments);
    return Text.find({
      text,
    }).limit(10).exec();
  }
  /**
   * 检查一句话是不是已经在项目里了
   * @param text 
   * @param project_id 
   */
  static check_text_exist(
    text: string,
    project_id: string,
  ): Promise<boolean> {
    log.debug('[TextService.check_text_exist]Input arguments: ', arguments);
    return Text.findOne({
      text,
      project_id,
    }).then(
      (res) => {
        if (res) {
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      }
    )
  }
}

export default TextService;
