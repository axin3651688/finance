<template>
  <el-container class="containerT">
    <el-main style="height:100%;">
      <el-row style="height:100%;">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="height:100%;">
        </el-col>
        <el-col :xs="4" :sm="8" :md="10" :lg="10" :xl="10" style="height:100%;">
        </el-col>
        <el-col :xs="16" :sm="12" :md="10" :lg="10" :xl="10" style="height:100%;">
          <el-card shadow="always" class="card_div">
            <div style="height:37%;">
              <div style="text-align: center;">
                <img src="@a/loginT/loginLogo.png" class="login_logo_class">
              </div>
            </div>
            <div style="height:63%;">
              <el-form 
              label-position="right" 
              label-width="50px" 
              :rules="rules" 
              :model="loginUser" 
              ref="loginForm" 
              class="form_login"
              :hide-required-asterisk="true">
                <el-form-item prop="usename" class="form_item_div">
                  <label slot="label" class="form-label"><i class="iconfont icon-user1 icon_class_public"></i></label>
                  <el-input class="user_public"  v-model="loginUser.usename" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form_item_div">
                  <label slot="label" class="form-label"><i class="iconfont icon-yuechi icon_class_public"></i></label>
                  <el-input 
                    :type="pwdType"
                    v-model="loginUser.password"
                    placeholder="请输入密码"
                    class="user_public"
                    @keyup.enter.native="submitForm('loginForm')"
                  ></el-input>
                </el-form-item>
                <div class="btn_wrapp" style="margin-top: 20%;height:20%;">
                  <el-button type="primary" class="login_button loginBtn" @click="submitForm('loginForm')">登  录</el-button>
                </div>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { login } from "~api/interface.js";
import { mapActions } from "vuex";
import router from "@v/layout/router";
import store from "@/store";
import webSocket from "utils/webSocket";
import { UploadShow } from '~api/cube';
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
    ...mapActions(["GetSideMid", "GettRreeInfo","ShowDims"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginUser)
            .then(res => {
              // 获取token
              // console.log(res);
              if(res.data && res.data.code != 200){
                this.$notify.error({
                  title: "错误",
                  message: res.data.msg
                });
                return;
              }
              const data = res.data.data;
              // debugger;
              const token = data.authorization;
              if (!Cnbi.isEmpty(token)) {
                // console.log(this.loginUser);
                localStorage.setItem("authorization", token);
                // 用户名记住,方便下次登录
                localStorage.setItem("usename", this.loginUser.usename);
                //此处添加一个头像图片的地址。
                // data.user.avarUrl = "avar/upload/avar/" + data.user.userName;
                var obj = JSON.stringify(data); //转化为JSON字符串
                localStorage.setItem("database", obj); //返回{"a":1,"b":2}
                //    token存储到vuex中
                store.dispatch("setIsAutnenticated", !Cnbi.isEmpty(token));
                //此处添加一个头像图片的地址。
                // data.user.avarUrl = "avar/upload/avar/" + data.user.userName;
                store.dispatch("setUser", data);
                // 把用户的状态更新到vuex
                this.GetSideMid({
                  // company: data.company.customerId,
                  company: data.company.id,
                  companyName: data.company.text
                });
                //缓存中放入当前登录人的公司信息。
                if(!data.company.codename && !data.company.scode){
                  data.company.codename = data.company.text;
                  data.company.scode = data.company.id;
                  let objTree = JSON.stringify(data.company);
                  localStorage.setItem("treeInfo",objTree);
                  if (!Cnbi.isEmpty(objTree)) {
                    this.GettRreeInfo(JSON.parse(objTree));
                  }
                }else {
                  let objTree = JSON.stringify(data.company);
                  localStorage.setItem("treeInfo",objTree);
                  if (!Cnbi.isEmpty(objTree)) {
                    this.GettRreeInfo(JSON.parse(objTree));
                  }
                }
                let url = "/main";
                //默认加载第一个管理驾驶舱
                localStorage.module_api_cache =
                    "/cnbi/json/source/tjsp/dash.json";
                //初次登陆默认是管理驾驶舱。
                let siderState = {
                  code:"1",
                  pid:"0",
                  level:2,
                  leaf:1
                };
                localStorage.setItem("siderState",JSON.stringify(siderState));
                //添加一个websoket监听用户的掉线等 2019年3月28日18:49:19 szc
                // let webData = {
                //   url:"ws://192.168.2.41:9001/websocket/"+data.user.userName
                // };
                // webSocket(webData);
                router.push(url);
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
<style lang='scss' scoped>
  .login_logo_class {
    // width: 300px;
    // height: 99px;
    width: 55%;
    height: 50%;
    margin-top: 12%;
  }
  .card_div {
    margin-top: 15%;
    width: 65%;
    height: 65%;
    background:rgba(255,255,255,1);
    opacity:0.8;
    border-radius:16px;
    min-width: 360px;
    min-height: 400px;
  }
  .login_button {
    // width:400px;
    // height:50px;
    height: 80%;
    width: 100%;
    // height: 20%;
    background:linear-gradient(135deg,rgba(159,212,103,1) 0%,rgba(45,176,96,1) 100%);
    box-shadow:0px 0px 24px rgba(62,210,107,0.16);
    opacity:1;
    border-radius:28px;
  }
</style>
<style lang="scss">
  .card_div {
    .el-card__body {
      height: 100%;
    }
  }
  .icon_class_public {
    color: #60B55C;
    font-size: 24px;
  }
</style>
<style lang='scss'>
//新加的样式
.user_public {
  .el-input__inner {
    border: 0px;
    height: 30px;
  }
}
.form_login {
  margin: 0px 13%;
  height: 100%;
  .el-form-item {
    border-bottom: 1px solid #2DB060;
  }
}
.containerT {
  height:100%;
  background: url("./../../../assets/loginT/background-img.png");
  background-size: cover;
}
.loginBtn {
  width: 100%;
  background-color: #49A628;
  border-color: #49A628;
}
.loginBtn:hover {
  background-color: #3ae64c;
  border-color: #3ae64c;
}
.form-label {
  width:46px;
  height:21px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:23px;
  color:rgba(90,90,90,1);
  opacity:1;
}
button.loginBtn>span{
  width:66px;
  height:26px;
  font-size:20px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:9px;
  color:rgba(255,255,255,1);
  text-shadow:-0.8660253882408142px 0.5px 3px rgba(2,150,244,0.75);
  letter-spacing:10px;
  opacity:1;
}
.is-active>button {
  background-color: #67c23a;
}
</style>