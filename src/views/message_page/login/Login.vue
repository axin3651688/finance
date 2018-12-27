<template>
  <div>
    <div class="login">
    <!--<div class="login" ondragstart="return false;">-->
      <div class="left" ondragstart="return false;">
        <img src="@/assets/login/img.svg" alt="">
      </div>
      <div class="right">
        <div style="-webkit-app-region: drag" class="control-btns">
          <img src="@/assets/login/zuixiaohua.svg" class="icon-mini img1" @click="web_minWindows()" style="-webkit-app-region: no-drag">
          <img src="@/assets/login/close.svg" class=" icon-colse img2" @click="web_closeWindows()" style="-webkit-app-region: no-drag">
        </div>
        <h3>登陆</h3>
        <p class="copy">安徽经邦数据展示客户端</p>
        <el-form class="input" ref="loginForm" :model="loginUser" :rules="rules">
          <el-input
            v-model="loginUser.usename"
            class="username"
            placeholder="请输入用户名"
            prop="usename"
          ></el-input>
          <el-input
            :type="pwdType"
            v-model="loginUser.password"
            autocomplete="off"
            placeholder="请输入密码"
            prop="password"
            @keyup.enter.native="submitForm('loginForm')"
            class="password"
          ></el-input>
          <el-checkbox label="记住密码" name="type" class="label"></el-checkbox>
          <el-checkbox label="自动登陆" name="type" class="label"></el-checkbox>
          <p @click="forget_password()">忘记密码?</p>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="button">登陆</el-button>
        </el-form>
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
import {
  login
} from "~api/interface.js";
import {
  mapActions
} from "vuex";
import router from "@v/layout/router";
import store from "@/store";

export default {
  data() {
    return {
      pwdType: "password",
      loginUser: {
        usename: "",
        password: ""
      },
      rules: {
        usename: [{
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        },
          {
            // 需要修改  todo
            min: 1,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["GetSideMid"]),

    // electron 最小化
    web_minWindows() {
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_minWindows', '')
      }

    },
    web_closeWindows() {
      if (window.require) {
        var ipc = window.require('electron').ipcRenderer
      }
      if (window.require) {
        ipc.send('web_closeWindows', '')
      }
    },

    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginUser)
            .then(res => {
              // 获取token
              // console.log(res);
              const data = res.data.data;
              // debugger;
              if (!this.isEmpty(data.authorization)) {
                const token = data.authorization;
                localStorage.setItem("authorization", token);
                // 用户名记住,方便下次登录
                localStorage.setItem("usename", this.loginUser.usename);
                var obj = JSON.stringify(data); //转化为JSON字符串
                localStorage.setItem("database", obj); //返回{"a":1,"b":2}
                //    token存储到vuex中
                store.dispatch("setIsAutnenticated", !this.isEmpty(token));
                store.dispatch("setUser", data);
                // 把用户的状态更新到vuex
                // alert(data.company.text);
                this.GetSideMid({
                  company: data.company.customerId,
                  companyName: data.company.text
                });
                // debugger;
                //this.initSocket(token);
                // 页面跳转
                //  判断加载哪个公司的布局页以加载不同样式
                data.company.id === 121 ?
                  this.$router.push("/message_page/home") :
                  this.$router.push("/message_page/home")

                // todo: electron
                if (window.require) {
                  var ipc = window.require('electron').ipcRenderer
                }
                if (window.require) {
                  ipc.send('web_loginSucess', '')
                }

              } else {

                this.loginUser.usename = "";
                this.loginUser.password = "";
                let msg = res.data.msg;
                console.error(msg);
                this.$notify.error({
                  title: "错误",
                  message: msg
                });
                return;
              }
            })
            .catch(res => {
              console.error(res);
              this.$notify.error({
                title: "错误",
                message: "网络请求失败!"
              });
            });
        }
      });
    },
  },
  mounted() {
    // 禁止滑动
    document.body.addEventListener('touchmove', function(e){
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });
  }
}
</script>
<style>
  .login .el-checkbox__input.is-checked .el-checkbox__label {
    color: rgba(0, 0, 0, 0.70);;
  }

  /* .login .el-button primary */
  /* .el-checkbox__input.is-checked .el-checkbox__label{

  } */
</style>
<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
  }
  .login {
    width: 700px;
    height: 420px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    user-select: none;
    box-shadow:#999 0px 0px 10px;


    .left {
      float: left;

      img {
        width: 300px;
      }
    }

    .right {
      box-sizing: border-box;
      width: 400px;
      height: 420px;
      float: right;
      position: relative;
      padding-left: 50px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;

      .img1{
        margin-right: 16px;
      }
      .control-btns {
        padding-right: 50px;
        display: flex;
        justify-content: flex-end;
        .icon-mini,.icon-close{
          padding: 5px;
        }
      }



      h3 {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 31px;
        color: rgba(0, 0, 0, 1);
        opacity: 1;
      }

      .copy {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: rgba(0, 0, 0, 0.80);
        opacity: 1;
      }

      .input {
        padding-right: 50px;

        .username {
          margin: 20px 0;
        }

        .password {
          margin-bottom: 17px;
        }

        .label {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 16px;
          color: rgba(0, 0, 0, 0.70);
          opacity: 1;
        }

        p {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 16px;
          color: rgba(90, 139, 236, 1);
          opacity: 1;
          float: right;
        }

        .button {
          width: 300px;
          height: 40px;
          margin-top: 17px;
          background: rgba(57, 119, 234, 1);
          box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.16);
          opacity: 1;
          border-radius: 4px;

          span {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            line-height: 21px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }
      }

      .buttom {
        position: absolute;
        bottom: 25px;

        span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 19px;
          color: rgba(90, 139, 236, 1);
          opacity: 1;
        }

        .img {
          float: right;
          margin-left: 96px;

          img {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
