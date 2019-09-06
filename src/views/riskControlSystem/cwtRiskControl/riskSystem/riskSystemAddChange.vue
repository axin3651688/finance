<template>
    <div>

        <el-form
                ref="form"
                :model="formData"
                label-width="90px"
                action="/zjb/risk_sys/add"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="制度标题：">
                        <el-input v-model="formData.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发文字号：">
                        <el-input v-model="formData.issuedNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="成文日期：">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="formData.writtenDate"
                                style="width: 100%"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发布日期：">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="formData.releaseDate"
                                style="width: 100%"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="加载文件：">

                        <el-upload
                                class="upload"
                                ref="upload"
                                action="/zjb/risk_sys/add"
                                :auto-upload="autoUpload"
                                :data="this.formData"
                                :on-success="onSuccess"
                                :on-error="onError"
                                :on-change="handleChange"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>

                    </el-form-item>
                </el-col>
            </el-row>

            <div class="foot-button">
                <el-button
                        @click="onSubmit"
                        type="primary"
                        v-loading.fullscreen.lock="fullscreenLoading"
                >
                    确定
                </el-button>
                <el-button @click="pageClose">取消</el-button>
            </div>

        </el-form>


    </div>
</template>

<script>
    import {riskSystemAdd,editReport} from '~api/cwtRiskControl/riskControlRequest'
    import cwtPublicJS from "../mixin/cwtPublicJS"

    export default {
        name: "riskSystemAddChange",
        mixins: [cwtPublicJS],
        components: {},
        props: {
            riskSystemSingleData: Object,
            riskSystemSingleDataFresh: Boolean,
            systemAddFresh: Boolean
        },
        watch: {
            riskSystemSingleDataFresh() {
                this.dataFresh();
            },
            systemAddFresh() {
                let _this = this,
                    _formData = _this.formData;
                _formData.title = '';
                _formData.issuedNumber = '';
                _formData.writtenDate = '';
                _formData.releaseDate = '';
            }
        },
        data() {
            return {
                formData: {
                    title: '',
                    issuedNumber: '',
                    writtenDate: '',
                    releaseDate: '',
                    com: this.$store.getters.company,
                    publishDept: this.$store.getters.user['dept'][0].id,
                    publishUser: this.$store.getters.user.user.userName,
                },

                autoUpload: false,

                dataAddSuccess: false,

                fullscreenLoading: false
            }
        },
        created() {
            this.dataFresh();
        },
        mounted() {
        },
        methods: {
            /**
             * 修改请求。
             */
            editReportContent (params) {
                editReport(params).then(res => {
                    if(res.status == 200){
                        this.$message({
                            message:"修改成功！",
                            type:"success"
                        });
                        this.$emit("addSuccess", 'systemAdd');
                        this.$emit("pageClose", 'systemAdd');
                    }else{
                        this.$message({
                            message:"修改出错！",
                            type:"error"
                        });
                    }
                    
                    // this.dataFresh();
                });
            },
            onSubmit() {
                let _this = this;
                debugger;
                let params = this.formData;

                params.writtenDate = this.getDateNowYMD(this.formData.writtenDate);
                params.releaseDate = this.getDateNowYMD(this.formData.releaseDate);

                if (_this.$refs.upload.$el.innerText === '选取文件') {
                    // 'success' | 'warning' | 'info' | 'error'
                    // this.$message({
                    //     message: '请录入完整信息',
                    //     type: 'warning'
                    // });
                    this.editReportContent(params);
                    return;
                }

                if (typeof params.nid === 'undefined') {
                    delete params.nid
                }

                if (typeof params.savePath === 'undefined') {
                    delete params.savePath
                }
                let _titleLength = params.title.length;
                let _issuedNumberLength = params.issuedNumber.length;
                if (_titleLength > 100) {
                    this.$message({
                        message: '制度标题不能超过100字！'
                    });
                    return;
                }
                if (_issuedNumberLength > 100) {
                    this.$message({
                        message: '发文字号不能超过100字！'
                    });
                    return;
                }
                _this.$refs.upload.submit();
                // _this.fullscreenLoading = true;

                _this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

            },

            /**
             * 添加、修改页面关闭
             */
            pageClose() {
                this.$emit("pageClose", 'systemAdd')
            },

            handleChange(event) {
                this.file = event.raw;
            },

            /**
             * 弹出层数据刷新
             */
            dataFresh() {
                let _this = this,
                    _riskSystemSingleData = _this.riskSystemSingleData,
                    _formData = _this.formData;
                _formData.title = _riskSystemSingleData['title'];
                _formData.issuedNumber = _riskSystemSingleData['issuedNumber'];
                _formData.writtenDate = _riskSystemSingleData['writtenDate'];
                _formData.releaseDate = _riskSystemSingleData['releaseDate'];
                _formData.nid = _riskSystemSingleData['nid'];
                _formData.savePath = _riskSystemSingleData['savePath'];
            },

            /**
             * 上传成功的回调
             */
            onSuccess(ee) {
                debugger;
                let _this = this;
                if (ee.code === '0') {
                    _this.$message({
                        message: '添加失败',
                        type: 'error'
                    });
                } else {
                    _this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    _this.$emit("addSuccess", 'systemAdd');
                    _this.$emit("pageClose", 'systemAdd');
                }

                // _this.fullscreenLoading = false;
                _this.loading.close();
            },

            /**
             * 制度添加失败的提示
             */
            onError() {
                this.$message({
                    message: '添加失败'
                });
            }

        }
    }
</script>

<style scoped>

    .foot-button {
        text-align: right;
    }

    .upload {
        display: flex;
    }
</style>