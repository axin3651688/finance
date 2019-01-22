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
                        :default-expanded-keys="[expandedKey]"
                        :current-node-key="expandedKey"
                        @node-click="handleNodeClick"
                        highlight-current
                        :filter-node-method="filterNode"
                        ref="tree"
                        :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="['node-text', {active: data.id===selectComp.id}]">{{ node.label }}</span>
            <el-dropdown @command="handleCommand">

            <span style="margin-right: 20px" v-show="selectComp.id===data.id"
                  class="el-dropdown-link">
            <i class="el-icon-more el-icon--right" style="transform: rotate(90deg);"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2">创建子公司</el-dropdown-item>
            <el-dropdown-item command="3">编辑公司</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </span>
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="right-col" :splitpanes-default="rightWidth" splitpanes-min="40">


            <div class="root">
                <div class="main-header">


                    <div class="sub">

                        <div>

                            <el-select class="left_sub" v-model="value4" @change="enableChange" placeholder="启用状态">
                                <el-option
                                        v-for="item in moduleData1"
                                        :key="item.value"
                                        :label="item.label"

                                        :value="item.value">
                                </el-option>
                            </el-select>


                            <el-select class="left_sub" v-model="value5" @change="activateChange" clearable
                                       placeholder="激活状态">
                                <el-option
                                        v-for="item in moduleData2"
                                        :key="item.value"
                                        :label="item.label"

                                        :value="item.value">
                                </el-option>
                            </el-select>


                            <el-input v-model="search1" suffix-icon="el-icon-search" placeholder="请输入内容" clearable
                                      class="input-with-select11">
                            </el-input>
                        </div>

                        <div class="right_sub">

                            <el-button class="tab-btn" @click="changeUserInfoClick(1,0)">
                                <i class="el-bi-icon-guanli"></i>
                                添加成员
                            </el-button>
                        </div>

                    </div>
                </div>

                <el-table
                        v-show="pageData.length>0"
                        :data="pageData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.aboutCompany.toLowerCase().includes(search.toLowerCase())|| data.role.toLowerCase().includes(search.toLowerCase()))"
                        stripe height="100%" max-height="100%" class="main-table"
                        :header-cell-style="getHeaderClass"
                        :cell-style="getRowClass">


                    <el-table-column prop="trueName" label="姓名" min-width="20%" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="电话" min-width="20%" align="center">
                    </el-table-column>
                    <el-table-column prop="belongCompany" label="所属公司" min-width="20%" align="center">
                    </el-table-column>
                    <el-table-column prop="roleNames" min-width="20%" label="角色" align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="30%" align="center">
                        <div slot-scope="scope" class="template_edit">

                            <!--changeUserInfoClick-->
                            <!--dialogFormVisible = true-->
                            <div class="leftIcon_title" style="cursor:pointer " @click="changeUserInfoClick(0,scope.row)">
                                <img src="@a/user_icon/xiugai_icon.svg">
                                <span class="itemSpan">修改</span>
                            </div>

                            <div class="leftIcon_title1" style="cursor:pointer " @click="unableUserClick(scope.row)">
                                <img src="@a/user_icon/jinyong_icon.svg">
                                <span class="itemSpan1">禁用</span>
                            </div>

                        </div>
                    </el-table-column>


                </el-table>

                <div class="page-row " v-show="pageData.length>0">
                    <div class="page">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                background
                                layout="prev, pager, next, total, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </div>
                </div>


                <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
                    <el-form :model="userdata" label-position='left' label="123" status-icon :rules="rules2" ref="userdata"
                             label-width="10px" class="demo-ruleForm">


                        <el-form-item prop="username">

                            <div class="formitem">
                                <img src="@a/user_icon/name_icon.svg">
                                <span class="itemSpan">姓名：</span>
                                <el-input placeholder="请输入姓名..." stripe style="width: 300px" v-model="userdata.username"
                                          autocomplete="off"></el-input>

                                <img v-if="username_po" style="margin-left: 20px" src="@a/user_icon/tishi_icon .svg">
                                <span style="margin-left: 20px;color: rgba(24, 144, 255, 1); font-size: 4px;">{{username_po}}</span>

                            </div>
                        </el-form-item>


                        <el-form-item prop="phone">

                            <div class="formitem">
                                <img src="@a/user_icon/tel_icon.svg">
                                <span class="itemSpan">手机号：</span>
                                <el-input placeholder="请输入手机号码..." stripe style="width: 300px" v-model="userdata.phone"
                                          autocomplete="off"></el-input>
                                <img v-if="phone_po" style="margin-left: 20px" src="@a/user_icon/tishi_icon .svg">
                                <span style="margin-left: 20px;color: rgba(24, 144, 255, 1); font-size: 4px;">{{phone_po}}</span>
                            </div>
                        </el-form-item>


                        <el-form-item prop="role">

                            <div class="formitem">
                                <img src="@a/user_icon/juese_icon.svg">
                                <span class="itemSpan">所属角色：</span>

                                <!--<el-cascader stripe style="width: 300px"-->
                                             <!--:show-all-levels="false"-->
                                             <!--:options="roleList"-->
                                             <!--v-model="userdata.role"-->
                                             <!--change-on-select-->
                                             <!--:props="roleProps"-->
                                             <!--filterable>-->

                                <!--</el-cascader>-->

                                <el-select stripe style="width: 300px" v-model="userdata.role" filterable multiple
                                           placeholder="请选择所属角色" >
                                    <el-option
                                            v-for="item in roleList"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                    </el-option>
                                </el-select>

                                <!--<el-input placeholder="请输入所属角色..." stripe style="width: 300px"  v-model="userdata.role" autocomplete="off"></el-input>-->
                            </div>
                        </el-form-item>


                        <el-form-item prop="email">

                            <div class="formitem">
                                <img src="@a/user_icon/mail_icon .svg">
                                <span class="itemSpan">Email邮箱：</span>
                                <el-input placeholder="请输入邮箱..." stripe style="width: 300px" v-model="userdata.email"
                                          autocomplete="off"></el-input>
                                <img v-if="email_po" style="margin-left: 20px" src="@a/user_icon/tishi_icon .svg">
                                <span style="margin-left: 20px;color: rgba(24, 144, 255, 1); font-size: 4px;">{{email_po}}</span>

                            </div>
                        </el-form-item>


                        <el-form-item prop="company">

                            <div class="formitem">
                                <img src="@a/user_icon/conpany_icon.svg">
                                <span class="itemSpan">所属公司：</span>

                                <el-cascader stripe style="width: 300px"
                                             :show-all-levels="false"
                                             :options="compList"
                                             v-model="userdata.bycompany"
                                             change-on-select
                                             :props="compProps"
                                             filterable>

                                </el-cascader>

                                <!--<el-input placeholder="请输入所属公司..." stripe style="width: 300px"  v-model="userdata.company" autocomplete="off"></el-input>-->
                            </div>
                        </el-form-item>

                        <el-form-item prop="department">

                            <div class="formitem">
                                <img src="@a/user_icon/bumen_icon.svg">
                                <span class="itemSpan">所属部门：</span>
                                <el-cascader stripe style="width: 300px"
                                             :show-all-levels="false"
                                             :options="departmentList"
                                             v-model="userdata.department"
                                             change-on-select
                                             @active-item-change="handleItemChange"
                                             :props="departProps"
                                             filterable>

                                </el-cascader>

                            </div>
                        </el-form-item>


                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="submitForm('userdata')">提交</el-button>-->
                        <!--</el-form-item>-->
                    </el-form>


                    <!--@click="dialogFormVisible = false;-->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="resetForm('userdata')">取 消</el-button>

                        <el-button type="primary" @click="submitForm('userdata')">{{dialogSUbTitle}}</el-button>
                    </div>
                </el-dialog>


                <div v-show="pageData.length===0" class="right-none">
                    <img class="none-img" src="@a/green/bg_no_role.svg">
                    <div class="none-text">暂无数据</div>
                </div>

            </div>

        </div>

    </splitpanes>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'
    import {
        ROLE_LIST,
        FIND_DEPT_LIST,
        COMPANY_USER_INFO,
        EDIT_CONTACT_INFO,
        SAVE_CONTACT,
        FIND_COMPANY_TYPE,
        FIND_SUB_COMPANY_LIST,
        SELECT_SCALE, ENABLE_CREATE_SUB_COMPANY, COMPANY_USER_LIST, ENABLE_COMPANY_USER
    } from '~api/organize.js'
    import {isvalidPhone,checkUserName,checkEmail} from "../../views/PXView/validate";
    import {mapGetters} from 'vuex'

    export default {
        name: 'ManageApps',
        components: {
            Splitpanes,

        },
        data() {

            var username=(rule, value,callback)=>{
                if (!value){

                    this.username_po='';
                    callback(new Error('  '))
                }else  if (!checkUserName(value)){
                    callback(new Error('  '))
                    this.username_po='请输入用户名1-5位';
                }else {
                    callback()
                    this.username_po='';
                }
            };



            var validPhone=(rule, value,callback)=>{
                if (!value){

                    this.phone_po='手机号码可用作登录账号，可以接受数据预警提示消息！';
                    callback(new Error('  '))
                }else  if (!isvalidPhone(value)){

                    callback(new Error('  '))
                    this.phone_po='请输入正确的11位手机号码';
                }else {
                    callback()
                    this.phone_po=''
                }

            };

            var validEmail=(rule, value,callback)=>{
                if (!checkEmail(value)){

                    callback(new Error('  '))
                    this.email_po='请输入正确的Email';
                }else {
                    callback()
                    this.email_po=''
                }

            };

            return {


                dialogSUbTitle:'确认',
                dialogTableVisible: false,
                dialogFormVisible: false,
                userdata: {
                    userId:'',
                    username: '',
                    phone: '',
                    role: '',
                    email: '',
                    company: '',
                    department: [],
                    bycompany: ''
                },
                formLabelWidth: '120px',

                tab: 1,
                search: '',

                pageData: [],
                totalCount: 0,
                value4: '',
                value5: '',

                search1: '',
                currentPage: 1,
                moduleData: [],
                tableData: [],
                pageSize: 20,
                tipModule: '模块',

                selectComp: {},
                compList: [],
                expandedKey: 1,
                compProps: {
                    children: 'children',
                    label: 'text',
                    value: 'id',
                },

                roleProps: {
                    label: 'text',
                    value: 'id',
                },

                moduleData1: [{
                    label: '启用',
                    value: 1,
                }, {
                    label: '禁用',
                    value: 0,
                }],
                moduleData2: [{
                    label: '激活',
                    value: 1,
                }, {
                    label: '未激活',
                    value: 3,
                },],
                leftWidth: 20,
                rightWidth: 80,

                username_po:'',
                phone_po:'',
                email_po:'',
                roleList:'',
                departmentList:[],
                departProps: {
                    children: 'children',
                    label: 'text',
                    value: 'id',
                },

                rules2: {
                    username: [

                        { required: true, trigger: 'blur', validator: username }
                    ],
                    phone: [
                        { required: true, trigger: 'blur', validator: validPhone }
                    ],

                    email: [

                        // { required: false, trigger: 'blur', validator: validEmail }
                    ],



                }
            }
        },
        watch: {
            search(val) {
                this.$refs.tree.filter(val);
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {
            this.getCompList(-1)
            // this.getRoleList();
            //
            // this.getDepartmentList(this.selectComp.id);
            // departmentList

        },
        mounted() {

        },
        methods: {

            enableChange(val) {

                console.log(`123123 ${val} 条`);
                this.getTableData(val, null)
            },
            activateChange(val) {

                console.log(`1231231 ${val} 条`);
                this.getTableData(null, val)
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
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 == 0) {
                    return 'background:rgba(255,255,255,1);' +
                        'height:50px';
                } else if (rowIndex % 2 == 1) {
                    return 'background:rgba(196,215,233,0.15);' +
                        'height:50px';
                } else {
                    return ''
                }
            },
            getTableData(enable, active) {
                let params = {

                    "activate": active,
                    "useType": enable,
                    "companyId": this.selectComp.id,
                    "page": this.currentPage,
                    "size": this.pageSize,
                    "userId": this.loginUserId
                }
                COMPANY_USER_LIST(params).then(res => {

                    console.log(params)
                    console.log('请求COMPANY_USER_LIST：', res.data.data)
                    if (res.data.code === 200) {
                        this.totalCount = res.data.data.totalElements
                        this.pageData = res.data.data.data
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.getTableData()
            },


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
                this.tab = 1
                console.log('selectComp', this.selectComp);

                this.getTableData()


            },
            filterChange() {
                this.$refs.tree.filter(this.search);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.text.indexOf(value) !== -1;
            },
            getCompList(key) {

                FIND_SUB_COMPANY_LIST(this.loginUserId).then(res => {
                    console.log('请求FIND_SUB_COMPANY_LIST：', res.data.data)
                    if (res.data.code === 200) {
                        if (key !== -1) {
                            this.expandedKey = key
                        } else {
                            this.expandedKey = res.data.data.id
                            this.selectComp = {
                                id: res.data.data.id
                            }
                        }
                        let temp = []
                        temp.push(res.data.data)
                        this.compList = temp

                        this.getTableData();

                        this.getRoleList();

                        this.getDepartmentList(this.selectComp.id);

                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            handleCommand(command) {
                console.log('handleCommand', command)
                if (command == 2) {
                    ENABLE_CREATE_SUB_COMPANY(this.selectComp.id).then(res => {
                        console.log('请求ENABLE_CREATE_SUB_COMPANY：', res.data.data)
                        if (res.data.code === 200) {
                            if (res.data.data) {
                                console.log('handleCommand if', res.data.data)
                                this.tab = command
                            } else {
                                this.$alert('该公司下无法创建子公司', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                    }
                                });
                            }
                        }

                    }).catch(err => {
                        console.log('请求compList：', err)
                    });
                } else {
                    this.tab = command
                }

            },
            handleCreate(data) {
                //创建成功刷新列表，显示新的
                console.log('handleCreate', data)
                this.selectComp = {
                    id: data
                }
                this.getCompList(data)
                this.tab = 1
            },
            handleUpdate(data) {
                console.log('handleUpdate', data)
                this.selectComp = {
                    id: data
                }
                this.expandedKey = data
                this.getCompList(data)
            },
            changeUserInfoClick(type,row) {

                // this.resetForm('userdata');

                this.dialogFormVisible = true;
                if (type === 0){

                    this.dialogSUbTitle='修改'



                    COMPANY_USER_INFO(this.selectComp.id,row.userId).then(res => {

                        console.log('COMPANY_USER_INFO：', res.data.data)
                        if (res.data.code === 200) {

                            this.userdata.username=res.data.data.trueName;
                            this.userdata.phone=res.data.data.phone;

                            var arss=[];
                            for (var i = 0; i < res.data.data.roleList.length; i++) {
                                arss.push(res.data.data.roleList[i].id)
                            }

                            this.userdata.role=arss;
                            this.userdata.email=res.data.data.email;

                            this.userdata.company=res.data.data.belongCompany;
                            this.userdata.department=[res.data.data.deptId];
                            this.userdata.bycompany=[res.data.data.belongCompany];
                            this.userdata.userId=res.data.data.userId;

                        } else {

                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'warning'
                            });

                        }

                    }).catch(err => {
                        console.log('禁用失败：')
                    });


                } else {
                    this.dialogSUbTitle='提交'



                }

                console.log(row.id);

            },

            unableUserClick(row) {

                debugger
                console.log(row.id);


                let params = {


                    "companyId": row.companyId,
                    "enable": 0,
                    "updateUser": this.loginUserId,
                    "userId": row.userId
                }
                ENABLE_COMPANY_USER(params).then(res => {

                    debugger
                    console.log(params)
                    console.log('ENABLE_COMPANY_USER：', res.data.data)
                    if (res.data.code === 200) {
                        this.getTableData();
                    } else {

                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'warning'
                        });

                    }

                }).catch(err => {
                    console.log('禁用失败：')
                });

            },

            getRoleList() {
                let localData = localStorage.getItem('Role_List')
                //判断有无本地缓存
                if (localData) {
                    this.roleList = JSON.parse(localData)
                } else {
                    ROLE_LIST(this.loginUserId, this.selectComp.id).then(res => {
                        this.roleList = res.data.data

                        console.log('请求roleList：', res.data.data)
                    }).catch(err => {
                        console.log('请求message：', err)
                    });
                }
            },

            getDepartmentList(code) {



                FIND_DEPT_LIST(code).then(res => {
                    this.departmentList = res.data.data

                    console.log('请求departmentList：', res.data.data)
                }).catch(err => {
                    console.log('请求message：', err)
                });
            },

            handleItemChange(val) {

                console.log('active item:', val);
                this.getDepartmentList(this.selectComp.id);


            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {

                        if (this.dialogSUbTitle==='修改') {

                            let params = {


                                "belongCompany": this.userdata.bycompany[0],
                                "companyId": this.userdata.company,
                                "deptId": this.userdata.department[0],
                                "email": this.userdata.email,
                                "phone": this.userdata.phone,
                                "roles": this.userdata.role.join(','),
                                "trueName": this.userdata.username,
                                "updateUser": this.loginUserId,
                                "userId": this.userdata.userId

                            }
                            EDIT_CONTACT_INFO(params).then(res => {

                                console.log(params)
                                console.log('EDIT_CONTACT_INFO：', res)
                                if (res.data.code === 200) {


                                    this.getTableData()
                                    this.$refs[formName].resetFields();
                                    this.dialogFormVisible = false;
                                    this.username_po='';
                                    this.email_po='';
                                    this.phone_po='';
                                } else {

                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: 'warning'
                                    });

                                }

                            }).catch(err => {
                                console.log('禁用失败：')
                            });
                        }else {


                            let params = {


                                "belongCompany": this.userdata.bycompany[0],
                                "companyId": this.selectComp.id,
                                "deptId": this.userdata.department[0],
                                "email": this.userdata.email,
                                "phone": this.userdata.phone,
                                "roles": this.userdata.role.join(','),
                                "trueName": this.userdata.username,
                                "createUser": this.loginUserId,

                            }
                            SAVE_CONTACT(params).then(res => {

                                console.log(params)
                                console.log('SAVE_CONTACT：', res)
                                if (res.data.code === 200) {


                                    this.getTableData()
                                    this.$refs[formName].resetFields();
                                    this.dialogFormVisible = false;
                                    this.username_po='';
                                    this.email_po='';
                                    this.phone_po='';
                                } else {

                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: 'warning'
                                    });

                                }

                            }).catch(err => {
                                console.log('禁用失败：')
                            });
                        }




                    } else {
                        alert('error submit!');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.username_po='';
                this.email_po='';
                this.phone_po='';
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();

                        this.resetForm('userdata');
                    })
                    .catch(_ => {});
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


    /deep/ .el-tree-node__expand-icon {
        font-size: 16px;
    }

    /deep/ .el-tree-node__content {
        padding: 30px 0 30px 0;

    }

    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background-color: rgba(24, 144, 255, 1);
    }


    .default-theme {
        font-family: $fontFamilyMain;
        height: 100%;
        width: 100%;
        min-width: 1000px;

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
                display: flex;
                align-items: center;
                position: relative;
                right: 20px;
                justify-content: space-between;
                padding-right: 8px;

                .node-text {
                    overflow: hidden;
                    margin-left: 20px;
                    text-overflow: ellipsis;
                    color: rgba(102, 102, 102, 0.80);
                    line-height: 60px;
                    white-space: nowrap;
                }

                .node-text.active {
                    /*color: rgba(255, 255, 255, 1);*/
                }
            }


            .el-icon-more {
                color: white;
            }
        }

        .right-col {
            height: 100%;

            .root {
                height: 100%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: start;

                .main-header {
                    padding: 20px 0 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;


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

                    .input-with-select11 {
                        width: 220px;
                        height: 30px;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                        opacity: 1;
                        border-radius: 8px;
                    }


                }

                .main-table {
                    margin: 20px 0px 0px 0px;
                    border-radius: 20px 20px 0 0;

                    /deep/ .gutter {
                        background: rgba(221, 235, 246, 1);
                    }


                    .template_edit {

                        display: flex;
                        flex-direction: row;
                        text-align: center;
                        justify-content: space-around;

                        .leftIcon_title {

                            display: flex;
                            flex-direction: row;

                            .itemSpan {
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

                        .leftIcon_title1 {

                            display: flex;
                            flex-direction: row;

                            .itemSpan1 {
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

                .page-row {
                    padding: 0 0 20px 0;
                    border-radius: 0px 0px 20px 20px;
                    box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
                    background: rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: center;

                    .page {
                        margin: 10px 0 0px 0;
                    }
                }


                .demo-ruleForm {

                    .formitem {

                        display: flex;

                        .itemSpan {
                            width: 120px;
                            padding-left: 30px;
                            font-size: 16px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            /*line-height:21px;*/
                            color: rgba(102, 102, 102, 1);
                            opacity: 1;
                        }
                    }


                }

            }

        }
    }


</style>
