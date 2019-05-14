<template>
    <div>
        <div class="risk-back-content">
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
            <div class="risk-back-table">
                <stable
                        :tableData.sync="tableData"
                        :columns.sync="columns"
                        :dialogVisible="!dialogVisible"
                        @changeShowContent="changeShowContent"
                >
                </stable>
            </div>
        </div>

        <div class="risk-back-dialog">
            <el-dialog
                    :title="getDialogTitle()"
                    width="56%"
                    top="50px"
                    :visible.sync="dialogVisible"
            >
                <!--<span>{{ diaData }}}</span>-->
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <dialog-component
                        :dialogData="this.dialogData"
                        :dialogType="this.dialogType"
                >
                </dialog-component>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import dialogComponent from '../publicRiskControl/dialogComponent'
    import stable from "@v/riskControlSystem/publicRiskControl/table/singleTable";
    export default {
        name: "riskBack",
        components: {
            dialogComponent,
            stable
        },
        data() {
            return {
                dialogData:{
                    riskName:""
                },
                dialogType:'riskBack',
                dialogVisible: false,
                tableData:[],
                columns:[],
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
        created(){
            //请求table的数据。
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/cwtJson/risk/riskSingleTable.json").then(res => {
                if(res.data.code === 200) {
                    me.tableData = res.data.rows;
                    me.treeData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        methods: {
            /**
             * 操作列里面的反馈或者已反馈触发的事件
             * @param index
             * @param row
             */
            riskHandle(index, row) {
                console.log(index, row);
            },
            /**
             * 表头改变颜色
             * @param rowIndex
             * @returns {string}
             */
            getRowClass({rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)'
                } else {
                    return ''
                }
            },
            /**
             * 关于某个风险的反馈弹出按钮
             * @param index
             * @param row
             */
            changeShowContent(row) {
                debugger;
                this.dialogVisible = true;
                // this.dialogData[index] = index;
                this.dialogData['riskName'] = row.riskName;
            },
            /**
             * 获取当前弹出框title
             * @returns {string}
             */
            getDialogTitle(){
                let _riskName = this.dialogData.riskName;
                return '关于【' + _riskName + '】的反馈';
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