<template>
    <div class="app-container">
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
            <report-component
                    :reportData="reportData"
            >
            </report-component>
        </div>
    </div>

</template>

<script>
    import treeTable from "../../publicRiskControl/treeTable/treeTable"
    import reportComponent from '../../publicRiskControl/reportComponent'

    export default {
        name: 'reportBack',
        components: {
            treeTable,
            reportComponent
        },
        data() {
            return {
                reportBackDetail: false,
                treeData: [],
                columns: [],
                reportData: {
                    reportCompanyName: '天津食品集团有限公司(合并)',
                    reportType: 'riskFeedCom'
                }
            }
        },
        methods: {
            /**
             * 按钮点击事件 所有的
             * 0:反馈，1:查看，2:退回，3:提醒
             */
            buttonHandler(scope, btnItem) {
                let _id = btnItem.id;
                if (_id === '0') {

                } else if (_id === '1') {
                    //显示报告详情
                    this.reportBackDetail = true;
                } else if (_id === '2') {

                } else if (_id === '3') {

                }
            },
            pageBack() {
                this.reportBackDetail = false;
            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskTreeBack.json").then(res => {
                if (res.data.code === 200) {
                    me.treeData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        }
    }
</script>

<style scoped>
    .report-component-content button {
        text-align: right;
    }
</style>

