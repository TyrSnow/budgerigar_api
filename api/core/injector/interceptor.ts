import 'reflect-metadata';

/**
 * 构造一个拦截器
 */
export default function interceptor(interceptorOri) {
  return (config?) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      if (!target[propertyKey].interceptors) {
        Object.assign(target[propertyKey], {
          interceptors: [],
        });
      }
      // 看函数需要几个参数，如果是三个的话直接调
      const paramsTypes: Function[] = Reflect.getMetadata('design:paramtypes', interceptorOri);
      console.log(paramsTypes.length);
      // target[propertyKey].interceptors.push((req) => {

      // });
    };
  };
}
