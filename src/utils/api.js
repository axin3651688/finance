/**
 * ~~~
{
    cubeId:2,//用户的数据源权限Id,由用户登录后给定=license.id,再商定
    dataType:{
        sql:"select * from dw_dimcompany",//sql语句优先级最高
        cube:{ //cube类型优先级排第二,根据
            subject:"0001",//主题
            dims:{},//维度
            facts:{}//度量
        }
        defined:[] //自定义的数据优先级第三
        random:{min:1,max:10000}//随机的数据优先级排第四,
        rows:[],//行项目,可先项目
        columns:[]//列项目
    }
  
},
~~~
 */
import axios from "axios"
const Api = function(config){    
};