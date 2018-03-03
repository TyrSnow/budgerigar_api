function C(code: number, message: string, status?: number, uri?: string) {
    return {
        code,
        message,
        uri
    }
}

const CODE = {
    // 通用
    SUCCESS: C(10200, '操作完成'),
    ERROR: C(10500, '服务器异常'),
    ACCESS_DENY: C(10400, '用户操作被拒绝', 400),

    // 用户权限
    NOT_AUTHORIZE: C(20000, '需要登陆才能进行此项操作'),
    LOW_AUTHORIZE: C(20001, '您的权限不足', 401),
    EXPIRE_AUTHORIZE: C(20002, '您已自动退出系统，请重新登陆', 400),
    DUMPLICAT_AUTHORIZE: C(20003, '您已在其他地方登陆', 400),
    NO_AUTH_TO_ACCESS_RESOURCE: C(20004, '您没有访问它的权限'),

    // 登陆注册
    WRONG_AUTHORIZE: C(21000, '用户名或密码错误'),
    USER_NOT_EXIST: C(21001, '用户不存在'),
    BLOCKED_USER: C(21002, '用户已经被冻结'),
    PASSWORD_NOT_MATCH: C(21003, '密码不匹配'),
    PASSWORD_ALREADY_IN_USE: C(21004, '密码已经在使用了'),
    
    DUMPLICATE_NAME: C(22001, '用户名已经被注册'),
    DUMPLICATE_PHONE: C(22002, '手机号已经被注册'),
    DUMPLICATE_EMAIL: C(22003, '邮箱已经被注册'),

    ILLEGAL_PASSWORD: C(23001, '非法的密码格式'),
    ILLEGAL_USERNAME: C(23002, '非法的用户名'),

    // 文档
    DOC_NOT_EXIST: C(30000, '文档不存在'),
}

export default CODE