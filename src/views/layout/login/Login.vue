<template>
  <div class="login-container">
    <div class="login-shadow"></div>
    <div class="login-border">
      <!-- banner -->
      <i class="bannerimg"></i>
      <!-- 表单 -->
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="login-form">
        <div class="title">智能财务决策支持系统V5.0</div>
        <P>用户名</P>
        <el-form-item prop="usename">
          <el-input
            v-model="loginUser.usename"
            autofocus
            @keyup.enter.native="submitForm('loginForm')"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <P>密码</P>
        <el-form-item prop="password">
          <!-- 绑定一个keyup事件,实现按回车能模拟点击按钮,触发登陆 -->
          <el-input
            :type="pwdType"
            v-model="loginUser.password"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <i v-show="pwdType" class="iconfont icon-yanjing-bi show-pwd" @click="showPwd"></i>
          <i v-show="!pwdType" class="iconfont icon-yanjing show-pwd" @click="showPwd"></i>
        </el-form-item>

        <div class="btn_wrapp">
          <el-button type="primary" class="login_button" @click="submitForm('loginForm')">登 陆</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "~api/interface.js";
import { mapActions } from "vuex";
import router from "@/router";
import store from "@/store";
export default {
  name: "Login",
  created() {
    let $title = document.getElementsByTagName("title")[0];
    let title = $title.getAttribute("origin");
    if (title) {
      document.title = title;
    }
    //每次打开获取一下原来的用户名
    this.loginUser.usename = localStorage.getItem("usename");
  },

  data() {
    return {
      pwdType: "password",
      loginUser: {
        usename: "",
        password: ""
      },
      rules: {
        usename: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
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
    showPwd() {
      this.pwdType = this.pwdType === "password" ? "" : "password";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginUser)
            .then(res => {
              debugger;
              // 获取token
              const data = res.data.data;
              // debugger;
              const token = data.authorization;
              if (!Cnbi.isEmpty(token)) {
                // console.log(this.loginUser);
                localStorage.setItem("authorization", token);
                // 用户名记住,方便下次登录
                localStorage.setItem("usename", this.loginUser.usename);
                var obj = JSON.stringify(data); //转化为JSON字符串
                localStorage.setItem("database", obj); //返回{"a":1,"b":2}
                //    token存储到vuex中
                store.dispatch("setIsAutnenticated", !Cnbi.isEmpty(token));
                store.dispatch("setUser", data);
                // 把用户的状态更新到vuex
                // alert(data.company.text);
                this.GetSideMid({
                  company: data.company.customerId,
                  companyName: data.company.text
                });
                debugger;
                //不要再删了，这个只是一个重新登录用的，碍你啥事了，真的无伤大雅
                this.GetSideMid({
                  module_api: './cnbi/json/source/jsnk/zbfx.json'
                });
                // 页面跳转
                router.push("/main");
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
    }
  }
};
</script>
