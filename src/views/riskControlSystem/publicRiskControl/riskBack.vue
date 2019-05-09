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
                <el-table
                        :data="tableData"
                        :header-cell-style="getRowClass"
                        border
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            style="text-align: center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="riskName"
                            label="风险名称"
                            width="180">
                        <template slot-scope="scope">
                        <span
                                style="color: dodgerblue;cursor: pointer"
                                @click="riskDetailShow(scope.$index,scope.row)"
                        >{{scope.row.riskName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="feedBackState"
                            label="反馈状态"
                            width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="riskHandle(scope.$index, scope.row)">{{scope.row.handle}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="risk-back-dialog">
            <el-dialog
                    :title="getDialogTitle()"
                    width="56%"
                    top="40px"
                    :visible.sync="dialogVisible"
            >
                <!--<span>{{ diaData }}}</span>-->
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>
                <dialog-component :dialogData="this.dialogData" :dialogType="this.dialogType"></dialog-component>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import dialogComponent from './dialogComponent'
    export default {
        name: "riskBack",
        components: {
            dialogComponent
        },
        data() {
            return {
                dialogData:{},
                dialogType:'riskBack',
                dialogVisible: false,
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
                value: '',
                tableData: [
                    {
                        riskName: '一号财务风险',
                        feedBackState: '已反馈',
                        handle: '已反馈'
                    }, {
                        riskName: '二号财务风险',
                        feedBackState: '已反馈',
                        handle: '已反馈'
                    }, {
                        riskName: '三号财务风险',
                        feedBackState: '未反馈',
                        handle: '反馈'
                    }, {
                        riskName: '四号财务风险',
                        feedBackState: '已反馈',
                        handle: '已反馈'
                    }
                ]
            }
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
            riskDetailShow(index, row) {
                this.dialogVisible = true;
                // this.dialogData[index] = index;
                this.dialogData = row;
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