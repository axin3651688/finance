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
                    <div class="form-foot-right" v-show="dialogData['dialogRiskType'] === 'riskBack'">
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

                    <div class="form-foot-right" v-show="dialogData['dialogRiskType'] === 'riskTrack'">
                        <div style="text-align: right; padding-right: 4px;">
                            <el-button type="primary" @click="pageExport">导出</el-button>
                            <el-button @click="pageBack">关闭</el-button>
                        </div>
                    </div>

                </div>
            </el-col>
        </el-row>

        <show-personnel-list :personnelListShow="personnelListShow"></show-personnel-list>

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
            dialogData: Object
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
        methods: {
            /**
             * 查看上一条信息
             */
            lastMessage() {
                let flag = 'up';
                this.$emit("messageChange",flag);
            },
            /**
             * 查看下一条信息
             */
            nextMessage() {
                let flag = 'down';
                this.$emit("messageChange",flag);
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
            pageBack() {
                this.$emit("closeDialogContent")
            },
            pageExport() {
                alert('报告导出事件')
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