<template>
  <div class="PageTitle">
    <h3 class="page-title__name" v-if="routeName !== '消息'">
      {{routeName}}
    </h3>
    <template v-else>
      <h3 class="page-title__name" v-if="miniType === 1101">
        <span>{{receiverName}}</span>
        <div class="dropdown-wrap">
          <relative-pop :showClose="false">
            <i class="el-icon-arrow-down el-icon--right"></i>
            <ul slot="pop">
              <li class="pop-list" @click="showGroupSettingDialog=true">
                <h3 class="pop-list__title">
                  <img class="pop-list__icon" src="@ma/icon/group_set_icon.svg">
                  <span class="pop-list__text">群主设置</span>
                </h3>
                <p class="pop-list__description">管理员对群主名称等相关设置</p>
              </li>
              <li class="pop-list" @click="showGroupQuitDialog=true">
                <h3 class="pop-list__title">
                  <img class="pop-list__icon" src="@ma/icon/group_set_icon.svg">
                  <span class="pop-list__text">退出群组</span>
                </h3>
                <p class="pop-list__description">退出群主将不再接收消息</p>
              </li>
            </ul>
          </relative-pop>
        </div>
      </h3>
      <h3 class="page-title__name" v-else>{{receiverName}}</h3>
    </template>

    <!--群设置弹窗-->
    <!--<el-dialog-->
      <!--v-if="showGroupSettingDialog"-->
      <!--:visible.sync="showGroupSettingDialog"-->
      <!--width="35%"-->
      <!--:show-close="false">-->
      <!--<div class="dialog-content">-->
        <!--<h3 class="title">群头像设置</h3>-->
        <!--<figure>-->
          <!--<div>-->
            <!--<div class="img-box">-->
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
              <!--<img v-else :src="groupInfo.avatar" v-avatar="groupInfo.text">-->
            <!--</div>-->
          <!--</div>-->
          <!--<el-upload-->
            <!--class="avatar-uploader"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:show-file-list="false"-->
            <!--:on-success="handleAvatarSuccess"-->
            <!--:before-upload="beforeAvatarUpload"-->
          <!--&gt;-->
            <!--上传头像-->
          <!--</el-upload>-->
        <!--</figure>-->
      <!--</div>-->
      <!--<div class="dialog-content">-->
        <!--<h3 class="title">群名称设置</h3>-->
        <!--<el-input-->
          <!--placeholder="群名称"-->
          <!--v-model="groupInfo.text"-->
          <!--ref="groupName"-->
          <!--clearable>-->
        <!--</el-input>-->
      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" size="small" @click="clickEditGroup">保 存</el-button>-->
                <!--<el-button size="small" @click="showGroupSettingDialog = false">取 消</el-button>-->
              <!--</span>-->
    <!--</el-dialog>-->

    <!--退出群弹窗-->
    <!--<el-dialog-->
      <!--title="退出群组"-->
      <!--:visible.sync="showGroupQuitDialog"-->
      <!--v-if="showGroupQuitDialog"-->
      <!--width="30%"-->
      <!--:show-close="false"-->
      <!--center>-->
      <!--<div class="dialog-content" style="font-size: 16px;line-height: 30px;">-->
        <!--<p>是否退出群组</p>-->
        <!--<p>“软件开发交流群”?</p>-->
      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button size="small" @click="showGroupQuitDialog = false">确 认</el-button>-->
                <!--<el-button type="primary" size="small" @click="showGroupQuitDialog = false">取 消</el-button>-->
              <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {
  GROUP_INFO,
  QUIT_GROUP,
  EDIT_GROUP,
  DISSOLU_GROUP,
  UPLOAD_FILE
} from '@m_api/message.js';

export default {
  name: 'PageTitle',
  components: {
    RelativePop: () => import('@mc/relative_pop/RelativePop.vue'),
    SidebarPop: () => import('@mc/sidebar_pop/SidebarPop')
  },
  data () {
    return {
      imageUrl: '', // 上传图片时绑定的图
      showGroupQuitDialog: false,           // 是否显 退出群弹出
      showGroupSettingDialog: false,        // 是否显 群组设置弹窗
      groupInfo: null,                      // 群信息
      groupUsers: null,                      // 群成员
      oldGroupName: '', // 修改前的群名
      imgfd: null, // 要发给服务器的图片信息
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    miniType() {
      return this.messageStore.miniType;
    },
    receiverName() {
      return this.messageStore.sessionActiveItem.name;
    },
    routeName() {
      return this.messageStore.routeName;
    },
    loginUserId() {
      return this.user.user.id;
    },
    groupId() {
      return this.messageStore.sessionActiveItem.id;
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore']),

    // 上传群头像文件
    handleAvatarSuccess(res, file) {
      // debugger;
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
      return true;
    },
    submitUpload(fd) {
      let _this = this;
      if (fd) {
        UPLOAD_FILE(fd).then(res => {
          console.log('上传群头像res', res);
          if (res.data.code === 200) {
            _this.hdUrl = res.data.data.hdUrl; // 传递返回的图片地址
          }
        });
      }
    },

    // 群设置
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
        console.log('设置群资料', err);
      });
    },

    // 验证当前登录用户是不是群管理员，如果是群管理员则解散群组
    isGroupOwner() {
      return this.loginUserId === this.groupOwnerId;
    },

    /**
     * 群id查询群信息
     */
    requestGroupInfo() {
      // debugger
      if (!this.groupId) return;
      GROUP_INFO(this.groupId).then(res => {
        console.log('群id查询群信息:', res.data.data);
        if (res.data.code === 200 && res.data.data) {
          this.groupInfo = res.data.data.info;
          this.groupUsers = res.data.data.users;
          this.ActionSetMessageStore({groupInfo: res.data.data});
        }
      }).catch(err => {
        console.log(err);
      });
    },

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
          });
        } else {
          this.$alert(res.data.msg, '退出群组失败', {
            confirmButtonText: '确定'
          });
        }
      }).catch(err => {
        console.log('退出群组', err);
      });
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
          });
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            showClose: true
          });
        }
      }).catch(err => {
        console.log('解散群聊异常：', err);
      });
    }
  },
  mounted() {
    this.requestGroupInfo();
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .page-title__name {
    padding: 0 30px;
    font-size: 18px;
    color: $colorText3;
    line-height: $sizeTopBarHeight;
  }

  .dropdown-wrap {
    display: inline-block;
    padding: 0 5px;
    cursor: pointer;
  }

  /deep/ .RelativePop {
    .pop-wrap {
      box-sizing: border-box;
      padding: 10px 0;
      width: 240px;
      top: 100%;
      left: -40px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
    }

    .pop-list {
      cursor: pointer;
      padding: 10px 20px;

      &:hover {
        background: $colorThemePrimary;
      }
    }

    .pop-list__icon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }

    .pop-list__title {
      display: flex;
      align-items: center;
      line-height: 20px;
      font-weight: bold;
      font-size: 16px;
      color: $colorTheme;
    }

    .pop-list__description {
      font-size: 12px;
      line-height: 20px;
      margin-top: 5px;
      color: $colorTextBlack5;
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
</style>
