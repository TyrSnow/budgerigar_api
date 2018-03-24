enum AUTH_TYPE {
  USER = 0,
  ADMIN,
  ROOT,
};

export default AUTH_TYPE;
export const hasAuth = (request, type) => {
  if (request === AUTH_TYPE.ROOT) {
    return type === AUTH_TYPE.ROOT;
  } else if (request === AUTH_TYPE.ADMIN) {
    return (type === AUTH_TYPE.ROOT) || (type === AUTH_TYPE.ADMIN);
  } else { // user权限type只要存在就行
    return !!type;
  }
};
