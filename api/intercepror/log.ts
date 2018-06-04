import * as log4js from 'log4js';

const debug = log4js.getLogger('debug');

function log() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let originProperty = target[propertyKey];
    target[propertyKey] = (...args) => {
      debug.debug(`[${propertyKey}] arguments: ${args}`);
      originProperty.apply(this, args);
    };
  };
}

export default log;
