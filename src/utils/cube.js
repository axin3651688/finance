import { MessageBox } from 'element-ui';
import Vue from 'vue';
import ld from "lodash"   //https://lodash.com/docs/
import {generatePeriod} from "./period"
import { getClientParams } from "./index";
import { createRandomDatas } from "./random";
import { http } from "./http";
import { findThirdPartData, findDesignSource } from "~api/interface";
/**
 * 所依赖可变化的维度：只有当config依赖的属性变了，数据才会变，视图才会跟着变！ 
 */
let defualtNeedDims = ["company","year","month"];

let urlParams = getClientParams();
/**
 * 默认的处理数据的配制项目,解析这个对象去拿数据
 * filters = [{
               field:"列字段",
               symbol:"操作运行符： or and like in ....."
               value:"操作列的值",
           }]
 */
let defaultConfig = {
    cubeId:urlParams.cube_id?urlParams.cube_id:5,//用户的数据源权限Id,由用户登录后给定=license.id,再商定    //sql/cube/defined/random  四选一
    //needDims: defualtNeedDims,//所依赖可变化的维度：只有当config依赖的属性变了，数据才会变，视图才会跟着变！ 
    type:1,//"/1/2", //数据源组装类型 [1:数组类型,2对象cell类型],必选项目
    mainDim:"period",//主维度，决定rows行项目里配制的是什么维度
    // generateVar:{//生成变量rows
    //     "periodCount":urlParams.period_count?urlParams.period_count:5,
    //   //  "compareType":"-1&0",
    //     "compareType":urlParams.compare_type?urlParams.compare_type:"0&-1",
    //     "varName":"rows",
    //      "reverse":true
    // },
    /////////四选一start//////////////////////
   // sql:"select * from dw_dimcompany",//sql语句优先级最高  可以为语句或为Id
    // cube:{ //cube类型优先级排第二,根据
    //     subject:"0001",//主题
    //     facts:[
    //         {id:"ogtType",index:1,items:[]},
    //         {id: "period",index:2,items:"generateVar",items:["201605","201805"]},
    //         {id:"fact",index:3,items:
    //             [{id:"A",text:"XX"},
    //             {id:"B",text:"XX"},
    //             {id:"C",text:"XX"}]
    //         }
    //     ],//度量
    //     dims:[{id:"item",text:"项目"}],//维度
    // },
    defined:[], //自定义的数据优先级第三
    random:{min:1,max:10000},//随机的数据优先级排第四,
     /////////四选一end//////////////////////
    // "filterData": [],//已通过filters合成
    // "hidden": [],//==>columns.filter(col==>col.hidden)   TODO  
    // "filt": [],//已通过filters合成
    // "calculation": [],//==>columns.filter(col==>col.render)  TODO 
    /////////////////
  //  povit:false,//行列转置
  //  sum:true,//是否显示合计
    useDbName:true,//默认使用数据库的名字
    group:{
        id:"period",
        text:"期间"
    }
};
/**
 * 默认的加载解析JSON
 * 每个数据集有一个数据count，为定时任务计算所得，当大于1000时，走后端计算，否则走前端
 */
let defaultSource = {
    id:"模块Id",
    text:"模块名称",
    model:{
        //config: defaultConfig,
        tables:[],

    },
    view:{

    },
    controller:{

    }
}
/**
 * 前置功能函数
 */
let prefixExcuteFunctionNames = ["interceptorBefore","dataHandlerBefore"];
/**
 * 后置功能函数
 */
let subfixExcuteFunctionNames = ["interceptorAfter","dataHandlerAfter"];
    
    /**
     * 数据集功能函数
     * 列运算
     * 列过滤
     * 行列转置
     * 显示合计行,
     * 
     */
let functions = ["showSum","sort","filter","povit"];
/**
 * 数据集对象,数据库从接口使回来的对象
 */
Cnbi.defaultModel = {
    id:"001",
    text:"营业收入趋势分析表",
    dataType:"random",//类型【sql,cube,defined,random】
    config: {},//配制对象
    hidden:true,
  //"interceptorBefore":"funName",//执行前置函数
    rows:[{
         id:"111001",
         text:"营业收入",
        "period":"201606",
        "hidden":true
    }],
    // generater:{//生成变量rows
    //     "periodCount":urlParams.period_count?urlParams.period_count:5,
    //   //  "compareType":"-1&0",
    //     "compareType":urlParams.compare_type?urlParams.compare_type:"0&-1",
    //     "varName":"rows",
    //      "reverse":true
    // },
   //"dataHandlerBefore":"funName",//执行后置函数 单位转换，再执行列运算，如有配制有行计算的话，则执行calcRows
   filters:[],//`生成的filters`
   warnFilters:[],//预警的filters,
   datas:[]//初始化后的数据
 }

/**
 * 数据集对象
 * 1. 通过cube.config读取配制
 * 2. 如果params未传，则通过cube.needDims去拿参数params= {company:{id:0,text:"xx公司"},period:{id:201805,text:"2018年5月"}}
 */
Cnbi.cubeModel = function(){
    let me = this;
    /**
     * 列配制
     */
    this.setCloumnType = function(table){
       let columns = table.columns || table;
       let deli = false;
       columns.forEach(col=>{
            if(Array.isArray(col)){
                me.setCloumnType(col);
                deli = true;
            }else{

            }
       });
       if(!deli)table.grantType = true ; 
    }
      /**
     *  通过配制生成变量，挂到this下
     * typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
     */
    this.generateProperties=function(scope){
        let ge = scope.generater,nds = scope.needDims;
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
            scope[ge.varName] = ds;
        }
    }
    /**
     * 执行前置函数，设置参数什么的
     */
    this.excuteFunctions=function(functionNames,scope){
        functionNames.forEach(functionName=>{  
             if(scope[functionName]){
                scope[functionName].call(scope,scope)
             }
        });
    }
    /**
     * 设置维度参数，主要是模拟真实取数场景而来的
     */
    this.setParams= function(cube){
        let model = cube ?cube:Cnbi.defaultModel;
        Cnbi.applyDeepIf(model,Cnbi.defaultModel);
       //Todo 确认为深拷贝
        Cnbi.apply(me,model);
       //TODO 如果params未传，则通过cube.needDims去拿参数,到哪去拿可商定：vuex亦可
   }
   
   /**
    * 从后端拿数据
    */
   this.findData =  async function(params,table){
    debugger
        // findThirdPartData(params)
        // .then(res => {
        // debugger;
        // console.log("res", res);
        // })
        // .catch(res => {
        // console.info(res);
        // });
       params = {
                "cubeId": 7,
                "dims": {
                    "period": "201505,201605",
                    "company": "1"
                },
                "subject": "0002",
                "periodCount": 2,
                "subjects": [
                    {
                        "id": "0001",
                        "fact": "B",
                        "dims": {
                            "itempoint": "1111122,1111123,1111221"
                        },
                        "dimName": "itempoint"
                    },
                    {
                        "id": "0002",
                        "fact": "B",
                        "dims": {
                            "itemperiod": "1416001,1403100"
                        },
                        "dimName": "itemperiod"
                    }
                ]
            }
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
    this.sortTableDatas = function(configRows,table){
        let configRowLength = configRows.length;
        if(configRowLength> 1){
            let tempDatas = [],datas = table.datas;
           configRows.forEach(row=>{
               let record = datas.filter(data=>data.id === row.id)[0];
               if(record)
               tempDatas.push(record);
           });
          if(tempDatas.length >0){
              table.datas = tempDatas;
          }
        }
  }
/**
 * 数据与模版顺序一致
 */
  function setRecordPropertis(table){
    let configRows = table.rows;
    table.datas.forEach(data=>{
       if(data.id){
          let configRow = configRows.filter(row=>row.id === data.id)[0];
          if(configRow){
              Cnbi.applyIf(data,configRow);
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
    this.orderConfigRows=function(table){
        setRecordPropertis(table);  
        this.sortTableDatas(table.rows,table);
   }
   /**
    * 列单位转换
    */
   this.convertUnit=(new_unit,datas,columns,older_unit)=>{
      if(new_unit == 1 && (!older_unit || older_unit == 1)){
            return datas;
      }
      datas.filter(record=>{
        columns.filter(col=>{
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
    this.colRenderHandler=function(table){
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
   /**
	 * 功能描述:单个表成功后执行的
	 *  (1):列与列的计算
	 *  (2):表内行与行的计算，需开启行计算calculabled:true  （跨表行计算在上层循环后执行）
	 *       {
	 	       id:"3625",
	 	       text:"夏粮",
	 	       fomular:"3501+3502",
	 	       params:["3501","3502"]<==>["03-3501,""03-3502"]
	       }
	 *  (3):单位切换，可配制不转换  notConvertUnit:true
	 *  (4):表标题处理，对标题里配制有变量的进行处理
	 *  (5):分组表格间的计算还没有遇到这种需求，遇到了再加进去吧！
	 *   
	 */
	this.tableDatasHandler=function(table){
	    var datas = table["datas"],configRows = table.rows,dataLen=datas.length,rowLen = configRows.length;
	    if(dataLen != rowLen ){
	         Cnbi.Msg.warn("查询出的数据与预期的数据长度不一致，还没有处理！"+dataLen+" VS " + rowLen);
        }
        if(table.needDims.unit){
            me.convertUnit(table);//单位转换
        }
	  
	   me.colRenderHandler(table);//表内列计算
	}
   /**
    * 获取模型数据
    */
   this.getModelDatas=function(table){
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
      debugger;
      if(type !="defined"){
         this.orderConfigRows(table);
         if(type != "calculate"){
            this.tableDatasHandler(table);//列计算的，以后还要加行计算的
         }
      }
      if(table.config.sum){
        this.sumTable(table);//如果配制了合计的
     }
   };

   function getValue(datas,colId){
       let value = 0.00;
       datas.forEach(data=>{
          value+=data[colId];
       })
       return value;


   }
  /**
   * 行合计
   */
  this.sumTable = function(table){
      let total = {};
      let sum = table.config.sum;
      let type = sum.type || "decimal";
      Cnbi.apply(total,sum);
      delete total.type;
      table.columns.forEach(col=>{
         if(col.type === type && !col.render){
             let value = getValue(table.datas,col.id);
             total[col.id] = value;

         }
      });
      table.datas.push(total);


  }


   this.setModelDatas = function(scope){
      this.excuteFunctions(prefixExcuteFunctionNames,scope);
      this.getModelDatas(scope);
      this.excuteFunctions(subfixExcuteFunctionNames,scope);
   }
   this.init = function (cube){
        this.setParams(cube);//设置参数
        this.generateProperties(me);//生成变量,行，列，单表头，多表头，行列转置逻辑
        this.setCloumnType(me);//设置列属性
        this.setModelDatas(me);//统一取数数据
        return this;
    }
}


function getCube(){
    return new Cnbi.cubeModel();
}
export default getCube();
