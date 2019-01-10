 import store from '@/store'
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
     .replace(/=/g, '":"') +
     '"}'
   );
   for (let key in bean) {
     if (!isNaN(bean[key])) {
       bean[key] = bean[key] - 0;
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
   let params = store.state.prame.command;
   let datas = {};
   needDims.forEach(element => {
     let val = params[element];
     //
     if (!val && element === "company") {
       val = params[element + "Id"];
     }
     if (element != "conversion") {
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