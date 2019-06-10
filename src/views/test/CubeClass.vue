
<template>
  
   <div>
      <h2>{{cube.text}}</h2>
      <div style="padding-right:15px;float:left;width:35%;">
     <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="jsonCube"
      maxlength="15000"
      rows="38"
      @change="(oldval, newval) => cubeChange(oldval, newval)"
      show-word-limit
    >
    
    </el-input>
     </div>
         <el-table
              :data="cubeObject.filter(cube.fiters)|| cube.datas"
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
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>

<script type="text/ecmascript-6">
import CnbiCube from "utils/cubeClass";
import { mapGetters, mapActions } from "vuex";
import store from '@/store'
export default {
  name: "",
  components: {},
  data() {
    return {
      cube:{//http://192.168.2.245:8005/api/find_data_cube?id=24
        id:"1000",
        text:"营业收入趋势分析表",
        dataType:"random",//类型【sql,cube,defined,random】
        config:{
           type:1,//"/1/2", //数据源组装类型 [1:数组类型,2对象cell类型],必选项目 
           hidden:true,
           dimName:"period",
           useDbName:true,//默认使用数据库的名字
           group:{
              id:"period"
           },
           sum:{
             id:"00",
             text:"行合计"
           }
        },
  //"interceptorBefore":"funName",//执行前置函数
      columns:[{  
             id:"id",
            text:"编码",
            type:"index",
            hidden:true
          },{  
            id:"text",
            type:"string",
            text:"期间"
          },{  
            id:"itemperiod",
            type:"string",
            text:"项目"
          },{
            id:"A",
            text:"本期",
            sort:"asc",//desc,
            type:"decimal"
        },{
            id:"asntq",
            type:"decimal",
            text:"本期上年同期",
            hidden:true
        },{
            id:"azje",
            text:"增减额",
            type:"decimal",
           // render:"A-B-C-D",//
            render:function(record,value,col,scope){
                return (record.A - record.asntq).toFixed(2);
            },
        },{
            id:"zjv",
            text:"增减率(%)",
            type:"decimal",
            render:function(record){
                return ((record.A - record.asntq)*100/record.A).toFixed(2)+"%";
            },
        }],
    rows:[{id:"1100110",text:"营业收入",fomular:"0001!A$111011+0003!B$111002"}],
   //"dataHandlerBefore":"funName",//执行后置函数 单位转换，再执行列运算，如有配制有行计算的话，则执行calcRows
   filters:[{   
          calcSymbol:">=",
          field:"id",
          id:1,
          type:1,
          value:"201801"
        },{
          calcSymbol:"<",
          field:"id",
          id:2,
          type:1,
          value:"201804" 

}],//生成的filters
   warnFilters:[],//预警的filters,
   datas:[],//初始化后的数据，渲染表，图，文字的数据来源
   cube:{ //数据的排法，此对象没有的话
        dims:[{id:"period",text:"期间"}],//维度
        facts:[//默认为columns
            {id:"ogtType",index:1,items:[]},
            {id: "period",index:2,items:"generater",items:["201605","201805"]},
            {id:"fact",index:3,items:
                [{id:"A",text:"XX"},
                {id:"B",text:"XX"},
                {id:"C",text:"XX"}]
            }
        ],//度量
      
     },
   
    needDims:{//sql==>params==>{commpany:1,period:201805}  保存sql的时候，根据sql参数表拼装sfilter字段{commpany:1,period:201805}，查询sql时，把filters一起查出来！
      //data_dash_json表加了一个sfilter字段
      year:{id:"2018",text:"2018年",datas:[]},
      month:{id:5,text:"5月",datas:[]},
      company:{id:1,text:"江苏农垦",datas:[]},
      itemperiod:{id:"1100110",text:"营业收入",datas:[]}
    },
    generater: {//通过它来生成动态的行列数据
        periodCount: 6,
        compareType: "0&-1",
        varName: "rows",
        reverse: false
    }
   },
    jsonCube:"",
    cubeObject:null,
    
    };
  },
  created() {
    debugger;
    this.cubeObject = new CnbiCube(this.cube);
    debugger;
    this.initView();
  },
   watch: {
    year(newyear) {
      let params = store.state.param.command;
      debugger;
        console.log("改变", newyear);
       this.cube.needDims.year = {id:newyear,text:newyear+"年"};
         this.initView();
    },
    month(newmonth) {
      debugger;
      console.log("改变", newmonth);
      this.cube.needDims.month = {id:newmonth,text:newmonth+"月"};
      this.initView();
    },
    company(newId) {
      console.log("改变", newId);
      this.updateView("company");
    }
   },
  computed: {
     ...mapGetters(["year", "month", "company", "module_api", "conversion","device"])
  },
  methods: {

   fun2String(){
       console.info()
   },

   //深拷贝
    deepClone(data) {
        let _data = JSON.stringify(data),
            dataClone = JSON.parse(_data);
        return dataClone;
    },

    functionReplacer(key, value) {
    if (typeof(value) === 'function') {
       if(key  == "render"){
         let fun =  value.toString();
         return fun;
       }
       return ;
        
    }
    return value;
},

  functionReviver(key, value) {
    if (key === "") return value;
    if (typeof value === 'string') {
       // var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
         var rfunc = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
            match = value.match(rfunc);
        
        if (match) {
            var args = match[1].split(',').map(function(arg) { return arg.replace(/\s+/, ''); });
            return new Function(args, match[2]);
        }
    }
    return value;
},

replaceVar(json){
   json = json.replace("function anonymous","function");
   json = json.replace("function render","function");
     var reg = /\n(\n)*( )*(\n)*\n/g;
     json = json.replace(reg,"\n");
   this.jsonCube = json;
},


initView(){
       this.cube.datas = this.cubeObject.init();
       this.jsonCube = JSON.stringify(this.cube , this.functionReplacer,4);//使用四个空格缩进;
       this.replaceVar(this.jsonCube);

},

     cubeChange(val){
        var reg = /\n(\n)*( )*(\n)*\n/g;
        val = val.replace(reg,"\n");
        this.cube = JSON.parse(val, this.functionReviver);
        Cnbi.apply( this.cubeObject, this.cube);
        this.initView();
       let a = {
         id:1,
         text:52,
         config:{}
       }
        let b = {
         id:1,
         text:52,
         config:{
           sql:56
         }
       }
     
       let c = Cnbi.applyDeepIf(a,b);
       debugger;

     }
  }
};
</script>
