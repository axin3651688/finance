
import {findDesignSource} from "~api/interface";
// import fxfx from '@a/table/fxfx.json'
// import report from '@a/table/report.json'
import store from '@/store'
export default function modeHandle(e) {
    if (!e.sourceId && !e.url) {
        let msg = "未定义[" + e.text + e.id + "]模块的标识！";
        console.error(msg);
        this.$notify.error({
            title: "错误",
            message: msg
        });
        //
        return;
    }
    debugger
    console.log(store);

    // var obj = JSON.stringify(fxfx)
    // var obj = JSON.stringify(report)
    
    // localStorage.setItem("module", obj);
    // store.dispatch("GetSideMid", {
    //     module_api: api
    // });
    console.log(e.sourceId, e.url)
    findDesignSource(e.sourceId, e.url)
        .then(response => {
            debugger            
            let bean = response.data;
            if (bean.data && bean.data.source) {
                bean = bean.data.source || 0;
            } else {
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