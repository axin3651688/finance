<template>
  <div>
    <div class="login">
      <!--<div class="login" ondragstart="return false;">-->
      <div class="left" ondragstart="return false;">
        <img src="@/assets/login/img.svg" alt>
      </div>
      <div class="right">
        <div style="-webkit-app-region: drag" class="control-btns">
          <img
            src="@/assets/login/zuixiaohua.svg"
            class="icon-mini img1"
            @click="web_minWindows()"
            style="-webkit-app-region: no-drag"
          >
          <img
            src="@/assets/login/close.svg"
            class="icon-colse img2"
            @click="web_closeWindows()"
            style="-webkit-app-region: no-drag"
          >
        </div>
        <h3>登陆</h3>
        <p class="copy">安徽经邦数据展示客户端</p>

        <!--表单-->
        <div class="login-form" v-show="showWhat === 'form'">
          <el-form ref="loginForm" :model="loginUser" :rules="rules">
            <el-form-item prop="usename">
              <el-input
                v-model="loginUser.usename"
                placeholder="请输入用户名"
                prop="usename"
                @keyup.enter.native="submitForm('loginForm')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :type="pwdType"
                v-model="loginUser.password"
                autocomplete="off"
                placeholder="请输入密码"
                prop="password"
                @keyup.enter.native="submitForm('loginForm')"
              ></el-input>
            </el-form-item>

            <el-checkbox label="记住密码" name="type" class="label"></el-checkbox>
            <el-checkbox label="自动登陆" name="type" class="label"></el-checkbox>
            <p @click="forget_password()">忘记密码?</p>
            <el-button type="primary" @click="submitForm('loginForm')" class="button">登陆</el-button>
          </el-form>
          <div class="buttom">
            <span>注册账号</span>
            <div class="img">
              <img src="@/assets/login/qq_selected.svg" alt>
              <img src="@/assets/login/wechat_unselected.svg" alt>
              <img src="@/assets/login/weibo_unselected.svg" alt>
              <img
                src="@/assets/login/erweima.svg"
                @click="showQrCode()"
              >
            </div>
          </div>
        </div>

        <!--二维码-->
        <div class="qr-code" v-if="showWhat === 'qr_code'">
          <div class="code-wrap" v-loading="elLoading" @click="requestQrCode()">
            <qriously :value="qrUrl" :size="138" v-if="qrUrl"/>
            <div v-else class="loading-failed">
              二维码加载失败
            </div>
            <div class="success-cover" v-if="scanSuccess">
              <i class="icon el-icon-circle-check"></i>
            </div>
          </div>
          <h3 class="code-text">点击二维码刷新</h3>
          <div class="btn-back" @click="closeQrCode()">返 回</div>
          <!--{{qrUrl.trim()}}-->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import store from '@/store'
import {LOGIN, SCAN_LOGIN_URL} from '@m_api/message.js'
import {SET_FULLSCREEN_LOADING} from '@mu/setFullscreenLoading.js'

export default {
  data() {
    return {
      scanSuccess: false, // 扫码是否成功
      elLoading: false, // element 加载转圈
      qrUrl: null, // 登录二维码地址
      showWhat: 'form', // 显示表单还是二维码
      pwdType: 'password',
      loginUser: {
        usename: '',
        password: ''
      },
      rules: {
        usename: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在1到30之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在6到30之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    },
    scanStatus() {
      return this.messageStore.scanStatus
    }
  },
  watch: {
    /**
     * 监听 手机扫码登陆是服务器返回的状态
     */
    scanStatus(val) {
      debugger
      if (!val) return
      switch (val.code) {
        case 10010: // 10010-APP已扫码通知，扫码成功
          this.scanSuccess = true
          break
        case 10011: // 10011-APP登录通知，登陆成功,
          this._processLoginResult(val.data) // 处理登陆返回的结果
          break
      }
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),

    web_minWindows() { // electron 最小化
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer
        ipc.send('web_minWindows', '')
      }
    },
    web_closeWindows() { // electron 关闭窗口
      if (window.require) {
        let ipc = window.require('electron').ipcRenderer
        ipc.send('web_closeWindows', '')
      }
    },

    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    /**
     * 提交登录表单
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // debugger;
        if (valid) {
          if (!window.currentDevice) { // 如果没有获取到设备号，不能登录
            // alert('未能正确获取设备号')
            this.$alert('未能正确获取设备号', '警告', {
              confirmButtonText: '确定'
            })
            return false
          }
          LOGIN(this.loginUser)
            .then(res => {
              if (res.data.code === 200 && res.data.data) {
                this.loginUser.usename = ''
                this.loginUser.password = ''
                this._processLoginResult(res.data.data) // 处理登陆返回的结果
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
    },

    /**
     * 处理登陆返回数据
     */
    _processLoginResult(data) {
      debugger
      let authorization = data.authorization
      if (!Cnbi.isEmpty(authorization)) {
        localStorage.setItem('authorization', authorization)
        localStorage.setItem('usename', this.loginUser.usename) // 用户名记住,方便下次登录
        localStorage.setItem('database', JSON.stringify(data)) // 返回{"a":1,"b":2}
        store.dispatch('setIsAutnenticated', true)
        store.dispatch('setUser', data)

        // 路由跳转
        this.$router.push('/message_page/home')

        // electron 处理
        if (window.require) {
          let ipc = window.require('electron').ipcRenderer
          ipc.send('web_autoLogin', '')
        }
      }
    },

    // 显示二维码
    showQrCode() {
      this.showWhat = 'qr_code'
      this.requestQrCode()
    },

    /**
     * 关闭二维码登录, 清除messageStore.scanStatus
     */
    closeQrCode() {
      this.showWhat = 'form'
      this.scanSuccess = false
      this.ActionSetMessageStore({scanStatus: null})
    },

    // 获取二维码
    requestQrCode() {
      this.scanSuccess = false
      let params = {
        platform: 'pc',
        device: localStorage.device || Cnbi.getDevice() // socket链接成功后返回的设备号
      }
      console.log('设备号：', localStorage.device)
      SET_FULLSCREEN_LOADING(false) // 设置不需要全屏加载动画
      this.elLoading = true // 开始 局部加载动画
      SCAN_LOGIN_URL(params)
        .then(res => {
          this.elLoading = false // 结束 局部加载动画
          console.log('获取登录二维码res：', res)
          if (res.data.code === 200 && res.data.data) {
            this.qrUrl = res.data.data.url
            this.ActionSetMessageStore({scanStatus: null})
            console.log('qrUrl:', this.qrUrl)
          }
        })
        .catch(err => {
          this.elLoading = false // 结束 局部加载动画
          console.log('获取登录二维码err：', err)
        })
    }

  }
}
</script>
<style>
  .login .el-checkbox__input.is-checked .el-checkbox__label {
    color: rgba(0, 0, 0, 0.7);
  }
</style>
<style scoped lang="scss">
  @import "@ms/index.scss";

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
    box-sizing: border-box;
    /*border: 1px solid #eee;*/
    box-shadow: #999 0px 0px 10px;

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

      .img1 {
        margin-right: 8px;
      }

      .control-btns {
        padding-right: 3px;
        padding-top: 2px;
        display: flex;
        justify-content: flex-end;

        .icon-mini, .icon-colse {
          padding: 5px;
          cursor: pointer;
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
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 22px;
      }

      .login-form {
        padding-right: 50px;

        .el-form-item {
          margin-bottom: 22px;
        }

        /deep/ .el-form-item.is-success .el-input__inner,
        /deep/ .el-form-item.is-success .el-input__inner:focus {
          border-color: $colorTheme !important;
        }

        .label {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 16px;
          margin-right: 15px;
          color: rgba(0, 0, 0, 0.7);
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
          cursor: pointer;

          img {
            margin-right: 20px;
          }
        }
      }

      .qr-code {
        .code-wrap {
          position: relative;
          box-sizing: border-box;
          width: 140px;
          height: 140px;
          margin: 30px auto 10px;
          border: 1px solid $colorBorder1;
          cursor: pointer;

          canvas {
            transform: scale(1.2);
          }

          .loading-failed {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 12px;
            color: #999;
          }

          .success-cover {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.9);

            .icon {
              color: #ffffff;
              font-size: 30px;
            }
          }
        }

        .code-text {
          font-size: 12px;
          font-weight: 400;
          text-align: center;
        }

        .btn-back {
          @include myBtn($width: 140px, $height: 40px, $borderRadius: 4px, $display: block, $fontSize: 16px)
          font-weight: bold;
          margin: 20px auto 0;
        }
      }
    }
  }

</style>
