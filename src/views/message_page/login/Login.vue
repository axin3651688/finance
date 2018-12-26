<template>
    <div>
        <div class="login">
            <div class="left">
                <img src="@/assets/login/img.svg" alt="">
            </div>
            <div class="right">
                <div>
                    <img src="@/assets/login/zuixiaohua.svg" alt="" class="img1">
                    <img src="@/assets/login/close.svg" alt="" class="img2">
                </div>
                <h3>登陆</h3>
                <p class="copy">安徽经邦数据展示客户端</p>
                <div class="input">
                    <el-input v-model="username" class="username"></el-input>
                    <el-input type="password" v-model="password" autocomplete="off" placeholder="请输入密码" class="password"></el-input>
                    <el-checkbox label="记住密码" name="type" class="label"></el-checkbox>
                    <el-checkbox label="自动登陆" name="type" class="label"></el-checkbox>
                    <p @click="forget_password()">忘记密码?</p>
                    <el-button type="primary" @click="login()" class="button">登陆</el-button>
                </div>
                <div class="buttom">
                    <span>注册账号</span>
                    <div class="img">
                        <img src="@/assets/login/qq_selected.svg" alt="">
                        <img src="@/assets/login/wechat_unselected.svg" alt="">
                        <img src="@/assets/login/weibo_unselected.svg" alt="">
                        <img src="@/assets/login/erweima.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
      data() {
    return {
        username:'',
        password:''

        }
    },
    methods:{
        login(){

        },
        forget_password(){

        }
    }
  }
</script>
<style>
.login .el-checkbox__input.is-checked .el-checkbox__label {
    color: rgba(0,0,0,0.70);;
}
/* .login .el-button primary */
/* .el-checkbox__input.is-checked .el-checkbox__label{

} */
</style>
<style scoped lang="scss">
    .login{
        width: 700px;
        height: 420px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .left{
        float: left;
        img{
            width: 300px;
        }
        }
        .right{
            box-sizing: border-box;
            width: 400px;
            height: 420px;
            float: right;
            position: relative;
            padding-left:50px;
            background:rgba(255,255,255,1);
            opacity:1;
            .img1{
                padding:10px 16px 0 280px;
            }
            .img2{

            }
            h3{
                font-size:24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                line-height:31px;
                color:rgba(0,0,0,1);
                opacity:1;
            }
            .copy{
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                line-height:21px;
                color:rgba(0,0,0,0.80);
                opacity:1;
            }
            .input{
                padding-right: 50px;
                .username{
                    margin:20px 0;
                }
                .password{
                    margin-bottom: 17px;
                }
                .label{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:16px;
                    color:rgba(0,0,0,0.70);
                    opacity:1;
                }
                p{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:16px;
                    color:rgba(90,139,236,1);
                    opacity:1;
                    float: right;
                }
                .button{
                    width: 300px;
                    height: 40px;
                    margin-top:17px;
                    background:rgba(57,119,234,1);
                    box-shadow:0px 3px 10px rgba(0,0,0,0.16);
                    opacity:1;
                    border-radius:4px;
                    span{
                        font-size:16px;
                        font-family:Microsoft YaHei;
                        font-weight:bold;
                        line-height:21px;
                        color:rgba(255,255,255,1);
                        opacity:1;
                    }
                }
            }
            .buttom{
                position: absolute;
                bottom: 25px;
                span{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:19px;
                    color:rgba(90,139,236,1);
                    opacity:1;
                }
                .img{
                    float: right;
                    margin-left:96px;
                    img{
                        margin-right: 20px;
                    }
                }
            }
        }
    }

</style>
