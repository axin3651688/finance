/*
 * @Author: cnbi.zhh 
 * @Date: 2018-12-11 17:34:38 
 * @Decription: 本项目用到的通用方法 
 * @Last Modified by: cnbi.zhh
 * @Last Modified time: 2018-12-14 14:52:53
 */
//加载工具类 lodash
let _ = require('lodash');
import { MessageBox } from 'element-ui';
export default {
    //天津视频 数据源id 
    datasourceId: 4,

    //将数组转为父子节点的对象 该方法来自于ztree方法
    transformToeTreeNodes(setting, simpleNodes) {
        return this.transformTozTreeFormat(setting, simpleNodes);
    }
    , nodeChildren(setting, node, newChildren) {
        if (!node) {
            return null;
        }
        var key = setting.data.key.children;
        if (typeof newChildren !== "undefined") {
            node[key] = newChildren;
        }
        return node[key];
    }
    , transformTozTreeFormat(setting, sNodes) {
        var i,
            l,
            key = setting.data.simpleData.idKey,
            parentKey = setting.data.simpleData.pIdKey;
        if (!key || key == "" || !sNodes) return [];

        if (Array.isArray(sNodes)) {
            var r = [];
            var tmpMap = {};
            for (i = 0, l = sNodes.length; i < l; i++) {
                tmpMap[sNodes[i][key]] = sNodes[i];
            }
            for (i = 0, l = sNodes.length; i < l; i++) {
                var p = tmpMap[sNodes[i][parentKey]];
                if (p && sNodes[i][key] != sNodes[i][parentKey]) {
                    var children = this.nodeChildren(setting, p);
                    if (!children) {
                        children = this.nodeChildren(setting, p, []);
                    }
                    children.push(sNodes[i]);
                } else {
                    r.push(sNodes[i]);
                }
            }
            return r;
        } else {
            return [sNodes];
        }

    }

    /**
     * @Decription 消息提示
     */
    , showMes(mes, type) {
        MessageBox({
            message: mes,
            type: type,
            showConfirmButton: !1,
            callback() { }
        });
    }

    //排序
    , sortByKey(array, key) {
        return array.sort((a, b) => {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    /**
     * 操作请求
     */
    , opt: [{ url: "save", text: "新增", method: "post" }, { url: "update", text: "修改", method: "put" }, { url: "del", del: "删除", method: "get" }]

}


