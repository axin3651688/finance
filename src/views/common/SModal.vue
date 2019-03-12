<template>
    <el-dialog
    title="信息"
    width="30%"
    :plateSelect.sync="plateSelect"
    :visible.sync="plateSelect.dialogVisible"
    >
    <div slot="header">
        <span class="titleContent">信息</span>
    </div>
        <div class="bodyContent">
            <span>选择板块/公司进行下钻？</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="plateHandle" style="background-color:#0099cc;">板块</el-button>
            <el-button @click="companyHandle">公司</el-button>
        </span>
    </el-dialog>
</template>
<script>
import EventMixins from "@c/mixins/EventMixins";
export default {
    mixins: [EventMixins],
    name: "SModal",
    props: ["dialogVisible","vueChart","plateSelect"],
    data() {
        return {
            dialogVisible:plateSelect.dialogVisible
        }
    },
    created() {
        debugger;
    },
    mounted() {
        debugger;
    },
    methods: {
        plateHandle (done) {
            debugger;
            let me = this;
            let $vueChart = this.vueChart.content;
            me = $vueChart;
            this.plateSelect.id = "company";
            let modalParams = this.$store.modalParams;
            let api = "/cnbi/json/source/tjsp/ybpDebug.json";
            if(modalParams.listener.sourceApi){
                modalParams.listener.sourceApi = api;
            }
            if (modalParams.listener.way && me[modalParams.listener.way]) {
                me[modalParams.listener.way](modalParams.params, modalParams.listener, modalParams.bb);
            }
            if (modalParams.listener.handler) {
                modalParams.listener.handler(me, modalParams.params);
            } else {
                console.log("没有设置回调函数，你真的不想干点什么了吗：", listener);
            }

            this.plateSelect.dialogVisible = false;
        },
        companyHandle () {
            debugger;
            let me = this;
            let $vueChart = this.vueChart.content;
            me = $vueChart;
            this.plateSelect.id = "company";
            let modalParams = this.$store.modalParams;
            let api = "/cnbi/json/source/tjsp/dashDrillCompany.json";
            if(modalParams.listener.sourceApi){
                modalParams.listener.sourceApi = api;
            }
            if (modalParams.listener.way && me[modalParams.listener.way]) {
                me[modalParams.listener.way](modalParams.params, modalParams.listener, modalParams.bb);
            }
            if (modalParams.listener.handler) {
                modalParams.listener.handler(me, modalParams.params);
            } else {
                console.log("没有设置回调函数，你真的不想干点什么了吗：", listener);
            }
            this.plateSelect.dialogVisible = false;
        }
    }
}
</script>


<style>
/* .smodal：作用是作为一个唯一标识，不然的样式会全局污染，使用scoped设置不上样式，在bichart组件中加的
    这样不太好，暂时这样，没有更好的方法
 */
    .smodal .el-dialog__title {
        color: #fff !important;
        font-size: 20px !important;
    }
    .smodal button i.el-icon-close {
        color: #fff !important;
        font-size: 20px !important;
    }
    .smodal .el-dialog__header {
        background-color: #0099cc !important;
        color: #fff !important;
    }
    .smodal .bodyContent {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }
</style>
