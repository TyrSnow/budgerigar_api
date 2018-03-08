/**
 * UserController对应的schema
 */
import { Regs } from '../constants/Reg.enum';

const KeywordSchemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          required: true
        },
        translates: {
          'type': 'array',
          'minItems': 0,
          'items': {
            type: 'object',
            properties: {
              lang: {
                type: 'string',
              },
              text: {
                type: 'string',
              }
            }
          },
          'required': false
        }
      }
    }
  }
}

export default KeywordSchemas;
