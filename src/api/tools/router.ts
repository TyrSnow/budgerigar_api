/**
 * 将静态方法包装称请求路径
 * @param path 
 * @param method 
 */
export default function router(path: string, method: string = 'get') {
  method = method.toLowerCase();
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target.router[method](path, target[propertyKey]);
  };
}
