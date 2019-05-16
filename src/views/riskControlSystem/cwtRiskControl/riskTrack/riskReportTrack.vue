<template>
    <div>
        <tree-table
                border
                :data.sync="treeData"
                :columns.sync="columns"
                v-show="!reportBackDetail"
                @buttonHandler="buttonHandler"
        >
        </tree-table>


        <div class="report-component-content" v-show="reportBackDetail">
            <div style="text-align: right; padding-right: 4px;">
                <el-button type="primary" @click="pageBack">返回</el-button>
            </div>
            <report-component :reportCompanyName="this.reportCompanyName"></report-component>
        </div>


    </div>
</template>

<script>
    import treeTable from "../../publicRiskControl/treeTable/treeTable"
    import reportComponent from '../../publicRiskControl/reportComponent'
    export default {
        name: "riskReportTrack",
        components: {
            treeTable,
            reportComponent
        },
        props: {},
        data() {
            return {
                reportBackDetail:false,
                reportCompanyName:'天津食品集团有限公司(合并)',
                treeData:[],
                columns:[]
            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskTreeTrack.json").then(res => {
                if(res.data.code === 200) {
                    me.treeData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        mounted() {
        },
        methods: {
            /**
             * 按钮点击事件 所有的
             * 0:反馈，1:查看，2:退回，3:提醒
             */
            buttonHandler(scope,btnItem){
                let _id = btnItem.id;
                if(_id === '0'){

                }else if(_id === '1'){
                    //显示报告详情
                    this.reportBackDetail = true;
                }else if(_id === '2'){

                }else if(_id === '3'){

                }
            },
            pageBack(){
                this.reportBackDetail = false;
            }
        }
    }
</script>

<style scoped>

</style>