<template>
    <div>
        <el-row>
            <el-col>
                <div class="form-foot">
                    <div class="form-foot-left">
                        <el-form-item>
                            <el-button type="primary" @click="lastMessage()">上一条</el-button>
                            <el-button type="primary" @click="nextMessage()">下一条</el-button>
                        </el-form-item>
                    </div>
                    <div class="form-foot-right" v-if="dialogData['dialogRiskType'] === 'riskBack'">
                        <el-form-item>
                            <el-checkbox
                                    label="指定反馈人员"
                                    name="type"
                                    class="form-foot-right-check"
                                    @change="handleCheckedChange"
                            ></el-checkbox>
                            <el-button type="primary" @click="riskSend()">反馈上报</el-button>
                        </el-form-item>
                    </div>

                    <div class="form-foot-right" v-if="dialogData['dialogRiskType'] === 'riskTrack'">
                        <div style="text-align: right; padding-right: 4px;">
                            <el-button type="primary" @click="pageExport">导出</el-button>
                            <el-button @click="pageBack">关闭</el-button>
                        </div>
                    </div>

                </div>
            </el-col>
        </el-row>

        <show-personnel-list
                :personnelListShow="personnelListShow"
                @personSureBtnClicked="personSureBtnClicked"

        >
        </show-personnel-list>

    </div>
</template>

<script>
    import showPersonnelList from '../showPersonnelList'

    export default {
        name: "riskFoot",
        components: {
            showPersonnelList
        },
        props: {
            formData: Object,
            dialogData: Object,
            dataChanged: Boolean
        },
        data() {
            return {
                personnelListShow: false
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            dataChanged(newValue, oldValue) {
                this.getFormData();
            }
        },
        methods: {
            /**
             * 查看上一条信息
             */
            lastMessage() {
                let rowIndex = this.dialogData['rownum'];
                let obj = {
                    flag: 'up',
                    rowIndex : rowIndex
                };
                this.$emit("messageChange",obj);
            },
            /**
             * 查看下一条信息
             */
            nextMessage() {
                let rowIndex = this.dialogData['rownum'];
                let obj = {
                    flag: 'down',
                    rowIndex : rowIndex
                };
                this.$emit("messageChange",obj);
            },
            /**
             * 反馈上报
             */
            riskSend() {
                alert("反馈上报。。。")
            },
            /**
             * 指定反馈人员选中监听
             */
            handleCheckedChange() {
                // alert("反馈上报。。。")
                this.personnelListShow = !this.personnelListShow;
            },
            /**
             * 关闭按钮
             */
            pageBack() {
                this.$emit("closeDialogContent")
            },
            /**
             *导出按钮
             */
            pageExport() {
                alert('报告导出事件')
            },
            /**
             * 确认下达按钮
             */
            personSureBtnClicked(nodes){
                this.$emit("personSureBtnClicked",nodes)
            }
        }
    }
</script>

<style scoped>

    .top-form-contents span {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
    }

    .form-foot {
        display: flex;
        justify-content: space-between;
    }

    .form-foot-right-check {
        margin-right: 10px;
    }
</style>