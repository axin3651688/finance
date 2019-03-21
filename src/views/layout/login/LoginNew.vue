<template>
  <el-container class="containerT">
    <el-header class="headerT">
      <el-row>
        <el-col :span="9">
          <div style="height:100%;width:100%;text-align:left;padding-left:100px;">
            <img src="@a/loginT/topLogo.svg" class="first">
          </div>
        </el-col>
        <el-col :span="15">
        </el-col>
      </el-row>
    </el-header>
    <el-main style="height:100%;">
      <el-row style="height:100%;">
        <el-col :span="15" style="height:100%;">
          <div style="height:100%;padding-left:100px;">
            <el-carousel :autoplay="true" style="height:90%;">
              <el-carousel-item v-for="item in 4" :key="item" :autoplay="true">
                <div v-if="item == 1" class="first" style="height:100%;">
                  <img src="@a/loginT/first.jpg" class="first">
                </div>
                <div v-if="item == 2" class="first">
                  <img :src="imageUrl2" class="first">
                </div>
                <div v-if="item == 3" class="first">
                  <img :src="imageUrl3" class="first">
                </div>
                <div v-if="item == 4" class="first">
                  <img :src="imageUrl4" class="first">
                </div>
                <!-- <template slot-scope="scope">
                  <div v-if="scope.index == 0" class="first">{{ item }}</div>
                  <div v-if="scope.index == 1" class="two">{{ item }}</div>
                  <div v-if="scope.index == 2" class="three">{{ item }}</div>
                  <div v-if="scope.index == 3" class="four">{{ item }}</div>
                </template> -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="2" style="height:100%;">
          <div style="height:100%;text-align:center;">
            <div style="height:75%;padding:30% 0 15% 0;">
              <div class="middleContent"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="rightContent">
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
              <el-button type="primary" class="login_button loginBtn" @click="submitForm('loginForm')">登 陆</el-button>
            </div>
          </el-form>
          
        </el-col>
      </el-row>
      
    </el-main>
    <el-footer class="footerT">
      <div style="height:2px;padding:0 8%;">
        <div style="height:1px;background:rgba(0,0,0,0.1);"></div>
      </div>
      <div style="margin-top: 10px;line-height: 30px;">
        <ul style="list-style:none;margin-top:2%;" class="foot-font">
          <li class="foot-li">网站首页</li>
          <li class="foot-li">集团简介</li>
          <li class="foot-li">集团新闻</li>
          <li class="foot-li">集团产业</li>
          <li class="foot-li">管理园地</li>
          <li class="foot-li">文化动态</li>
          <li class="foot-li">电商平台</li>
          <li class="foot-li">联系我们</li>
        </ul>
        <div class="foot-font" style="margin-top:10px;">
          <p>
            <span class="foot-span">电话：12345678912</span>
            <span class="foot-span">传真：123456</span>
            <span class="foot-span">地址：天津市河西区气象台路96号</span>
          </p>
          <p>
            <span>技术支持：安徽经邦软件技术有限公司©2018 CnbiSoft</span>
          </p>
        </div>
      </div>
    </el-footer>
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
    ...mapActions(["GetSideMid"]),
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
        debugger
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
      debugger
      this["imageUrl" + key] = d && d.length == 1 ? d[0].content  : '';
    },

    submitForm(formName) {
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginUser)
            .then(res => {
              debugger;
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
                // alert(data.company.text);
                this.GetSideMid({
                  // company: data.company.customerId,
                  company: data.company.id,
                  companyName: data.company.text
                });
                // debugger;
                // debugger;
                //this.initSocket(token);
                let url = "/main";
                //默认加载第一个管理驾驶舱
                localStorage.module_api_cache =
                    "/cnbi/json/source/tjsp/dash.json";
                // if (data.company && data.company.id === 121) {
                //   url += "?monthCount=13";
                //   localStorage.module_api_cache =
                //     "/cnbi/json/source/tjsp/dash.json";
                // }
                // 页面跳转
                //  判断加载哪个公司的布局页以加载不同样式
                router.push(url);
                // data.company.id === 121
                //   ? router.push("/tjsp/module")
                //   : // router.push("/message");
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
<style lang='scss'>
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
.el-form-item__label {
  font-size: 16px;
  color: #5A5A5A;
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

.foot-li {
  display: inline;
  margin: 0 10px;
}
.foot-span {
  margin: 0 10px;
}
.foot-font {
  // width:56px;
  height:19px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:28px;
  color:rgba(0,0,0,0.80);
  opacity:1;
}
</style>