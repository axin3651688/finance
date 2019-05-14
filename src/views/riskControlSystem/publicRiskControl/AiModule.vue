<template>
<!--
    name: sjz
    树表的公用组件
-->
    <div id="riskReport">
        <!-- 按钮 -->
        <el-button-group>
            <el-button 
            v-if="item.toolbar && item.toolbar.length>0"
            v-show="!isShow"
            v-for="(btn, index) in item.toolbar"
            :key="btn.id" 
            type="primary"
            style="margin: 10px 0px 10px 0"
            @click="btnClick(btn)"
            plain 
            :icon="btn.icon">
                {{ btn.text }}
            </el-button>
        </el-button-group>
        <!-- 树表组件 -->
        <tree-table 
        v-show="!isShow"
        :columns="columns" 
        :data="data" 
        :item="item"
        @showreportdetailp="showreportdetailp"  
        >
        </tree-table>
        <!-- 跳转报告页面 -->
        <div v-show="isShow">
            <report-component :dataSource="dataSource"></report-component>
        </div>
        <!-- dialog弹出框 -->
        <!-- <el-dialog :title="title" width="56%" top="40px" :visible.sync="dialogVisible">               
            <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
            <dialog-component :treeName="treeName"></dialog-component>
        </el-dialog>--> 
    </div>
    
</template>
<script>
// 引用树表
import treeTable from "@v/riskControlSystem/sjzRiskControl/treeTable";
// 引用接口（获取数据）
import { findThirdPartData, findDesignSource } from "~api/interface";
// 引用弹出框组件
import dialogComponent from "@v/riskControlSystem/publicRiskControl/dialogComponent"
// 引用跳转的报告页面
import reportComponent from "@v/riskControlSystem/publicRiskControl/reportComponent"
// 引用vuex
import { mapGetters, mapActions } from "vuex";
// import { constants } from 'http2';
export default {
    name: 'treeTableDemo',
    components: {
        treeTable,
        dialogComponent,
        reportComponent
    },
    props: ["jsonAdress","tableHeight"],
    data(){
        return {
            dialogVisible: false,
            isShow: false ,
            treeName: "",
            title: "",
            columns:[],
            data:[],
            item: {},
            dataSource: {},
            biYear: "",
            biMonth: "",
            biCompany: ""
        }
    },
    created(){ 
        // debugger
        this.biYear = this.$store.getters.year;
        this.biMonth= this.$store.getters.month;
        this.biCompany = this.$store.getters.company;
        // 获取树表的json信息
        this.setTreeTableRequest();
    },
    mounted(){

    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"])
    },
    watch: {
        year(newyear) {
            this.loadModuleBefore(newyear, this);
        },
        month(newmonth) {
            this.loadModuleBefore(newmonth, this);
        },
        company(newcompany) {
            this.loadModuleBefore(newcompany, this);
        }
    },
    methods: {
        /** 树表子组件 传过来 的值
         *  可点击的列 点击之后跳转到父组件的 showFromChild的方法
         */ 
        // showFromChild(data){
        //     // debugger
        //     let me = this ;
        //     me.dialogVisible = true ;
        //     me.title = "关于【" + data + "】的追踪" ; 
        //     me.treeName = me.item.id ;
        // },
        /** 
         * 树表子组件 传过来 的值
         * 可点击的列 点击之后跳转到父组件的 showreportdetailp 方法
         * 组件引用： reportComponent.vue
         */ 
        showreportdetailp(params){
            this.isShow = true ;
            this.dataSource = params ;
        },
        // 获取树表的json信息
        setTreeTableRequest(){ 
            const me = this ;
            // jsonAdress传入的json地址
            let $json = me.jsonAdress ;
            me.axios.get($json).then(res => {
                // debugger
                let obj = res.data;
                // 把json字符串转换成对象
                obj = eval("(" + obj + ")");
                // 把对象变成数组
                Object.keys(obj).forEach(key => { 
                    console.log(key,obj[key]);
                    me[key] = obj[key];
                });
                // 把数组变成对象
                me.items.forEach((item,index)=>{
                    me.item = item;
                });
                // debugger
                // 数据处理加载模块
                this.loadModuleBefore();
            });
        },
        // 日期处理
        getPeriod(){
            let me = this, period = "" ;
            if(me.biMonth>0 && me.biMonth<10){
                period = "0" + me.biMonth ;
            }
            return period ;
        },
        // 数据处理加载模块
        loadModuleBefore(){
            // debugger
            let me = this ;
            let params = me.$store.state.prame.command;
            let datas = {
                sql: me.config.sql,
                year: params.year ,
                month: params.month,
                company: params.company,
                period: params.year + me.getPeriod(),
                comparePeriod: params.year -1 + me.getPeriod(),
            };
            // 看看json里有没有配置【queryDataBefore】数据获取之前拦截的方法
            if(me.item.queryDataBefore && typeof me.item.queryDataBefore == "function"){
                datas = me.item.queryDataBefore(datas, me);
            }else if(datas.sql){
                me.setData(me.item, datas);
            }else if(me.rows.length){
                me.queryDataAfter(me.item,me.rows);
            }else{
                return false ;
            }

        },
        // 取数总接口
        setData(item, params){ 
            let me = this ;
            findThirdPartData(params).then(res => { 
                me.queryDataAfter(item, res.data.data);
            }).catch(res => {
                console.info(res);
            });
        },
        // 数据获取之后的拦截
        queryDataAfter(item, datas){
            // debugger
            let me = this ;
            // 如果是树表，处理成树表类型
            if(item.isTree && !me.rows.length){
                me.array(datas);
                datas = datas.filter((res, index) => { return index == 0 });
            }
            // 看看json里有没有配置【queryDataAfter】数据获取之后拦截的方法
            if(me.item.queryDataAfter && typeof me.item.queryDataAfter == "function"){
                me.data = me.item.queryDataAfter(datas, me);
            }
        },
        /**
         * @event 2.1树表的类型处理
         */
        array(datas){
            let data = datas;
            let arr = [];
            let index = 0;
            let flag = false;
            //找到父亲,可能存在好多个父节点，但是一般是一个，暂时只做一个处理。
            let root, rootItem, demoItem;
            let rootArr = [];
            if (data && data.length > 0) {
                demoItem = data[0];
                if (demoItem.pid) {
                    for (let i = 1; i < data.length - 1; i++) {
                        let eveItem = data[i];
                        //公司gsbm，数据sql查出来是这样的字段，所以暂时用这个，后面在改
                        if (eveItem.gsbm == demoItem.pid) {
                            demoItem = eveItem;
                        }
                    }
                    rootItem = demoItem;
                } else {
                    rootItem = demoItem;
                }
            }
            //找到多个父节点
            for (let i = 0; i < data.length; i++) {
                // if(i == data.length)return rows ;
                if (!data[i].pid) {
                    rootArr.push(data[i]);
                }
            }
            if (rootArr && rootArr.length > 1) {
                for (let i = 0; i < rootArr.length; i++) {
                    let it = rootArr[i];
                    this.tranformData(data, it);
                }
                this.item.rows = rootArr;
            } else {
                if (rootItem) {
                    this.tranformData(data, rootItem);
                }
                this.item.rows = rootItem;
            }
        },
        /**
         * @event 2.2树表的类型处理
         */
        tranformData(data, rootItem){
            let me = this;
            let children = [];
            let dataArr = [];
            rootItem.children = children;
            for (let i = 0; i < data.length; i++) {
                let it = data[i];
                if (it.gsbm === rootItem.gsbm) {
                    continue;
                }
                //满足条件的就塞进去，不满足的塞到另一个新数组中
                if (rootItem.gsbm == it.pid) {
                    rootItem.children.push(it);
                } else {
                    dataArr.push(it);
                }
            }
            if (rootItem.children && rootItem.children.length > 0) {
                for (let i = 0; i < rootItem.children.length; i++) {
                    let tt = rootItem.children[i];
                    me.tranformData(dataArr, tt);
                }
            }
        },
        // 按钮功能: 由于按钮的功能都不一样，所以写在json里的每个按钮方法里，自由发挥。
        btnClick(btn){
            if(btn.handler && typeof btn.handler == "function"){
                return btn.handler(this.data, btn, this);
            }
        }
    }
}
</script>
<style scoped>

</style>
