<template>
  <div class="Analysis">
    <!--<div class="btn-group">-->
    <!--<div class="btn active">未读 <span class="count">(12)</span></div>-->
    <!--<div class="btn">已读</div>-->
    <!--</div>-->
    <el-scrollbar style="height: 100%">
      <template v-for="item in messageUnreadList">
        <!--催报-->
        <div class="todo-item item-report" :key="item.code">
          <div class="item-top">
            <div class="img-box">
              <avatar
                :username="item.senderName"
                :rounded="false"
                backgroundColor="transparent"
                color="#fff"
                :size="40"
              ></avatar>
              <img :src="item.avatar" onerror="this.style.display='none'"/>
            </div>
            <h3 class="title">{{item.actionText}}</h3>
            <p class="datetime">
              {{item.sendTime | formatTime}}
            </p>
            <i class="status" v-if="item.state===1"></i>
          </div>
          <div class="content">
            <div class="content-item">
              <div class="info">{{item.content}}</div>
            </div>
            <div class="content-item">
              <div class="content-item-label">发送人：</div>
              <div class="content-item-text">{{item.senderName}}</div>
            </div>
            <el-button type="primary" size="small" class="my-btn" @click="doReport">去上报</el-button>
          </div>
        </div>

        <!--请假-->
        <div class="todo-item item-leave" v-if="false" :key="item">
          <div class="item-top">
            <div class="img-box">
              <img src="" alt="">
            </div>
            <h3 class="title">张某的请假申请</h3>
            <p class="datetime">
              <span class="date">2018-12-01</span>
              <span class="time">9:50:30</span>
            </p>
            <i class="status"></i>
          </div>
          <div class="content">
            <div class="content-item first-item">
              <div class="item-group">
                <div class="content-item-label">请假类型：</div>
                <div class="content-item-text">年假</div>
              </div>
              <div class="item-group">
                <div class="content-item-label">请假时长：</div>
                <div class="content-item-text">5天2.5小时</div>
              </div>
            </div>
            <div class="content-item">
              <div class="content-item-label">请假时间：</div>
              <div class="content-item-text">
                <span class="start-time">2018-12-01&nbsp;&nbsp;08:30</span>
                <span class="end-time">2018-12-06&nbsp;&nbsp;10:30</span>
              </div>
            </div>
            <div class="content-item">
              <div class="content-item-label">请假理由：</div>
              <div class="content-item-text">
                这个人很懒没有写任何理由
              </div>
            </div>
            <el-button type="primary" size="medium" class="my-btn">去审批</el-button>
          </div>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {
  FIND_MODULE_MSG,
  UPDATE_MODULE_STATE_ALL,
  CHANGE_MODULE_STATE
} from '@m_api/message.js';
import {FORMAT_TIME} from '@mu/formatTime.js';

export default {
  name: 'Analysis',
  data() {
    return {
      messageUnreadList: [] // 订阅消息列表
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
    },
    newServerMsg() { // 服务器推送的消息
      debugger;
      return this.messageStore.newServerMsg;
    }
  },
  filters: {
    // 格式化时间戳
    formatTime(time) {
      return FORMAT_TIME(time);
    }
  },
  watch: {
    newServerMsg(val) {
      debugger;
      if (val.code === 11021) {
        this.messageUnreadList.unshift(val.data);
      }
    }
  },
  methods: {
    // 查询订阅消息列表，
    getUnReadMsg() {
      let data = {
        moduleId: 1, // 点击的时候传过来的id (receiverId)
        page: 1, // 分页加载页码
        size: 20, // 每页20
        // state: 1, // state 1未读消息，2已读消息 (左上角的切换)
        // userId: this.loginUserId // 当前用户的id
        userId: 539 // 当前用户的id
      };
      FIND_MODULE_MSG(data)
        .then(res => {
          console.log('订阅消息', res.data.data);
          if (res.data.code === 200) {
            this.messageUnreadList = res.data.data.data.reverse();
            this._eachRead(this.messageUnreadList);
          }
        })
        .catch(err => {
          console.log('请求message：', err);
        });
    },

    // 消除左侧红点 put
    sendReadAll() {
      let params = {
        userId: this.loginUserId,
        moduleId: 1 // 从session传来的moduleId
      };
      UPDATE_MODULE_STATE_ALL(params).then(res => {
        console.log('消除红点', res);
        if (res.data.code === 200) {
          this.messageUnreadList = res.data.data.data;
        }
      }).catch(err => {
        console.log('消除红点', err);
      });
    },

    // 消除单条红点
    sendReadSingle(moduleId) {
      let params = {
        userId: this.loginUserId,
        moduleId: moduleId, // 单条消息id
        state: 2 // state 1未读消息，2已读消息
      };
      CHANGE_MODULE_STATE(params).then(res => {
        console.log('消除红点', res.data.data);
        if (res.data.code === 200) {
          this.messageUnreadList = res.data.data.data;
        }
      }).catch(err => {
        console.log('消除红点', err);
      });
    },

    // 处理上报
    doReport() {
      this.$message({
        type: 'success',
        message: '正在实现中···'
      });
    },

    // 遍历消息，设置为已读，临时的
    _eachRead(data) {
      data.forEach(item => {
        if (item.state === 1) {
          this.sendReadSingle(item.id);
        }
      });
    }

  },
  mounted() {
    this.getUnReadMsg();
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .Analysis {
    height: 100%;
  }

  .btn-group {
    display: inline-block;
    margin-bottom: 32px;
    $btnHeight: 24px;
    border-radius: $btnHeight / 2;
    overflow: hidden;

    .btn {
      display: inline-block;
      line-height: $btnHeight;
      padding: 0 36px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.20);
      background: rgba(0, 0, 0, .1);
      cursor: pointer;
    }

    .btn.active {
      background: $colorTheme;
      color: #ffffff;
    }
  }

  .todo-item {
    position: relative;
    padding: 10px 30px;
    margin-bottom: 20px;
    border-radius: 12px;
    background: #ffffff;
    line-height: 20px;
    font-weight: 400;

    .item-top {
      display: flex;
      align-items: center;
      margin-bottom: 0px;

      .img-box {
        position: relative;
        margin-right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: $colorTheme;
        overflow: hidden;

        div {
          position: absolute;
        }

        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .title {
        overflow: hidden;
        margin-right: 40px;
        max-width: 300px;
        height: 21px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: $colorText1;
      }

      .datetime {
        font-size: 14px;
        color: $colorText3;
      }

      .status {
        margin-left: 20px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #EF3C3C;
      }
    }

    .content {
      padding-right: 100px;
      padding-left: 60px;

      .content-item.first-item {
        display: flex;

        .item-group {
          min-width: 160px;
        }
      }

      .content-item {
        font-size: 14px;
        color: $colorText2;
        line-height: 20px;

        .content-item-label {
          float: left;
          margin-right: 5px;
        }

        .content-item-test {

        }
      }
    }

    .my-btn {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: $colorTheme;
    }
  }

  .my-btn {
    float: right;
    border: none;
    background: $colorTheme;
  }
</style>
