import * as log4js from 'log4js';
import { HeadModel } from '../models/Head';
import Head from '../models/Head.model';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

class HeadService {
  static create(
    urls: Array<string>,
  ): Promise<Array<HeadModel.IHead>> {
    log.debug('[HeadService.create]Input arguments: ', arguments);
    return Head.insertMany(urls.map(url => ({url})));
  }

  static list(): Promise<Array<HeadModel.IHead>> {
    log.debug('[HeadService.list]Input arguments: ', arguments);
    return Head.find().exec();
  }
}

export default HeadService;
