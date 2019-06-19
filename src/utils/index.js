import store from '@/store'
import Vue from 'vue'
import {
  generatePeriod
} from "./period";
export function getClientParams(url) {
  url = url || window.location.href;
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  let bean = JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/==/g, '')
    .replace(/=/g, '":"')
    .replace(/:""/g, '') +
    '"}'
  );
  for (let key in bean) {
    if (!isNaN(bean[key])) {
      bean[key] = bean[key] - 0;
    } else if(key === "compare_type"){
       bean[key] = bean[key].replace("$","&");
    }
  }
  return bean;
}


export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}


export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 获取模块的参数
 *  */
export function getModuleParams(item, changeDim) {
  let config = item.config,
    needDims = config.needDims;
  if (!needDims) {
    return;
  }
  let ns = needDims.filter(dim => dim === changeDim);
  if (!ns || ns.length == 0) {
    console.info(item.text + "不依赖【" + changeDim + "】维度!");
    return;
  }
  if (!needDims || needDims.length < 1) {
    throw new Error("未定义正确的needDims=['company','year','month']参数");
    return;
  }
  let params = store.state.param.command;
  let datas = {};
  needDims.forEach(element => {
    let val = params[element];
    //
    if (!val && element === "company") {
      val = params[element + "Id"];
    }
    if (element != "conversion" || element != "unit") {
      datas[element] = val;
    }
  });
  if (datas.year && datas.month) {
    // let date = new Date();
    // datas.year =  date.getFullYear();
    // datas.month =  date.getMonth()-1;
    datas.month =
      datas.month - 0 < 10 ? "0" + datas.month : "" + datas.month;
    datas.period = datas.year + "" + datas.month;
  }
  //孙子成，请在此处加一个periodCount,compareType=[0&-1,-1&-0]的解析
  //目标：在datas.comparePeriod= 调用period.js的一个方法
  // debugger
  let vars = config.generateVar;
  if (vars && vars.periodCount && vars.compareType) {
    let reverse = vars.reverse || false;
    let year = datas.year,
      month = datas.month;
    year = {
      id: year,
      text: "年"
    };
    month = {
      id: month,
      text: "月"
    };
    let periodArr = generatePeriod(
      vars.periodCount,
      vars.compareType,
      year,
      month,
      reverse
    );
    let index = 0;
    if (reverse) {
      index = periodArr.length - 2;
    }
    datas.comparePeriod = periodArr[index].id;
    if (vars.varName) {
      item.config[vars.varName] = periodArr;
    }
    //datas.period = periodArr.map(p=>p.id).join(",");
  }
  return datas;
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
 * @param  level      层级名称，也可以传比如  "lever"
 * @author : mj
 * @data   :  2019-01-23
 */
export function isfold(dat, formatData, level) {
  formatData.filter(data => {
    if (data.pid == dat.id && data[level] == dat[level] + 1) {
      debugger;
      if (data.leaf == 0) {
        // 如果收缩有子节点就递归
        debugger;
        if (data._expanded == false) {
          data._isHide = !data._isHide;
          return true;
        }
        data._isHide = !data._isHide;
        isfold(data, formatData, level);
      } else if (data[level] == dat[level] + 1) {
        data._isHide = !data._isHide;
      }
      return true;
    }
  });
}