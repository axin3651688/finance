<template>
    <div class="Root">

        <div class="content">

            <div class="rootTitle">
                <l class="titleSpan">填写成员信息</l>
                <img class="titileicon" src="@a/user_icon/tishi_icon .svg">
                <!--<l class="titleSpan_right">添加成员后，需要成员激活才能使用</l>-->
                <l class="titleSpan_right">添加成员后，需要成员激活才能使用</l>
            </div>


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

                        <el-select stripe style="width: 300px" v-model="value5" filterable multiple
                                   placeholder="请选择所属角色">
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

                        <!--:options="industries"-->
                        <!--placeholder="请选择行业..."-->
                        <!--:show-all-levels="false"-->
                        <!--:props="indusProps"-->
                        <!--@change="handleIndusChange"-->

                        <el-cascader stripe style="width: 300px"
                                     :show-all-levels="false"
                                     :options="compList"
                                     :props="compListProps"
                                     filterable>

                        </el-cascader>

                        <!--<el-input placeholder="请输入所属公司..." stripe style="width: 300px"  v-model="userdata.company" autocomplete="off"></el-input>-->
                    </div>
                </el-form-item>

                <el-form-item prop="department">

                    <div class="formitem">
                        <img src="@a/user_icon/bumen_icon.svg">
                        <span class="itemSpan">所属部门：</span>
                        <el-input placeholder="请输入所属部门..." stripe style="width: 300px" v-model="userdata.department"
                                  autocomplete="off"></el-input>

                    </div>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>

        </div>


    </div>
</template>


<script>
    import BiDiv from "../../components/charts/BiDiv";

    import {isvalidPhone,checkUserName} from "../../views/PXView/validate";

    import 'splitpanes/dist/splitpanes.css'
    import {
        ROLE_LIST,FIND_SUB_COMPANY_LIST
    } from '~api/organize.js'
    import {UPLOAD_FILE} from '~api/message.js';



    export default {
        components: {BiDiv},

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
                if (!isvalidPhone(value)){

                    callback(new Error('  '))
                    this.email_po='请输入正确的Email';
                }else {
                    callback()
                    this.email_po=''
                }

            };








            return {

                username_po:'',
                phone_po:'',
                email_po:'',
                roleList:'',
                expandedKey: 1,
                compList:[],
                compListProps: {
                    children: 'children',
                    label: 'text',
                    value: 'id',
                },

                value5: [],
                value11: [],
                userdata: {
                    username: '',
                    phone: '',
                    role: '',
                    email: '',
                    company: '',
                    department: '',
                    bycompany: ''
                },
                rules2: {
                    username: [

                        { required: true, trigger: 'blur', validator: username }
                    ],
                    phone: [
                        { required: true, trigger: 'blur', validator: validPhone }
                    ],

                    email: [

                        { required: false, trigger: 'blur', validator: validEmail }
                    ],



                }
            };
        },
        created() {
            this.getRoleList();
            this.getCompList(-1)

        },

        methods: {


            getCompList(key) {

                FIND_SUB_COMPANY_LIST(372).then(res => {
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
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },

            getRoleList() {
                let localData = localStorage.getItem('Role_List')
                //判断有无本地缓存
                if (localData) {
                    this.roleList = JSON.parse(localData)
                } else {
                    ROLE_LIST(372, 1).then(res => {
                        this.roleList = res.data.data

                        console.log('请求roleList：', res.data.data)
                    }).catch(err => {
                        console.log('请求message：', err)
                    });
                }
            },



            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "@ms/index.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }


    .Root {
        width: 100%;
        min-width: 1000px;


        }

        .content{

            margin: 30px;
            padding: 20px;
            background: #ffffff;
            box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;
            border-radius: 20px;

            .rootTitle {

                display: flex;
                /*flex-direction: column;*/
                margin-left: 10px;
                margin-bottom: 34px;


                .titleSpan {

                    font-size:22px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:29px;
                    color:rgba(102,102,102,1);
                    opacity:1;
                }

                .titileicon{

                    margin-left: 20px;
                }
                .titleSpan_right {

                    margin-left: 20px;
                    font-size: 4px;
                    line-height:29px;
                    font-family: Microsoft YaHei;
                    color: rgba(24, 144, 255, 1);
                }

        }

        .demo-ruleForm {

            .formitem {

                display: flex;

                .itemSpan {
                    width: 120px;
                    padding-left: 30px;
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    /*line-height:21px;*/
                    color:rgba(102,102,102,1);
                    opacity:1;
                }
            }



        }




    }
</style>