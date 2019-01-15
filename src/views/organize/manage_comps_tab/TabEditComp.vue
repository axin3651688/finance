<template>
    <div>
        <div class="edit-tab">
            <div class="edit-title">{{preCompInfo.text}}</div>
        </div>
        <div class="edit-container">
            <el-form :model="compForm" disabled="true" status-icon="false" ref="compForm" :rules="rules" label-position='left'

                     label-width="10px" class="comp-form">
                <el-form-item prop="avatar">
                    <el-upload
                            style="display: flex;align-items: center"
                            drag
                            ref="upload"
                            :auto-upload="false"
                            :show-file-list="false"
                            :on-change="imgPreview"
                            :before-upload="beforeUpload"
                            action="xxx">
                        <div v-if="localAvatar || compForm.avatar">
                            <img v-if="localAvatar" :src="localAvatar" style="width:400px;height: 140px">
                            <img v-else :src="compForm.avatar" style="width:400px;height: 140px">
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

                        <el-input placeholder="请输入公司名称..." stripe class="input-form" v-model="compForm.text"
                                  autocomplete="off"></el-input>
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
                                     expand-trigger="hover"
                                     :props="indusProps"
                                     v-model="compForm.indus"
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
                                     :props="rangeProps"
                                     v-model="compForm.range"
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
                <!--v-model="compForm.type"-->
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
                                     v-model="compForm.area"
                                     @change="handleAreaChange"
                                     :props="areaProps"
                                     filterable
                        ></el-cascader>
                    </div>
                </el-form-item>

                <el-form-item v-show="false">

                    <div class="item-form">
                        <div class="item-img">
                            <img class="img-margin" src="@a/green/bianma_icon.svg">
                        </div>

                        <el-input placeholder="公司编码" stripe class="input-form" v-model="compForm.code"
                                  autocomplete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="note">
                    <el-input type="textarea" class="text-note" resize="none" rows="6" placeholder="请输入描述..."
                              v-model="compForm.note"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submitForm('compForm')" class="btn-confirm">确定
            </el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {
        EDIT_COMPANY_INFO,
        FIND_COMPANY_BASE_INFO,
        FIND_COMPANY_TYPE,
        SAVE_SUB_COMPANY,
        SELECT_AREA,
        SELECT_INDUSTRY,
        SELECT_SCALE
    } from '~api/organize.js'
    import {UPLOAD_FILE} from '~api/message.js';

    export default {
        name: 'ManageApps',
        components: {},
        props: {
            selectCompId: {
                type: Number,
                default: -1,
            }
        },
        data() {
            return {
                preCompInfo: {},
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
                compForm: {
                    text: '',
                    note: '',
                    range: [],
                    type: [],
                    area: [],
                    indus: [],
                    avatar: '',
                    code: '',
                },
                rules: {
                    avatar: [{required: true, message: '请选择上传的logo', trigger: 'blur'},],
                    text: [
                        {required: true, message: '请输入名称', trigger: 'change'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    note: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
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
                    ],
                    code: [
                        {required: true, message: '请填写编码', trigger: 'blur'}
                    ]
                },
                localAvatar: '',
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {

        },
        mounted() {
            this.getBaseInfo()
        },
        methods: {
            setFormData(preCompInfo) {
                this.compForm.text = preCompInfo.text
                this.compForm.note = preCompInfo.note
                this.compForm.avatar = preCompInfo.avatar
                console.log('setFormData', this.compForm)
            },
            getBaseInfo() {
                console.log('getBaseInfo')
                if (this.selectComp != -1) {
                    FIND_COMPANY_BASE_INFO(this.selectCompId).then(res => {
                        console.log('FIND_COMPANY_BASE_INFO：', res.data.data)
                        if (res.data.code == 200) {
                            this.preCompInfo = res.data.data
                            this.setFormData(res.data.data)

                            this.getScaleData()
                            this.getAreaData()
                            this.getIndusData()
                            this.getTypeData()
                        }
                    }).catch(err => {
                        console.log('请求compList：', err)
                    });
                }

            },
            getIndusData() {
                SELECT_INDUSTRY().then(res => {
                    console.log('请求industries：', res.data.data)
                    this.industries = res.data.data

                    console.log('请求industries', this.preCompInfo.industryId)
                    res.data.data.forEach(itemPar => {
                        itemPar.children.forEach(itemChild => {
                            if (itemChild.id == this.preCompInfo.industryId) {
                                this.compForm.indus = [itemPar.id, itemChild.id]
                                console.log('compForm.indus：', [itemPar.id, itemChild.id])
                            }
                        })
                    })
                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            getScaleData() {
                SELECT_SCALE().then(res => {
                    console.log('请求ranges：', res.data.data)
                    this.ranges = res.data.data

                    //form设置当前规模
                    this.compForm.range = [this.preCompInfo.rangeId]
                }).catch(err => {
                    console.log('请求ranges：', err)
                });
            },
            getTypeData() {
                FIND_COMPANY_TYPE().then(res => {
                    console.log('请求types：', res.data.data)
                    this.types = res.data.data
                    //设置当前类型
                    if (this.preCompInfo.typeId) this.compForm.type = [this.preCompInfo.typeId]
                }).catch(err => {
                    console.log('请求types：', err)
                });
            },
            getAreaData() {
                SELECT_AREA().then(res => {


                    let temp = res.data.data
                    this.checkAreaChild(temp)
                    this.areas = temp
                    console.log('请求areas1：', this.preCompInfo.regionId)
                    res.data.data.forEach(itemA => {
                        if (itemA.id == this.preCompInfo.regionId) {
                            this.compForm.area = [itemA.id]
                            return
                        } else {
                            if (itemA.children && itemA.children.length > 0) {
                                itemA.children.forEach(itemB => {
                                    if (itemB.id == this.preCompInfo.regionId) {
                                        this.compForm.area = [itemA.id, itemB.id]
                                        return
                                    } else {
                                        if (itemB.children && itemB.children.length > 0) {
                                            itemB.children.forEach(itemC => {

                                                if (itemC.id == this.preCompInfo.regionId) {
                                                    console.log('33333333333：', itemC.id)
                                                    this.compForm.area = [itemA.id, itemB.id, itemC.id]
                                                    return
                                                } else {

                                                }
                                            })
                                        }
                                    }
                                })
                            } else {

                            }
                        }
                    })

                    console.log('请求areas2：', this.areas)
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
                this.compForm.indus = value
                console.log('indus', value)
            },
            handleRangeChange(value) {
                this.compForm.range = value
                console.log('range', value)
            },
            handleRangeVisible(val) {
                console.log('rangeVisible', val)
            },
            handleTypeChange(value) {
                this.compForm.type = value
                console.log('type', value)
            },
            handleAreaChange(value) {
                this.compForm.area = value
                console.log('area', value[value.length - 1])
            },

            // 上传群头像文件
            imgPreview(file, fileList) {
                let fileName = file.name;
                let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
                if (regex.test(fileName.toLowerCase())) {
                    this.localAvatar = URL.createObjectURL(file.raw);
                    if (!this.compForm.avatar) this.compForm.avatar = this.localAvatar
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
                        this.updateComp(res.data.data.hdUrl)
                    }
                })
                return true
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            submitForm(formName) {
                console.log('formName submit!!');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.localAvatar) {
                            console.log('需要上传图片');
                            this.submitUpload()
                        } else {
                            console.log('不需要上传图片');
                            this.updateComp(this.compForm.avatar)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            updateComp(hdUrl) {
                let params = {
                    avatar: hdUrl,
                    id: this.selectCompId,
                    industryId: this.compForm.indus[1],
                    note: this.compForm.note,
                    rangeId: this.compForm.range[0],
                    regionId: this.compForm.area[this.compForm.area.length - 1],
                    text: this.compForm.text,
                    userId: this.loginUserId,
                }

                console.log('params', params)
                EDIT_COMPANY_INFO(params).then(res => {
                    console.log('res', res)
                    if (res.data.code === 200) {
                        alert(res.data.msg)
                        console.log('upload---update', res.data.data);
                        this.getCompList()
                        this.$refs['compForm'].resetFields();
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }

    /deep/ .el-tree-node__expand-icon {
        font-size: 16px;
    }

    /deep/ .el-tree-node__content {
        padding: 30px 0 30px 0;
        background: rgba(255, 255, 255, 1);

        .is-current {
            background: rgba(24, 144, 255, 1);
        }

        &:hover {
            background: rgba(24, 144, 255, 0.2);
        }
    }

    /deep/ .el-tree-node.is-current.is-focusable {
        > .el-tree-node__content {
            background: rgba(24, 144, 255, 1);
        }
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
                background: rgba(255, 255, 255, 1);
                opacity: 1;
                border-radius: 12px;

                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 19px;
                color: rgba(102, 102, 102, 1);
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
