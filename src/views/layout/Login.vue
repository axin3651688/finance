<template>
  <div class="login-container">
    <div class="login-border">
      <!-- banner -->
      <i class="bannerimg"></i>
      <!-- 表单 -->
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="login-form">
        <div class="title">智能财务决策支持系统V5.0</div>
        <P>用户名</P>
        <el-form-item prop="usename">
          <el-input v-model="loginUser.usename" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <P>公司</P>
                <el-form-item prop="usename">
                    <el-input v-model="loginUser.usename" placeholder="请选择公司"></el-input>
        </el-form-item>-->
        <P>密码</P>
        <el-form-item prop="password">
          <!-- 绑定一个keyup事件,实现按回车能模拟点击按钮,触发登陆 -->
          <el-input
            :type="pwdType"
            v-model="loginUser.password"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <span class="show-pwd iconfont" @click="showPwd">&#xe61d;</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_button" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "~api/interface.js";
import { mapActions } from "vuex";
import router from "@v/layout/router";
import store from "@/store";
import webSocket from "../../utils/webSocket";
export default {
  name: "Login",
  created() {
    //每次打开获取一下原来的用户名
    this.loginUser.usename = localStorage.getItem("usename");
    // this.axios.get("/cnbi/chartData.1.json").then(res => {
    //   console.log(res.data);
    // });
  },
  mounted() {
    // let authorization = localStorage.getItem("authorization");
    //debugger;
    // this.initSocket(authorization);
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
                // debugger;
                //this.initSocket(token);
                // 页面跳转
                //  判断加载哪个公司的布局页以加载不同样式
                data.company.id === 121
                  ? router.push("/tjsp/module")
                  : router.push("/jsnk/module");
              } else {
                alert(res.data.msg);
                this.loginUser.usename = "";
                this.loginUser.password = "";
              }
            })
            .catch(res => {
              alert("网络请求失败!");
            });
        }
      });
    },
    initSocket(authorization) {
      let url = "ws://192.168.1.118:7006/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      }
      // debugger;
      webSocket({ url: url });
    }
  }
};
</script>