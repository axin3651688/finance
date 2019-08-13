<template>
  <el-container class="containerT">
    <el-main style="height:100%;">
      <el-row style="height:100%;">
        <el-col :span="4" style="height:100%;">
        </el-col>
        <el-col :span="10" style="height:100%;">

        </el-col>
        <el-col :span="10" style="height:100%;">
          <el-card shadow="always" class="card_div">
            <div style="height:200px;">
              <el-row>
                <el-col :span="6"></el-col>
                <el-col :span="18">
                  <div>
                    <div>天津食品集团</div>
                    <div>智能风控预警防范系统</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-form 
              label-position="right" 
              label-width="50px" 
              :rules="rules" 
              :model="loginUser" 
              ref="loginForm" 
              class="form_login"
              :hide-required-asterisk="true">
                <el-form-item prop="usename" class="form_item_div">
                  <label slot="label" class="form-label"><i class="el-icon-refresh"></i></label>
                  <el-input class="user_public"  v-model="loginUser.usename" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="form_item_div">
                  <label slot="label" class="form-label"><i class="el-icon-refresh"></i></label>
                  <el-input 
                    :type="pwdType"
                    v-model="loginUser.password"
                    placeholder="请输入密码"
                    class="user_public"
                    @keyup.enter.native="submitForm('loginForm')"
                  ></el-input>
                </el-form-item>
                <div class="btn_wrapp" style="margin-top: 30%;">
                  <el-button type="primary" class="login_button loginBtn" @click="submitForm('loginForm')">登  录</el-button>
                </div>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="7" class="rightContent">
          <el-form 
          label-position="right" 
          label-width="80px" 
          :rules="rules" 
          :model="loginUser" 
          ref="loginForm" 
          class="login-form formContent" 
          :hide-required-asterisk="true">
            <el-form-item prop="usename">
              <label slot="label" class="form-label">用户名</label>
              <el-input  v-model="loginUser.usename" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <label slot="label" class="form-label">密&nbsp;&nbsp;&nbsp;码</label>
              <el-input 
                :type="pwdType"
                v-model="loginUser.password"
                placeholder="请输入密码"
                @keyup.enter.native="submitForm('loginForm')"
              ></el-input>
            </el-form-item>
            <div class="btn_wrapp" style="text-align:right;margin-left:80px;">
              <el-button type="primary" class="login_button loginBtn" @click="submitForm('loginForm')">登  录</el-button>
            </div>
          </el-form>
        </el-col> -->
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
    // 轮播图图片切换
    this.initCarousels();
  },

  data() {
    return {
      imageUrl2 : '',　
      imageUrl3 : '',
      imageUrl4 : '',
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
    // showPwd() {
    //   if (this.pwdType === "password") {
    //     this.pwdType = "";
    //   } else {
    //     this.pwdType = "password";
    //   }
    // },
    // sjz 初始化轮播图 
    initCarousels(){
      // 走马灯轮播请求
      UploadShow().then(ress => {
          if(ress.data.code == 200){
            let datas = ress.data.data;
            if(datas.length > 0 ){
              [2,3,4].forEach(element => {
                  this.setCarousel(datas,element);
              });                 
            }
          }
      })
    },
    //sjz 
    setCarousel(datas,key){
      let d = datas.filter(ele=>{
          return (ele.name - 0) === (key - 0) ;
      })
      this["imageUrl" + key] = d && d.length == 1 ? d[0].content  : '';
    },

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
  .card_div {
    width: 560px;
    height: 694px;
  }
  .login_button {
    width:400px;
    height:56px;
    background:linear-gradient(135deg,rgba(159,212,103,1) 0%,rgba(45,176,96,1) 100%);
    box-shadow:0px 0px 24px rgba(62,210,107,0.16);
    opacity:1;
    border-radius:28px;
  }
</style>

<style lang='scss'>
//新加的样式
.user_public {
  .el-input__inner {
    border: 0px;
  }
}
.form_login {
  margin: 0px 13%;
  .el-form-item {
    border-bottom: 1px solid #2DB060;
  }
}
.rightContent {
  height: 100%;
  display: flex;
  // padding-left: 3%;
}
.formContent {
  align-self: center;
  margin-top:-20%;
  width: 71%;
}
.containerT {
  height:100%;
}
.headerT {
  background-color: #fff;
  height:10% !important;
}
.footerT {
  background-color: #fff;
  height:20% !important;
  text-align: center;
}
.formContent {
  .el-form-item__label {
    font-size: 16px;
    color: #5A5A5A;
  }
}

.el-carousel__item {
  border-radius: 70px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height:100% !important;
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
.first {
  height:100%;
  width: 100%;
  // background: url(@a/loginT/first.jpg);
}
.middleContent {
  height: 100%;
  width: 1px;
  // text-align: center;
  // background-color: rgb(168, 162, 162);
  margin-left: 50%;
  // margin-top: 50%;
  width:0px;
  // height:400px;
  border:1px solid rgba(0,0,0,0.10196078431372549);
  opacity:1;
}
.el-carousel__indicators {
  line-height: 65px;
}
.el-carousel__button {
  width:35px;
  height:4px;
  background:rgba(255,255,255,1);
  opacity:1;
  border-radius:66px
  // background-color: #fff;
}
.is-active>button {
  background-color: #67c23a;
}
</style>