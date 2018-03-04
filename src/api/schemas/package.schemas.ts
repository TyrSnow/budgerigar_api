/**
 * UserController对应的schema
 */
import { Regs } from '../constants/Reg.enum';

const PackageSchemas = {
  create: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true
        }
      }
    }
  }
}

export default PackageSchemas;
