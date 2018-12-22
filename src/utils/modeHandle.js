import {
    findDesignSource
} from "~api/interface";
import {
    Notification
} from 'element-ui'
// import fxfx from '@a/table/fxfx.json'
// import report from '@a/table/report.json'
import store from '@/store'
export default function modeHandle(e) {
    if (!e.sourceId && !e.url) {
        let msg = "未定义[" + e.text + e.id + "]模块的标识！";
        console.error(msg);
        // debugger
        Notification.error({
            title: "错误",
            message: msg
        });
        //
        return;
    }
    debugger
    let companyMessage = store.getters.treeInfo;
    console.log('123:'+companyMessage);
    // var obj = JSON.stringify(fxfx)
    // var obj = JSON.stringify(report)

    // localStorage.setItem("module", obj);
    // store.dispatch("GetSideMid", {
    //     module_api: api
    // });
    // console.log();

    console.log(e.sourceId, e.url)

    /** 
      * sjz
      * 如果是应收款项分析表（e.pid==2002）才会执行；
      * 只有三种分析表(e.id==356 || e.id==358 || e.id==360)时吧才会根据公司的leaf属性展现明细表还是二级汇总表；
      * 单体公司（leaf=true）时展示明细表；
      * 合并公司（leaf=false）时展现二级汇总表
      * */
    if(e.pid=='2002'){
        if(e.id=='356'){
            if(companyMessage.leaf){
                e.url = '/cnbi/json/source/tjsp/yszk.json';
            }else{
                e.url = '/cnbi/json/source/tjsp/yszkhz.json' ;
            }
        }
        if(e.id=='358'){
            if(companyMessage.leaf){
                e.url = '/cnbi/json/source/tjsp/yfzk.json';
            }else{
                e.url = '/cnbi/json/source/tjsp/yfzkhz.json' ;
            }
        }
        if(e.id=='360'){
            if(companyMessage.leaf){
                e.url = '/cnbi/json/source/tjsp/qtysk.json';
            }else{
                e.url = '/cnbi/json/source/tjsp/qtyskhz.json' ;
            }
        }
    }

    findDesignSource(e.sourceId, e.url)
        .then(response => {
            // debugger
            let bean = response.data;
            if (bean.data && bean.data.source) {
                //数据库来的
                bean = bean.data.source || 0;
            } else if (bean.id) {
                //加处理函数来的
                bean = JSON.stringify(bean);
            }
            //  debugger;
            localStorage.setItem("module", bean);
            store.dispatch("GetSideMid", {
                module_api: response.config.url
            });

        })
        .catch(response => {
            debugger
            console.error("数据请求失败");
        });
}