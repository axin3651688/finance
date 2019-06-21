 /**
 * 默认的随机数据范围
 */
let defaultRange = {
    min: 10000,
    max: 1000000
};
 /**
  * 创建随机表格数据
  * rows = [{id:'11131',text:'营业收入'},{id:'1113',text:'营业利润'}]
  * cols = [{id:'A',text:'本期'},{id:'B',text:'累计'}]
  * group = {id:""}如果是分组表格后期再写
  * range = {min:25,max:52}
  * type = 1/2  1:数组类型,2对象cell类型
  */
 function createRandomDatas(table) {
    let range = table.range || defaultRange;
    let type = table.config.type || 1;
    if (type === 1) {
        return createRandomRecordDatas(table.rows, table.columns,range,table.needDims); //[{id:2323,text:"xx",A:9090,B:455}]
    } else if (type === 2) {
        return createRandomCellData(table.rows, table.columns,range); //{A$2323:6656,B$$2323:665}
    }
}

/**
 * 随机生成Record数组数据
 */
function createRandomRecordDatas(rows, cols, range,needDims) {
    let datas = [];
    for (let i = 0, len = rows.length; i < len; i++) {
        let data = getRandomRowDatas(rows[i], cols, range, i + 1,needDims);
        datas.push(data);
    }
    debugger;
    let ids = cols.filter(item => item.id === "id");
    if (!ids || ids.length == 0) {
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
    return (!col.fomular && !row.hasOwnProperty(col.id)) || row[col.id] === 0;
}
/**
 * 获取表格行数据
 */
function getRandomRowDatas(row, cols, range, rowIndex,needDims) {
    let record = {};
    cols.forEach(col => {
        let value = row[col.id];
        if (col.type === "number") {
            value = rowIndex;
        } else if (col.type === "string") {
            value = row[col.id];
            if(value == ""){
                 value = "--";//以往项目的套路
             }
            let ba = needDims[col.id];
            if(ba){
                value = ba.text;
            }
        }else if (isGetData(col, row)) {
            value = getRandomValue(col, range);
        }
        record[col.id] = value || 0;
    });
    return record;
}

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
 //添加export抛出模块
 export {
    createRandomDatas,
    getRandom,
    getRandomColor,
    createRandomCellData,
    createRandomRecordDatas
}