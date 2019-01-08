<template>
    <div class="Root">




            <el-form :model="ruleForm2" label-position='left' label="123" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">




                <el-form-item  prop="name_item">

                    <div class="itemUserName">
                        <img src="@a/user_icon/name_icon.svg" >
                       <span class="itemSpan" >姓名：</span>
                        <el-input placeholder="请输入姓名..." stripe style="width: 300px"  v-model="userdata.username" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/tel_icon.svg" >
                        <span  class="itemSpan" >手机号：</span>
                        <el-input  placeholder="请输入手机号码..." stripe style="width: 300px"  v-model="userdata.phone" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/juese_icon.svg" >
                        <span class="itemSpan">所属角色：</span>
                        <el-input placeholder="请输入所属角色..." stripe style="width: 300px"  v-model="userdata.role" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/mail_icon .svg" >
                        <span class="itemSpan">Email邮箱：</span>
                        <el-input  placeholder="请输入邮箱..." stripe style="width: 300px"  v-model="userdata.email" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/conpany_icon.svg" >
                        <span class="itemSpan">所属公司：</span>
                        <el-input placeholder="请输入所属公司..." stripe style="width: 300px"  v-model="userdata.company" autocomplete="off"></el-input>
                    </div>
                </el-form-item>

                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/bumen_icon.svg" >
                        <span class="itemSpan">所属部门：</span>
                        <el-input  placeholder="请输入所属部门..." stripe style="width: 300px"  v-model="userdata.department" autocomplete="off"></el-input>
                    </div>
                </el-form-item>

                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/authorization_icon.svg" >
                        <span class="itemSpan">授权公司：</span>
                        <el-input placeholder="授权公司（查看或管理公司数据）" stripe style="width: 300px"  v-model="userdata.bycompany" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>


<script>
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };


            return {
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
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    role: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
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

    

    .Root{

        min-width: 600px;


        .demo-ruleForm{

            margin: 30px;
            padding: 20px;
            background:#ffffff;
            box-shadow:3px 0px 20px rgba(0,0,0,0.1);
            opacity:1;
            border-radius:20px;
        }

        .itemUserName{

            display: flex;

            .itemSpan{
                width: 120px;
                padding-left: 30px;
            }
        }


    }
</style>