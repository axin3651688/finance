<template>
    <div>
        <template v-for="item in riskSystemSuggestDetailData">
            <div class="suggest-detail">
                <span class="suggest-detail-date">{{item.proposedDate}}</span>
                <span class="suggest-detail-user">{{item.proposedUser}}</span>
                <el-button class="el-button-btn" :disabled="item.user !== thisUser" size="small" type="primary" @click="suggestChange(item)">修改</el-button>
                <el-button class="el-button-btn" :disabled="item.user !== thisUser" size="small" type="primary" @click="suggestDelete(item)">删除</el-button>
            </div>
            <div>
                <el-input
                        class="suggest-detail-content"
                        type="textarea"
                        :rows="3"
                        disabled
                        v-model="item.proposedContent"
                >
                </el-input>
            </div>
        </template>


        <div class="dialog-components">
            <el-dialog
                    title="请填写新的建议内容"
                    width="30%"
                    top="100px"
                    :modal-append-to-body='false'
                    :close-on-click-modal='false'
                    :visible.sync="dialogVisible"
                    @closed="dialogClose"
            >
                <div style="height:2px;border:1px solid #606266; margin-top: -15px; margin-bottom: 20px"></div>

                <div style="height: 200px; width: 100%">
                    <el-input
                            class="suggest-detail-change"
                            type="textarea"
                            :rows="8"
                            placeholder="请填写新的建议内容..."
                            v-model="newSuggestContent"
                    >
                    </el-input>
                </div>

                <div style="display: flex; justify-content: flex-end;" >
                    <el-button type="primary" @click="buttonSure()">确认修改</el-button>
                    <el-button  @click="dialogVisible = false">取消修改</el-button>
                </div>


            </el-dialog>
        </div>


    </div>
</template>

<script>
    import {riskSuggestChange, riskSuggestDelete} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"

    export default {
        name: "riskSystemSuggestDetail",
        mixins: [cwtPublicJS],
        components: {},
        props: {
            riskSystemSuggestDetailData: Array
        },
        data() {
            return {
                dialogVisible: false,
                dialogCloseByClockOther: true,
                newSuggestContent: '',
                thisUser: this.$store.getters.user.user.userName
            }
        },
        created() {
            this.getLoopData();
        },
        mounted() {
        },
        methods: {
            /**
             * 获取数据
             */
            getLoopData() {
                this.data = this.riskSystemSuggestDetailData;
            },
            suggestChange(item) {
                let _this = this;
                _this.item = item;
                _this.dialogVisible = true;
            },

            suggestDelete(item) {
                let _this = this;
                let params = {
                    id: item.id,
                };

                riskSuggestDelete(params).then((res) => {
                    if (res.status === 200) {
                        _this.$emit("addSuccess", 'suggestAdd');
                        _this.$emit("pageClose", 'suggestAdd');
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    }
                });

            },

            dialogClose() {
                document.getElementsByClassName('v-modal')[0].style.zIndex = -111;
            },
            buttonSure() {
                let _this = this;
                let item = _this.item;
                let params = {
                    id: item.id,
                    proposedContent: _this.newSuggestContent,
                    proposedDate: _this.getDateNowYMD(),
                };

                riskSuggestChange(params).then((res) => {
                    if (res.status === 200) {
                        _this.dialogVisible = false;
                        _this.$emit("addSuccess", 'suggestAdd');
                        _this.$emit("pageClose", 'suggestAdd');

                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });

                    }
                });
            }
        }
    }
</script>

<style>
    .suggest-detail {
        margin-bottom: 16px;
    }

    .suggest-detail-date {
        padding: 6px 20px;
        height: 32px;
        background-color: #996699;
        color: #fff;
        border-radius: 14px;
    }

    .suggest-detail-user {
        margin-left: 16px;
        padding: 6px 20px;
        background-color: #78A126;
        color: #fff;
        border-radius: 14px;
    }

    .suggest-detail-content {
        margin-bottom: 30px;
    }

    .el-button-btn {
        margin-left: 20px;
        height: 32px;
        border-radius: 14px;
    }

    .suggest-detail-change {
        width: 100%;
        margin-bottom: 30px;
    }

    .el-textarea.is-disabled .el-textarea__inner {
        color: #333333;
    }
</style>