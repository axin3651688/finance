/**
 * ================================================
 * Date: 2019/2/20
 * Author: 姜海斌
 * vuex中用到的公共方法
 * ================================================
 */

/**
 * 单一职责，只给state中的变量赋值
 * @param state vuex中的 state
 * @param dataObj 一个有键值对的对象 {a:11,b:22}
 */
export function SET_STORE(state, dataObj) {
  // debugger;
  for (let dataKey in dataObj) {
    let flag = dataKey;
    for (let storeKey in state) {
      if (dataKey === storeKey) {
        flag = false;
        state[storeKey] = dataObj[dataKey];
      }
    }
    if (flag) {
      console.error(`传入的${flag}没有在state中定义`);
    }
  }
}
