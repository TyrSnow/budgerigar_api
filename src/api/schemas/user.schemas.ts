/**
 * UserController对应的schema
 */
import { Regs } from '../constants/Reg.enum'
const UserSchemas = {
    /** 注册 */
    regist: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: true
                },
                phone: {
                    type: 'string',
                    required: true,
                    pattern: Regs.phoneStr
                },
                email: {
                    type: 'string',
                    required: true,
                    pattern: Regs.emailStr
                },
                password: {
                    type: 'string',
                    required: true
                }
            }
        }
    },
    login: {
        body: {
            type: 'object',
            properties: {
                user: {
                    type: 'string',
                    required: true
                },
                password: {
                    type: 'string',
                    required: true
                },
                remember: {
                    type: 'boolean'
                }
            }
        }
    },
    changePassword: {
        body: {
            type: 'object',
            properties: {
                oldPwd: {
                    type: 'string',
                    required: true
                },
                newPwd: {
                    type: 'string',
                    required: true
                }
            }
        }
    }
}

export default UserSchemas