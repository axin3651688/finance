<template>
    <div>
        <div class="top-tip">
            <span class="select-name">部门选择:</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="track-table">
            <single-table
                :tableData="tableData"
                :columns="columns"
                @changeShowContent="showRiskSingleTrack"
            >
            </single-table>
        </div>
        <div class="track-dialog">
            <el-dialog
                    :title="getDialogTitle()"
                    width="56%"
                    top="50px"
                    :visible.sync="trackDialogVisible"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <dialog-component
                        :dialogData="this.dialogData"
                >
                </dialog-component>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import SingleTable from "../../publicRiskControl/table/singleTable";
    import dialogComponent from '../../publicRiskControl/dialogComponent';
    export default {
        name: "riskSingleTrack",
        components: {
            SingleTable,
            dialogComponent
        },
        props: {},
        data() {
            return {
                trackDialogVisible:false,
                tableData:[],
                columns:[],
                dialogData:{
                    dialogRiskType:"riskTrack",
                    riskName:""
                },
                options: [
                    {
                        value: '选项1',
                        label: '财务部'
                    }, {
                        value: '选项2',
                        label: '风控部'
                    }, {
                        value: '选项3',
                        label: '其他部门'
                    }
                ],
                value: ''
            }
        },
        created() {
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskSingleTrack.json").then(res => {
                if(res.data.code === 200) {
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        mounted() {
        },
        methods: {
            /**
             * 改变控制弹出层的参数，显示弹出层
             * */
            showRiskSingleTrack(row){
                this.trackDialogVisible = true;
                this.dialogData['riskName'] = row.riskName;
            },
            /**
             * 获取当前弹出框title
             * @returns {string}
             */
            getDialogTitle(){
                let _riskName = this.dialogData.riskName;
                return '关于【' + _riskName + '】的追踪';
            }
        }
    }
</script>

<style scoped>
    .select-name {
        margin-right: 10px;
    }

    .top-tip {
        margin-bottom: 10px;
    }
</style>