<template>
    <div >
        <div class="edit-tab">
            <div class="edit-title">{{'创建 '+selectComp.text+' 的子公司'}}</div>
        </div>
        <div class="edit-container">
            <el-form :model="createForm" ref="createForm" :rules="rules" label-position='left'
                     status-icon class="comp-form">
                <el-form-item prop="avatar" style="width: 400px">
                    <el-upload
                            style="display: flex;align-items: center;width:400px;height: 140px"
                            drag
                            ref="upload"
                            :auto-upload="false"
                            :show-file-list="false"
                            :on-change="imgPreview"
                            :before-upload="beforeUpload"
                            action="xxx">
                        <div v-if="localAvatar || oldAvatar">
                            <img v-if="localAvatar" :src="localAvatar" style="width:400px;height: 140px">
                            <img v-else :src="oldAvatar" style="width:400px;height: 140px">
                        </div>
                        <div v-else>
                            <i class="el-icon-upload" style="height: 50px;width: 60px;margin-top: 10px"></i>
                            <div class="el-upload__text">请上传公司LOGO</div>
                        </div>

                    </el-upload>
                </el-form-item>


                <el-form-item prop="text">
                    <div class="item-form">
                        <div class="item-img">
                            <img class="img-margin" src="@a/green/name_icon.svg">
                        </div>

                        <el-input placeholder="请输入公司名称..." class="input-form" v-model="createForm.text"></el-input>
                    </div>
                </el-form-item>


                <el-form-item prop="indus">

                    <div class="item-form">
                        <div class="item-img">
                            <img class="img-margin" src="@a/green/hangye_icon.svg">
                        </div>

                        <el-cascader stripe class="input-form"
                                     :options="industries"
                                     placeholder="请选择行业..."
                                     :show-all-levels="false"
                                     :props="indusProps"
                                     @change="handleIndusChange"
                                     filterable
                        ></el-cascader>
                    </div>
                </el-form-item>

                <el-form-item prop="range">

                    <div class="item-form">
                        <div class="item-img">
                            <img class="img-margin" src="@a/green/guimo_icon.svg">
                        </div>

                        <el-cascader stripe class="input-form"
                                     :options="ranges"
                                     placeholder="请输入公司规模......"
                                     :show-all-levels="false"
                                     expand-trigger="hover"
                                     :props="rangeProps"
                                     @visible-change="handleRangeVisible"
                                     @change="handleRangeChange"
                                     filterable
                        ></el-cascader>
                    </div>
                </el-form-item>
                <!--<el-form-item prop="type">-->

                    <!--<div class="item-form">-->
                        <!--<div class="item-img">-->
                            <!--<img class="img-margin" src="@a/green/guimo_icon.svg">-->
                        <!--</div>-->

                        <!--<el-cascader stripe class="input-form"-->
                                     <!--:options="types"-->
                                     <!--placeholder="请输入公司类型......"-->
                                     <!--:show-all-levels="false"-->
                                     <!--:props="typeProps"-->
                                     <!--@change="handleTypeChange"-->
                                     <!--filterable-->
                        <!--&gt;</el-cascader>-->
                    <!--</div>-->
                <!--</el-form-item>-->

                <el-form-item prop="area">

                    <div class="item-form">
                        <div class="item-img">
                            <img class="img-margin" src="@a/green/dizhi_icon.svg">
                        </div>

                        <el-cascader stripe class="input-form"
                                     :options="areas"
                                     change-on-select
                                     placeholder="所属地区"
                                     expand-trigger="hover"
                                     separator=""
                                     @change="handleAreaChange"
                                     :props="areaProps"
                                     filterable
                        ></el-cascader>
                    </div>
                </el-form-item>

                <el-form-item prop="note" >
                    <el-input class="text-note" type="textarea" resize="none" rows="6"  placeholder="请输入描述..." v-model="createForm.note"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submitCreate('createForm')" class="btn-confirm">确定</el-button>
        </div>
    </div>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'
    import {
        FIND_COMPANY_TYPE,
        FIND_SUB_COMPANY_LIST,
        SAVE_SUB_COMPANY,
        SELECT_AREA,
        SELECT_INDUSTRY,
        SELECT_SCALE
    } from '~api/organize.js'
    import {UPLOAD_FILE} from '~api/message.js';
    import {mapGetters} from 'vuex'

    export default {
        name: 'ManageApps',
        components: {
            Splitpanes
        },
        props: {
            selectComp: {
                type: Object,
                default: {},
            }
        },
        data() {
            return {
                industries: [],
                ranges: [],
                areas: [],
                types: [],
                compProps: {
                    children: 'children',
                    label: 'text'
                },
                indusProps: {
                    children: 'children',
                    label: 'text',
                    value: 'id',
                },
                rangeProps: {
                    label: 'text',
                    value: 'id',
                },
                typeProps: {
                    label: 'text',
                    value: 'id',
                },
                areaProps: {
                    children: 'children',
                    label: 'text',
                    value: 'id',
                },
                createForm: {
                    text: '',
                    note: '',
                    range: '',
                    type: '',
                    area: '',
                    indus: '',
                    avatar: '',
                },
                rules: {
                    avatar: [{required: true, message: '请选择上传的logo', trigger: 'change'},],
                    text: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    note: [
                        {required: true, message: '请输入描述', trigger: 'change'},
                        {min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'change'}
                    ],
                    area: [
                        {required: true, message: '请选择地区', trigger: 'change'}
                    ],
                    indus: [
                        {required: true, message: '请选择行业', trigger: 'change'}
                    ],
                    range: [
                        {required: true, message: '请选择规模', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ]
                },
                localAvatar: '',
                oldAvatar: '',
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {
            this.getScaleData()
            this.getAreaData()
            this.getIndusData()
            this.getTypeData()
        },
        mounted() {

        },
        methods: {
            getIndusData() {
                SELECT_INDUSTRY().then(res => {
                    console.log('请求industries：', res.data.data)
                    if (res.data.code === 200) this.industries = res.data.data
                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            getScaleData() {
                SELECT_SCALE().then(res => {
                    console.log('请求ranges：', res.data.data)
                    if (res.data.code === 200) this.ranges = res.data.data
                }).catch(err => {
                    console.log('请求ranges：', err)
                });
            },
            getTypeData() {
                FIND_COMPANY_TYPE().then(res => {
                    console.log('请求types：', res.data.data)
                    if (res.data.code === 200) this.types = res.data.data
                }).catch(err => {
                    console.log('请求types：', err)
                });
            },
            getAreaData() {
                SELECT_AREA().then(res => {
                    if (res.data.code === 200) {
                        let temp = res.data.data
                        this.checkAreaChild(temp)
                        this.areas = temp
                        console.log('请求areas2：', this.areas)
                    }
                }).catch(err => {
                    console.log('请求areas：', err)
                });
            },

            //地区子节点为0的children =null
            checkAreaChild(areas) {
                areas.forEach(area => {
                    if (area.children != null && area.children.length == 0) {
                        area.children = null
                    } else {
                        this.checkAreaChild(area.children)
                    }
                })
            },
            handleIndusChange(value) {
                this.createForm.indus = value[1]
                console.log('indus', value)
            },
            handleRangeChange(value) {
                this.createForm.range = value[0]
                console.log('range', value)
            },
            handleRangeVisible(val) {
                console.log('rangeVisible', val)
            },
            handleTypeChange(value) {
                this.createForm.type = value[0]
                console.log('type', value)
            },
            handleAreaChange(value) {
                this.createForm.area = value[value.length - 1]
                console.log('area', value[value.length - 1])
            },

            // 上传群头像文件
            imgPreview(file, fileList) {
                let fileName = file.name;
                let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
                if (regex.test(fileName.toLowerCase())) {
                    this.localAvatar = URL.createObjectURL(file.raw);
                    this.createForm.avatar = this.localAvatar
                    console.log('file-path', this.localAvatar)
                } else {
                    this.$message.error('请选择图片文件');
                }
            },
            beforeUpload(file) {
                console.log(file)
                let fd = new FormData()
                fd.append('file', file)
                fd.append('userId', this.loginUserId)
                fd.append('size', file.size)
                console.log('size', fd.size)
                UPLOAD_FILE(fd).then(res => {
                    console.log('res', res)
                    if (res.data.code == 200) {
                        console.log('upload---res.data.data', res.data.data);
                        this.createComp(res.data.data)
                    }
                })
                return true
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            submitCreate(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('success submit!!');
                        this.submitUpload()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            createComp(fileEntity) {
                let params = {
                    avatar: fileEntity.hdUrl,
                    createUser: this.loginUserId,
                    fullName: this.createForm.text,
                    industryId: this.createForm.indus,
                    note: this.createForm.note,
                    ownerId: this.loginUserId,
                    pid: this.selectComp.code,
                    rangeId: this.createForm.range,
                    regionId: this.createForm.area,
                    text: this.createForm.text,
                    type: this.createForm.type,
                    updateUser: this.loginUserId,
                }

                console.log('params', params)
                SAVE_SUB_COMPANY(params).then(res => {
                    console.log('res', res)
                    if (res.data.code === 200) {
                        alert(res.data.msg)
                        this.$emit('compCreated', res.data.data);
                        console.log('upload---create', res.data.data);
                        this.$refs['createForm'].resetFields();
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    /deep/ .el-form-item {
        width: 400px;
    }

    .edit-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 0px 20px;

        .edit-title {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
        }
    }

    .edit-container {
        margin: 20px;
        padding: 20px;
        box-shadow: 0px 20px 30px rgba(8, 69, 81, 0.1);
        opacity: 1;
        border-radius: 12px;
        background: rgba(255, 255, 255, 1);
        min-width: 500px;

        .comp-form {
            margin-top: 20px;

            .item-form {
                display: flex;
                align-items: center;
                justify-content: start;

                .item-img {
                    width: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 24px;

                    .img-margin {

                    }
                }

                .input-form {
                    width: 260px;
                }
            }

            .text-note {
                width: 400px;
                height:140px;
                background: rgba(255, 255, 255, 1);
                opacity: 1;
                border-radius: 12px;
                margin-left: 20px;

                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                /deep/ .el-input__inner{
                    height: 140px;
                }

            }
        }

        .btn-confirm {
            width: 160px;
            height: 50px;
            background: rgba(24, 144, 255, 1);
            opacity: 1;
            margin-left: 240px;
            border-radius: 20px;


        }
    }

    /deep/ .el-upload-dragger {
        width: 400px;
        height: 140px;
        background: rgba(232, 232, 232, 0.4);

        .el-upload__text {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(64, 64, 64, 0.20);
        }
    }


</style>
