enum AUTH_TYPE {
  USER = 0,
  ADMIN,
  ROOT,
};

export default AUTH_TYPE;
export const hasAuth = (request: AUTH_TYPE, type: AUTH_TYPE) => {
  return request >= type;
};
