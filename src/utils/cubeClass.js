import { MessageBox } from 'element-ui';
import Vue from 'vue';
import ld from 'lodash'; //https://lodash.com/docs/
import { generatePeriod } from './period';
import { getClientParams } from './index';
import { createRandomDatas } from './random';
import { http } from './http';
import { findThirdPartData, findDesignSource } from '~api/interface';
import { timingSafeEqual } from 'crypto';
import { FIND_DATA_CUBE } from '~api/cube';

let urlParams = getClientParams();
/**
 * 前置功能函数
 */
let prefixExcuteFunctionNames = ['interceptorBefore', 'dataHandlerBefore'];
/**
 * 后置功能函数
 */
let subfixExcuteFunctionNames = ['interceptorAfter', 'dataHandlerAfter'];
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
class CnbiCube {
    //return Object.create(null);

    static cubeProperty = 'cube';


    constructor(cube) {
        //this.cubeProperty = "cube";
        if (typeof(cube) === 'object') {
            Cnbi.apply(this, cube);
        } else {
            // TODO 如果传参是ID，找缓存数据，如果没有，则根据id号请求cube数据
        }
    }

    static getCubePropertyById(id) {
        return CnbiCube.cubeProperty + '_' + id;
    }

    static getCube(id) {
        let key = CnbiCube.getCubePropertyById(id);
        return Cnbi[key];
    }


    static async getCubeById(id, isInit = false) {
        let res = await FIND_DATA_CUBE(id);
        let cube = res.data.code == 200 ? res.data.data : null;
        if(null  == cube){
          cube = res.data;
          if(typeof cube === "string"){
             cube = eval("("+cube+")");
          }
        }
        if (cube) {
            if (cube.rows && cube.rows.length > 0) {
                cube.fixed = 1; //李宁忘了，我暂时在这里写上这一行！
            }

            if (!isInit) {
                return cube;
            }
            let cubeObj = new CnbiCube(cube);
            if (isInit) {
                await cubeObj.init(cube);
            }
            return cubeObj;
        } else {
            console.warn('可能传入了错误的cubeId');
            return null;
        }

    }

    /**
     * 设置参数
     */
    setParams() {}

    generateDims(needDims,dims){
      let rows = [],size = 1;
      for(let key in needDims){
           let bean = needDims[key];
           size = size*bean.datas.length;
           let tempArr = [];
           bean.datas.forEach(data=>{
            let record = {};
            record[key] = data.text;
               tempArr.push(record);
           });
           rows.push(tempArr);
      }
       rows = rows.sort(function(a,b){
          return b.length-a.length;
       });

       let dims1 = rows[0];
       let dims2 = rows[1];
       let results = [];
       dims1.forEach(data1=>{
         let record = {};
         Cnbi.apply(record,data1);
         dims2.forEach(data2=>{
             Cnbi.apply(record,data2);
         });
         results.push(record);
       });
       alert(JSON.stringify(results))
     
      console.log(size,rows)
      return rows;
    }

    /**
     * 生成变量,行，列，单表头，多表头，行列转置逻辑
     */
    generateProperties() {
        let nds = this.needDims,
            ge = this.generater;
        if (ge) {
            let ds = null;
            if (ge.period  && nds.year && nds.month) {
                //年与月二维组成的合并维度 year+month = period,改变任一year或month都会调到这儿来的
                let period = ge.period;
                ds = generatePeriod(period.periodCount, period.compareType, nds.year, nds.month, nds.reverse, urlParams); //count,fomular,year,month,reverse
            } else if (ge.needDims) {
              ds = this.generateDims(nds,ge.needDims);
            } else {

            }
            if (ge.reverse) {
              ds = ds.reverse();
             }
            this[ge.varName] = ds;
        }
    }

     //进行格式化操作
    colFormatter(value,col){
      let formatter = col.formatter;
      value = value || 0.00 ; 
      if(formatter && formatter[col.type]){
          let fors = formatter[col.type];
          if(fors.millesimal){ //如果配制了千分位  保留两位小数
              value =  Math.get_thousand_num(value.toFixed(fors.digit||2));
          }
          if(fors.prefix){//如果有前缀
              value = fors.prefix+value;
          }
          if(fors.subfix){//如果有后缀
              value = value+fors.subfix;
          }
            
      }
      return value;
    }

    getValue(value,col){
       if(col.render){
          let val = col.render(value);
          return val || value;
       }
       return this.colFormatter(value,col);

    }

    getColumnById(colId){
      return this.columns.filter(col=>{
         if(col.id == colId){
           return col;
         }
      })[0];
    }

    /**
     * 根据col.renderFormatter动态生成render函数，这个函数在执行格式化之后
     */
    generateRender(col){
      let filters = col.renderFormatter;
      let exp = CnbiCube.getFormatterFilterConditions(filters,"value");
      col.render = eval('(' + exp + ')');
    }

    /**
     * 设置列属性
     * @param scope
     */
    setCloumnType(scope) {
        let columns = scope.columns || scope;
        let deli = false;
        columns.forEach(col => {
            if (Array.isArray(col)) {
                this.setCloumnType(col);
                deli = true;
            } else if(col.renderFormatter){
                this.generateRender(col);
            }
        });
        console.info(columns)
        if (!deli) scope.grantType = true;
    }

    /**
     * 执行前置函数，设置参数什么的
     */
    excuteFunctions(functionNames, scope) {
        functionNames.forEach(functionName => {
            if (scope[functionName]) {
                scope[functionName].call(scope, scope);
            }
        });
    }

    /**
     * 设置列项目数据
     */
    setFactParams(columns) {
        let arr = [];
        //  debugger;
        columns.filter(item => {
            if (!item.render && !item.ignore && item.type === 'decimal' && item.id) {
                let ss = (item.id + '').indexOf('_');
                if (ss == -1) {
                    arr.push(item.id);
                }

            }
        });
        return arr.join(',');
    }

    /**
     * 设置行项目数据
     */
    setItemParams(rows, params) {
        let arr = [];
        rows.filter(item => {
            if (!item.ignore && item.id) {
                let id = Cnbi.varReplace(item.id + '', params);
                arr.push(id);
                if (item.id_) {
                    arr.push(item.id_);
                }
            }

        });
        return arr.join(',');
    }

    /**
     * {"cubes": [292], "dimName": "itemperiod", "subject": "0002", "calculabled": 1, "datasourceId": "68"}
     * 从后端拿数据
     */
    async findData(params, needDims, rows, columns) {
        let dimName = params.dimName; //生成行项目的属性东东
        if (!dimName) {
            throw new Error('没有配制行主维度【dimName】信息！');
        }
        if (!params.dims) {
            params.dims = {};
        }
        for (let key in needDims) {
            if (key != 'unit' && key != dimName) {
                params[key] = needDims[key].id;
            }
        }
        if (params.year && params.month) {
            let mm = params.month - 0;
            if (mm < 10) {
                mm = '0' + mm;
                params.month = mm;
            }
            params.period = params.year + '' + mm;
        }
        if (!params.cubeId) {
            params.cubeId = 2; //写了一个临时的
            delete params.dimName;
        }
        if (!params.dims[dimName]) { //如果参数里没有主维度信息，就从rows里生成
            params.dims[dimName] = this.setItemParams(rows, params);
        }
        if (!params.fact) { //如果参数里没有主度量信息，就从columns里生成
            params.fact = this.setFactParams(columns);
        }
        console.log(this.text + '的参数是：', params);
        let res = await findThirdPartData(params);
        console.log('从后端拿数据res:', res);
        return res.data.code == 200 ? res.data.data : null;
    }

    /**
     * 获取模型数据
     */
    async getModelDatas(scope) {
        let type = scope.dataType || scope.config.dataType;
        let params = {};
        Cnbi.copyDatas(params, scope.config);
        switch (type) {
            case 'sql':
                scope.datas = await this.findData(params, scope.needDims, scope.rows, scope.columns);
                console.info(scope);
                break;
            case 'cube':
                scope.datas = await this.findData(params, scope.needDims, scope.rows, scope.columns);
                break;
            case 'defined':
                scope.datas = scope.datas;
                break;
            case 'calculate':
                Cnbi.Msg.info(scope.id + '表配制了跨表计算的');
                break;
            default: //random
                scope.datas = await createRandomDatas(scope);
                break;
        }
    }

    getDataHandler(scope) {
        // debugger
        if (!this.dataCube) {
            this.dataCube = new DataHandler(scope);
        }
        return this.dataCube;
    }

    /**
     * TODO 列字段排序，上移下移
     * @direction 上=1； 下=-1
     */
    sortColumns(index, direction) {
        //
        this.autoSaveTask();
    }

    /**
     * 隐藏列
     */
    hideColumns(index, val) {
        this.columns[index].hidden = val;
        this.autoSaveTask();
    }

    /**
     * 添加过滤
     */
    addFilter(filter) {
        this.filters.push(filter);
        this.autoSaveTask();
    }

    /**
     * 保存数据
     */
    saveCube() {
        // 点击保存时调用
        // TODO 持久化到后端 保存成功有是否清楚本地缓存数据？
    }

    /**
     * 定时自动保存到本地
     */
    autoSaveTask() {}

    removeFilter() {}

    editFilter() {}

    /**
     * 获取数据之后的处理
     */
    dataHandlerAfter() {
        let dataCube = this.getDataHandler(this);
        let type = this.dataType || this.config.dataType;
        if (type != 'defined') {
            dataCube.configRowAdapt(this);
            if (type != 'calculate') {
                dataCube.cubeDataHandler(this); //列计算的，以后还要加行计算的
            }
        }
        // TODO：解析config.sort,如果有排序，解析排序操作
    }

    async setModelDatas(scope) {
        await this.excuteFunctions(prefixExcuteFunctionNames, scope);
        await this.getModelDatas(scope);
        await this.excuteFunctions(subfixExcuteFunctionNames, scope);
        //TODO parseCube();
        return this.datas;
    }

    static getFunTemplate(exp,content,params,execute) {
        let sb = '('+params+')';
        let fun =  'function '+sb+'{if(' + exp + '){   '+content+' ; }}';
        if(execute){//是否执行
          fun = fun+sb;
        }
        return fun;
    }
    /**
     * 获取列函数
     */
    static getFunReturn(filter){
      let type = filter.type;
      let bean = {};
      if(type && type.icon){
        bean.icon =  type.icon;
      }
      if(type && type.css){
        bean.css =  type.css;
      }
      return bean;

    }
    /**
     * 表达式语法转义
     */
    static logic = {
      "and":" && ",
       "or":" || "
    }
    
    /**
     * 获取前端逻辑关系：没有默认为 && 
     */
    static getFrontLogicSymbol(filter){
      if(!filter.logicSymbol){
        return  CnbiCube.logic.and;
      }
      return CnbiCube.logic[filter.logicSymbol];
    }
     
   /**
    * 获取多条件合并的表达式
    * type && type == 1 ==> (ss> 0 && bb < 0 )
    */
    static getChildrenFilterTemplate(filters,params,type){
      let exp = '';
      filters.forEach((filter, index) => {
        if (index > 0) {
          exp += CnbiCube.getFrontLogicSymbol(filter);
        }
        let pp = params;
        if(type){
          pp = pp+filter.field
        }
        exp+= CnbiCube.getTempFun(filter,pp);
      });
      return exp;
    }

    /**
     * 获取 bb = 334 的表达式
     */
    static getTempFun(filter,params){
      let val = isNaN(filter.value) ? '\'' + filter.value + '\'' : filter.value;
      return  params +  filter.calcSymbol + ' ' + val;
    }

    /**
     * 动态生成格式化函数 formatter
     */
    static getFormatterFilterConditions(filters,params){
      if (!filters || filters.length == 0) return;
      let tempArr = [];
      filters.forEach((filter, index) => {
          let children = filter.children,temp = "";
          if(children && children.length > 0 ){
            temp = CnbiCube.getChildrenFilterTemplate(children,params);  //if(ss> 0 && bb < 0 ){}
          }else{
            temp = CnbiCube.getTempFun(filter,params);
          }
          tempArr.push('if(' + temp + '){     return '+JSON.stringify(CnbiCube.getFunReturn(filter))+' ; }');
      });
      let exp = tempArr.join(";");
      return  "function("+params+"){"+exp+"}";
    }
    /**
     * 获取cube.filters的条件 
     */
    static getFilterConditions(filters,params){
      if (!filters || filters.length == 0) return;
        let exp = '';
        filters.forEach((filter, index) => {
            if (index > 0) {
                exp+= CnbiCube.getFrontLogicSymbol(filter);
            }
            let children = filter.children;
            if(children && children.length > 0 ){//ss> 0 && bb < 0 )
              exp+= "("+CnbiCube.getChildrenFilterTemplate(children,params,1)+")";  //if(ss> 0 && bb < 0 ){} 
            }else{
              exp+= CnbiCube.getTempFun(filter,params+filter.field);
            }
            
        });
        return exp;
    }

    /**
     * 前端过滤函数cube.filter
     * var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
     *  return new Fn('return ' + fn)();
     */
    filter(filters,datas) {
        let valueVarName = "data";
        let exp = CnbiCube.getFilterConditions(filters || this.filters,valueVarName+".");
        if(!exp){
          return null;
        }
        exp = CnbiCube.getFunTemplate(exp," return "+valueVarName,valueVarName,1);
        console.log(exp, typeof exp);
        datas = datas || this.datas;//马军要加的
        return datas.filter(data => {
            // 如果过滤异常，直接返回原数据
            if (eval('(' + exp + ')')) {
                return data;
            }
        });
    }

    /**
     * 预警功能
     * 拿到预警对象，生成模版函数getFunTemplate，如满足条件，则执行预警任务接口
     */
    warnFilter() {

    }

    /**
     * 更新方法
     */
    update(key, value) {
        this[key] = value;
        return this.init();
    }

    setScopeToWindow(){
      let key = CnbiCube.getCubePropertyById(this.id); //置入全局统一对象管理中，一个数据集，只创建一次，其它都只做update操作
      Cnbi[key] = this;
      console.log('初始化了:' + key, Cnbi[key]);
    }

    /**
     * 初始化
     */
    async init(cube) {
        if (cube) {
            Cnbi.apply(this, cube);
        }
        let cubes = this.config.cubes;
        if (cubes && Array.isArray(cubes)) {
            for (let i = 0, len = cubes.length; i < len; i++) {
                 await CnbiCube.getCubeById(cubes[i], true);            
            }
        }
        await this.setParams(); // 设置参数
        await this.generateProperties(); // 生成变量,行，列，单表头，多表头，行列转置逻辑
        await this.setCloumnType(this); // 设置列属性
        await this.setModelDatas(this); // 统一取数数据
        this.setScopeToWindow();
      
    }
}

/**
 * 数据处理类
 * 作者：龚佳新
 */
class DataHandler {
    constructor(cube) {
        // this.cube = cube; // jhb注释，出现循环引用
    }
    /**
    * @desc    : 对数据进行排序处理
    * @author  : ht
    * @creatdate : 2019-05-14
    */
    sortColumn (sort, preDatas) {
     //  debugger;
      // console.log(sort.type, '我在做排序');
      let val = sort.direction;
      let ids = sort.field;
      if (sort.type === ('number' || 'decimal')) {
        if (val === 'asc') {
          preDatas.sort((a, b) => (a[ids] - b[ids]));
        } else if (val === 'desc') {
          preDatas.sort((a, b) => (b[ids] - a[ids]));
        }
      } else { // 如果是文本类型排序就在这里做
        if (val === 'asc') {
          preDatas.sort((a, b) => (a[ids].localeCompare(b[ids])));
        } else if (val === 'desc') {
          preDatas.sort((a, b) => (b[ids].localeCompare(a[ids])));
        }
      }

      // console.log(preDatas, '排序');
    }

    /**
     * 让查出的数据与固定的排序一致
     */
    sortTableDatas(cube) {
        let rows = cube.rows;
        if (rows.length > 1) {
            let tempDatas = [],
                datas = cube.datas;
            rows.forEach(row => {
                let record = datas.filter(data => data.id === row.id)[0];
                if (record)
                    tempDatas.push(record);
            });
            if (tempDatas.length > 0) {
                cube.datas = tempDatas;
            }
        }
    }

    /**
     * 数据与模版顺序一致
     */
    setRecordPropertis(cube) {
        let configRows = cube.rows;
        if (cube.id === 288) { //资产负责表恶心的表
            let rows = configRows;
            cube.dbDatas = cube.datas;
            let tempRows = [];
            rows.forEach(row => {
                tempRows.push(row);
            });
            cube.datas = tempRows;
            return;
        }
        cube.datas.forEach(data => {
            if (data.id) {
                let configRow = configRows.filter(row => row.id === data.id)[0];
                if (configRow) {
                    Cnbi.applyIf(data, configRow); //使配制的属性一致
                    if (!cube.useDbName && configRow.text) { //不使用数据库的名称,即使用配制的名称
                        data.text = configRow.text;
                    }
                }
            }
        });
    }

    /**
     * 数据与模版顺序一致
     */
    configRowAdapt(cube) {
        if (cube.fixed && cube.dataType === 'random') {
            return; //如果是固定模版
        }
        this.setRecordPropertis(cube);
        this.sortTableDatas(cube);
    }

    /**
     * 列单位转换
     */
    convertUnit(new_unit, datas, columns, older_unit) {
        if (new_unit == 1 && (!older_unit || older_unit == 1)) {
            return datas;
        }
        datas.forEach(record => {
            columns.forEach(col => {
                if (!col.unit && record[col.id] && col.type === 'decimal') {
                    if (older_unit) {
                        if (new_unit > older_unit) {
                            record[col.id] = record[col.id] / (new_unit / older_unit);
                        } else {
                            record[col.id] = record[col.id] * (older_unit / new_unit);
                        }
                    } else {
                        record[col.id] = record[col.id] / new_unit;
                    }
                }
            });
        });
        return datas;
    }

    /**
     * 列配制项处理  value,record,cube
     */
    colRenderHandler(table) {
        try {
            let columns = table.columns;
            table.datas.filter(data => {
                columns.filter(col => {
                    if (col.render && true) {
                        //debugger;record,value,col,scope
                        if (typeof col.render == 'string') {
                            col.render = eval('(' + col.render + ')');
                        }
                        data[col.id] = col['render'].call(this, data, data[col.id], col, table);
                    }
                });
            });
        } catch (e) {
            console.error(e);
            // Cnbi.Msg.error(e);
            // Cnbi.Msg.toast("列配制项处理出错了"+e.message);
        }
    }

    /**
     * 获取数据处理对象
     */
    getDataCalculator(scope) {
        if (!this.dataCalculator) {
            this.dataCalculator = new DataCalculator(scope);
        }
        return this.dataCalculator;
    }


    /**
     * 列计算功能
     * (A-asntq)*100/A
     */
    calcColData(cube){
      this.dataCalculator = this.getDataCalculator(cube);
      let  columns = cube.columns;
      cube.datas.forEach(record => {
        columns.forEach(col => {
          if (col.type === 'decimal' && col.fomular) {
            //datas,fomular,record,rows
              let val =  this.dataCalculator.colFomularParser(col.fomular,record,cube.datas,cube.rows);
              record[col.id] = val;
          }
        });  
      });
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

    calcRowData(cube) {
        this.dataCalculator = this.getDataCalculator(cube);
        let rows = cube.rows,
            datas = cube.datas,
            columns = cube.columns,
            dbDatas = cube.dbDatas;
        datas.forEach(data => {
            if (data.id) {
                let configRow = this.dataCalculator.getRecordById(rows, data.id); //看下配制行中是不是有配制的公式,为了简化配制而设定的,不建议这么配制，但为了兼容以前的项目，还是加上解析吧！
                columns.forEach(col => {
                    if (col.type === 'decimal' && !col.fomular) {
                        let val = data[col.id];
                        if (isNaN(val) ||  configRow.fomular) {
                            if (configRow.fomular) {
                              debugger;
                                //如果是在行上配制的公式[3501+3502]，在这里动态给其组装成完整的公式
                                val = this.dataCalculator.rowFomularParser(datas, configRow.fomular, rows, col.id);
                            } else { //如果是配制单元格公式的这么办很OK
                                val = this.dataCalculator.getRealValue(val, datas, rows);
                            }
                        } else if (!val) {
                            if (cube.id === 288 && dbDatas) {
                                let cLen = col.id.length,
                                    rId = 'id',
                                    rcolId = col.id;
                                if (cLen > 1) {
                                    rId += this.dataCalculator.dubbleSubfix;
                                    rcolId = rcolId.substring(0, cLen - this.dataCalculator.dubbleSubfix.length);
                                }
                                let record = this.dataCalculator.getRecordById(dbDatas, configRow[rId]);
                                if (record) {
                                    val = record[rcolId];
                                } else {
                                    console.warn('没有真实数据【' + rId + '】');
                                }
                            }
                        }
                        data[col.id] = val;
                    }
                });
            }
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
    cubeDataHandler(cube) {
        if (cube.datas.length != cube.rows.length) {
            console.warn('查询出的数据与预期的数据长度不一致，还没有处理！' + cube.datas.length + ' VS ' + cube.rows.length);
        }
        if (cube.needDims.unit) { //单位转换
            this.convertUnit(cube);
        }
        if (cube.config.sum) { //如果配制了合计的
            this.sumTable(cube);
        }
        if (cube.config.calculabled) { //配制了行计算的
            this.calcRowData(cube);
        }
        if (cube.config.cellCalculabled) { //配制了单元格计算的
            //this.calcRowData(cube);
        }
        //this.colRenderHandler(cube);
        this.calcColData(cube); //表内列计算

        let sort = cube.config.sort;
       if(sort){
         this.sortColumn(sort,cube.datas);
       }
      
    }
    /**
     * 行合计
     */
    sumTable(table) {
        let total = {},
            sum = table.config.sum;
        let type = sum.type || 'decimal';
        Cnbi.apply(total, sum);
        delete total.type;
        table.columns.forEach(col => {
            if (col.type === type && !col.render) {
                total[col.id] = table.datas.reduce(function(prev, cur) {
                    return cur[col.id] + prev;
                }, 0);
            } else {
                let ba = table.needDims[col.id];
                if(ba){
                  let _record = null;
                  if(ba.id){
                      _record = ba.datas.filter(bb=>bb.id == ba.id)[0];
                  }else if(ba.index){
                      _record = ba.datas[ba.index];
                  }else if(!total[col.id]){
                      total[col.id] = ba.text;
                  }
                  if (_record) {
                      total[col.id] = _record.text;
                  }
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

    constructor(cube) {
        // this.cube = cube;
        this.recordIndex = 'id';
    }

    dubbleSubfix = '_';

    /**
     * 供给动态计算给的临时对象
     */
    getDubbleRealDatas(record, dubbleSubfix) {
        let data = {};
        for (let key in record) {
            let len = key.length,
                lastStr = key.substring(len - 1, len);
            // debugger;
            if (lastStr === dubbleSubfix || lastStr === '2') {
                data[key.substring(0, len - 1)] = record[key];
            }
        }
        return data;
    }

    /**
     * 获取配制行
     */
    getRecordById(rows, rowId) {
        let record = rows.filter(item => item[this.recordIndex] === rowId)[0];
        if (!record) {
            //双列表格的中国式报表
            let dubbleSubfix = '_';
            let property = this.recordIndex + dubbleSubfix;
            // debugger;
            record = rows.filter(item => item[property] === rowId)[0];
            if (record) {
                return this.getDubbleRealDatas(record, dubbleSubfix);
            }
        }
        return record;
    }

    /**
     * 通过正则获取参数数组
     */
    getFomularParams(fomular, reg) {
        let setObj = new Set(fomular.match(reg, ''));
        return Array.from(setObj).sort((a, b) => {
            return b.length - a.length;
        }); //match(/[a-zA-Z_]+[\w]*/g,"")
    }

    /**
     * 配制行公式来的
     * "[1101+1102]".match(/(\d+)/g, "")
     *
     **/
    rowFomularParser(datas, fomular, rows, colId) {
        let params = this.getFomularParams(fomular, (/(\d+)/g));
        return this.fomularHandler(params, fomular, datas, colId, rows);
    }
    /**
     * 配制列公式来的
     * (A-asntq)/asntq*100
     * 变形成单元格函数
     * Math.avg("A,B,C")
     *  /^((?!Math\.avg).)+$/.test('Math.avg(A,B,C)');
     */
    colFomularParser(fomular,record,datas,rows){
      let params = this.getFomularParams(fomular,/[a-zA-Z_]+[\w]*/g);
      params.forEach(item => {
        //fomular = fomular.replaceAll(item,item+"$"+record.id);
        if(item == "Math" || item  == "avg"){

        }else{
          fomular = fomular.replaceAll(item,"record."+item);
        }
      });
      //再次按单元格公式获取数据
      //return this.fomularParser(datas,fomular,rows);
      return eval("("+fomular+")");
    }

    /**
     * 获取公式一个参数的值并在公式中进行替换操作
     */
    getParamsValue(param, fomular, datas, colId, rowId, rows, cubeId) {
        let val = 0.00;
        if (!cubeId) {
            val = this.getCellValue(datas, colId, rowId, rows);
        } else {
            let cube = CnbiCube.getCube(cubeId);
            val = this.getCellValue(cube.datas, colId, rowId, cube.rows);
            console.log(rowId + '【' + this.getRecordById(rows, rowId).text + '】跨表参数【' + cubeId + '!' + colId + '$' + rowId + '】==' + val + '公式解析成功');
        }
        if (val < 0) {
            val = '(' + val + ')';
        }
        if (!val) {
            console.error(rowId + '【' + this.getRecordById(rows, rowId).text + '】请检查公式的配制，去找搞这个公式的人核实更改去吧：' + fomular);
            val = 0;
        } else {
            //console.info(colId+"$"+rowId+"==>"+fomular+"=="+val);
        }
        val =  fomular.replace(param, val);
      //  alert(val)
        return val;
    }

    /**
     * 公式核心解析
     * 1101+1102 -colId
     * A$1101+B$1109
     * 195!A$1101+95!B$1109
     */
    fomularHandler(params, fomular, datas, colId, rows) {
        try {
            let cubeId = 0;
            params.forEach(item => {
                let array = item.split('$'),
                    len = array.length;
                if (len < 3) {
                    let tempColId = colId,
                        rowId = array[0];
                    if (len == 2) {
                        tempColId = array[0];
                        rowId = array[1];
                        let cubeArray = tempColId.split('!');
                        if (cubeArray.length > 1) {
                            //alert("有跨表的来了："+fomular);
                            cubeId = cubeArray[0];
                            tempColId = cubeArray[1];
                        }
                    }
                    fomular = this.getParamsValue(item, fomular, datas, tempColId, rowId, rows, cubeId);
                } else {
                    console.error(fomular + '公式还没来得及解析呢！');
                    return 0.00;
                }
            });
            let val =  eval(fomular);
            console.info(fomular+"===="+val);
            return val;
        } catch (error) {
            console.error(fomular + '解析出错了！');
            console.trace();
            return 0.00;
        }


    }

    /**
     * 获取公式单元格数据
     * "A$1403100-A$1426801-292!A$1400901".match(/(\d+)\!(\w+)\$(\d+)|(\w+)\$(\d+)|(\w\d+)\$(\d+)/g, '')
     * /(\w+)\$(\d+)|(\w\d+)\$(\d+)/g
     */
    fomularParser(datas, fomular, rows) {
        let params = this.getFomularParams(fomular, /(\d+)\!(\w+)\$(\d+)|(\w+)\$(\d+)|(\w\d+)\$(\d+)/g);
        return this.fomularHandler(params, fomular, datas, null, rows);
    }

    /**
     * 获取真实数据
     */
    getRealValue(value, datas, rows, colId) {
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
            return this.getRealValue(record[colId], datas, rows);
        }
        console.error('配制了不存在的行项目：' + rowId + '--' + colId);

    }

    /**
     * 获取单元格数据 A$1111011
     */
    getCellValue(datas, colId, rowId, rows) {
        if (Array.isArray(datas)) {
            return this.getRecordCellValue(datas, colId, rowId, rows);
        }
        colId = colId.replace('_', '');
        let key = (colId + '$' + rowId);
        if (datas[key]) {
            console.info(key + '==>' + datas[key]);
            return datas[key];
        }
        let row = this.getRecordById(rows, rowId);
        if (row) {
            return this.getRealValue(row[colId], datas, rows);
        } else {
            console.error('配制了错误的行：' + rowId);
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
            console.info(cell + '==>' + datas[cell]);
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