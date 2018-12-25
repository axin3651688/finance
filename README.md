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
        "varName":"rows"
    },
    compareType:"0&-1" //-1&0
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

## `getData`获取值对象设计

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
    items:[ //组件
        {
            id: "1",
            text:"",//名字
            xtype: "bi-text",
            weight: "6"//当layout=column时需要
            renderFunction:"functionName"//字面量函数
            params:["A$1111001","B$1111002"]，//参数集合
            config:`config`  //为可选项，当没有数据的时候，会从父亲里取
            options:{

            }
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
    }
  }
]
~~~
+ 饼状图
~~~

~~~
+ 多柱多线图
~~~

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
      }],
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