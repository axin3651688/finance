<template>

  <div>
    <h2>{{cube.text}}</h2>
    <div style="padding-right:15px;float:left;width:35%;">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="jsonCube"
        maxlength="35000"
        rows="38"
        @change="(oldval, newval) => cubeChange(oldval, newval)"
        show-word-limit
      >

      </el-input>
    </div>
    <el-table v-if="flag && cubeObject.config.sum"
      :data="cubeObject.filter(cube.filters)|| cubeObject.datas"
       border
      :stripe="true"
      show-summary
      :summary-method="getSummaries"
      :cell-style="cellStyle"
      :row-style="rowStyle"
      @cell-click="onCellClick"
      :span-method="objectSpanMethod"
      style="float:right;width:65%;"
    >
    <bi-table-column-tree v-for="cc in cube.columns" v-bind:key="cc.id" :col="cc" :cube.sync="cubeObject" ref="tchild" v-if="!cc.hidden"/>
    </el-table> 



      <el-table v-if="flag && !cubeObject.config.sum"
      :data="cubeObject.filter(cube.filters)|| cubeObject.datas"
       border
      :stripe="true"
      :cell-style="cellStyle"
      :row-style="rowStyle"
      @cell-click="onCellClick"
      :span-method="objectSpanMethod"
      style="float:right;width:65%;"
    >
    <bi-table-column-tree v-for="cc in cube.columns" v-bind:key="cc.id" :col="cc" :cube.sync="cubeObject" ref="tchild" v-if="!cc.hidden"/>
    </el-table> 
  </div>
</template>
<script type="text/ecmascript-6">
import CnbiCube from 'utils/cubeClass';
import {mapGetters, mapActions} from 'vuex';
import store from '@/store';
import {FIND_DATA_CUBE} from '~api/cube';
import { getClientParams } from "../../utils/index";
import BiTableColumnTree from "@c/table/BiTableColumnTree1";
export default {
  name: 'cubes',
  components: {
    BiTableColumnTree
  },
   computed: {
    getSum(){
      let flag =  cubeObject.config.sum?true:false;
      alert(flag)
      return flag;
    }, 
    getDatas() {
      debugger;
      if(cubeObject && cubeObject.datas){
         if(cubeObject.filter){
           debugger;
                return   cubeObject.filter(cube.filters)||cubeObject.datas
         }
        return cubeObject.datas;
      }
      return [];
    }
  },
  data() {
    return {
      flag:false,
      cube: {//http://192.168.2.245:8005/api/find_data_cube?cubeId=24
        id: 24,
        text: '营业收入趋势分析表',
        dataType: 'random',//类型【sql,cube,defined,random】
        config: {},
        //"interceptorBefore":"funName",//执行前置函数
        columns: [
          ],//度量
        rows:[],
        needDims: {
          year: {id: '2018', text: '2018年', datas: []},
          month: {id: 5, text: '5月', datas: []},
          company: {id: 1, text: '江苏农垦', datas: []}
        },
        generater: {//通过它来生成动态的行列数据
          periodCount: 6,
          compareType: '0&-1',
          varName: 'rows',
          reverse: false
        }
      },
      jsonCube: '',
      cubeObject: {
        config:{}
      },
      dfdfmergeColumnIndex:[0]
    };
  },
  created() {

    Math.avg  = function(){
      let arr  = arguments;
      if(arr.length < 2 ){
        console.error("调用此公式参数个数必须大于2哦！");
         returnx ;
      }
    
     return Math.sum(arr)/arr.length;
    }

    Math.sum = function(arr){
      if(!isNaN(arr)){
        arr = arguments;
      }
     let sum = 0;
     for(let  i=0,len = arr.length;i<len;i++){
       sum  = sum+arr[i];
     }
     return sum;
    }

    let bean = getClientParams();
    if(bean.id){
      this.cube.id = bean.id;
    }
    this.initView(); // 初始化视图
  },
  watch: {
    year(newyear) {
      let params = store.state.param.command;//
      debugger;
      console.log('改变', newyear);
      this.cube.needDims.year = {id: newyear, text: newyear + '年'};
      // this.initView();
    },
    month(newmonth) {
      debugger;
      console.log('改变', newmonth);
      this.cube.needDims.month = {id: newmonth, text: newmonth + '月'};
      // this.initView();
    },
    company(newId) {
      console.log('改变', newId);
      // this.updateView('company');
    }
  },
  computed: {
    ...mapGetters(['year', 'month', 'company', 'module_api', 'conversion', 'device'])
  },
  methods: {

    /**
     * 获取rowspan
     */
    getRowspan(value,col,rowIndex){
          let _colspan = 1,_rowspan= 0,count = 0,datas = this.cubeObject.datas;
          datas.forEach(data=>{
            if(data[col.id] === value){
                  count++;
            }
          });
          if (rowIndex % count === 0) {
                _rowspan = count;
          }
          return [_rowspan,_colspan]
    },

       
   /**
    * dims
    * facts
    * values
    * 
    */
    objectSpanMethod ({row, column, rowIndex, columnIndex}) {
      let _rowspan = 0,_colspan = 0 ; 
      let col = this.cubeObject.getColumnById(column.property);//配制json的当前列对象
      let value = row[col.id];
     
      //支持索引数组法
      this.mergeColumnIndex &&  this.mergeColumnIndex.forEach(colIndex=>{
          if(columnIndex === colIndex){
             let arr = this.getRowspan(value,col,rowIndex);
             _rowspan = arr[0];_colspan = arr[1]
        }
      });
      //支持config.sort法
      let sort = this.cubeObject.config.sort;
      if(sort && sort.field === col.id){
            let arr = this.getRowspan(value,col,rowIndex);
            _rowspan = arr[0];_colspan = arr[1]
      }
 
       if(_colspan > 0){
           return {rowspan: _rowspan,colspan: _colspan};
      }
        
    },
    rowStyle({row, rowIndex}){
        let configRow = this.cubeObject.rows.filter(item=>item.id == row.id)[0];
        console.info(rowIndex)
        if(configRow && configRow.css){
          return configRow.css;
        }
    },
     /**
     * 单元格样式处理，自己可以在自己的item里配制默认实现
     */
    cellStyle({row, column, rowIndex, columnIndex}) {
       let col = this.cubeObject.getColumnById(column.property);
       if(col && col.render){
           let bean = col.render(row[col.id],col);
           if(bean && bean.css){
             return bean.css;
           }
       }
       if(col && col.drill){
           return col.drill.css || "cursor:point;color:blue;";
       }

      if (this.cube.cellStyle && typeof this.cube.cellStyle == "function") {
        return this.cube.cellStyle(scope, this);
      }
    },

      /**
     * 单元格单击默认事件
     */
    onCellClickDefault(row, column, cell, event) {
      let col = this.cubeObject.getColumnById(column.property);
      let listener = col._drill || col.drill;
      if (col && listener) {
         alert("想干点啥："+JSON.stringify(listener)+"\n"+JSON.stringify(row));
      } else {
        console.info("没有设置事件");
      }
    },

     /**
     * 单元格单击事件
     */
    onCellClick(row, column, cell, event) {
      if (this.cube.onCellClick && typeof this.cube.onCellClick == "function") {
        return this.cube.onCellClick(row, column, cell, event, this);
      }
      this.onCellClickDefault(row, column, cell, event);
    },

    fun2String() {
    },

    //深拷贝
    deepClone(data) {
      let _data = JSON.stringify(data),
        dataClone = JSON.parse(_data);
      return dataClone;
    },

    functionReplacer(key, value) {
      if (typeof (value) === 'function') {
        if (key == 'render') {
          let fun = value.toString();
          return fun;
        }
        return;

      }
      if(key === "datas"){
        return ;
      }
      return value;
    },

    functionReviver(key, value) {
      if (key === '') return value;
      if (typeof value === 'string') {
        // var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
        var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
          match = value.match(rfunc);

        if (match) {
          var args = match[1].split(',').map(function (arg) {
            return arg.replace(/\s+/, '');
          });
          return new Function(args, match[2]);
        }
      }
      return value;
    },

    replaceVar(json) {
      json = json.replace('function anonymous', 'function');
      json = json.replace('function render', 'function');
      var reg = /\n(\n)*( )*(\n)*\n/g;
      json = json.replace(reg, '\n');
      this.jsonCube = json;
    },


    async initView() {
     this.cube =  await CnbiCube.getCubeById(this.cube.id); // 用295测试
     if(this.cube.id === 288){
       this.cube.fixed = 1;
      }
      this.cubeObject = new CnbiCube(this.cube)
      await this.cubeObject.init();
      this.flag  = true;
     console.info(JSON.stringify(this.cubeObject.datas));
      document.title = this.cube.text;
      //this.cube.datas = this.cubeObject.datas;
      this.jsonCube = JSON.stringify(this.cube, this.functionReplacer, 4);//使用四个空格缩进;
      this.replaceVar(this.jsonCube);

    },

    cubeChange(val) {
      var reg = /\n(\n)*( )*(\n)*\n/g;
      val = val.replace(reg, '\n');
      this.cube = JSON.parse(val, this.functionReviver);
      Cnbi.apply(this.cubeObject, this.cube);
      // this.initView();
      this.cubeObject.init();
      let a = {
        id: 1,
        text: 52,
        config: {}
      };
      let b = {
        id: 1,
        text: 52,
        config: {
          sql: 56
        }
      };

      let c = Cnbi.applyDeepIf(a, b);
      debugger;

    },
    getSummaries(param,rows) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
         let col = this.cubeObject.getColumnById(column.property);
      //   console.info(this.cubeObject.dataCube);
         if(col.type === "decimal"){
           let val = 0;
                  if(col.fomular){
                     let ss = {};
                   const record = data.map(item => {
                      ss[column.property] =  Number(item[column.property]);
                      return ss;
                   });
                     //val = this.cubeObject.dataCube.dataCalculator.colFomularParser(col.fomular,col);
                     val = 0.00;
                  }else{
                     const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                      val = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                          return prev + curr;
                        } else {
                          return prev;
                        }
                      }, 0);
                      val = this.cubeObject.colFormatter(val,col);
                      sums[index] = val;
                    }
                  }
         }
         });
        return sums;
      }
  }
};
</script>
<style type="text/css">
  .el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #ffffff;
    background-color: #353232;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  }
.toolbar {
  margin: 2px 0 5px 0;
}
.el-table {
  background-color: transparent !important;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}
/* 横向滚动条 12.26 */
.el-scrollbar__bar.is-horizontal > div {
  height: 0;
}
/* 数字靠右 */
/* .el-table td.is-center {
  text-align: right;
} */
.gutter {
  display: none;
}
</style>
