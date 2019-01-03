<template>
  <div class="GroupMsg vue-module">
    <div class="top">
      <div class="left">
        <div class="img-box img-box__group" @click="showGroupMembers = true">
          <img :src="groupInfo.avatar" v-avatar="groupInfo.text">
        </div>
        <div class="content">
          <h3 class="title">
            <span class="title-text">{{groupInfo.text}}</span>
            <el-dropdown trigger="click" @command="handleCommand">
                              <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="groupSetting"
                  v-if="loginUserId === groupOwnerId"
                  style="padding-top: 15px;padding-bottom: 12px;">
                  <h3 style="display: flex;align-items: center; height: 18px;line-height: 18px;">
                    <div style="width: 18px;height: 18px;margin-right: 10px">
                      <img src="../assets/icon/group_set_icon.svg"
                           alt="群主设置"
                           style="width: 100%;height: 100%;">
                    </div>
                    <span style="font-weight: bold;font-size: 16px;color: #1890ff   ">群主设置</span>
                  </h3>
                  <p style="font-size:14px; line-height: 20px;margin-top: 8px;">管理员对群主名称等相关设置</p>
                </el-dropdown-item>
                <el-dropdown-item command="groupQuit" style="padding-top: 15px;padding-bottom: 12px;">
                  <h3 style="display: flex;align-items: center; height: 18px;line-height: 18px;">
                    <div style="width: 18px;height: 18px;margin-right: 10px">
                      <img src="../assets/icon/group_set_tuichu.svg"
                           alt="退出群组"
                           style="width: 100%;height: 100%;">
                    </div>
                    <span style="font-weight: bold;font-size: 16px;color: #1890ff   ">退出群组</span>
                  </h3>
                  <p style="font-size:14px; line-height: 20px;margin-top: 8px;">退出群主将不再接收消息</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </h3>
          <p class="text">{{groupMembers.length}}人</p>
        </div>
      </div>
      <div class="right">
        <div class="group-member" @click="showGroupMembers = true">
          <div class="icon icon__group-person"></div>
          <span>成员</span>
        </div>
        <div class="btn-group">
          <div class="btn active">消息</div>
          <div class="btn">文件</div>
        </div>
      </div>
    </div>
    <div class="middle">
      <el-scrollbar style="height: 100%" ref="chatWindow">
        <message-item v-for="item in groupMsgList" :key="item.id" :data="item"></message-item>
      </el-scrollbar>

      <!--底部阴影-->
      <div class="inset-shadow"></div>
    </div>

    <!--聊天编辑窗口-->
    <div class="bottom">
      <div class="chat-tool">
        <span id="face-icon" class="tool-icon face-icon" @click="showFacePop = !showFacePop"></span>
        <span class="tool-icon file-icon" @click="selectFile">
              <form action="">
                  <input type="file" name="file" ref="selectFile">
              </form>
          </span>
        <span class="tool-icon link-icon"></span>
        <transition name="el-zoom-in-bottom">
          <div v-show="showFacePop" class="face-pop">
            <ul>
              <li v-for="face in EMOTION_SPRITES" :key="face.value">
                <div :class="['face-img', face.className]"
                     @click="addFaceToInput(face.value)"
                     :title="face.value"
                ></div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="input-wrap">
        <textarea class="chat-textarea"
                  placeholder="请输入文字，按enter建发送信息"
                  v-model="sendText"
                  ref="textarea"
                  @keyup.enter="handleSendMessage"
        ></textarea>
      </div>
    </div>

    <!--群设置弹窗-->
    <el-dialog
      :visible.sync="showGroupSettingDialog"
      width="35%"
      :show-close="false">
      <div class="dialog-content">
        <h3 class="title">群头像设置</h3>
        <figure>
          <div>
            <div class="img-box">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img v-else :src="groupInfo.avatar" v-avatar="groupInfo.text">
            </div>
          </div>
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          上传头像
        </el-upload>
        </figure>
      </div>
      <div class="dialog-content">
        <h3 class="title">群名称设置</h3>
        <el-input
          placeholder="群名称"
          v-model="groupInfo.text"
          ref="groupName"
          clearable>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="clickEditGroup">保 存</el-button>
                <el-button size="small" @click="showGroupSettingDialog = false">取 消</el-button>
              </span>
    </el-dialog>

    <!--退出群弹窗-->
    <el-dialog
      title="退出群组"
      :visible.sync="showGroupQuitDialog"
      width="30%"
      :show-close="false"
      center>
      <div class="dialog-content" style="font-size: 16px;line-height: 30px;">
        <p>是否退出群组</p>
        <p>“软件开发交流群”?</p>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="showGroupQuitDialog = false">确 认</el-button>
                <el-button type="primary" size="small" @click="showGroupQuitDialog = false">取 消</el-button>
              </span>
    </el-dialog>

    <!--群成员侧边栏组件-->
    <group-members
      v-if="showGroupMembers"
      @closeGroupMembers="showGroupMembers = false"
    ></group-members>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MessageItem from './MessageItem'
import emotionSprites from '@a/green/emotion_sprites.json';
import {
  findGroupMsg,
  GROUP_INFO,
  sendMsg,
  QUIT_GROUP,
  EDIT_GROUP,
  DISSOLU_GROUP,
  UPLOAD_FILE
} from '~api/message.js';

export default {
  name: 'GroupMsg',
  components: {
    GroupMembers: () => import('./GroupMembers'),
    MessageItem
  },
  data() {
    return {
      hdUrl: '',
      oldGroupName: '',
      imgfd: null, // 要发给服务器的图片信息
      imageUrl: '', // 上传图片时绑定的图
      EMOTION_SPRITES: emotionSprites.data, // 聊天表情数据
      groupInfo: {},
      groupMembers: [],
      groupMsgList: [],
      showGroupMembers: false, // 是否显示群成员组件
      showGroupQuitDialog: false, // 退出群弹出
      showGroupSettingDialog: false, // 群组设置弹窗
      showFacePop: false, // 弹窗聊天表情
      sendText: '' // 聊天发送的内容
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
    },
    groupId() {
      return this.messageStore.targetId
    },
    groupOwnerId() {
      return this.groupInfo.ownerId
    },
    newServerMsg() { // 服务器推送的消息
      return this.messageStore.newServerMsg
    },
    serverAck() { // 服务器推送的 ack回执
      return this.messageStore.serverAck
    }
  },
  watch: {
    //监听服务器推送的消息
    newServerMsg(val) {
      debugger;
      console.log('监听到服务器推送：', val);
      let item = val.data;
      item['miniType'] = val.code;
      this.groupMsgList.push(item);
      this.$nextTick(() => { // 把聊天窗口滚动到最底部
        this.chatWindowScrollToBottom();
      });
    },
    serverAck(val) {
      console.log('服务器ACK：', val);
      debugger;
      socket.send(JSON.stringify(val));
      debugger;
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      let fd = new FormData();
      fd.append('file', file);
      fd.append('userId', this.loginUserId);
      fd.append('size', file.size);
      this.imgfd = fd;
      this.submitUpload(fd);
      return true
    },

    submitUpload(fd) {
      let _this = this;
      if (fd) {
        UPLOAD_FILE(fd).then(res => {
          console.log('上传群头像res', res);
          if (res.data.code === 200) {
            _this.hdUrl = res.data.data.hdUrl // 传递返回的图片地址
          }
        });
      }
    },

    clickEditGroup() {
      let newGroupName = this.$refs.groupName.value;
      if (newGroupName === this.groupInfo.text && !this.imgfd) {
        this.showGroupSettingDialog = false;
        return; // 如果没有图片和群名字都没修改,则不往下执行
      }
      let params = {
        // note: '群描述',
        // avatar: hdUrl, // 上传头像的地址
        id: this.groupId, // 群id
        text: newGroupName,
        type: 0, // 1可以被搜索到
        userId: this.loginUserId
      };
      if (this.hdUrl) params['avatar'] = this.hdUrl; // 如果上传了群头像才设置头像
      console.log('params', params);
      EDIT_GROUP(params).then(res => {
        console.log('设置群资料', res.data.data);
        if (res.data.code === 200) {
          // debugger
        }
        // debugger
      }).catch(err => {
        console.log('设置群资料', err)
      })
    },

    // 点击表情，把表情添加到输入框, 同时 focus 输入框
    addFaceToInput(face) {
      this.sendText += face;
      this.$refs.textarea.focus();
    },

    // 发送聊天内容,发送完一条消息后要清空输入框
    handleSendMessage() {
      console.log('要发送的内容是：', this.sendText);
      if (this.sendText.trim()) { // 默认会带一个回车符，所以要先去掉
        let sendData = {
          code: 1101, // 1100:单聊 1101:群聊
          data: {
            content: this.sendText,
            senderId: this.loginUserId,
            receiverId: this.groupId,
            id: 'cnbift' + new Date().getTime() + new Date().getTime(),
            type: 1
          },
        };
        console.log('群消息发送的内容是：', this.sendText);
        // this.addMsgToWindow(this.sendText); // todo:这里会受到服务器返回的类容，就不自己推到窗口了，有待优化
        this.sendText = '';
        debugger;
        socket.deliver(sendData);

        // sendMsg(sendData).then(res => {
        //   console.log('发送群消息返回数据res', res);
        //   debugger;
        // }).catch(err => {
        //   console.log('发送群消息返回数据err', err);
        //   debugger;
        // })

      } else {
        this.sendText = '';
        this.$message({
          type: 'warning',
          message: '发送内容不能为空',
          showClose: true
        });
      }
    },

    // 把发送的内容显示到聊天窗口
    addMsgToWindow(sendText) {
      let data = {
        avatar: this.user.user.avatar,
        content: sendText,
        name: this.user.user.trueName,
        sendTime: new Date().getTime()
      };
      this.groupMsgList.push(data);
      this.$nextTick(() => {
        this.chatWindowScrollToBottom();
      });
    },

    // 把聊天窗口滚动到最底部
    chatWindowScrollToBottom() {
      // debugger;
      let chatWindow = this.$refs.chatWindow.$el.childNodes[0];
      console.log('找滚动窗口：', chatWindow);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    },


    // 验证当前登录用户是不是群管理员，如果是群管理员则解散群组
    isGroupOwner() {
      return this.loginUserId === this.groupOwnerId
    },

    // 群组设置 与 退出群组 弹窗控制
    handleCommand(command) {
      switch (command) {
        case 'groupSetting': {
          this.showGroupSettingDialog = true;
          break
        }
        case 'groupQuit': {
          if (this.isGroupOwner()) { // 如果是群管理员不能直接退出
            // debugger;
            let msg = `您是该群 ${this.groupInfo.text} 的管理员，直接退出会解散该群组！\n是否继续?`;
            this.$confirm(msg, '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.dissoluGroup() // 是群管理员则解散群组
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              });
            });
          } else {
            // debugger;
            let msg = `是否退出群组：${this.groupInfo.text}`;
            this.$confirm(msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.quitGroup() // 不是群管理员则退出群
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              });
            });
          }
          break
        }
      }
    },

    // 选择上传文件，这里是上传群组头像
    selectFile() {
    },

    // 群id查询群信息
    getInfo() {
      // debugger;
      if (!this.groupId) return;
      GROUP_INFO(this.groupId).then(res => {
        console.log('群id查询群信息:', res.data.data);
        if (res.data.code === 200) {
          this.groupInfo = res.data.data.info;
          this.groupMembers = res.data.data.users;
          this.ActionSetMessageStore({groupInfo: res.data.data});
        }
      }).catch(err => {
        console.log('请求message：', err)
      })
    },

    // 获取群消息
    getGroupMsgList() {
      let data = {
        page: 1,
        groupId: this.groupId,
        userId: this.loginUserId,
        size: 20
      };
      findGroupMsg(data).then(res => {
        // debugger;
        console.log('群消息列表：', res.data.data);
        if (res.data.code === 200) {
          this.groupMsgList = res.data.data.data.reverse();
          // 消息拿到后 把窗口内容滚到到底部
          this.$nextTick(() => {
            this.chatWindowScrollToBottom()
          });
        }
      }).catch(err => {
        console.log('群消息', err)
      })
    },

    // TODO：2退出群组(ok) 成功后窗口怎么跳转
    quitGroup() {
      // debugger;
      let params = {
        userId: this.loginUserId,
        groupId: this.groupId
      };
      QUIT_GROUP(params).then(res => {
        console.log('退出群组res:', res);
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg,
            showClose: true
          })
        } else {
          this.$alert(res.data.msg, '退出群组失败', {
            confirmButtonText: '确定'
          })
        }
      }).catch(err => {
        console.log('退出群组', err)
      })
    },

    dissoluGroup() {
      // debugger;
      let params = {
        senderId: this.loginUserId,
        groupId: this.groupId
      };
      DISSOLU_GROUP(params).then(res => {
        console.log('解散群聊：', res.data.data);
        // debugger;
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg,
            showClose: true
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            showClose: true
          })
        }
      }).catch(err => {
        console.log('解散群聊异常：', err)
      })
    },

    // 当点击的不是表情，则隐藏表情弹框
    hideFaceIcon(e) {
      // debugger;
      let elem = e.target || e.srcElement;
      while (elem) { // 循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id === 'face-icon') {
          return
        }// 如果还有别的div不想点击，就加else if判断
        elem = elem.parentNode
      }
      this.showFacePop = false
    }
  },
  mounted() {
    this.getInfo();
    this.getGroupMsgList();

    // 当点击的不是表情，则隐藏表情弹框
    document.addEventListener('click', this.hideFaceIcon)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideFaceIcon)
  }
}
</script>

<style lang="scss">
  /*这里不使用 scoped 使v-html生成表情能够应用到样式*/
  @import "../styles/emotion_sprites.scss";
</style>
<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .GroupMsg {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    height: 100%;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 40px 0 40px;
      box-sizing: border-box;
      margin-bottom: 15px;

      .left {
        display: flex;
        align-items: center;

        .img-box {
          width: 60px;
          height: 60px;
          margin-right: 30px;
          overflow: hidden;
          border-radius: 50%;
          background: $colorTheme;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .img-box__group {
          cursor: pointer;
        }

        .content {
          .title {
            font-size: 18px;
            color: $colorText1;
            min-width: 220px;

            /deep/ .el-dropdown {
              cursor: pointer;
            }

            .title-text {
              display: inline-block;
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .text {
            margin-top: 8px;
            font-size: 16px;
            color: $colorText2
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .group-member {
          width: 58px;
          display: flex;
          align-items: center;
          margin-right: 30px;
          color: $colorTheme;
          font-size: 16px;
          cursor: pointer;

          .icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
          }

          .icon__group-person {
            background: url('../assets/icon/group_person.svg');
          }
        }
      }
    }

    .middle {
      position: relative;
      flex: 1;
      /*padding-right: 24px;*/
      padding-left: 40px;
      overflow: hidden;

      .inset-shadow {
        $shadowHeight: 20px;
        width: 100%;
        height: $shadowHeight;
        position: absolute;
        background: #eee;
        bottom: -$shadowHeight;
        left: 0;
        right: 0;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
      }

      /deep/ .el-scrollbar {

        .el-scrollbar__thumb {
          background: $colorTheme;
        }

        .el-scrollbar__wrap {
          overflow-x: hidden;
          padding-right: 40px;
        }
      }


      /*background: #cccccc;*/
      .message-box {
        padding: 10px 20px;
        margin: 10px 40px 20px 0;
        background: #ffffff;
        box-shadow: 0 2px 20px rgba(8, 69, 81, 0.1);
        border-radius: 12px;

        .message-top {
          overflow: hidden;
          margin-bottom: 20px;

          .avatar-box {
            width: 40px;
            height: 40px;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;
            float: left;
            background: #cccccc;

            img {
              width: 100%;
            }
          }

          .user-name {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: $colorText1;
          }

          .send-time {
            position: relative;
            margin-top: 3px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: $colorText4;
            font-family: $fontFamilyMain;

            .status {
              position: absolute;
              left: 215px;
              top: 0;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #EF3C3C;
            }
          }
        }

        .message-content {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.80);
        }
      }
    }

    .bottom {
      height: 260px;
      box-sizing: border-box;
      /*height: 240px;*/
      width: 100%;
      padding: 18px 40px 20px;
      background: #ffffff;

      .chat-tool {
        position: relative;
        margin-bottom: 18px;

        .tool-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          /*border-radius: 50%;*/
          cursor: pointer;
          background: #ccc;
          margin-right: 30px;
          background-size: 24px 24px;

          form {
            width: 0;
            height: 0;
            display: none;
          }
        }

        .face-icon {
          background: url("../assets/icon/emoji.svg") no-repeat;
        }

        .file-icon {
          background: url("../assets/icon/file.svg") no-repeat;
        }

        .link-icon {
          background: url("../assets/icon/url.svg") no-repeat;
        }
      }

      .input-wrap {
        width: 100%;

        .chat-textarea {
          box-sizing: border-box;
          min-height: 100px;
          padding: 10px 20px;
          color: rgba(0, 0, 0, 0.40);
          background: rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          width: 100%;
          border: none;
          outline: 0;
          resize: none;
          text-align: left;
          font-family: $fontFamilyMain;
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }

    .comment {
      height: 200px;
      width: 100%;
      background-color: pink;
      position: relative;
      bottom: 0;
      opacity: 1;
      padding: 40px 30px 0 40px;
      box-sizing: border-box;
    }

    .edit {
      background-color: #fff;
      width: 100%;
      padding: 10px 0 20px 20px;
      box-sizing: border-box !important;
      background: rgba(255, 255, 255, 1);
    }

    .btn-group {
      min-width: 136px;
      display: inline-block;
      $btnHeight: 24px;
      border-radius: $btnHeight / 2;
      overflow: hidden;

      .btn {
        display: inline-block;
        line-height: $btnHeight;
        padding: 0 20px;
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
  }

  /deep/ .el-dialog {
    min-width: 300px;
    border-radius: 12px;

    .el-dialog__header {
      text-align: left;
      font-size: 16px;
      font-weight: bold;

      .el-dialog__title {
        color: $colorTheme;
      }
    }

    .dialog-content {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .title {
        font-size: 16px;
        font-weight: bold;
        color: $colorTheme;
        margin-bottom: 10px;
      }

      /deep/ .el-input__inner {
        background: $colorBgPageGray;
        border: none;
      }

      figure {
        display: flex;
        align-items: center;

        .img-box {
          overflow: hidden;
          width: 60px;
          height: 60px;
          margin-right: 30px;
          border-radius: 50%;
          background: #cccccc;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .dialog-footer {
      .el-button {
        border: none;
        color: #ffffff;
        background: $colorBgBtnGray;
      }

      .el-button.el-button--primary {
        background: $colorTheme;
      }

      .el-button + .el-button {
        margin-left: 30px;
      }
    }

  }

  .upload-file {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    font-weight: 400;

    span {
      font-size: 14px;
      line-height: 20px;
      color: $colorTheme;
      cursor: pointer;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      opacity: 0;
      filter: alpha(opacity=0);
    }
  }

  #group-members > .el-dialog {
    margin: 0 !important;
    right: 0 !important;
    left: auto !important;
    position: fixed !important;
    height: 100vh !important;
    border-radius: 0 !important;
  }

</style>
