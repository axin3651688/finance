# 前端工程目录说明
+ finance
  + public
  + src
    - api
    - assets
    - components
    - store
    - styles
    - utils
    - views
   + static
   - .gitignore
   - babel.config.js
   - package.json
   - vue.config.js
   - node_modules

# [Vue.js 组件编码规范](https://github.com/sqrthree/vuejs-component-style-guide/blob/zh-hans/README-CN.md)

## Project setup   
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
##VUE封装的图形组件
+ 图 Chart xtype = chart
~~~
BiColumn  柱状图 (坚着的)
BiPie     饼图
BiRosepie  饼图2(南丁格尔玫瑰图)
BiCirclepie 饼图2(环图)
BiLine    线状
BiRadar   雷达图
BiBar     柱状图 (横着的)
BiArea    面积
BiGauge   仪表
BiFunnel  漏斗图

混合系
BiMSCloumnLine   柱状与线状
BiMSAreaLine     面积与线状



+ 维度替换 
:company       公司
:period         时间

如果异步加载需要在   "queryDataBefore": 中加如下字段
  params.comId = params.company;
:comId         需要展开的公司 
:property      查自身或查自己 其中如果为scode查自己，spcode查子集
~~~

+ 表 Table  xtype = table
~~~
BiTable
BiTreeGrid
~~~

+ 文字模型 Text  xtype = text
~~~
BiText
~~~


## `config`对象设计，根据此对象获取数据
~~~

{
    cubeId:2,//用户的数据源权限Id,由用户登录后给定=license.id,再商定    //sql/cube/defined/random  四选
    sql:"select * from dw_dimcompany",//sql语句优先级最高
    cube:{ //cube类型优先级排第二,根据
        subject:"0001",//主题
        dims:{},//维度
        facts:{},//度量
    }
    defined:[] //自定义的数据优先级第三
    random:{min:1,max:10000}//随机的数据优先级排第四,
    type:/1/2 //数据源组装类型 [1:数组类型,2对象cell类型],必选项目
    rows:[],//行项目,必选项目
    columns:[]//列项目,必选项目
    mainDim：""//主维度，决定rows行项目里配制的是什么维度
    needDims:["year","month","company"]//所依赖可变化的维度：只有当config依赖的属性变了，数据才会变，视图才会跟着变！ 
    "generateVar":{//生成变量rows
       "periodCount":12,
        "compareType":"0&-1",
        "varName":"rows",
         "reverse":true
    },
  
}
~~~

## `layout`对象设计

~~~
{
  form:{}, //从上至下布局
  column:{},//列向栅格化布局
  tab:{},//tab标签布局
  border:{//东南西北中布局
      region:"center/north/south/west/south"
  }
  accordion:{},//手风琴布局
  absolute:{}//绝对布局,暂不实现
}
~~~

## `getData`获取值对象设计 数据集

~~~
{
    "value":"A$1100001",//单元格取数法，当然支持公式形配制，配制此项，type则必须为1,此法优先及最高，排第一
    "type"：1/2/3/4/  1:单值，2：单系列, 3:多系列 ,4:echart的：单系列
    "columns":[{"id":"text","prop":"label"},{"id":"B","prop":"value","seriesProp":"seriesname"}]  //表列项目
    "row":{ //行项目取值范围,没有此键或为空健则范围为表的所有行
        "ids":{//圈定行项目法,此法优先及次之，排第二
            "items":[],//指定行项目法,此法优先及最高，排第一
            "begin":225656 //起始行,可选项，没有此属性则逻辑为小于end，要求行项目编码必须为整数，优先及排第二
            "end": 3333  //结束行,可选项，没有此属性则逻辑为大于begin，要求行项目编码必须为整数，优先及排第二
         }
         "index":{//索引法,可选项，此法优先及再次之，排第三
            "start":0,//起始行,可选项，没有此属性则逻辑为小于limit
            "limit":5,//结束行,可选项，没有此属性则逻辑为大于start
         },

    },
    "reverse":true,
    "scope":true
}



~~~

## `subject`对象配制
~~~
{
    cubeId:this.cubeId.id,
    subject:"0001",
    fact:"A,B,C,D",
    periodCount:2,
    dims:{
       period:"201505,201605",
       company:"1,1500",
       itempoint:"1111122,1111123,1111221"
    },
    dimName:"itempoint",//行项目的Id 
    unionDimName:"company", //行项目列名为：factId$unionDimId
    showDims:"company",  //company_1
    "helpDims":"111",
    order:"desc" ,
    sort:"B",
    groupBy:"id",
}
~~~



## `params`对象解析
~~~
{
    cubeId:this.cubeId.id,//数据源编码
    subjects:[{//表们
        id:"1016",
        fact:"val",
        dims:{
            indicator:"236,19",
            fact:"B"
        },
        m:"0 as A,val as B, 0 as C",//辅助性度量设置
        dimName:"indicator"
    },{
        id:"0001",
        fact:"A,B,C",
        dims:{
            itempoint:"1111122,1111123,1111221"
        },
        dimName:"itempoint"
    },{
        id:"0002",
        fact:"A,B,C",
        dims:{
            itemperiod:"1416001,1403100"
        },
        dimName:"itemperiod"
    }],
    dims:{//公共维度
       period:"201505",
       company:"1",
    }
}
~~~


##模块文件设计

~~~
{
    id:0,//唯一标识
    text:"",//名字
    config:`config`  //为可选项
    layout:`layout`  //为可选项，不配制的话，默认为form
    changeModuleBefore:funcntion(){},//改变模块之前的调用，
    changeYearBefore:funcntion(){},//切换年的回调
    changeMonthBefore:funcntion(){},//切换月份的回调
    changeCompanyBefore:funcntion(){},//切换公司之前的回调
    showDims:["company","year","month","conversion","date"] //配置顶部需要显示的期间,这里全部写就显示全部
    items:[ //组件
        {
            id: "1",
            text:"",//名字
            "showFun":function($store){//是否显示
                //所有的数据都在store里，自己加自己的判断吧
                return true;//默认显示
            },
             show: true,  //是否显示
            async:true   //异步加载节点
            queryDataAfter:function(){}//数据的后置处理
            queryDataBefore:function(){}//数据的前置处理
            xtype: "bi-table",
            weight: "6"//当layout=column时需要
            renderFunction:"functionName"//字面量函数
            params:["A$1111001","B$1111002"]，//参数集合
            config:`config`  //为可选项，当没有数据的时候，会从父亲里取
            rowSpanAndColSpanHandler:function(){}//单元格处理 retrun  {rowspan:2,colspan:5}//可选 table
            groupConfig: { idProperty: "group",textProperty: "groupName"}//可选 table
            drillProperties:["text","text_"],//有钻取，给蓝色 可选 table
            levelProperties:{text:"level",text_:"level_"}//加缩进 可选 table
            cellStyle:"单元格样式", //可选 table
            onCellClick:"单元格点击事件" //可选 table 
            onRowClick:"树表单元格点击事件"
            handleClick:"单元格的操作"
            options:{}
        },
        {
            id: "2",
            text:"",//名字
            xtype: "bi-chart",
            weight: "6"
            options:{
                type:"bi-column/bi-line/bi-pie",
                datas:{}
            },
            config:`config`  //为可选项，当没有数据的时候，会从父亲里取
        },
        {
            
             id: "3",
             text:"",//名字
             xtype: "bi-table",
             weight: "6"
             config:`config`  ///为可选项，当没有数据的时候，会从父亲里取
             options:{

             }
        }
}
~~~

## 图形组件Echarts
[官方属性文档](http://echarts.baidu.com/echarts2/doc/doc.html)

## 尚未实现功能

+ 表体合并单元格
~~~
在item配置参数 colAndRowSanHandler函数  有4个 row, column, rowIndex, columnIndex

树表的金额配置decimal类型
~~~

+ 事件对象
~~~
listeners:[
  {
    "type":"click",//事件类型
    "way":"addTab",//调用的公共方法
    "sourceApi":"/cnbi/json/source/jsnk/drillSecond.json",//孙子成
    "location":"before",//默认往后面,下边加，before就是往前面=tab，上边加=form
    "handler":($vue,params)=>{//自定义的回调
        console.info(params);
        debugger; 
    },
    "config":{
        "width":800,
        "height":750     
    },
    "clickBefore":function(params,$vue){//点击之前的回调，可以改变listeners里的参数变量

    }
  }
]
~~~
~~~

    {
     columns:[{
        id:"主键",
        text:"名称",
        unit:"%/万元",
        B:120//累计数
        sntq:120//上年同数，
        dimName://0001=>itempoint/0002=>itemperiod/1016=>indicator
      },
      {  "text": "公司编码",
        "type":"string",
        "id": "ID",
        "isTree":true //isTree设置是true 
          }
      ],
    gauge:[
        {
            A:100,  //inds
            B:90,  //inds
            C:75,  //inds
            D:60,  //inds
            E:50， //inds
            value:75, //1016
            valueText:"中等", //1016主题的维度Grade对应的名称
            id:"主键",//1016主题的维度indicator对应的编码
            text:"名称",//1016主题的维度indicator对应的名称
            dimName://1016=>indicator,
            unit:"%",
        }
    ],
    lines:[
        {id:11000, text:"xxxx",datas:[{id:"201601",value:525},{id:"201602",value:525}......]},
        {id:11020, text:"xxx",datas:[]},
        {id:11003,text:"xxx",datas:[]}
    ]
    }

~~~
## Echart图表高度配置
在options(旧方法)或chartOptions(新方法)中配置height_s字段如 "height_s": "600px",就会得到相应高度


#指标分析右边距(BiModule 51行)
默认不传为24px,如果需要修改其他值,在item下面加"class_pr":"36px"





{
    cubeId:2,//用户的数据源权限Id,由用户登录后给定=license.id,再商定    //sql/cube/defined/random  四选
    sql:,//sql语句优先级最高
    type:1
    rows:[],//行项目,必选项目
    columns:[]//列项目,必选项目
    mainDim：""//主维度，决定rows行项目里配制的是什么维度
    needDims:["year","month","company"]//所依赖可变化的维度：只有当config依赖的属性变了，数据才会变，视图才会跟着变！
}


## 新资源区json格式



## 新仪表盘json格式
{
    id:0,
    text:"",
    "layout":{
       "type":"grid"
    }
    "items": [
    {
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 2,
        "i": 0,
        "data": {
        "type": 3,
        "textConfig": {
            "color": "red",
            "fontSize": "30px",
            "fontFamily": "Microsoft YaHei"
        },
        "text": "默认文本默认文本默认文本默认文本默认文本"
        }
    },
    {
        "x": 0,
        "y": 2,
        "w": 6,
        "h": 10,
        "i": 2,
        "data": {
            "type": 1,//数据集的表和图
            "sourceId": 196
        }
        }
    ]

}