import * as log4js from 'log4js';
import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

const DEVELOP_CONFIG = {
  MAX_USER_PROJECTS: 100,
  MAX_PROJECT_PACKAGES: 20,
  MAX_PROJECT_KEYWORDS: 100,
};

const SystemService = {
  get_config(name) {
    if (DEVELOP_CONFIG[name]) {
      return DEVELOP_CONFIG[name];
    }
    throw new Error('Unexpect error');
  }
}

export default SystemService;
