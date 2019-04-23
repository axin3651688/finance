/*
* @Author: sjz
* @Date:   2019-04-11 12:06:49
* @Last Modified by:   sjz
* @Last Modified time: 2019-04-11 16:30:03
*/

import Vue from 'vue'
export default {
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：数据的处理
     */
    treeToArray(data, parent, level, expandedAll){
        let tmp = [];
        let me = this ;
        Array.from(data).forEach(function (record) {

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
    setTableScollHeight(item,offsetHeight){
        // debugger
        let value ;        
        if(!item.stype && !item.pagination){        // 【不是】下钻的页面/ 【没有】分页功能
            value = offsetHeight - 40 - 64 - 25 - 38 ;
        }else if(!item.stype && item.pagination){   // 【不是】下钻的页面/ 【有】分页功能
            value = offsetHeight - 40 - 64 - 25 - 38 - 32 ;
        }else{                                      // 【是】下钻的页面
            if(item.stype=="table"){                // 下钻的是【普通表】时
                value = offsetHeight - 64 - 55 ;
            } else {
                value = offsetHeight - 64 - 75 ;
            }
        }
        return value ;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：树表自动展开
     */
    automaticallyOpen(data, me, kong){

        let datas ;
        let companyId = me.$store.getters.company;//获取公司id
        let is = me.item.isUnfold ; //获取自展开的条件
        if(data && data.length > 0){
            datas = data ;
        } else {
            return "" ;
        }
        if(!is)return datas ;
        // 如果是集团公司（1级）默认展开所有二级公司，二级以后用户自行点击树状结构显示。
        // 如果是二级及以下公司，默认展开全部公司
        if(companyId == '1001'){
            datas[0]._expanded = true ;
        } else {
            datas.forEach(res => {
                res._expanded = true ;
            });
        }       
        return datas ;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：树表图标的缩进
     */
    levelProperties(item,row){
        let css = "padding: 4px 0;";
        let pro = row.column.property;
        if (!pro) {
            return css;
        }
        let levelProperties = item.levelProperties;//缩进列获取
        let textIndent ="";
        let levelPro = levelProperties[pro];
        if (levelPro && row.row[levelPro]) {
            let level = row.row[levelPro] || 1;
            textIndent = "text-indent: " + (level*20) + "px" ; 
        }
        return css + textIndent ;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：应收、预付、其他三张表的比例显示预警等级
     */
    changeFormatData(proportion, datas, $this, see){

        // 比例不能未负数
        if(see.input3 < 0){
            $this.$message('比例不能为负数！');
            see.input3 = "";
        }
        // 为空不做任何操作
        if(see.input3 != "" && see.input3 != 0){
            see.value = see.input3;
            // string类型转number类型
            if(typeof see.value === "string" && see.input3 != ""){
                //输入数字
                see.value = see.value.replace(/[^\d.]/g, "").replace(/^0/, "") - 0;
            }
            // 千分位两位小数显示
            see.input3 = Math.decimalToLocalString(see.input3) ;
        }else{
            see.input3 = '' ;
            see.value = 0 ;
        }
        if(see.id=="1" || see.id=="2"){
            localStorage.removeItem("yszk");
            localStorage.setItem("yszk",JSON.stringify(proportion));
        }
        if(see.id=="3" || see.id=="4"){
            localStorage.removeItem("yfzk");
            localStorage.setItem("yfzk",JSON.stringify(proportion));
        }
        if(see.id=="5" || see.id=="6"){
            localStorage.removeItem("qtysk");
            localStorage.setItem("qtysk",JSON.stringify(proportion));
        }
        // 比例显示预警等级riskrange
        this.changeFormatData2(proportion, datas);
    },
    // 比例显示预警等级riskrange
    changeFormatData2(proportion, datas){

        let first = proportion[0].value ;
        let second= proportion[1].value ;
        datas.forEach(element => {
            if(element.zjl == 0){
                element.riskrange = '' ;
            }else{
                if(first>0 && element.zjl <= first)element.riskrange = '安全' ;             
                if(second>0 && element.zjl >= second)element.riskrange = '预警' ;
                if(first>0 && second>0 && element.zjl>first && element.zjl<second)element.riskrange = '提示' ; 
                if(first == 0 && (element.riskrange == '安全' || element.riskrange == '提示'))element.riskrange = '' ;
                if(second == 0 && element.riskrange == '预警')element.riskrange = '' ;
            }
            if(first == 0 && second == 0)element.riskrange = '' ;    
        });
        return datas ;
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：获取存在应收、预付、其他三张表的比例数LocalStorage
     */
    getLocalStorage(datas, $this){
        
        // 读取"yszk"的存储信息
        let yszk = JSON.parse(localStorage.getItem("yszk"));
        // 读取"yfzk"的存储信息
        let yfzk = JSON.parse(localStorage.getItem("yfzk"));
        // 读取"qtysk"的存储信息
        let qtysk = JSON.parse(localStorage.getItem("qtysk"));
        if($this.item.id=="yszkej"){
            if(yszk)$this.item.proportion = yszk ;
            this.changeFormatData2($this.item.proportion, datas) ;
        }
        if($this.item.id=="yfzkej"){
            if(yfzk)$this.item.proportion = yfzk ;
            this.changeFormatData2($this.item.proportion, datas) ;
        }
        if($this.item.id=="qtyskej"){
            if(qtysk)$this.item.proportion = qtysk ;
            this.changeFormatData2($this.item.proportion, datas) ;
        }
    },
    /**
     * @event 'treeElement/treeColumns.vue'引用了此方法：管理驾驶舱应收、预付、其他下钻之后显示的html的字段。
     * @event 列如：`(100101)天津农垦渤海农业集团有限公司（托管汇总）(期间：2018年07月单位：元)`
     */
    tableBefore($this){
        
        if($this.item.tableBeforeFun && typeof $this.item.tableBeforeFun == "function"){
            $this.titleText = $this.item.tableBeforeFun($this,$this.titleText);
        }else {
            let period = $this.$store.selectPeriod;
            let year = period.substring(0,4);
            let month = period.substring(4,6);
            let company = $this.$store.getters.companyName;
            // let unit = "单位：元";
            let pStyle = "height:30px;line-height:30px;font-weight:bold;";
            let snStyle = "padding:5px 10px;";
            let currentUnit = "元";
            let html = "<p style='" + pStyle + "'><span style='"+snStyle+"'>" + company + 
            "</span><span  style='"+snStyle+"'>(期间：" + year + "年" + month + "月" + "</span><span>单位：" + currentUnit + ")</span></p>";
            return html ;
        }
    }
}
