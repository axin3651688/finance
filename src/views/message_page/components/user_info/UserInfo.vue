<template>
  <div class="UserInfo" id="UserInfo" v-if="userInfo">
    <div class="top">
      <div class="img-box">
        <img :src="userInfo.user.avatar" :title="userInfo.user.trueName" v-avatar="userInfo.user.trueName">
      </div>
      <div class="info">
        <h3 class="info-title">
          {{userInfo.user.trueName}}
          <i class="icon icon-gender"></i>
        </h3>
        <div class="info-text" v-if="userInfo.user.sign" v-text="userInfo.user.sign"></div>
      </div>
    </div>
    <ul class="middle">
      <!--工作状态-->
      <li v-if="userInfo.work">
        <div class="icon img-box">
          <img src="@ma/icon/my_state_fly.svg" alt="">
        </div>
        {{userInfo.work.text}}
      </li>
      <!--电话-->
      <li v-if="userInfo.user.phone">
        <div class="icon img-box">
          <img src="@ma/icon/my_phone.svg" alt="">
        </div>
        {{userInfo.user.phone}}
      </li>
      <!--邮箱-->
      <li v-if="userInfo.user.email">
        <div class="icon img-box">
          <img src="@ma/icon/email.jpg" alt="">
        </div>
        {{userInfo.user.email}}
      </li>
    </ul>
    <div class="bottom">
      <my-btn>分享名片</my-btn>
    </div>
  </div>
</template>

<script>
import {LEFT_USER_INFO} from '~api/message.js'
import {mapGetters} from 'vuex'

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: null, // 登陆用户的详细信息
    }
  },
  components: {
    MyBtn: () => import('@c/message/my_btn/MyBtn.vue')
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getUserInfo() {
      let userId = this.user.user.id
      let targetId = userId
      LEFT_USER_INFO(userId, targetId)
        .then(res => {
          console.log('左边栏获取用户信息res：', res)
          if (res.data.code === 200) {
            this.userInfo = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: '' + res.data.msg,
              showClose: true
            })
          }
        })
        .catch(err => {
          console.log('左边栏获取用户信息err：', err)
        })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/index.scss";

  .UserInfo {
    color: $colorText2;
    width: 100%;

    .top {
      @include flex();
      align-items: center;
      padding: 30px 10px 15px;
      color: $colorText2;

      .info {
        flex: 1;
        overflow: hidden;
        margin-left: 10px;

        .info-title {
          font-weight: bold;
          display: flex;
          align-items: center;

          .icon {
            width: 16px;
            height: 16px;
            overflow: hidden;
            margin-left: 10px;
            border-radius: 4px;
            background: $colorTheme;
          }

          .icon-gender {
            /*background: ;*/
          }
        }

        .info-text {
          margin-top: 5px;
          font-size: 12px;
          @include singleEllipsis();
        }
      }

      .img-box {
        @include imgBox($width: 40px, $height: 40px, $borderRadius: 50%);
        background: #eee;
      }


    }

    .middle {
      padding: 0 10px;
      color: $colorText3;

      li {
        @include flex();
        align-items: center;
        margin-top: 15px;
        font-size: 14px;
      }

      .icon {
        @include icon($width: 24px, $height: 24px);
        margin-right: 10px;
      }

      .img-box {
        @include imgBox($width: 24px, $height: 24px);
      }

      .icon__state {
      }

      .icon__phone {
      }

      .icon__email {
      }
    }

    .bottom {
      text-align: center;

      .btn {
        @include myBtn($borderRadius: 8px, $height: 36px, $width: 100px);
        margin: 30px auto;
      }
    }
  }
</style>
