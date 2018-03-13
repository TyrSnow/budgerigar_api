/**
 * 处理掉传入参数不希望被更新的部分
 * @param object 
 * @param keys 
 */
export default function mask_object(object, keys) {
  let result = {};
  keys.map(key => {
    if (object[key]) {
      result[key] = object[key];
    }
  });
  return result;
}