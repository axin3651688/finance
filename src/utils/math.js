 /**
  * 创建随机表格数据
  * rows = [{id:'11131',text:'营业收入'},{id:'1113',text:'营业利润'}]
  * cols = [{id:'A',text:'本期'},{id:'B',text:'累计'}]
  * range = {min:25,max:52}
  * type = 1/2  1:数组类型,2对象cell类型
  */
 function createRandomDatas(rows, cols, range, type) {
     if (type === 1) {
         return createRandomRecordDatas(rows, cols, range); //[{id:2323,text:"xx",A:9090,B:455}]
     } else if (type === 2) {
         return createRandomCellData(rows, cols, range); //{A$2323:6656,B$$2323:665}
     }
 }

 /**
  * 随机生成Record数组数据
  */
 function createRandomRecordDatas(rows, cols, range) {
     let datas = [];
     for (let i = 0, len = rows.length; i < len; i++) {
         let data = getRandomRowDatas(rows[i], cols, range, i + 1);
         datas.push(data);
     }
     let ids = cols.filter(item => item.id === "id");
     if (ids && ids.length > 0) {
         //加入编码，默认隐藏 
         cols.unshift({
             id: "id",
             text: "编码",
             hidden: true,
             type: "number"
         }); //向数组的开头添加一个元素，并返回新的长度
     }
     return datas;
 }
 /**
  * 生成随机单元格数据
  */
 function createRandomCellData(rows, cols, range) {
     let object = {};
     for (let i = 0, len = rows.length; i < len; i++) {
         let row = rows[i],
             newCols = cols.filter(col => col.type === "decimal");
         newCols.forEach(col => {
             if (isGetData(col, row)) {
                 let props = col.id + "$" + row.id;
                 object[props] = getRandom(range || defaultRange);
             }

         });
     }
     return object;
 }
 /**
  * 是否去生成数据的判断
  */
 function isGetData(col, row) {
     return (!col.render && !row.hasOwnProperty(col.id)) || row[col.id] === 0;
 }
 /**
  * 获取表格行数据
  */
 function getRandomRowDatas(row, cols, range, rowIndex) {
     let record = {};
     cols.forEach(col => {
         let value = row[col.id];
         if (col.type === "number") {
             value = rowIndex;
         } else if (col.type === "string") {
             value = row[col.id] || "未知";
         } else if (isGetData(col, row)) {
             value = getRandomValue(col, range);
         }
         record[col.id] = value || 0;
     });
     return record;
 }
 
 /**
  * 默认的随机数据范围
  */
 let defaultRange = {
     min: 10000,
     max: 1000000
 };
 /**
  * 通过列类型获取数据
  */
 function getRandomValue(col, range) {
     var type = col.type,
         val = "";
     if (type == "decimal") {
         val = getRandom(range || defaultRange);
     } else if (type == "date") {
         var date = new Date(),
             month = date.getMonth() + 1,
             day = date.getDate();
         if (day < 10) day = "0" + day;
         if (month < 10) month = "0" + month;
         val = date.getFullYear() + "-" + month + "-" + day;
     } else if (type == "boolean" || type == "checkbox") {
         var arr = [false, true],
             index = 0;
         var num = Math.random() + 0.35;
         if (num >= 1) index = 1;
         val = arr[index];
     } else {
         val = type;
     }
     return val;
 }

 /**
  * 获取随机数
  * @type
  */
 function getRandom(range) {
     return (Math.floor(Math.random() * range.max * 100) + range.min) / 100;
 }
 /**
  * 获取随机颜色
  * @return {}
  */
 function getRandomColor() {
     return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
 }

 /**
  * 获取配制行
  */
 function getRecordById(rows, rowId) {
     return rows.filter(item => item.id === rowId)[0];
 }
 /**
  * 获取公式单元格数据
  */
 function fomularParser(datas, formular, rows) {
     let val = 0;
     try {
         let setObj = new Set(formular.match(/(\w+)\$(\d+)|(\w\d+)\$(\d+)/g, ""));
         let params = Array.from(setObj).sort((a, b) => {
             return b.length - a.length;
         });
         params.forEach(item => {
             let array = item.split("$");
             if (array.length == 2) {
                 let val = getCellValue(datas, array[0], array[1], rows);
                 if (val < 0) {
                     val = "(" + val + ")";
                 }
                 if (!val) {
                     console.error("请检查公式的配制，去找搞这个公式的人核实更改去吧：" + formular);
                     val = 0;
                 }
                 formular = formular.replace(item, val);
             } else {
                 console.error(formular + "公式还没来得及解析呢！");
                 return NAN;
             }
         });
         console.info(params);
         val = eval(formular);
     } catch (error) {
         console.error(formular + "解析出错了！");
         console.error(error);
     }
     return val;
 }

 function getRecordCellValue(datas, colId, rowId, rows) {
     let record = getRecordById(datas, rowId);
     if (record) {
         let value = record[colId];
         if (isNaN(value)) {
             return fomularParser(datas, value, rows);
         } else {
             return value;
         }
     }
     console.error("配制了不存在的行项目：" + rowId + "--" + colId);

 }
 /**
  * 获取单元格数据 A$1111011
  */
 function getCellValue(datas, colId, rowId, rows) {
     if (Array.isArray(datas)) {
         return getRecordCellValue(datas, colId, rowId, rows);
     }
     colId = colId.replace("_", "")
     let key = (colId + "$" + rowId);
     if (datas[key]) {
         console.info(key + "==>" + datas[key]);
         return datas[key];
     }
     let row = getRecordById(rows, rowId);
     if (row) {
         let formular = row[colId];
         if (isNaN(formular)) {
             return fomularParser(datas, formular, rows);
         } else {
             return formular;
         }
     } else {
         console.error("配制了错误的行：" + rowId);
     }
     return 0;
 }

 /**
  * 获取单元格数据
  */
 function getValue(cell, datas, rows) {
     // debugger;
     if (!isNaN(cell)) {
         return cell - 0;
     }
     if (datas[cell] || datas[cell] === 0) {
         console.info(cell + "==>" + datas[cell]);
         return datas[cell];
     }
     if(!datas || datas.length == 0){
         return 0;
     }
     let val = fomularParser(datas, cell, rows);
     return val;

 }
 /**
  * 作者：龚佳新
  * 功能描述：获取配制模型的数据,只返回三种系列数据：1单值，2单系列，>=3多系列
  * 更新时间:2018-12-26
  * 
  */
 const getConfigModelDatas = (config, datas, rows, cols) => {
     debugger;
     if (config.type === 1) {//单值
        debugger;
         return getValue(config.value, datas, rows, cols);
     }
     var configRows = getConfigRows(config.row, rows);
     //当是动态行，没有配制rows的时候，就把datas给rows
     if(configRows.length == 0){
        configRows = datas;
     }
     //当动态加载行，没有配制rows的时候，就把datas给rows
     if(rows.length == 0){
        rows = datas;
     }
     if (config.type === 2) {//单系列
        if (config.reverse) { //如果有配制的行列反向的话
            return getReverserDatas(config, datas, cols,rows);
        }
         return singleSeriesDataParse(config, datas, configRows, cols);
     }
     if (config.type >=3) {//多系列
         return seriesDataParse(config, datas, configRows, cols);
     }
 }
 /**
  * 获取配制的行项目数据
  */
 const getConfigRows = (configRows, rows) => {
     // debugger;
     if (!configRows || Object.keys(configRows).length === 0) {
         return rows;
     }
     let ids = configRows.ids,
         len = rows.length;
     if (ids) {
         let items = ids.items;
         if (items && items.length > 0) {
             let newRows = [];
             items.forEach(item => {
                 let record = rows.filter(row => {
                     return row.id === item;
                 });
                 if (record.length > 0) {
                     newRows.push(record[0]);
                 }

             })
             return newRows;
         }
         let begin = ids.begin,
             end = ids.end;
         if (begin == end || begin > end || isNaN(begin) || isNaN(end)) {
             throw new Error("配制了错误的参数【begin,end】【" + begin + "," + end + "】");
         }
         if (begin && end) {
             let arr = rows.filter(row => {
                 let id = row.id - 0;
                 return id >= begin && id <= end;
             });
             return arr;
         }
         if (begin && !end) {
             let arr = rows.filter(row => {
                 let id = row.id - 0;
                 return id >= begin;
             });
             return arr;
         }
         if (!begin && end) {
             let arr = rows.filter(row => {
                 let id = row.id - 0;
                 return id <= end;
             });
             return arr;
         }
     }
     let index = configRows.index;
     if (index) {
         let start = index.start,
             limit = index.limit;
         if (start == limit || start > len || limit > len) {
             throw new Error("配制了错误的参数【start,limit】【" + start + "," + limit + "】");
         }
         if ((start || start === 0) && limit) {
             return rows.slice(start, limit)
         }
         if ((start || start === 0) && !limit) {
             let arr = [];
             for (let i = 0; i < len; i++) {
                 if (i > start) {
                     arr.push(rows[i]);
                 }

             }
             return arr;
         }
         if (!start && limit) {
             let arr = [];
             for (let i = 0; i < len; i++) {
                 if (i < limit) {
                     arr.push(rows[i]);
                 }

             }
             return arr;
         }
     }
     return rows;
 }
/**
 * 获取单系列数据，注意：有prop的则返回数据对象：[{prop:xxx}]==>[{}]
 * 否则则返回：[xxx,xxx]
 */
 const singleSeriesDataParse = (config, datas, rows, cols) => {
     let columns = config.columns,len = columns.length;
     let label = getSeriesData(columns[0], datas, rows, cols);
     let value = getSeriesData(columns[1], datas, rows, cols);
     let key = columns[0].prop;
     if (key) {
         for (let i = 0, len = value.length; i < len; i++) {
             value[i][key] = label[i][key];
         }
         return value;
     }
     return value;

 }
/**
 * 获取列名字
 */
const getColumnName = (column,cols)=>{
    if(column.name){
        return column.name;
    }
    let names = cols.filter(cc => {
        return cc.id === column.id;
    });
    if(names && names.length > 0){
        let cl  = names[0];
        return cl.name || cl.text ; 
    }
    return column.id;
}
/**
 * 获取反向行列的数据
 * 行列==》列行
 * [{id:1,A:52,B:552},{id:1,A:52,B:552}] ==>[["colId=>colName", colId=>colName"],[record.colId, record.colId]==>[["本期数", "累计数"],[876029.22, 873665.74]]
 */
const getReverserDatas=(config, datas,cols, rows)=>{
    let value = [],names = [],ii = 0;
    rows.forEach(row => {
        let val = [];
        ii++;
        config.columns.forEach(column => {
            let data = getData(column, row, datas, rows);
            val.push(data);
            if (ii == 1) {
                let name = getColumnName(column,cols);
                names.push(name);
            }
        });
        if (ii == 1) {
            value.push(names);
        }
        value.push(val);
    });
    return value;
}
/**
 * 根据config对象获取echarts图数据
 */
 const seriesDataParse = (config, datas, rows, cols) => {
     if (config.reverse) { //如果有配制的行列反向的话
         return getReverserDatas(config, datas, cols, rows);
     }
     let value = [],record = {},series = [],xAxis = {},legends = [],ii= 0;
     config.columns.forEach(item => {
            let data = getSeriesData(item, datas, rows);
            if(Object.keys(item).length > 1){
                let ss = {};
               Cnbi.apply(ss,item);
               ss.data = data;
               delete ss.id;
               if(ii == 0){
                   xAxis = ss ;
               }else{
                   legends.push(getColumnName(item,cols));
                   delete ss.group;
                   delete ss.text;
                   series.push(ss);
               }
            }else{
               value.push(data);
            }
            ii++;
        });
     if(ii > 0){
         let bb = {series:series,xAxis:xAxis,legend:legends};
         return bb;
     }
     return value;
 }
 /**
  * 获取指定系列数据
  */
 const getSeriesData = (column, datas, rows) => {
   //  debugger
     let category = [],valProperty ="id";
     rows.forEach(row => {
         let val = getData(column, row, datas, rows,valProperty);
         category.push(val);
     });
     return category;
 }
/**
 * 获取灵气数据
 */
 const getData = (column, row, datas, rows,valProperty) => {
     let record = {},prop = column.prop,val = null,gg = column.group;
     valProperty = valProperty ||"id";
     if(gg && Object.keys(gg).length > 0 ){
        // debugger;
        let rr =  datas.filter(record=> record[gg.dim] === gg.val && row[valProperty] === record[valProperty]);
        if(rr && rr.length > 0){
            return rr[0][column[valProperty]]
        }
        console.warn("没有获取到【"+gg.dim+"="+gg.val+"】并且【"+valProperty+"="+record[valProperty]+"】的数据，请核实！");
        return 0 ; 
     }
     if (column[valProperty].length == 1) {
        // let cell = column[valProperty] + "$" + row[valProperty];
         //val = getValue(cell, datas, rows);
         val = getCellValue(datas, column[valProperty], row[valProperty], rows);
     } else {
         let cn = column[valProperty];
         val = row[cn+"After"] || row[cn];
     }
     //debugger;
     //有prop属性就是对象[fusion]，没有则为数组[echart]
     if (prop) {
         record[prop] = val;
         return record;
     }
     return val;

 }
/**
 * fusioncharts获取多系列图形数据
 */
 const seriesFusionDataParse = (config, datas, rows) => {
     let columns = config.columns,
         dataset = [];
     //category
     let category = getSeriesData(columns[0], datas, rows);
     //dataset
     for (let i = 1, len = columns.length; i < len; i++) {
         let col = columns[i];
         let seriesProp = col.seriesProp || "seriesname";
         let record = {};
         record[seriesProp] = col.name || col.text || col.id;
         record.data = getSeriesData(col, datas, rows);
         dataset.push(record);
     }
     return {
         category: category,
         dataset: dataset
     };
 }
 /**
  * 
  * @param {*} config 
  * @param {*} params 
  */
 const compare = (property) => {
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
 /**
  * 重新改变配的子集的rows内容
  */
 const rowsOfChildrenContent = (config,params) => {
    if(config.rows&&config.rows.length > 0){
        params.comparePeriod.sort(compare("id"));
        params.comparePeriod.forEach(function(it,indx){
            it.idAfter = it.id;
        });
        config.rows = params.comparePeriod;//[{id:201505,text:"2015年05月"}]
    }
 }

 //添加export抛出模块
 export {
     createRandomDatas,
     getCellValue,
     fomularParser,
     getValue,
     getConfigModelDatas,
     rowsOfChildrenContent
 }