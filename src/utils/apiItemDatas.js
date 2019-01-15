/* 
 * 通过Api进行表里面的请求,达到不跳转页面,又能使用sql进行取数的目的 
 * 马军  2019.1.10
 */
import {
    getModuleParams
} from "./index";

/**
 * 取数小接口
 * item vue组件对象
 */
export function apiItemDatas(item, data) {
    debugger
    try {
        let params = getModuleParams(item, "company");
        params.comId = data
        params.item = item.id
        params.property = "spcode"
        console.log(params);
        if (!params) return;
        let config = item.config;
        config.type = config.type || 1;
        if (config.sql) {
            params.sql = config.sql;
            return params;
        } else if (config.cube) {
            return params;
        } else if (config.defined) {
            return config.datas;
        }
    } catch (error) {
        console.log(item);
        console.error(error);
    }
}