/**
 * 构建模糊搜索正则表达式
 * @param key 
 */
export default function fuzzy(key: string): RegExp {
  let splitKey = key.split(' ');
  return new RegExp(splitKey.join('|'));
}