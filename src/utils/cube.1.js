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
let defualtNeedDims = ["company","year","month","unit","module","report"];

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
    needDims: defualtNeedDims,//所依赖可变化的维度：只有当config依赖的属性变了，数据才会变，视图才会跟着变！ 
    type:"/1/2", //数据源组装类型 [1:数组类型,2对象cell类型],必选项目
    mainDim:"period",//主维度，决定rows行项目里配制的是什么维度
    generateVar:{//生成变量rows
        "periodCount":urlParams.period_count?urlParams.period_count:5,
      //  "compareType":"-1&0",
        "compareType":urlParams.compare_type?urlParams.compare_type:"0&-1",
        "varName":"rows",
         "reverse":true
    },
    /////////四选一start//////////////////////
    sql:"select * from dw_dimcompany",//sql语句优先级最高  可以为语句或为Id
    cube:{ //cube类型优先级排第二,根据
        subject:"0001",//主题
        facts:[
            {id:"ogtType",index:1,items:[]},
            {id: "period",index:2,items:"generateVar"},
            {id:"fact",index:3,items:
                [{id:"A",text:"XX"},
                {id:"B",text:"XX"},
                {id:"C",text:"XX"}]
            }
        ],//度量
        dims:[{id:"item",text:"项目"}],//维度
    },
    defined:[], //自定义的数据优先级第三
    random:{min:1,max:10000},//随机的数据优先级排第四,
     /////////四选一end//////////////////////
    "filterData": [],//已通过filters合成
    "hidden": [],//==>columns.filter(col==>col.hidden)   TODO  
    "filt": [],//已通过filters合成
    "calculation": [],//==>columns.filter(col==>col.render)  TODO 
    /////////////////
  //  povit:false,//行列转置
  //  sum:true,//是否显示合计
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
    id:"表编码",
    text:"表名称",
    dataType:"cube",//类型【sql,cube,defined,random】
    config: defaultConfig,//配制对象
    hidden:true,
  //"interceptorBefore":"funName",//执行前置函数
    columns:[{  
             id:"id",
            text:"编码",
            hidden:true
          },{  
            id:"text",
            type:"string",
            text:"项目",
            align:"left/right/center",
            children:[]
          },{
            id:"A",
            text:"本期",
            sort:"asc",//desc,
            type:"decimal",
            "render":"functionName",//真实字面量函数<==> 优先级最高
            render:function(record,value){
              return Math.fomater("2",value);
            },
        "hidden":true
    }],
    rows:[{
         id:"111001",
         text:"营业收入",
        "period":"201606",
        "hidden":true
    }],
   //"dataHandlerBefore":"funName",//执行后置函数 单位转换，再执行列运算，如有配制有行计算的话，则执行calcRows
   filters:[],//生成的filters
   warnFilters:[],//预警的filters,
   datas:[]//初始化后的数据
 }

/**
 * 数据集对象
 * 1. 通过cube.config读取配制
 * 2. 如果params未传，则通过cube.needDims去拿参数params= {company:{id:0,text:"xx公司"},period:{id:201805,text:"2018年5月"}}
 */
Cnbi.cubeModel = function(cube,params){
    
    let me = this;
    /**
     * 列配制
     */
    this.grantDataType = function(table){
       let columns = table.columns || table;
       let deli = false;
       columns.forEach(col=>{
            if(Array.isArray(col)){
                me.grantDataType(col);
                deli = true;
            }else{

            }
       });
       if(!deli)table.grantType = true ; 
    }
      /**
     * 表格属性拷贝
     * typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
     */
    this.tablePropertiesCopy=function(table,_update){

    }
    
    /**
     * 设置config对象  Todo 确认为深拷贝
     */
    this.setScopeParams=function(model){
        model = model ?model:defaultSource.model;
        Cnbi.apply(this,model);
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
    this.setDimParams= function(table){
        let cc = table.config,nds = cc.needDims
        debugger
        let ge = cc.generateVar;
        if(nds.contains ("year") && nds.contains ("month")){
            //年与月二维组成的合并维度 year+month = period,改变任一year或month都会调到这儿来的
            table[ge.varName] = generatePeriod(ge.periodCount,ge.compareType,cc.year,cc.month,cc.reverse,urlParams);//count,fomular,year,month,reverse
        }
       //me.setViewType(); 设置视图模式
       if(me.changeDimParamsAfter){//更新维度后的动作 ，特殊功能
            me.changeDimParamsAfter();
       }
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
                "cubeId": 2,
                "dims": {
                    "period": "201505,201605",
                    "company": "1"
                },
                "periodCount": 2,
                "subjects": [
                    {
                        "id": "1016",
                        "fact": "val_B",
                        "dims": {
                            "indicator": "236,19",
                            "fact": "B"
                        },
                        "dimName": "indicator"
                    },
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
        debugger;
        let datas = await findThirdPartData(params);
        console.log(datas);
        debugger;
        return datas.data;
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
    //   if(type !="defined"){
    //      this.orderConfigRows(table);
    //      if(type != "calculate"){
    //         this.tableDatasHandler(table);//列计算的，以后还要加行计算的
    //      }
    //   }
    //   if(table.sum){
    //     this.sumTable(table);//如果配制了合计的
    //  }
   };

   this.singleModelDatas = function(table,scope){
      this.excuteFunctions(prefixExcuteFunctionNames,scope);
      this.getModelDatas(table);
      this.excuteFunctions(subfixExcuteFunctionNames,table,scope);
   }

    this.setData = function(scope){
        this.excuteFunctions(prefixExcuteFunctionNames,scope);
        debugger;
        scope.tables.forEach(table=>{
            this.setDimParams(table);
            this.grantDataType(table);
            this.tablePropertiesCopy(scope);//表格属性拷贝ss
            this.singleModelDatas(table,table);//获取数据
        });
        this.excuteFunctions(subfixExcuteFunctionNames,scope);
    }
    this.init = function(model){
        this.setScopeParams(model);
        this.setData(this);
        return this;
    }
}


function getCube(){
    return new Cnbi.cubeModel();
}
export default getCube();
