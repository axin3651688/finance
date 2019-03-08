
/**
 * 格式化时间戳 返回 年-月-日 时:分
 */
export function TIME_FORMAT(time) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = date.getMonth();
  let D = date.getDate();
  let H = date.getHours();
  let m = date.getMinutes();
  let newTime = `${Y}-${M}-${D} ${H}:${m}`;
  // console.log(newTime)
  return newTime;
}

/**
 * 格式化时间戳 更具不同的时长返回不同的显示方式
 */
export function MSG_TIME_FORMAT(publishtime) {
  let dateTime = new Date(publishtime);
  let Y = dateTime.getFullYear();
  let M = dateTime.getMonth();
  let D = dateTime.getDate();
  let h = dateTime.getHours();
  let m = dateTime.getMinutes();
  M = M > 9 ? M : '0' + M;
  D = D > 9 ? D : '0' + D;
  h = h > 9 ? h : '0' + h;
  m = m > 9 ? m : '0' + m;

  let currTime = Date.parse(new Date()); // 获取当前时间戳
  let l = parseInt(currTime) - parseInt(publishtime);
  let time = l / 1000;

  // 秒转小时
  let hours = time / 3600;
  if (hours < 24) {
    return `${h}:${m}`;
  }
  // 秒转天数
  let days = time / 3600 / 24;
  if (days < 30) {
    return Math.floor(days) + '天前';
  }
  // 秒转月
  let months = time / 3600 / 24 / 30;
  if (months < 12) {
    return `${M}-${D} ${h}:${m}`;
    // return Math.floor(months) + "月前";
  }
  // 秒转年
  // let years = time / 3600 / 24 / 30 / 12;
  // return Math.floor(years) + "年前";
  return `${Y}-${M}-${D} ${h}:${m}`;
}
