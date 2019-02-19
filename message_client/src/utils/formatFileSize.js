/**
 * ================================================
 * Date: 2019/2/15
 * Author: 姜海斌
 * 格式化文件大小，将Kb转换为M，G
 * ================================================
 * @return {string}
 */

export function FORMAT_FILE_SIZE(fileSize) {
  debugger;
  let size;
  if (fileSize < 1024) {
    size = fileSize + 'B';
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024;
    size = temp.toFixed(2) + 'KB';
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024);
    size = temp.toFixed(2) + 'MB';
  } else {
    let temp = fileSize / (1024 * 1024 * 1024);
    size = temp.toFixed(2) + 'GB';
  }
  return size;
}
