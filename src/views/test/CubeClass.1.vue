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
    <el-table
      v-if="cubeObject && cubeObject.datas"
      :data="cubeObject.filter(cube.filters)|| cubeObject.datas"
      style="float:right;width:65%;">
      <el-table-column v-for="col in cube.columns" v-bind:key="col.id"
                       :prop="col.id"
                       :label="col.text"
      >
      </el-table-column>

    </el-table>
  </div>
</template>
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
</style>

<script type="text/ecmascript-6">
import CnbiCube from 'utils/cubeClass';
import {mapGetters, mapActions} from 'vuex';
import store from '@/store';
import {FIND_DATA_CUBE} from '~api/cube';
import { getClientParams } from "../../utils/index";
export default {
  name: '',
  components: {},
  data() {
    return {
      cube: {//http://192.168.2.245:8005/api/find_data_cube?cubeId=24
        id: 24,
        text: '营业收入趋势分析表',
        dataType: 'random',//类型【sql,cube,defined,random】
        config: {
          type: 1,//"/1/2", //数据源组装类型 [1:数组类型,2对象cell类型],必选项目
          hidden: true,
          dimName: 'period',
          useDbName: true,//默认使用数据库的名字
          group: {
            id: 'period' //201905
          },
          sum: {
            id: '00',
            text: '行合计',
            type:"decimal"
          },
          sort:{
            direction:"asc",//asc,desc,
            field:"A"
          },
          //本期数默认为环比，累计数默认为同比
          compares:[{
             type:1,//1：环比2,同比，3：自定义比较 
             field:"period",
             fact:"A",
             data:"0&-5",
             fomular:"(A-asntq)/asntq*100",//率  ，额=A-asntq,
             currentPeriod:"0&10",//201805  3：自定义比较，可选项
          }]//==>根据此数据动态生成column对象push到columns里去
        },
        //"interceptorBefore":"funName",//执行前置函数
        columns: [{
          id: 'id',
          text: '编码',
          type: 'index',
          hidden: true
        }, {
          id: 'text',
          type: 'string',
          text: '期间'
        }, {
          id: 'itemperiod',
          type: 'string',
          text: '项目'
        }, {
          id: 'A',
          text: '本期',
          type: 'decimal'
        }, {
          id: 'asntq',
          type: 'decimal',
          text: '本期上年同期',
          hidden: true
        }, {
          id: 'azje',
          text: '增减额',
          type: 'decimal',
          align:"left",//left,right,center
          fomular:"(A-asntq)*100/A",//设置的列公式
          formatter:{}, //格式设置，decimal,date区分
          renderFormatter:[{//设置的条件
            calcSymbol: '>=',
            field: 'id',
            id: 1,
            type: 1,
            value: '#000'
        }],
         render: function (record, value, col, scope) {//根据条件动态执行的函数
            return (record.A - record.asntq).toFixed(2);
          },
        }, {
          id: 'zjv',
          text: '增减率(%)',
          type: 'decimal',
          fomular:"(A-asntq)*100/A",
          linkage:{//联动，就设置一变量，其它资源监听到设置的变量变了，资源就更新了
             target:1,//url  -->当是url时，参数可以带在里面{}
             params:[{
                id:"参数的名字，也就是target=1里面的 needDims里的字段，比如：company,item,year,month,period",
                value:`${value}`,//record[params.id]
             }],
          },
          drill:{//下钻，点击到目标资源，并选择指定指定，带入到目标资源
             target:1,//url  -->当是url时，参数可以带在里面{}
             params:[{
                id:"参数的名字，也就是target=1里面的 needDims里的字段，比如：company,item,year,month,period",
                value:`${value}`,//record[params.id]
             }]
          },
          render: function (record,value) {
            return value+ '%';
          },
        },{
          id: 'hj',
          type: 'decimal',
          text: '行合计',
         "fomular":"(A-asntq)*100/A",
          hidden: false
        }],
        rows: [{id: '1100110', text: '营业收入', fomular: '0001!A$111011+0003!B$111002'}],
        //"dataHandlerBefore":"funName",//执行后置函数 单位转换，再执行列运算，如有配制有行计算的话，则执行calcRows
        filters: [{
          calcSymbol: '>=',
          field: 'id',
          id: 1,
          type: 1,
          value: '201801'
        }, {
          calcSymbol: '<',
          field: 'id',
          id: 2,
          type: 1,
          value: '201804'

        }],//生成的filters
        warnFilters: [],//预警的filters,
        datas: [
          {"A":"0","C":null,"E":"0","G":null,"I":"49","K":"9432.03","M":"46","O":"8778.67"},
          {"A":"9","C":"28832.13","E":"9","G":"26880.63","I":"38","K":"86649.9","M":"39","O":"86110.13"},
          {"A":"2","C":"15172.62","E":"4","G":"35129.05","I":"20","K":"150235.25","M":"18","O":"135155.11"},
          {"A":"21","C":"714542.44","E":"19","G":"660478.82","I":"32","K":"1029764.35","M":"31","O":"848674.66"},
          {"A":"5","C":"2740693.62","E":"5","G":"2557783.63","I":"6","K":"1974248.89","M":"7","O":"2025478.27"}
          ],//初始化后的数据，渲染表，图，文字的数据来源
        cube: { //数据的排法，此对象没有的话
          dims: [{id: 'period', text: '期间'}],//维度
          facts: [//默认为columns  总列数 =  2 *2 *3 + dims.length == drill_columns.length
            {id: 'ogtType', index: 1, items: [{text:"二级企业"},{text:"三级企业"}]},
            {id: 'period', index: 2, items: 'generater', items: [{text:"本期"},{text:"上年同期"}],pid:"ogtType"},
            {
              id: 'fact', index: 3, items:
                [{id: 'A', text: '户数'},
                  {id: 'B', text: '占比'},
                  {id: 'C', text: '金额'}]
              ,pid:"period"
            }
          ],//度量

        },

        needDims: {//sql==>params==>{commpany:1,period:201805}  保存sql的时候，根据sql参数表拼装sfilter字段{commpany:1,period:201805}，查询sql时，把filters一起查出来！
          //data_dash_json表加了一个sfilter字段
          year: {id: '2018', text: '2018年', datas: []},
          month: {id: 5, text: '5月', datas: []},
          company: {id: 1, text: '江苏农垦', datas: []},
          itemperiod: {id: '1100110', text: '营业收入', datas: []}
        },
        generater: {//通过它来生成动态的行列数据
          periodCount: 6,
          compareType: '0&-1',
          varName: 'rows',
          reverse: false
        }
      },
      jsonCube: '',
      cubeObject: null,

    };
  },
  created() {
    let bean = getClientParams();
    if(bean.id){
      this.cube.id = bean.id;
    }
    this.initView(); // 初始化视图
  },
  watch: {
    year(newyear) {
      let params = store.state.param.command;
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

    async requestCube(id) {
      let res = await FIND_DATA_CUBE(24);
      return res.data.code == 200 ? res.data.data : null;
    },

    fun2String() {
      console.info();
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
     // this.cube =  await CnbiCube.getCubeById(this.cube.id); // 用295测试
     // if(this.cube.id === 288){
       // this.cube.fixed = 1;
      //}
      debugger;
      this.cubeObject = new CnbiCube(this.cube)
      await this.cubeObject.init();
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

    }
  }
};
</script>
