/*
 * @Author: cnbi.zhh 
 * @Date: 2018-12-11 17:34:38 
 * @Decription: 本项目用到的通用方法 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-22 09:19:34
 */
//加载工具类 lodash
let _ = require('lodash');
const digitsRE = /(\d{3})(?=\d)/g;
import { MessageBox } from 'element-ui';
export default {
    //天津视频 数据源id 
    datasourceId: 4,
    /**
     * 设置表格最大高度
     * @param subHeight 要减去高度
     */
    setTableMaxHeight(subHeight) {
        const height = document.body.offsetHeight - subHeight;
        return height > 100 ? height : 300;
    },

    /**
     * name: 钟虎
     * EVA表的方法
     */
    currency(value, currency, decimals) {
        let valuex = parseFloat(value);
        if (!isFinite(valuex) || (!valuex && valuex !== 0)) return ''
        currency = currency != null ? currency : '$'
        decimals = decimals != null ? decimals : 2
        let stringified = Math.abs(valuex).toFixed(decimals)
        let _int = decimals ?
            stringified.slice(0, -1 - decimals) :
            stringified
        let i = _int.length % 3
        let head = i > 0 ?
            (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) :
            ''
        let _float = decimals ?
            stringified.slice(-1 - decimals) :
            ''
        let sign = valuex < 0 ? '-' : ''
        return sign + currency + head +
            _int.slice(i).replace(digitsRE, '$1,') +
            _float
    },


    //将父子节点转成数组
    transformToArray(setting, nodes) {
        return this.transformToArrayFormat(setting, nodes);
    },

    transformToArrayFormat(setting, nodes) {
        if (!nodes) return [];
        var r = [];
        if (Array.isArray(nodes)) {
            for (var i = 0, l = nodes.length; i < l; i++) {
                var node = nodes[i];
                this._do(setting, node);
            }
        } else {
            this._do(setting, nodes);
        }
        return r;
    },

    _do(setting, _node) {
        r.push(_node);
        var children = this.nodeoChildren(setting, _node);
        if (children) {
            r = r.concat(this.transformToArrayFormat(setting, children));
        }
    },

    //将数组转为父子节点的对象 该方法来自于ztree方法
    transformToeTreeNodes(setting, simpleNodes) {
        return this.transformTozTreeFormat(setting, simpleNodes);
    },
    nodeChildren(setting, node, newChildren) {
        if (!node) {
            return null;
        }
        var key = setting.data.key.children;
        if (typeof newChildren !== "undefined") {
            node[key] = newChildren;
        }
        return node[key];
    },
    transformTozTreeFormat(setting, sNodes) {
        // debugger;
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
    ,
    showMes(mes, type) {
        MessageBox({
            message: mes,
            type: type,
            showConfirmButton: !1,
            callback() {}
        });
    }

    //排序
    ,
    sortByKey(array, key) {
        return array.sort((a, b) => {
            var x = a[key] + "";
            var y = b[key] + "";
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    /**
     * 操作请求
     */
    ,
    opt: [{ url: "save", text: "新增", method: "post" }, { url: "update", text: "修改", method: "put" }, { url: "del", del: "删除", method: "get" }, { url: "drag", drag: "移动", method: "post" }]

}