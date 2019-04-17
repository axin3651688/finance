/**
 * @desc    :把时间戳转为想要的时间
 * @param   {Number}   时间戳
 * @author  : mj
 */
export function formatTime(time) {
  let a = new Date(time);
  let t =
    a.toLocaleDateString().replace(/\//g, '-') +
    ' ' +
    a.toTimeString().substr(0, 8);
  return t;
}

/**
 * @desc    :根据时间排序
 * @param   {Number}
 * @author  : mj
 */
export function sortDatas(datas, id) {
  datas.sort(function (a, b) {
    return b.id - a.id;
  });
}
