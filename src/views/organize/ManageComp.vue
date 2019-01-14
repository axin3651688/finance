<template>
    <splitpanes watch-slots @resized="resized($event)" class="default-theme" style="height:100vh">
        <div class="left-col" :splitpanes-default="leftWidth" splitpanes-min="18">
            <el-input v-model="search" @change="filterChange" suffix-icon="el-icon-search"
                      placeholder="请输入内容"
                      clearable class="input-with-select">
            </el-input>

            <el-scrollbar
                    style="height:90%;min-height: 600px;border-top-width: 1px;border-top-style: solid;border-top-color: rgba(159,167,174,0.6);  ">
                <el-tree
                        :data="compList"
                        node-key="id"
                        :props="compProps"
                        :default-expanded-keys="[122]"
                        :default-checked-keys="[1]"
                        @node-click="handleNodeClick"
                        :filter-node-method="filterNode"
                        ref="tree"
                        :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="['node-text', {active: data.id===selectComp.id}]">{{ node.label }}</span>
            <el-dropdown>

            <span style="margin-right: 20px" v-show="selectComp.id===data.id"
                  class="el-dropdown-link">
            <i class="el-icon-more el-icon--right" style="transform: rotate(90deg);"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>创建子公司</el-dropdown-item>
            <el-dropdown-item>编辑公司</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </span>
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="right-col" :splitpanes-default="rightWidth" splitpanes-min="40">
            <div class="edit-tab">
                <div class="edit-title">{{selectComp.text}}</div>
            </div>
            <div class="edit-container">


                <el-form :model="compForm" ref="compForm" :rules="rules" label-position='left' status-icon
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
                                         :props="rangeProps"
                                         @change="handleRangeChange"
                                         filterable
                            ></el-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item prop="type">

                        <div class="item-form">
                            <div class="item-img">
                                <img class="img-margin" src="@a/green/guimo_icon.svg">
                            </div>

                            <el-cascader stripe class="input-form"
                                         :options="types"
                                         placeholder="请输入公司类型......"
                                         :show-all-levels="false"
                                         :props="typeProps"
                                         @change="handleTypeChange"
                                         filterable
                            ></el-cascader>
                        </div>
                    </el-form-item>

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
                        <el-input type="textarea" class="text-note" placeholder="请输入描述..."
                                  v-model="compForm.note"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="submitForm('compForm')" class="btn-confirm">确定</el-button>
            </div>

        </div>
    </splitpanes>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'
    import {
        FIND_COMPANY_TYPE,
        FIND_SUB_COMPANY_LIST,
        SELECT_AREA,
        SELECT_INDUSTRY,SAVE_SUB_COMPANY,
        SELECT_SCALE
    } from '~api/organize.js'
    import {UPLOAD_FILE} from '~api/message.js';
    import {mapGetters} from 'vuex'

    export default {
        name: 'ManageApps',
        components: {
            Splitpanes
        },
        data() {
            return {
                value1: true,
                search: '',
                selectComp: {},
                compList: [],
                leftWidth: 20,
                rightWidth: 80,
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
                    range: '',
                    type:'',
                    area: '',
                    indus: '',
                    avatar: '',
                    code: '',
                },
                rules: {
                    avatar: [{required: true, message: '请选择上传的logo', trigger: 'change'},],
                    text: [
                        {required: true, message: '请输入名称', trigger: 'change'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change'}
                    ],
                    note: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'change'}
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
            this.getCompList()
        },
        mounted() {

        },
        methods: {
            resized(val) {
                console.log('resized', val)
                this.leftWidth = val[0].width
                this.rightWidth = val[1].width
            },
            changeStatus: function ($event, item) {
                console.log($event);
                console.log(this.appData);
            },

            handleNodeClick(data) {
                console.log('handleNodeClick', data);
                this.selectComp = data
                console.log('selectComp', this.selectComp);
            },
            filterChange() {
                this.$refs.tree.filter(this.search);
            },
            filterNode(value, data) {
                if (!value) return true;
                console.log('search', this.search);
                console.log('filterNode', value);
                return data.label.indexOf(value) !== -1;
            },
            getCompList() {
                FIND_SUB_COMPANY_LIST(225).then(res => {
                    console.log('请求FIND_SUB_COMPANY_LIST：', res.data.data)
                    if (res.data.code == 200) {
                        let temp = []
                        temp.push(res.data.data.data)
                        this.compList = temp
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            getIndusData() {
                SELECT_INDUSTRY().then(res => {
                    console.log('请求industries：', res.data.data)
                    this.industries = res.data.data
                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            getScaleData() {
                SELECT_SCALE().then(res => {
                    console.log('请求ranges：', res.data.data)
                    this.ranges = res.data.data
                }).catch(err => {
                    console.log('请求ranges：', err)
                });
            },
            getTypeData() {
                FIND_COMPANY_TYPE().then(res => {
                    console.log('请求types：', res.data.data)
                    this.types = res.data.data
                }).catch(err => {
                    console.log('请求types：', err)
                });
            },
            getAreaData() {
                SELECT_AREA().then(res => {

                    console.log('请求areas1：', res.data.data)
                    let temp = res.data.data
                    this.checkAreaChild(temp)
                    this.areas = temp
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
                this.compForm.indus = value[1]
                console.log('indus', value[1])
            },
            handleRangeChange(value) {
                this.compForm.range = value[0]
                console.log('range', value[0])
            },
            handleTypeChange(value) {
                this.compForm.type = value[0]
                console.log('type', value[0])
            },
            handleAreaChange(value) {
                this.compForm.area = value[value.length - 1]
                console.log('area', value[value.length - 1])
            },

            // 上传群头像文件
            imgPreview(file, fileList) {
                let fileName = file.name;
                let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
                if (regex.test(fileName.toLowerCase())) {
                    this.localAvatar = URL.createObjectURL(file.raw);
                    this.compForm.avatar = this.localAvatar
                    console.log('file-path', this.localAvatar)
                } else {
                    this.$message.error('请选择图片文件');
                }
            },
            beforeUpload(file) {
                console.log(file)
                let fd = new FormData()
                fd.append('file', file)
                fd.append('userId', 225)
                fd.append('size', file.size)
                console.log('size', fd.size)
                UPLOAD_FILE(fd).then(res => {
                    console.log('res', res)
                    if (res.data.code == 200) {
                        console.log('upload---res.data.data',res.data.data);
                        this.createComp(res.data.data)
                    }
                })
                return true
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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
                    // code: "",
                    createUser: 225,
                    // customerId: "",
                    // enable: 0,
                    fullName: "经邦子公司123",
                    // id: 0,
                    industryId: 645,
                    // leaf: 0,
                    level: 0,
                    // licenseId: 0,
                    note: "这里是简介",
                    ownerId: 225,
                    pid: "2458",
                    rangeId: 16,
                    regionId: 110108,
                    // sort: 0,
                    text: "经邦子公司123",
                    type: 12,
                    updateUser: 225,
                    // url: ""
                }

                console.log('params', params)
                SAVE_SUB_COMPANY(params).then(res => {
                    console.log('res', res)
                    if (res.data.code == 200) {
                        console.log('upload---create',res.data.data);
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


    .default-theme {
        font-family: $fontFamilyMain;
        height: 100%;
        width: 100%;

        &:after {
            $afterHeight: 20px;
            position: absolute;
            display: block;
            content: '';
            height: $afterHeight;
            width: 100%;
            background: $colorTheme;
            top: -$afterHeight;
            z-index: 1;
            box-shadow: 0px 3px 60px rgba(0, 0, 0, 0.16);

        }

        .left-col {
            height: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;

            /deep/ .el-input__inner {
                height: 30px;
                line-height: 30px;
                background: rgba(218, 217, 216, 0.6);
                border: 0px;
                color: rgba(102, 102, 102, 0.80);
            }

            /deep/ .el-input__icon {
                height: 100%;
                width: 25px;
                text-align: center;
                -webkit-transition: all .3s;
                transition: all .3s;
                line-height: 0px;
            }

            .input-with-select {
                width: 260px;
                height: 30px;
                margin: 25px 20px 25px 20px;
                background: rgba(218, 217, 216, 0.6);
                opacity: 1;
                border-radius: 6px;
            }

            .custom-tree-node {
                flex: 1;
                width: 300px;
                display: flex;
                align-items: center;
                position: relative;
                right: 20px;
                justify-content: space-between;
                padding-right: 8px;

                .node-text {
                    width: 360px;
                    overflow: hidden;
                    margin-left: 20px;
                    text-overflow: ellipsis;
                    color: rgba(102, 102, 102, 0.80);
                    line-height: 30px;
                    white-space: nowrap;
                }

                .node-text.active {
                    color: rgba(255, 255, 255, 1);
                }
            }


            .el-icon-more {
                color: white;
            }
        }

        .right-col {
            width: 100%;
            background: rgba(240, 242, 245, 1);
            height: 100%;

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
                margin: 20px 40px 0px 20px;
                padding: 20px;
                min-width: 600px;
                min-height: 400px;
                background: rgba(255, 255, 255, 1);
                opacity: 1;
                border-radius: 20px;

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
                    margin-left: 300px;
                    border-radius: 20px;


                }
            }
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
