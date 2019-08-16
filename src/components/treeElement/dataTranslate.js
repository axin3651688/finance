/*
 * @Author: sjz
 * @Date:   2019-04-11 12:06:49
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-21 17:41:35
 */

import Vue from 'vue'
import { findThirdPartData } from "~api/interface";
import { ageanalysis, query_sjz, update_sjz } from "~api/cube";
export default {
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：数据的处理
     */
    treeToArray(data, parent, level, expandedAll) {
        let tmp = [];
        let me = this;
        Array.from(data).forEach(function(record) {

            if (record._expanded === undefined) {
                Vue.set(record, '_expanded', expandedAll)
            }
            if (parent) {
                Vue.set(record, '_parent', parent)
            }
            let _level = 0
            if (level !== undefined && level !== null) {
                _level = level + 1
            }
            Vue.set(record, '_level', _level)
            tmp.push(record)
            if (record.children && record.children.length > 0) {
                let children = me.treeToArray(record.children, record, _level, expandedAll)
                tmp = tmp.concat(children)
            }
        })
        return tmp
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：页面自适应高度
     */
    setTableScollHeight(item, offsetHeight) {
        // debugger
        let value;
        if (!item.stype && !item.pagination) { // 【不是】下钻的页面/ 【没有】分页功能
            value = offsetHeight - 40 - 64 - 25 - 45;
        } else if (!item.stype && item.pagination) { // 【不是】下钻的页面/ 【有】分页功能
            value = offsetHeight - 40 - 64 - 25 - 38 - 32;
        } else { // 【是】下钻的页面
            if (item.stype == "table") { // 下钻的是【普通表】时
                value = offsetHeight - 64 - 55;
            } else {
                value = offsetHeight - 64 - 75;
            }
        }
        return value;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：树表自动展开
     */
    automaticallyOpen(data, me, kong) {

        let datas;
        let companyId = me.$store.getters.company; //获取公司id
        let is = me.item.isUnfold; //获取自展开的条件
        if (data && data.length > 0) {
            datas = data;
        } else {
            return "";
        }
        if (!is) return datas;
        // 如果是集团公司（1级）默认展开所有二级公司，二级以后用户自行点击树状结构显示。
        // 如果是二级及以下公司，默认展开全部公司
        if (companyId == '1001') {
            datas[0]._expanded = true;
        } else {
            datas.forEach(res => {
                res._expanded = true;
            });
        }
        return datas;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：树表图标的缩进
     */
    levelProperties(item, row) { //debugger
        let css = "padding: 4px 0;";
        let pro = row.column.property;
        if (!pro) {
            return css;
        }
        let levelProperties = item.levelProperties; //缩进列获取
        let textIndent = "";
        let levelPro = levelProperties[pro];
        if (levelPro && row.row[levelPro]) {
            let level = row.row[levelPro] || 1;
            textIndent = "text-indent: " + (level * 20) + "px";
        }
        return css + textIndent;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：应收、预付、其他三张表的比例显示预警等级
     */
    changeFormatData(proportion, datas, $this, see) {
        debugger
        // 比例不能未负数
        if (see.input3 < 0) {
            $this.$message('比例不能为负数！');
            see.input3 = "";
        }
        // 为空不做任何操作
        if (see.input3 != "" && see.input3 != 0) {
            see.value = see.input3;
            // string类型转number类型
            if (typeof see.value === "string" && see.input3 != "") {
                //输入数字
                see.value = see.value.replace(/[^\d.]/g, "").replace(/^0/, "") - 0;
            }
            // 千分位两位小数显示
            see.input3 = Math.decimalToLocalString(see.input3);
        } else {
            see.input3 = '';
            see.value = 0;
        }
        if (see.id == "1" || see.id == "2") {
            debugger
            // localStorage.removeItem("yszk");
            // localStorage.setItem("yszk",JSON.stringify(proportion));
            let dimItem = "1001";
            this.update_sjz_new(proportion, $this, dimItem, see.id, see);

        }
        if (see.id == "3" || see.id == "4") {
            // localStorage.removeItem("yfzk");
            // localStorage.setItem("yfzk",JSON.stringify(proportion));
            let dimItem = "1002";
            let sratiotype = null;
            if (see.id == "3") sratiotype = "1";
            if (see.id == "4") sratiotype = "2";
            this.update_sjz_new(proportion, $this, dimItem, sratiotype, see);
        }
        if (see.id == "5" || see.id == "6") {
            // localStorage.removeItem("qtysk");
            // localStorage.setItem("qtysk",JSON.stringify(proportion));
            let dimItem = "1003",
                sratiotype;
            if (see.id == "5") sratiotype = "1";
            if (see.id == "6") sratiotype = "2";
            this.update_sjz_new(proportion, $this, dimItem, sratiotype, see);
        }
        // 比例显示预警等级riskrange
        this.changeFormatData2(proportion, datas);
    },
    // 日期处理
    getPeriod(month) {
        if (month > 0 && month < 10) {
            month = "0" + month;
        }
        return month;
    },
    // 比例显示预警等级riskrange
    changeFormatData2(proportion, datas) {
        debugger
        let first = proportion[0].value;
        let second = proportion[1].value;
        datas.forEach(element => {
            if (element.zjl == 0) {
                element.riskrange = '';
            } else {
                if (first > 0 && element.zjl <= first) element.riskrange = '安全';
                if (second > 0 && element.zjl >= second) element.riskrange = '预警';
                if (first > 0 && second > 0 && element.zjl > first && element.zjl < second) element.riskrange = '提示';
                if (first == 0 && (element.riskrange == '安全' || element.riskrange == '提示')) element.riskrange = '';
                if (second == 0 && element.riskrange == '预警') element.riskrange = '';
            }
            if (first == 0 && second == 0) element.riskrange = '';
        });
        return datas;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：获取存在应收、预付、其他三张表的比例数LocalStorage
     */
    getLocalStorage(datas, item, $this) {
        debugger
        // let len = $this.item.proportion.length || 2;
        // let len = 2 ;
        // 读取"yszk"的存储信息
        let yszk = JSON.parse(localStorage.getItem("yszk"));
        // 读取"yfzk"的存储信息
        let yfzk = JSON.parse(localStorage.getItem("yfzk"));
        // 读取"qtysk"的存储信息
        let qtysk = JSON.parse(localStorage.getItem("qtysk"));
        if (item.id == "yszkej") {
            if (yszk) item.proportion = yszk;
            let dimItem = "1001";
            if (!yszk) {
                this.findThirdPartData_sjz(dimItem, item, $this, datas);
            }
        }
        if (item.id == "yfzkej") {
            if (yfzk) item.proportion = yfzk;
            let dimItem = "1002";
            if (!yszk) {
                this.findThirdPartData_sjz(dimItem, item, $this, datas);
            }
            // this.changeFormatData2($this.item.proportion, datas) ;
        }
        if (item.id == "qtyskej") {
            if (qtysk) item.proportion = qtysk;
            let dimItem = "1003";
            if (!yszk) {
                this.findThirdPartData_sjz(dimItem, item, $this, datas);
            }
            // this.changeFormatData2($this.item.proportion, datas) ;
        }
    },
    /**
     * 修改
     * @param {*} proportion 
     * @param {*} $this 
     * @param {*} dimItem 
     * @param {*} sratiotype 
     */
    update_sjz_new(proportion, $this, dimItem, sratiotype, see) {
        debugger
        let params = {
            company: $this.$store.getters.company,
            fact_a: see.value,
            id: 0,
            item: dimItem,
            period: $this.$store.getters.year + this.getPeriod($this.$store.getters.month),
            sratiotype: sratiotype
        }
        update_sjz(params).then(res => {
            debugger
            console.log('修改成功！');
        })
    },
    /**
     * 查询
     */
    findThirdPartData_sjz(dimItem, item, $this, datas) {
        // debugger
        // 查询是否有值，有的话就赋值，没有的话就输入值再插入值，有值后更改直接更新
        let params = {
            item: dimItem,
            company: $this.$store.getters.company,
            period: $this.$store.getters.year + this.getPeriod($this.$store.getters.month)
        }
        let me = this;
        query_sjz(params).then(res => {
            debugger
            if (res.data.data === null) {
                let num = 0;
                for (let i = 0; i < 2; i++) {
                    let $ii = i + 1;
                    me.ageanalysis_sjz($this, $ii, dimItem, num);
                }
            } else {
                let $one = res.data.data.filter(item => { return item.sratiotype == '1' });
                let $two = res.data.data.filter(item => { return item.sratiotype == '2' });

                item.proportion[0].value = $one[0].fact_a;
                item.proportion[1].value = $two[0].fact_a;
                if ($one[0].fact_a && $one[0].fact_a != 0) item.proportion[0].input3 = Math.decimalToLocalString($one[0].fact_a);
                if ($two[0].fact_a && $two[0].fact_a != 0) item.proportion[1].input3 = Math.decimalToLocalString($two[0].fact_a);
                this.changeFormatData2(item.proportion, datas);
            }
        }).catch(res => {
            console.info(res);
        });
    },
    /**
     * 数据库没有数据的时候新增数据   0
     */
    ageanalysis_sjz($this, sratiotype, dimItem, num) {
        // debugger
        let params = {
            company: $this.$store.getters.company,
            period: $this.$store.getters.year + this.getPeriod($this.$store.getters.month),
            fact_a: num,
            sratiotype: sratiotype,
            item: dimItem
        }
        ageanalysis(params).then(res => {
            // debugger
            console.log('新增成功');
        })
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：管理驾驶舱应收、预付、其他下钻之后显示的html的字段。
     * @event 列如：`(100101)天津农垦渤海农业集团有限公司（托管汇总）(期间：2018年07月单位：元)`
     */
    tableBefore($this) {

        if ($this.item.tableBeforeFun && typeof $this.item.tableBeforeFun == "function") {
            $this.titleText = $this.item.tableBeforeFun($this, $this.titleText);
        } else {
            let period = $this.$store.selectPeriod;
            if (!period) {
                let year = $this.$store.getters.year,
                    month = $this.$store.getters.month;
                if (month > 9) {
                    period = year + "" + month;
                } else {
                    period = year + "0" + month;
                }
            }
            let year = period.substring(0, 4);
            let month = period.substring(4, 6);
            let company = $this.$store.getters.companyName;
            // let unit = "单位：元";
            let pStyle = "height:30px;line-height:30px;font-weight:bold;";
            let snStyle = "padding:5px 10px;";
            let currentUnit = "元";
            let html = "<p style='" + pStyle + "'><span style='" + snStyle + "'>" + company +
                "</span><span  style='" + snStyle + "'>(期间：" + year + "年" + month + "月" + "</span><span>单位：" + currentUnit + ")</span></p>";
            return html;
        }
    }
}