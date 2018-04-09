import { validate } from 'express-jsonschema';
import * as log4js from 'log4js';

let error = log4js.getLogger('error');
export default function validator(validator) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const orignalProperty = target[propertyKey];
    target[propertyKey] = (req, res) => {
      validate(validator)(req, res, (err) => {
        if (err) {
          error.debug('[Error]Catched JsonSchemaValidate Error: ', JSON.stringify(err));
          error.debug('[Request]Error captured in url: ', req.originalUrl);
          error.debug('[Request]Error captured with params: ', req.params);
          error.debug('[Request]Error captured with query: ', req.query);
          error.debug('[Request]Error captured with body: ', req.body);
          
          return res.status(400).json({
            note: 'Invalid params.'
          });
        }
        orignalProperty(req, res);
      });
    };
  };
}
