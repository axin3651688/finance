import { MessageBox } from 'element-ui';
import Vue from 'vue';
import ld from "lodash"   //https://lodash.com/docs/
import {generatePeriod} from "./period"
import { getClientParams } from "./index";
import { createRandomDatas } from "./random";
import { http } from "./http";
import { findThirdPartData, findDesignSource } from "~api/interface";
import { timingSafeEqual } from 'crypto';
let urlParams = getClientParams();
/**
 * 前置功能函数
 */
let prefixExcuteFunctionNames = ["interceptorBefore","dataHandlerBefore"];
/**
 * 后置功能函数
 */
let subfixExcuteFunctionNames = ["interceptorAfter","dataHandlerAfter"];
 /**
 * 唯一标记
 */
//this.id = id;
/**
 * 名字
 */
//this.text=text;
/**
 * 数据类型【sql,cube,random,defined】
 */
//this.dataType =dataType ;
/**
 * 动态配制
 */
//this.config = config;
/**
 * 数据集大小，每个数据集有一个数据count，为定时任务计算所得，当大于1000时，走后端计算，否则走前端
 */
//this.count=count;
/**
 * 数据集列项配制
 */
//this.columns =columns ; 
/**
 * 行项目配制，可以是固定的，也可以是动态的
 */
//this.rows = rows;
/**
 * 过滤参数
 */
//this.filters=filters;
/**
 * cube模型
 */
//this.cube=cube;
/**
 * 可变的参数
 */
//this.needDims =needDims ; 
/**
 * 变量生成器
 */
//this.generater = generater;

/**
 * 数据，根据参数动态变化的
 */
//this.datas = datas;   
/**
 * 数据集操作对象
 */
class CnbiCube{
    //return Object.create(null);
    constructor(cube){
        debugger;
       Cnbi.apply(this,cube);
       debugger;
    }
    setParams(){
    }
    generateProperties(){
        let nds = this.needDims,ge = this.generater;
        if(ge){
            let ds = null;
            if(nds.year && nds.month){
             //年与月二维组成的合并维度 year+month = period,改变任一year或month都会调到这儿来的
             ds = generatePeriod(ge.periodCount,ge.compareType,nds.year,nds.month,nds.reverse,urlParams);//count,fomular,year,month,reverse
            }else if(nds.company){
            //
            }else{

            }
         //   alert(JSON.stringify(ds))
           // debugger;
            if(ge.reverse){
                ds = ds.reverse();
            }
         //  alert(JSON.stringify(ds))
            this[ge.varName] = ds;
        }
    }
    setCloumnType(scope){
       let columns = scope.columns || scope;
       let deli = false;
       columns.forEach(col=>{
            if(Array.isArray(col)){
                this.setCloumnType(col);
                deli = true;
            }else{

            }
       });
       if(!deli)scope.grantType = true ; 
    }
    /**
     * 执行前置函数，设置参数什么的
     */
    excuteFunctions(functionNames,scope){
        functionNames.forEach(functionName=>{  
             if(scope[functionName]){
                scope[functionName].call(scope,scope)
             }
        });
    }
    /**
    * 从后端拿数据
    */
  async findData(params,table){
    debugger
    params = {
            year: 2017,
            month: "06",
            company: 1,
            period: 201706,
            cubeId: 2,
            subject: "0002",
            dims: {"itemperiod":"1416001,141600101,141600102,1426401,142640101,142640102,1426405,1436601,1436602,1436603,143660302,1436701,1416101,1416111,141611101,1416112,1416113,1402100,1416301,1426711,142671101,1403100,1426801,1400100,1400111,1400112,1400120,1400121,1400122"}
            ,fact: "A,B,C,D"
        }
        debugger;
        let datas = await findThirdPartData(params);
        console.log(datas);
        debugger;
        return datas.data;
    }
     /**
    * 获取模型数据
    */
     getModelDatas(table){
        debugger;
        let type = table.dataType|| table.config.dataType;
        switch(type){
        case "sql":
            table.datas = this.findData(table.config,table);
            console.info(table)
            debugger;
        break;
        case "cube":
            table.datas = this.findData(table.config,table);
        break;
        case "defined":
        break;
        case "calculate":
            Cnbi.Msg.info(table.id+"表配制了跨表计算的");
            break;
        default://random
            table.datas =  createRandomDatas(table);
            break;
    }    
  }
   getDataHandler(scope){
       if(!this.dataCube){
         this.dataCube = new DataHandler(scope);
       }
       return this.dataCube;
   }
    /**
     * 获取数据之后的处理
     */
    dataHandlerAfter(){
        let dataCube = this.getDataHandler(this);
        let type = this.dataType|| this.config.dataType;
         if(type !="defined"){
             dataCube.configRowAdapt(this);
             if(type != "calculate"){
                dataCube.cubeDataHandler(this);//列计算的，以后还要加行计算的
             }
         }
    }
    setModelDatas(scope){
        this.excuteFunctions(prefixExcuteFunctionNames,scope);
        this.getModelDatas(scope);
        this.excuteFunctions(subfixExcuteFunctionNames,scope);
        //this.filter(this.filters);
        return this.datas;  
    }
    static getFunTemplate(exp){
        return "function (data){if("+exp+"){ return data ; }}(data)";
    }

    /**
     * 前端过滤函数cube.filter
     * var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
     *  return new Fn('return ' + fn)();
     */
    filter(filters){
        filters = filters || this.filters;
        if(!filters || filters.length == 0 ) return ;
       let exp = "";
       filters.forEach((filter,index)=>{
           let val = isNaN(filter.value)?"'"+filter.value+"'":filter.value;
           if(index > 0 ){ exp+=" && ";}
           exp+="data."+filter.field+" "+filter.calcSymbol+" "+ val;
       })
       exp= CnbiCube.getFunTemplate(exp);
       console.log(exp, typeof exp);
       return  this.datas.filter(data=>{
         if(eval("("+exp+")")){
             return data;
         }
       });
    }
    /**
     * 预警功能
     * 拿到预警对象，生成模版函数getFunTemplate，如满足条件，则执行预警任务接口
     */
    warnFilter(){

    }
    /**
     * 更新方法
     */
    update(key,value){
        this[key] = value;
        return this.init();
    }
    /**
     * 初始化
     */
    init(){
        this.setParams();//设置参数
        this.generateProperties();//生成变量,行，列，单表头，多表头，行列转置逻辑
        this.setCloumnType(this);//设置列属性
        return this.setModelDatas(this);//统一取数数据
    }
}

/**
 * 数据处理类
 * 作者：龚佳新
 */
class DataHandler{
    constructor(cube){
      this.cube = cube;
    }
    /**
     * 让查出的数据与固定的排序一致
     */
    sortTableDatas(cube){
        let rows = cube.rows;
        if(rows.length> 1){
            let tempDatas = [],datas = cube.datas;
            rows.forEach(row=>{
               let record = datas.filter(data=>data.id === row.id)[0];
               if(record)
               tempDatas.push(record);
           });
          if(tempDatas.length >0){
            cube.datas = tempDatas;
          }
        }
  }

/**
 * 数据与模版顺序一致
 */
  setRecordPropertis(table){
    let configRows = table.rows;
    table.datas.forEach(data=>{
       if(data.id){
          let configRow = configRows.filter(row=>row.id === data.id)[0];
          if(configRow){
              Cnbi.applyIf(data,configRow);//使配制的属性一致
              if(!table.useDbName && configRow.text){//不使用数据库的名称,即使用配制的名称
                  data.text =  configRow.text;
              }
          }
       }
    });
  }
/**
 * 数据与模版顺序一致
 */
configRowAdapt(cube){
    this.setRecordPropertis(cube);  
    this.sortTableDatas(cube);
}
   /**
    * 列单位转换
    */
   convertUnit(new_unit,datas,columns,older_unit){
      if(new_unit == 1 && (!older_unit || older_unit == 1)){
            return datas;
      }
      datas.forEach(record=>{
        columns.forEach(col=>{
        if(!col.unit && record[col.id] && col.type === "decimal"){
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
	 * 列配制项处理
	 */
    colRenderHandler(table){
        try{
            let columns = table.columns;
            table.datas.filter(data=>{
                columns.filter(col=>{
                    if(col.render && true){
                        //debugger;record,value,col,scope
                        data[col.id] =  col["render"].call(this,data,data[col.id],col,table);
                    }
                })
            });
        }catch(e){
            console.error(e)
          // Cnbi.Msg.error(e);
          // Cnbi.Msg.toast("列配制项处理出错了"+e.message);
        }
   }
  /**
   * 获取数据处理对象
   */
   getDataCalculator(scope){
    if(!this.dataCalculator){
      this.dataCalculator = new DataCalculator(scope);
    }
    return this.dataCalculator;
}

   /**
	 * 功能描述：
	 *    (1):表内行与行之间的计算
	 *    (2):表间行与行之前的计算  （跨表计算 crossTable = true）
	 *    在这时执行方法时replaceAll会出现一个问题：
	 *    当编码与数据一样时，会替换出问题，故采用在编码里任意位置混入abc组合字母以解决此问题
	 *    {id:"1258",text:"夏4粮",fomular:"A$3501+B$3502"} xxx 这种公式应该配制在cell上，应该为:3501+3502
	 *    {id:"1258",text:"夏4粮",fomular:"A$3501+B$3502"}
	 *    以保证不会出错！
	 * cube   可以table对象，也可以表索引
	 * cube.crossTable  是否跨表
	 */

    calcRowData(cube){
        this.dataCalculator =this.getDataCalculator(cube);
        let rows = cube.rows,datas = cube.datas,columns = cube.columns;
        datas.forEach(data=>{
            let configRow = this.dataCalculator.getRecordById(rows,data.id);//看下配制行中是不是有配制的公式,为了简化配制而设定的,不建议这么配制，但为了兼容以前的项目，还是加上解析吧！
            columns.forEach(col=>{
                let val = data[col.id];
                if(configRow && configRow.fomular){
                      //如果是在行上配制的公式[3501+3502]，在这里动态给其组装成完整的公式
                      val = this.dataCalculator.rowFomularParser(datas,configRow.fomular, rows,col.id);
                }else{//如果是配制单元格公式的这么办很OK
                    val = this.dataCalculator.getRealValue(val, datas,rows);
                }
                    data[col.id] = val;
            })
        });
    }
     /**
	 * 功能描述:单个表成功后执行的
	 *  (1):列与列的计算
	 *  (2):表内行与行的计算，需开启行计算calculabled:true  （跨表行计算在上层循环后执行）
	 *       {
	 	       id:"3625",
	 	       text:"夏粮",
	 	       fomular:"A$3501+B$3502",
	       }
	 *  (3):单位切换，可配制不转换  notConvertUnit:true
	 *  (4):表标题处理，对标题里配制有变量的进行处理
	 *  (5):分组表格间的计算还没有遇到这种需求，遇到了再加进去吧！
	 *   
	 */
	cubeDataHandler(cube){
	    if(cube.datas.length != cube.rows.length ){
	         console.warn("查询出的数据与预期的数据长度不一致，还没有处理！"+cube.datas.length+" VS " + cube.rows.length);
        }
        if(cube.needDims.unit){//单位转换
            this.convertUnit(cube);
        }
        if(cube.config.sum){//如果配制了合计的
            this.sumTable(cube);
        }
        if(cube.config.calculabled){//配制了行计算的
            this.calcRowData(cube);
        }
        if(cube.config.cellCalculabled){//配制了单元格计算的
            //this.calcRowData(cube);
        }
        this.colRenderHandler(cube);//表内列计算
        
      
    }
      /**
   * 行合计
   */
    sumTable(table){
        let total = {}, sum = table.config.sum;
        let type = sum.type || "decimal";
        Cnbi.apply(total,sum);
        delete total.type;
        table.columns.forEach(col=>{
        if(col.type === type && !col.render){
            total[col.id] =table.datas.reduce(function(prev, cur) {
                return cur[col.id] + prev;
            }, 0);
        }else{
            let ba = table.needDims[col.id];
            if(ba){
                total[col.id] = ba.text;
            }
        }
        });
        table.datas.push(total);
    }
}

/**
 * 数据计算器
 * 作者：龚佳新
 */
class DataCalculator {

    constructor(cube){
        this.cube = cube;
    }
 /**
  * 获取配制行
  */
 getRecordById(rows, rowId) {
    return rows.filter(item => item.id === rowId)[0];
}
/**
 * 通过正则获取参数数组
 */
getFomularParams(fomular,reg){
    let setObj = new Set(fomular.match(reg, ""));
    return Array.from(setObj).sort((a, b) => {
        return b.length - a.length;
    });
}

/**
 * 配制行公式来的
 * "[1101+1102]".match(/(\d+)/g, "")
 */
rowFomularParser(datas, fomular, rows,colId) {
    let params = getFomularParams(fomular,(/(\d+)/g));
    return  this.fomularHandler(params,fomular,datas,colId,rows);
}
/**
 * 获取公式一个参数的值并在公式中进行替换操作
 */
getParamsValue(param,fomular,datas,colId,rowId,rows,cubeId){
    let val = 0.00;
    if(!cubeId){
        val = this.getCellValue(datas, colId, rowId, rows);
    }else{
        //let cube = Cnbi.getCubeById(cubeId);
        //val = this.getCellValue(cube.datas, colId, rowId,cube.rows);
        console.error("跨表"+fomular + "公式还没来得及解析呢！");
    }
    if (val < 0) {
        val = "(" + val + ")";
    }
    if (!val) {
        console.error("请检查公式的配制，去找搞这个公式的人核实更改去吧：" + fomular);
        val = 0;
    }
    return  fomular.replace(param, val);
}
/**
 * 公式核心解析
 * 1101+1102 -colId
 * A$1101+B$1109
 * 195!A$1101+95!B$1109
 */
fomularHandler(params,fomular,datas,colId,rows){
    try {
        let cubeId = 0 ; 
        params.forEach(item => {
            let array = item.split("$"),len = array.length;
            if(len < 3){
                let tempColId =colId,rowId = array[0];
                if (len == 2) {
                    tempColId = array[0]; rowId = array[1];
                    let cubeArray = tempColId.split("!");
                    if(cubeArray.length > 1 ){
                        cubeId = cubeArray[0];
                        tempColId = cubeArray[1];
                        //跨表法
                        //A$1101  ==>有时候再弄   0001!A$1101
                        //通过Id拿到cube,所有的
                        //let cube = Cnbi.getCubeById(cubeId);
                    }
                   
                }
                fomular = this.getParamsValue(item,fomular,datas,tempColId,rowId,rows,cubeId);
            }else{
                console.error(fomular + "公式还没来得及解析呢！");
                return 0.00;
            }
        });
        return  eval(fomular);
    } catch (error) {
        console.error(fomular + "解析出错了！");
        console.trace();
        return 0.00;
    }
  
    
}
/**
 * 获取公式单元格数据
 */
fomularParser(datas, fomular, rows) {
    let params = getFomularParams(fomular,/(\w+)\$(\d+)|(\w\d+)\$(\d+)/g);
    return this.fomularHandler(params,fomular,datas,null,rows);
}

/**
 * 获取真实数据
 */
getRealValue(value, datas,rows,colId){
    if (isNaN(value)) {
        return this.fomularParser(datas, value, rows);
    } else {
        return value;
    }

}
/**
 * 获取记录单元格数据
 */
getRecordCellValue(datas, colId, rowId, rows) {
    let record = this.getRecordById(datas, rowId);
    if (record) {
        return this.getRealValue(record[colId], datas,rows);
    }
    console.error("配制了不存在的行项目：" + rowId + "--" + colId);

}
/**
 * 获取单元格数据 A$1111011
 */
getCellValue(datas, colId, rowId, rows) {
    if (Array.isArray(datas)) {
        return this.getRecordCellValue(datas, colId, rowId, rows);
    }
    colId = colId.replace("_", "")
    let key = (colId + "$" + rowId);
    if (datas[key]) {
        console.info(key + "==>" + datas[key]);
        return datas[key];
    }
    let row = this.getRecordById(rows, rowId);
    if (row) {
        return this.getRealValue(row[colId], datas,rows);
    } else {
        console.error("配制了错误的行：" + rowId);
    }
    return 0;
}

/**
 * 获取单元格数据
 */
getValue(cell, datas, rows) {
    if (!isNaN(cell)) {
        return cell - 0;
    }
    if (datas[cell] || datas[cell] === 0) {
        console.info(cell + "==>" + datas[cell]);
        return datas[cell];
    }
    if (!datas || datas.length == 0) {
        return 0;
    }
    let val = this.fomularParser(datas, cell, rows);
    return val;

}
}

export default CnbiCube;
