
import Vue from 'vue'
/**
* @name   :      给对象添加属性
* @param  data   需要处理的数据
* @author : mj
* @data   : 2019-01-23
*/
export function convertData(data) {
  let tmp = []
  if (!Array.isArray(data)) {
    data = [data];
  } else {
    data = data;
  }
  Array.from(data).forEach(function (record) {
    // debugger
    let _expanded = false
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', _expanded)
    }
    let _isHide = false
    if (record._isHide == undefined) {
      Vue.set(record, '_isHide', _isHide)
    }
    tmp.push(record)
  })
  return tmp
}

/**
    * @name :  控制节点的展开和关闭
    * @param  dat         点击行的数据
    * @param  formatData  整个表的数据
    * @param  level      层级名称
    * @author : mj
    * @data   :  2019-01-23
    */
export function isfold(dat, formatData, level) {
  formatData.filter(data => {
    if (data.pid == dat.code && data[level] == dat[level] + 1) {
      debugger;
      if (data.leaf == 0) {
        debugger;
        if (data._expanded == false) {
          data._isHide = !data._isHide;
          return true;
        }
        data._isHide = !data._isHide;
        // console.log(data.text);
        isfold(data, formatData, level);
      } else if (data[level] == dat[level] + 1) {
        // console.log(data.text);
        data._isHide = !data._isHide;
      }
      return true;
    }
  });

}

/**
 * 用于记录已经点击的节点
 * code   需要记录的数
 * nodes 记录的总的点击, 需要在vue的data里面声明, 调用的时候要用this.nodes,才会起到全局作用
 * 如果有记录,返回真
 *  */
export function handleOpen(code, nodes) {
  var clickNodeId = "";
  clickNodeId = "_" + code;
  for (let index = 0; index < nodes.length; index++) {
    if (nodes[index] === clickNodeId) {
      return true;
    }
  }
  nodes.push(clickNodeId);
  return false;
}

