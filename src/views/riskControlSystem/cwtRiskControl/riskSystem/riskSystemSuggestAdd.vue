<template>
    <div>
        <el-form ref="form" label-width="90px">
            <el-form-item label="报告名称：">
                <el-input v-model="data.riskName" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议日期：">
                <el-input v-model="data.riskDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议人员：">
                <el-input v-model="data.riskUser" disabled></el-input>
            </el-form-item>
            <el-form-item label="建议内容：">
                <el-input
                        type="textarea"
                        :rows="4"
                        v-model="data.riskContent"
                        placeholder="我是缺省内容"
                >
                </el-input>
            </el-form-item>

            <div class="suggest-add-button">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="pageClose">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import cwtPublicJS from "../mixin/cwtPublicJS"
    import {riskSystemSuggestAdd} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "riskSystemSuggestAdd",
        mixins: [cwtPublicJS],
        components: {},
        props: {
            rowData: Object,
            systemAddFresh: Boolean
        },
        watch: {
            systemAddFresh() {
                this.initData();
            }
        },
        data() {
            return {
                data: {
                    riskName: 'rrr',
                    riskDate: '2019年4月1号',
                    riskUser: 'ffffff',
                    riskContent: ''
                }
            }
        },
        created() {
            this.initData();
        },
        mounted() {
        },
        methods: {
            /**
             * 建议提交事件
             */
            onSubmit() {
                let _params = this.getSendParams();
                this.suggestAddRequestSend(_params);
            },

            /**
             * 获取发送请求参数
             */
            getSendParams() {
                let _this = this;
                let _rowData = _this.rowData;
                let _data = _this.data;
                let _nid = _rowData.nid;

                return {
                    proposedDate: _data.riskDate,
                    proposedUser: _data.riskUser,
                    proposedContent: _this.data.riskContent,
                    infoId: _nid
                };
            },

            /**
             * 添加、修改页面关闭
             */
            pageClose() {
                this.$emit("pageClose", 'suggestAdd');
            },

            /**
             * 初始化数据
             */
            initData() {
                let _this = this,
                    _getter = _this.$store.getters;
                let _dept = _getter.user['dept'][0].sname,
                    _userName = _getter.user.user.trueName;

                let _rowData = _this.rowData;
                let _data = _this.data;
                _data.riskName = _rowData.title;

                _this.data.riskDate = _this.getDateNowYMD();
                _this.data.riskUser = '【' + _dept + '】' + _userName;

            },

            /**
             * 风险建议添加请求发送
             * @param params
             */
            suggestAddRequestSend(params) {
                let _this = this;
                riskSystemSuggestAdd(params).then(res => {
                    if (res.data.code === 200) {
                        _this.$emit("addSuccess", 'suggestAdd');
                        _this.$emit("pageClose", 'suggestAdd');
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .suggest-add-button {
        text-align: right;
    }
</style>