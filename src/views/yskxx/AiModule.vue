<template>
    <div id="ai-module">
        <!-- <div style="margin-bottom: 20px;">
            <el-button
                size="small"
                @click="addTab(tableDataValue)"
            >
                add tab
            </el-button>
        </div> -->
        <el-tabs v-model="tableDataValue" @tab-remove="removeTab">
            <el-tab-pane
                v-for="(item, index) in tabsDataArray"
                :key="item.name"
                :label="item.text"
                :name="item.name"
                :closable="item.closable||false"
            >
                <div style="width: 352px; float: left">
                    <!-- 1. 按钮 -->
                    <el-button-group>
                        <el-button 
                        v-if="item.toolbar && item.toolbar.length>0"
                        v-for="(btn, index) in item.toolbar"
                        :key="btn.id" 
                        type="primary"
                        style="margin: 0px 0px 10px 0"
                        @click="btnClick(btn)"
                        plain 
                        :icon="btn.icon">
                            {{ btn.text }}
                        </el-button>
                    </el-button-group>
                </div>
                <div style="width: 680px; float: left">
                    <!-- 2. 应收、预付、其他 比例 -->
                    <el-input 
                    v-if="item.proportion && item.proportion.length>0" 
                    v-for="(see, index) in item.proportion"
                    v-show="see.show"
                    :key="see.id"
                    clearable 
                    :placeholder="see.placeholder" 
                    v-model="see.input3" 
                    :style="see.cellStyle"
                    class="tree-proportion"
                    @change="seeChange(see)">
                        <template slot="prepend">
                            {{ see.text }}
                            <span style="marginLeft: 10px;">{{ see.icon }}</span>
                        </template>
                        <template slot="append">%</template>
                    </el-input>
                </div>
                <!-- 3. 树表组件(普通表和树表)) -->
                <tree-table
                :columns="item.columns" 
                :data="item.rows"
                @addTab="addTab"
                @handleDownload="handleDownload" 
                :item="item" 
                id="publicTable"
                >
                </tree-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
// 引用vuex
import { mapGetters, mapActions } from "vuex";
// 引用js方法
import mini from "@v/yskxx/yskxx.js" 
// 引用树表
import treeTable from "@v/yskxx/treeTable";
// 引用接口（获取数据）
import { findThirdPartData, findDesignSource } from "~api/interface";
// 导出
import EventMixins from "@c/mixins/EventMixins.js";
import tools from "utils/tools";
export default {
    components: {
        treeTable
    },
    props: ["jsonAdress", "jsonId"],
    data(){
        return {
            tableDataValue: '',
            tabIndex: 1,
            biNisleaf: null ,
            objer: {},
            objer2: {},
            tabsDataArray: [],
            queryEmptyArray: 0,
            adressArray: ""
        }
    },
    created(){
        this.biNisleaf = this.$store.getters.treeInfo.nisleaf ;
        // 获取树表的json信息
        this.setTreeTableRequest();
    },
    mounted(){
        this.showDimsControl(); // 日期的控制显示
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"]),
        ...mapGetters(["device", "user","showDims"])
    },
    watch: {
        // 切换年触发
        year(newyear){
            if(this.items.length > 1)this.closeTab(newyear) ;
            this.loadModuleBefore(newyear, this);
        },
        // 切换月触发
        month(newmonth){
            if(this.items.length > 1)this.closeTab(newmonth) ;
            this.loadModuleBefore(newmonth, this);
        },
        // 切换公司触发
        company(newcompany){ 
            // 注：每次切换公司应该把tabsDataArray的数组清空，要不保留的还是上一次公司的信息，坑啊
            this.tabsDataArray = [] ;
            if(this.items.length > 1)this.closeTab(newcompany) ;
            let cc = this.$store.getters.treeInfo.nisleaf ;
            if(cc === this.biNisleaf){
                this.loadModuleBefore(newcompany, this);
            }else{
                this.biNisleaf = this.$store.getters.treeInfo.nisleaf ;
                this.adressArray = mini.getJsonAdress(this.jsonId, this.biNisleaf);
                this.setTreeTableRequest();
            }
        },
        // 切换单位触发
        conversion(newconversion){
            if(this.items.length > 1)this.closeTab(newconversion) ;
            this.loadModuleBefore(newconversion, this);
        }
    },
    methods: {
        // 日期的控制显示
        showDimsControl(){
            let me = this,showDims = this.showDims;
            showDims.year = true;
            showDims.month = true;
            showDims.company = true;
            showDims.conversion = true ;
        },
        /**
         * @event 获取json信息
         */
        setTreeTableRequest(){ 
            const me = this ;
            // jsonAdress传入的json地址
            let $json = me.adressArray != ''?me.adressArray : me.jsonAdress ;
            me.axios.get($json).then(res => { 
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                // 把对象变成数组
                Object.keys(obj).forEach(key => {
                    me[key] = obj[key];
                });
                obj.items.forEach((item,index)=>{
                    Object.keys(obj).forEach(key => {
                        item[key] = obj[key];
                    });
                });
                obj.items.forEach((item,index)=>{
                    Object.keys(item).forEach(key => {
                        obj[key] = item[key];
                    });
                });
                // debugger
                me.objer = obj ;
                me.objer2= obj ;
                // me.tableDataValue = me.objer.text ;
                me.tableDataValue = me.objer.name ;
                // 数据处理加载模块
                this.loadModuleBefore();
            });
        },
        /**
         * @event 数据处理加载模块
         */
        loadModuleBefore(){ 
            // debugger
            let me = this ;
            let $params = me.$store.state.prame.command;
            // 请求传的参数
            let params = {
                sql: me.config.sql,
                year: $params.year ,
                month: mini.getPeriod($params),
                company: $params.company,
                period: $params.year + mini.getPeriod($params),
                comparePeriod: $params.year -1 + mini.getPeriod($params),
                conversion: {
                    id: $params.conversion.id,
                    text: $params.conversion.text
                }
            };
            // 请求之前对参数的处理--json里面 自由发挥
            if(me.objer.queryDataBefore && typeof me.objer.queryDataBefore == "function" ){
                params = me.objer.queryDataBefore(params, me);
            }
            // debugger
            if(params.sql){
                me.setData(me.objer, params);
            }
        },
        /**
         * @event 取数总接口
         */
        setData(item, params){
            // debugger
            let me = this ;
            findThirdPartData(params).then(res => {
                // debugger
                // 获取数据之后的处理 参数：item=objer，数据，this对象
                item.rows = res.data.data ;
                // 是否是应收、预付、其他三张表
                if(me.jsonId=="yszk" || me.jsonId=="yfzk" || me.jsonId=="qtysk"){
                    // 判断是否是合并公司（因为只有合并公司才有比例）
                    if(me.$store.getters.treeInfo.nisleaf === 0){
                        mini.getProportion(me, item.rows, params) ;
                        me.queryDataAfter(item, item.rows, me) ;
                    }else{
                        me.queryDataAfter(item, item.rows, me) ;
                    }
                }
                
            }).catch(res => {
                console.error(res);
            });
        },
        /**
         * @event 获取数据之后的处理
         */
        queryDataAfter(item, datas, me){ 
            let $params = me.$store.state.prame.command;
            let $col = [] ;
            // json里有没有配置queryDataAfter方法
            if(item.queryDataAfter && typeof item.queryDataAfter == "function"){
                datas = item.queryDataAfter(datas, me) ;
            }
            // debugger
            // 单位是否有变化
            if($params.conversion.id > 1){
                $col = item.tableHeads?mini.getColumns(me.objer.columns, $col): item.columns ;               
                datas = mini.getConversion($col, datas, me);               
            }
            // 判断是不是树表类型
            if(item.isTree){
                // 树形数据处理
                me.array(datas) ;
                // 是否是同级树形 true是，false否
                if(!item.xtype){
                    datas = datas.filter((res, index) => { return index == 0 });
                }else{
                    datas = datas.filter((res, index) => { return res.children && res.children.length > 0 });
                }
            }
            if(!item.closable){
                me.items.forEach(res => res.rows = datas);
                if(me.tabsDataArray.length === 0)me.tabsDataArray = me.items ;
            }else{
                item.rows = datas ;
            }           
        },
        /**
         * @event 按钮功能:由于按钮的功能都不一样，所以写在json里的每个按钮方法里，自由发挥。
         */
        btnClick(btn){
            if(btn.handler && typeof btn.handler == "function"){
                return btn.handler(this.objer.rows, btn, this);
            }
        },
        /**
         * @event 比例触发（应收、预付、其他）click-事件
         */
        seeChange(see){
            let me = this ;
            return mini.changeFormater(me, see);
        },
        /**
         * @event tab新增返回的数据
         */
        setRequestJson(obj, pool, newTabName){ 
            obj.text = pool.text ;
            obj.name = newTabName ;
            obj.company = pool.id ;
            obj.closable = true ;
            this.objer = obj ;
            // this.tableDataValue = pool.text ;
            this.tableDataValue = newTabName ;
            this.loadModuleBefore();
            this.tabsDataArray.push(obj);  
        },
        /**
         * @event tab新增
         */
        addTab(pool, obj,targetName) { 
            if(pool.text === this.objer.text ){
                this.tableDataValue = this.objer.name ;
            }else{
                let newTabName = ++this.tabIndex + '';
                mini.getRequestJson(obj,this, newTabName, pool);      
            }
        },
        /**
         * @event tab删除
         */
        removeTab(targetName) { 
            let tabs = this.tabsDataArray;
            let activeName = this.tableDataValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => { 
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
                this.tableDataValue = activeName;
            }       
            // this.tableDataValue = activeName;
            this.tabsDataArray = tabs.filter(tab => tab.name !== targetName);
            if(this.tabsDataArray.length === 1){
                this.tabIndex = 1 ;
                this.tableDataValue = this.tabsDataArray[0].name ;
                this.objer = this.objer2 ;
            }
        },
        /**
         * @event tab关闭
         */
        closeTab(vax){ 
            let me = this;
            let tabs = me.tabsDataArray;
            me.tabsDataArray = tabs.filter(tab => !tab.closable);           
            if(me.tabsDataArray.length > 0)me.tableDataValue = me.tabsDataArray[0].name;
            me.objer = me.objer2 ;
            me.loadModuleBefore() ;
        },
        /**
         * @event 2.1树表的类型处理
         */
        array(data){
            const setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "scode",
                        pIdKey: "spcode"
                    },
                        key: {
                        name: "scode",
                        children: "children"
                    }
                }
            };
            debugger
            if (Array.isArray(data) && data.length > 0) {
                data = tools.sortByKey(data, "scode");
                data = data.filter(function(item) {
                    item.id = item.scode;
                    item.label = "(" + item.scode + ") " + item.sname;
                    return item;
                });
                this.rows = tools.transformToeTreeNodes(setting, data);
            }
        },
        /**
         * @event 导出
         */
        handleDownload(){
            debugger
            let vue = this ;
            vue.downloadLoading = true;
            import('@/excel/SZCExport2ExcelTable').then(excel => {
                let rootColmuns = [],columns = vue.objer2.columns;
                let firstItem = columns[0];
                columns = columns.filter((item,index) => {
                    return index != 0;
                });
                columns.push(firstItem);
                mini.getColumns(columns, rootColmuns) ;
                // this.parseColmns(columns,rootColmuns);
                excel.export_table_to_excel("publicTable", vue.objer2.text, rootColmuns);
                vue.downloadLoading = false
            });
        }
    }
}
</script>
<style>
/* input框 文字/数字 右对齐 */
.tree-proportion .el-input__inner {
    text-align: right !important;
}
</style>
