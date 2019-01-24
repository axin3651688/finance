<template>
    <div class="root">

        <div class="header">


            <div class="sub">

                <div>

                    <el-cascader
                            class="btn-module"
                            placeholder="模块"
                            :options="moduleData"
                            clearable
                    ></el-cascader>


                </div>

                <div class="right_sub">

                    <el-button class="tab-btn" @click="addDeptClick()">
                        <i class="el-bi-icon-guanli"></i>
                        添加部门
                    </el-button>

                    <el-button class="tab-btn" >
                        <i class="el-bi-icon-guanli"></i>
                        组织架构
                    </el-button>
                </div>

            </div>


        </div>

        <el-table class="main_table"
                  :row-style="showRow"
                  v-bind="$attrs"
                  border
                  v-show="formatData.length>0"
                  :header-cell-style="getHeaderClass"
                  style="width: 100%"
                  :data.sync="formatData"
                  height="item.height || rowClass">


            <TreeItem
                    @fetchData="childEmit"
                    label="      部门名称"
                    prop="text"
                    :tableData="formatData"
            />


            <el-table-column
                    label="级别" min-width="10%" align="center"
                    :formatter="formatlevel">
            </el-table-column>

            <el-table-column
                    label="负责人" min-width="10%"" align="center"
                    prop="ownerName">
            </el-table-column>


            <el-table-column
                    label="操作" min-width="40%" align="center"
            >

                <div slot-scope="scope" class="template_edit">

                    <div class="leftIcon_title" style="cursor:pointer " @click="addSubDeptClick(scope.row)">
                        <img src="@a/user_icon/tianjiazibumen_icon.svg">
                        <span class="itemSpan">添加子部门</span>
                    </div>

                    <div class="leftIcon_title1" style="cursor:pointer " @click="addDeptUserClick(scope.row)">
                        <img src="@a/user_icon/tianjiachengyuan_icon.svg">
                        <span class="itemSpan1">添加成员</span>
                    </div>

                    <div class="leftIcon_title2" style="cursor:pointer " @click="changeDeptClick(scope.row)">
                        <img src="@a/user_icon/jinyong_icon.svg">
                        <span class="itemSpan2">修改</span>
                    </div>

                    <div class="leftIcon_title3" style="cursor:pointer" @click="removeDeptClick(scope.row)">
                        <img src="@a/user_icon/jinyong_icon.svg">
                        <span class="itemSpan3">移除</span>
                    </div>


                </div>

            </el-table-column>
        </el-table>


        <el-dialog
                :visible.sync="createDialogVisible"
                width="24%"
                center
                :before-close="handleClose">
            <el-form :model="formCreate">
                <el-form-item>
                    <el-input placeholder="部门名称" maxlength="10" v-model="formCreate.name" clearable
                              class="dialog-input name"></el-input>
                </el-form-item>

                <el-form-item>

                    <!--<el-input placeholder="部门名称" maxlength="10" @click="showSidebarPop=true" v-model="formCreate.name" clearable-->
                    <!--class="dialog-input name"></el-input>-->

                    <el-select stripe style="width: 100%" v-model="formCreate.owner" filterable
                               placeholder="负责人">
                        <el-option
                                v-for="item in userlist"
                                :key="item.id"
                                :label="item.trueName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item prop="desc">
                    <el-input placeholder="部门描述" maxlength="100" clearable type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" v-model="formCreate.note"
                              class="dialog-input note"></el-input>
                </el-form-item>
            </el-form>

            <span slot="title" class="dialog-title">{{detype==0?'创建部门':' 修改部门'}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="save('back')">保存，并返回</el-button>
            <el-button type="primary"  v-show="detype==0" @click="save('create')">保存，并继续创建</el-button>
            </span>
        </el-dialog>


        <!--群成员侧边栏组件-->
        <sidebar-pop :size="300" :showSidebarPop.sync="showSidebarPop" v-if="showSidebarPop">

            <group-members @closeGroupMembers="showSidebarPop=false"></group-members>
        </sidebar-pop>


        <div v-show="formatData.length===0" class="right-none">
            <img class="none-img" src="@a/green/bg_no_role.svg">
            <div class="none-text">暂无数据</div>
        </div>


    </div>
</template>

<script>
    import {
        SAVE_COMPANY_DEPT,
        EDIT_COMPANY_DEPT,
        DEL_COMPANY_DEPT,
        SAVE_DEPT_USER,
        FIND_DEPT_LIST1,
        MY_COMPANY_CONTACT_LIST
    } from '~api/organize.js'

    import {convertData, isfold, handleOpen} from "./asyncEval";
    import TreeItem from "./TreeItem";
    import {findDeptList} from "./findDeptList";
    import {mapGetters} from 'vuex'
    import SidebarPop from "@v/PXView/SidebarPop";
    import GroupMembers from "@v/PXView/GroupMembers";

    export default {
        name: 'ManageLogs',
        components: {
            TreeItem,
            SidebarPop,
            GroupMembers
        },
        data() {
            return {
                detype:'',
                moduleData: [],
                formatData: [],
                userlist: [],
                nodes: [],
                showSidebarPop: false,
                dept_list: [],
                formCreate: {
                    owner: '',
                    name: '',
                    note: '',
                    pid: '',
                    dept_id: '',
                },
                createDialogVisible: false,

            }
        },
        created() {

            this.getMembers();


            this.findDeptList(this.user.company.id, this.user.company.id)
        },

        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
            companyId() {
                return this.user.company.id;
            }
        },




        mounted() {
        },
        methods: {



            addDeptClick(){

                this.createDialogVisible = true;
                this.formCreate.pid = '';

            },


            addSubDeptClick(row) {

                this.createDialogVisible = true;
                this.formCreate.pid = row.code;
                this.detype=0;

            },
            addDeptUserClick(row) {

                this.showSidebarPop = true


            },
            changeDeptClick(row) {

                console.log('formCreate：', row)
                this.createDialogVisible = true;
                this.formCreate.owner = row.ownerId;
                this.formCreate.name = row.text;
                this.formCreate.note = row.note;
                this.formCreate.pid = row.code;
                this.formCreate.dept_id = row.id;

                this.detype=1;





            },
            removeDeptClick(row) {


                if(row.childDeptCount>0){

                    this.$message({
                        showClose: true,
                        message: '不能删除有子集部门,',
                        type: 'warning'
                    });

                }else {

                    this.$confirm('是否删除:' + row.text + '部门？')
                        .then(_ => {
                            let params = {
                                // this.user.company.id
                                "deptId": row.id,
                                "userId": this.loginUserId
                            }

                            debugger
                            DEL_COMPANY_DEPT(params).then(res => {

                                debugger
                                console.log('DEL_COMPANY_DEPT：', res.data)
                                this.findDeptList(this.user.company.id, this.user.company.id)
                            }).catch(err => {
                                console.log('请求SAVE_ROLE：', err)
                            });
                        })
                        .catch(_ => {
                        });


                }


            },


            findDeptList(companyId, code) {
                console.log(this.user.company.id)

                let data;
                FIND_DEPT_LIST1(companyId, code).then(res => {

                    data = res.data.data;

                    debugger
                    console.log(data);
                    let flag = Cnbi.isEmpty(data);
                    if (!flag) {
                        debugger;
                        this.formatData = convertData(data);
                        console.log(this.formatData);
                    } else {
                        console.error("亲！没有请求到数据，再检查下配置吧！");
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },

            getMembers() {
                debugger;
                MY_COMPANY_CONTACT_LIST(this.user.company.id).then(res => {
                    console.log('群信息', res.data.data);
                    if (res.data.code === 200) {
                        debugger
                        this.userlist = res.data.data.normal
                    }
                }).catch(err => {
                    console.log('请求message：', err)
                })
            },


            save(val) {
                if (!this.formCreate.name || !this.formCreate.note) {
                    this.$message({
                        showClose: true,
                        message: '请填写完整信息',
                        type: 'warning'
                    });
                    return
                }


                if(this.detype==0){

                    debugger
                    let params = {
                        // this.user.company.id
                        "companyId": this.user.company.id,
                        "note": this.formCreate.note,
                        "text": this.formCreate.name,
                        "pid": this.formCreate.pid,
                        "ownerId": this.formCreate.owner,
                        "userId": this.loginUserId
                    }

                    debugger
                    SAVE_COMPANY_DEPT(params).then(res => {

                        debugger
                        console.log('SAVE_COMPANY_DEPT：', res.data)
                        if (val === 'back') {
                            this.createDialogVisible = false
                        }
                        if (res.data.code === 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });

                            this.findDeptList(this.user.company.id, this.user.company.id)
                        }
                        this.formCreate.note = ''
                        this.formCreate.name = ''
                    }).catch(err => {
                        console.log('请求SAVE_ROLE：', err)
                    });

                }else {

                    debugger
                    let params = {
                        // this.user.company.id
                        "note": this.formCreate.note,
                        "text": this.formCreate.name,
                        "id": this.formCreate.dept_id,
                        "ownerId": this.formCreate.owner,
                        "userId": this.loginUserId
                    }

                    debugger
                    EDIT_COMPANY_DEPT(params).then(res => {

                        debugger
                        console.log('SAVE_COMPANY_DEPT：', res.data)
                        if (val === 'back') {
                            this.createDialogVisible = false
                        }
                        if (res.data.code === 200) {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });

                            this.findDeptList(this.user.company.id, this.user.company.id)
                        }
                        this.formCreate.note = ''
                        this.formCreate.name = ''
                    }).catch(err => {
                        console.log('请求SAVE_ROLE：', err)
                    });

                }



            },

            formatlevel: function (row, column) {
                return row.level+'级部门'
            },
            handleClose() {
                this.formCreate.name = ''
                this.formCreate.note = ''
                this.createDialogVisible = false
            },


            //设置表格第一行的颜色
            getHeaderClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:rgba(221,235,246,1);font-size:16px;' +
                        'font-family:Microsoft YaHei;' +
                        'font-weight:bold;' +
                        'line-height:21px;' +
                        'color:rgba(19,84,143,1);' +
                        'opacity:1;';
                } else {
                    return ''
                }
            },


            childEmit(dat) {
                // 改变父级的折叠属性
                console.log(dat);
                debugger;
                let record = this.formatData[dat.$index];

                record._expanded = !record._expanded;
                console.log(record);

                this.fetchData(dat);
            },
            fetchData(dat) {
                var flag = handleOpen(dat.row.id, this.nodes);
                debugger
                if (!flag) {
                    debugger;
                    let params = {code: dat.row.code, companyId: this.user.company.id};
                    findDeptList(params)
                        .then(res => {
                            // debugger;
                            let data = res.data.data;
                            //添加元素到指定位置
                            data.unshift(dat.$index + 1, 0);
                            Array.prototype.splice.apply(this.formatData, data);
                            this.formatData = convertData(this.formatData);
                        })
                        .catch(res => {
                            console.info(res);
                        });
                } else {
                    isfold(dat.row, this.formatData, "level");
                }
            },
            // 下面处理行的显影
            showRow(bean) {
                let row = bean.row;
                let style = row._isHide
                    ? "display:none;"
                    : "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;";
                return style;
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    /deep/ .el-table th {
        &:first-child {
            > .cell {
                margin-left: 30px;
            }
        }
    }

    .containerMain {
        padding-left: 20px !important;
        height: 100vh;
        width: 100%;
    }

    /*/deep/ .el-input__inner {*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*border: 0px;*/
    /*}*/

    /deep/ .el-input__icon {
        height: 100%;
        width: 25px;
        text-align: center;
        -webkit-transition: all .3s;
        transition: all .3s;
        line-height: 0px;

        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 19px;
        color: rgba(102, 102, 102, 0.80);
        opacity: 1;
    }

    /*/deep/ .el-button {*/
    /*padding: 0px 20px 0px 20px;*/
    /*color: rgba(102, 102, 102, 0.80);*/
    /*}*/

    /deep/ .el-button:focus, .el-button:hover {
        color: rgba(102, 102, 102, 0.80);
    }

    .root {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: start;

        .header {
            padding: 20px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: start;

            .sub {

                display: flex;
                width: 100%;
                justify-content: space-between;
                /*align-items: flex-end;*/

                .left_sub {
                    margin-right: 10px;
                }

                .right_sub {
                    .tab-btn {
                        background: rgba(24, 144, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        opacity: 1;
                        border-radius: 6px;

                        color: rgba(255, 255, 255, 1);

                        i {
                            font-size: 14px;
                        }
                    }
                }
            }

            .btn-module {
                height: 30px;
                min-width: 100px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                opacity: 1;
                border-radius: 8px;
                border: 0px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 30px;
                color: rgba(102, 102, 102, 0.80);

            }

            .input-with-select {
                width: 220px;
                height: 30px;
                margin-left: 20px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                opacity: 1;
                border-radius: 8px;
            }

        }


        .main_table {
            margin: 20px 0px 0px 0px;
            border-radius: 20px 20px 20px 20px;

            /deep/ .gutter {
                background: rgba(221, 235, 246, 1);
            }


            .template_edit {

                display: flex;
                flex-direction: row;
                text-align: center;
                justify-content: space-evenly;


                .leftIcon_title {

                    display: flex;
                    flex-direction: row;

                    .itemSpan {
                        /*width: 120px;*/
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(24, 144, 255, 1);
                        opacity: 1;
                        padding-left: 10px;
                    }

                }


                .leftIcon_title1 {

                    display: flex;
                    flex-direction: row;

                    .itemSpan1 {
                        /*width: 120px;*/
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(72, 88, 239, 1);
                        opacity: 1;
                        padding-left: 10px;
                    }

                }


                .leftIcon_title2 {

                    display: flex;
                    flex-direction: row;

                    .itemSpan2 {
                        /*width: 120px;*/
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(28, 141, 10, 1);
                        opacity: 1;
                        opacity: 1;
                        padding-left: 10px;
                    }

                }

                .leftIcon_title3 {

                    display: flex;
                    flex-direction: row;

                    .itemSpan3 {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(229, 51, 51, 1);
                        opacity: 1;
                        padding-left: 10px;
                    }

                }

            }


        }


        .right-none {
            width: 100%;
            height: 100%;
            background: rgba(240, 242, 245, 1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            /*padding-left: 200px;*/
            align-items: center;

            .none-img {

            }

            .none-text {
                margin-top: 10px;
                font-size: 34px;
                font-weight: normal;
                color: rgba(51, 51, 51, 1);
                opacity: 1;
            }
        }

    }
</style>