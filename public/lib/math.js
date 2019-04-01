/**
 * author:gjx
 * company:cnbi
 * date:2018/11/04
 * desc:数据处理
 */
(function(){
     /**
     * 默认的随机数据范围
     */
    let defaultRange = {min:10000,max:1000000};
     /**
     * 随机生成Record数组数据
     */
    var createRandomRecordDatas = function(rows,cols,range,group,groupProperty){
        let datas = [];
        for(let i=0,len=rows.length;i<len;i++){
            let data = getRandomRowDatas(rows[i],cols,range,i+1);
            if(group && group.id && groupProperty){
              data[groupProperty] = group.id;
            }
            datas.push(data);
        }
        let ids = cols.filter(item => item.id === "id");
        if(ids && ids.length > 0){
        //加入编码，默认隐藏 
        cols.unshift({id:"id",text:"编码",hidden:true,type:"number"});//向数组的开头添加一个元素，并返回新的长度
        }
        return datas;
    }
    /**
     * 生成随机单元格数据
     */
    var createRandomCellData = function(rows,cols,range){
        let object = {};
        for(let i=0,len=rows.length;i<len;i++){
            let row = rows[i],newCols = cols.filter(col => col.type === "decimal");
            newCols.forEach(col => {
                if(isGetData(col,row)){
                    let props = col.id+"$"+row.id;
                    object[props] =  getRandom(range||defaultRange);
                }
                
            });
        }
        return object;
    }
    /**
     * 是否去生成数据的判断
     */
    var isGetData = function(col,row){
        return (!col.render && !row.hasOwnProperty(col.id)) || row[col.id] === 0;
    }
    /**
     * 获取表格行数据
     */
    var getRandomRowDatas=function(row,cols,range,rowIndex){
        let record= {};
        cols.forEach(col => {
            let value = row[col.id];
            if(col.type === "number"){
                value = rowIndex;
            }else if(col.type === "string"){
                value = row[col.id]|| "未知";
            }else if(isGetData(col,row)){
                value = getRandomValue(col,range);
            } 
            record[col.id] = value|| 0 ;
        });
    return record;
    }
     /**
	 * 创建随机表格数据
	 * rows = [{id:'11131',text:'营业收入'},{id:'1113',text:'营业利润'}]
	 * cols = [{id:'A',text:'本期'},{id:'B',text:'累计'}]
	 * range = {min:25,max:52}
   *  type = 1/2  1:数组类型,2对象cell类型
   *  groups = []
	 */
    var createRandomDatas=function(config){
      let rows = config.rows,
           cols = config.columns,
           range = config.range,
          type = config.type,
           group = config.group
        if(type === 1){
            if(group && group.id && group.datas){
             // debugger;
                let datas = [];
               for (let i=0,len = group.datas.length;i<len;i++) {
                   let temps =  createRandomRecordDatas(rows,cols,range,group.datas[i],group.id);
                   datas = datas.concat(temps);
               }
               return datas;
            }
            return   createRandomRecordDatas(rows,cols,range);//[{id:2323,text:"xx",A:9090,B:455}];
        }else if(type === 2){
            return createRandomCellData(rows,cols,range);//{A$2323:6656,B$$2323:665}
        }
    }
    /**
 * 通过列类型获取数据
 */
var getRandomValue=function(col,range){
    var type = col.type,val="";
    if(type == "decimal"){
        val= getRandom(range||defaultRange);
    }else if(type == "date"){
        var date = new Date(),month = date.getMonth()+1,day = date.getDate();
        if(day < 10)day = "0"+day; 
        if(month < 10)month = "0"+month;
        val= date.getFullYear()+"-"+month+"-"+day;
    }else if(type == "boolean" || type == "checkbox"){
        var arr = [false,true],index = 0;
        var num = Math.random()+0.35;
        if(num >=1)index = 1;
        val= arr[index];
    }else {
        val = type;
    }
    return val;
}

/**
 * 获取随机数
 * @type
 */
var getRandom=function(range){
  return (Math.floor(Math.random() * range.max * 100) + range.min) / 100;
}
/**
 * 获取随机颜色
 * @return {}
 */
var getRandomColor=function(){
		return '#'	+ ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * 获取配制行
 */
var getRecordById=function(rows,rowId){
    return rows.filter(item => (item.id || item.nid) === rowId)[0];
 }
 /**
  * 获取公式单元格数据
  */
 var fomularParser=function(datas,formular,rows){
    let val = 0 ;
   try {
    if(!formular){
      console.trace("不因该来这儿的呢?")
      return 0 ;
    }
    let setObj = new Set(formular.match(/(\w+)\$(\d+)|(\w\d+)\$(\d+)/g,""));
    let params = Array.from(setObj).sort((a,b)=>{
        return b.length-a.length;
    });
    params.forEach(item => {
        let array = item.split("$");
        if(array.length == 2){
           let val = getCellValue(datas,array[0],array[1],rows);
           if(val < 0){
               val = "("+val+")";
           }
           if(!val){
               console.error("请检查公式的配制，去找搞这个公式的人核实更改去吧："+formular);
               val = 0 ;
           }
           formular = formular.replace(item,val);
        }else{
          console.error(formular+"公式还没来得及解析呢！");
          return NAN;
        }
    });
      // console.info(params);
       val = eval(formular);
   } catch (error) {
         console.error(formular+"解析出错了！");
         console.error(error);
   }
   return val;
 }
 var getRecordCellValue=function(datas,colId,rowId,rows){
    let record = getRecordById(datas,rowId);
    if(record){
        let value = record[colId];
        if(isNaN(value)){
            return fomularParser(datas,value,rows);
        }else{
            return value;
        }
    }
    console.error("配制了不存在的行项目："+rowId+"--"+colId);
    return 0 ; 

 }
 /**
  * 获取单元格数据 A$1111011
  */
 var getCellValue=function(datas,colId,rowId,rows){
     //console.info("ddddddd")
     colId = colId.replace("_","")
     if(Array.isArray(datas)){
        return getRecordCellValue(datas,colId,rowId,rows);
     }
    let key = (colId+"$"+rowId);
     if(datas[key]){
         console.info(key+"==>"+datas[key]);
         return datas[key];
     }
     let row = getRecordById(rows,rowId);
     if(row){
        let formular = row[colId];
       if(isNaN(formular)){
           return fomularParser(datas,formular,rows);
       }else{
           return formular;
       }
     }else{
         console.error("配制了错误的行："+rowId);
     }
     return 0;
 }

/**
 * 获取单元格数据
 */
var getValue=function(cell,datas,rows){
    // debugger;
    if(!isNaN(cell)){
        return cell - 0 ;
    }
    if(datas[cell] || datas[cell] === 0){
     // console.info(cell+"==>"+datas[cell]);
      return datas[cell];
    }
    let val = fomularParser(datas,cell,rows);
    return val;
    
  }

 /**
 * 获取配制模型的数据
 */
var getConfigModelDatas = function(config,datas,rows){
    if(config.type === 1){
       return getValue(config.value,datas,rows);
    }
    var configRows =  getConfigRows(config.row,rows);
   if(config.type === 2){
       return singleSeriesDataParse(config,datas,configRows);
    }
   if(config.type === 3){
       return seriesDataParse(config,datas,configRows);
    }
 }
 var getConfigRows = function(configRows,rows){
   //debugger;
   if(!configRows || Object.keys(configRows).length === 0){
       return rows;
   }
   let ids = configRows.ids,len = rows.length;
   if(ids){
      let items = ids.items;
      if(items && items.length > 0){
         let newRows = [];
         items.forEach(item=>{
           let record = rows.filter(row=>{
             return row.id === item;
           })
          if(record.length > 0){
              newRows.push(record[0]);
           }
        })
       return newRows;
      }
      let begin = ids.begin,end = ids.end;
      if(begin == end || begin > end || isNaN(begin) || isNaN(end)){
       throw new Error("配制了错误的参数【begin,end】【"+begin+","+end+"】");
     }
      if(begin && end){
       let arr = rows.filter(row=>{
         let id = row.id - 0;
         return id >= begin && id <= end;
       });    
         return arr ;
      }
      if(begin && !end){
       let arr = rows.filter(row=>{
         let id = row.id - 0;
         return id >= begin;
       });    
         return arr ;
      }
     if(!begin && end){
       let arr = rows.filter(row=>{
         let id = row.id - 0;
         return  id <= end;
       });    
         return arr ;
     }
   }
   let index = configRows.index;
   if(index){
    let start = index.start,limit = index.limit;
     if(start == limit || start > len || limit > len ){
       throw new Error("配制了错误的参数【start,limit】【"+start+","+limit+"】");
     }
     if((start || start === 0) && limit){
       return rows.slice(start,limit)
     }
     if((start || start === 0) && !limit){
         let arr = [];
         for(let i=0;i < len ;i++){
           if(i > start){
             arr.push(rows[i]);
           }
          
         }
           return arr;
       }
     if(!start && limit){
       let arr = [];
       for(let i=0;i < len;i++){
         if(i< limit){
           arr.push(rows[i]);
         }
         
       }
         return arr;
     }
   }
   return rows;
 }
 var singleSeriesDataParse = function(config,datas,rows){
   let columns = config.columns;
   let label = getSeriesData(columns[0],datas,rows);
   let value = getSeriesData(columns[1],datas,rows);
   for(let i=0,len = value.length;i<len;i++){
     let key = columns[0].prop;
     value[i][key] = label[i][key];
   }  return value;
 }
 
 var getSeriesData = function(column,datas,rows){
   let category = [];
   rows.forEach(row => {
       let record = {},prop = column.prop,val = null;
       if(column.id.length == 1){
         let cell  = column.id+"$"+row.id;
         val = getValue(cell,datas,rows);
       }else{
        val = row[column.id];
       }
       //有prop属性就是对象[fusion]，没有则为数组[echart]
       if(prop){ 
          record[prop] = val;
          category.push(record);
       }else{
          category.push(val);
       }
       
   });
  return  category;
 }
 var seriesDataParse = function(config,datas,rows){
   let columns = config.columns,dataset = [];
   //category
   let category = getSeriesData(columns[0],datas,rows);
   //dataset
   for(let i=1,len = columns.length;i<len;i++){
     let col = columns[i];
     let seriesProp = col.seriesProp || "seriesname";
     let record = {};
     record[seriesProp] = col.name || col.text || col.id;
     record.data = getSeriesData(col,datas,rows);
     dataset.push(record);
   }
   return {category:category,dataset:dataset};
 }
 var decimalToLocalString=function(value,sub,unit){
  if(!sub)sub = '$1,';
  if(!unit ){
     unit =1;
  }//"32233".toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")
  return ((value - 0) / (unit-0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,sub);
 }

 var numberToLocalString=function(value,sub,unit,cent){
  if(!sub)sub = '$1,';
  if(!cent && cent != 0 )cent = 2;
  if(!unit ){
     unit =1;
  }//"32233".toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")
  return ((value - 0) / (unit-0)).toFixed(cent).replace(/(\d)(?=(\d{3})+\.)/g,sub);
 }


  //切换单位
 var  convertUnit=function(new_unit,datas,columns,older_unit){
            if(new_unit == 1 && (!older_unit || older_unit == 1)){
                return datas;
            }
            datas.filter(record=>{
                columns.filter(col=>{
                 // debugger;
                   if(!col.conversion && record[col.id] && col.type === "decimal"){
                        if(older_unit){
                            if(new_unit > older_unit){
                                record[col.id] = record[col.id]/(new_unit/older_unit);
                            }else{
                               record[col.id] = record[col.id]*(older_unit/new_unit);
                            }
                        }else{
                           record[col.id] = record[col.id]/new_unit;
                        }
                       
                   }
               });
           });
            return datas;
        }
    /**
      * 导出的对象
      */
     Math.createRandomDatas = createRandomDatas;
     Math.getCellValue = getCellValue;
     Math.fomularParser = fomularParser;
     Math.getValue = getValue;
     Math.convertUnit = convertUnit;
     Math.decimalToLocalString = decimalToLocalString;
     Math.getConfigModelDatas = getConfigModelDatas;
//gjx
})();

