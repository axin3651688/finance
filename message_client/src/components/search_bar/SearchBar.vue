<template>
  <div class="search-bar" v-clickoutside="handleClose">
    <el-input placeholder="搜索" v-model="keywords" clearable @keyup.enter.native="doSearch">
      <div slot="suffix" class="icon-zoom img-box">
        <img src="@ma/icon/zoom.svg">
      </div>
    </el-input>
    <div class="search-bar_right" @click="doSearch">
      <div class="img-box">+</div>
    </div>

    <!--弹出搜索结果-->
    <div class="search-result" v-if="show">
      <template v-if="searchData">

        <!--应用-->
        <div class="cards panel" v-if="searchData.cards.length">
          <!--{{searchData.cards}}-->
          <div class="panel-title">
            <div class="panel-name">应用</div>
            <div class="panel-btn">更多>></div>
          </div>
          <ul class="panel-content">
            <li class="content-item" v-for="item in searchData.cards">
              <div class="img-box item-avatar">
                <img :src="item.avatar" v-avatar="item.text">
              </div>
              <h4 class="item-title">{{item.text}}</h4>
            </li>
          </ul>
        </div>

        <!--联系人-->
        <div class="contacts panel" v-if="searchData.contacts.length">
          <!--{{searchData.contacts}}-->
          <div class="panel-title">
            <div class="panel-name">联系人</div>
            <div class="panel-btn">更多>></div>
          </div>
          <ul class="panel-content">
            <li class="content-item" v-for="item in searchData.contacts">
              <div class="img-box item-avatar" @click="redirectContact(item.id, 'ContactsFriends')">
                <img :src="item.avatar" v-avatar="item.trueName">
              </div>
              <h4 class="item-title">{{item.trueName}}</h4>
              <div class="item-btn" @click="redirectSingleChat(item)">聊天</div>
            </li>
          </ul>
        </div>

        <!--群组-->
        <div class="groups panel" v-if="searchData.groups.length">
          <!--{{searchData.groups}}-->
          <div class="panel-title">
            <div class="panel-name">群组</div>
            <div class="panel-btn">更多>></div>
          </div>
          <ul class="panel-content">
            <li class="content-item content-item__group" v-for="item in searchData.groups"
                @click="redirectGroupChat(item)">
              <div class="img-box item-avatar">
                <img :src="item.avatar" v-avatar="item.text">
              </div>
              <h4 class="item-title">{{item.text}}</h4>
            </li>
          </ul>
        </div>

        <!--nodes-->
        <div class="nodes panel" v-if="searchData.nodes.length">
          <!--{{searchData.nodes}}-->
          <div class="panel-title">
            <div class="panel-name">nodes</div>
            <div class="panel-btn">更多>></div>
          </div>
          {{searchData.nodes}}
        </div>

      </template>

      <div class="noSearchData" v-else>
        没有搜索结果
      </div>
    </div>
  </div>
</template>

<script>
import {SEARCH_MY_CONTACT} from '@m_api/message.js';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      show: false, // 是否显示搜索结果
      keywords: '', // 搜索关键词
      searchData: null // 搜索结果数据
    };
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
    }
  },
  watch: {
    keywords(val) {
      if (!val) {
        this.handleClose();
        this.searchData = null;
      }
    }
  },
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        // 点击弹窗外关闭窗口
        function documentHandler(e) {
          if (el.contains(e.target)) return false;
          if (binding.expression) binding.value(e);
        }

        // Escape 关闭窗口
        function keyboardHandler(e) {
          if (binding.expression && e.key === 'Escape') binding.value(e);
        }

        el.__vueClickOutside__ = documentHandler;
        el.__vueKeyboardHandler__ = keyboardHandler;
        document.addEventListener('click', documentHandler);
        document.addEventListener('keydown', keyboardHandler);
      },
      unbind(el, binding, vnode) {
        document.removeEventListener('click', el.__vueClickOutside__);
        document.removeEventListener('keydown', el.__vueKeyboardHandler__);
      }
    }
  },
  methods: {
    ...mapActions(['ActionSetMessageStore', 'ActionUpdateSessionList']),
    // 关闭搜索结果弹窗
    handleClose(e) {
      this.show = false;       // 关闭弹窗
      this.searchData = null;  // 清除搜索结果
    },

    // 判断搜索结果是否为空
    _isNotEmpty(data) {
      for (let item of Object.values(data)) {
        if (item.length) return true;
      }
      return false;
    },

    // 执行搜索
    doSearch() {
      this.show = true;
      let params = {
        userId: this.loginUserId,
        keyword: this.keywords
      };
      SEARCH_MY_CONTACT(params)
        .then(res => {
          console.log('搜索res：', res);
          this.searchData = null; // 先清空上次的搜索结果
          if (res.data.code === 200 && res.data.data) {
            // 搜索结果不为空时在赋值
            if (this._isNotEmpty(res.data.data)) this.searchData = res.data.data;
          } else {
            this.$message({
              type: 'warning',
              message: res.msg,
              showClose: true
            });
          }
        })
        .catch(err => {
          console.log('搜索err：', err);
        });
    },

    /**
     * 跳转到好友信息页面
     * @param id: 好友的Id
     * @param activeName: 通讯录页面要激活的标签
     */
    redirectContact(id, activeName) {
      debugger;
      this.$router.push({
        path: '/message_page/contact',
        query: {
          id: id,
          activeName: activeName
        }
      });
      this.handleClose(); // 先关闭搜索弹窗
    },

    /**
     * 跳转到好友单聊页面,并设置 sessionActiveItem,然后往 session 列表增加一个条目
     */
    redirectSingleChat(item) {
      this.handleClose(); // 先关闭搜索弹窗
      let sessionItem = {};
      let targetId = '1100_' + item.id;
      sessionItem['miniType'] = 1100;
      sessionItem['targetId'] = targetId;
      sessionItem['online'] = true // 默认每个用户是在线状态
      sessionItem['id'] = item.id;
      sessionItem['name'] = item.trueName;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = item.avatar;
      sessionItem['originData'] = item;

      this.ActionSetMessageStore({ // vuex 设置
        sessionActiveItem: sessionItem,
        miniType: sessionItem.miniType
      });

      this.$router.push({ // 路由跳转
        path: '/message_page/msg',
        query: {
          id: item.id,
          miniType: 1100
        }
      });

      this._updateSessionList(sessionItem);     // 更新session边栏
    },

    /**
     * 跳转到群聊页面
     */
    redirectGroupChat(item) {
      debugger;
      this.handleClose(); // 先关闭搜索弹窗
      let sessionItem = {};
      let targetId = '1101_' + item.groupId;
      sessionItem['miniType'] = 1101;
      sessionItem['targetId'] = targetId;
      sessionItem['id'] = item.groupId;
      sessionItem['name'] = item.text;
      sessionItem['count'] = 0;
      sessionItem['content'] = null;
      sessionItem['sendTime'] = null;
      sessionItem['avatar'] = item.avatar;
      sessionItem['originData'] = item;

      this.ActionSetMessageStore({ // vuex 设置
        sessionActiveItem: sessionItem,
        miniType: 1101, // 1101 群聊,
        receiverData: item
      });

      this.$router.push({ // 路由跳转
        path: '/message_page/msg',
        query: {
          id: item.groupId,
          miniType: 1101
        }
      });

      this._updateSessionList(sessionItem);     // 更新session边栏
    },

    /**
     * 更新session边栏，如果已经存在则清空消息计数，不存在则添加一个session条目
     */
    _updateSessionList(sessionItem) {
      let itemExist = false;
      for (let item of this.messageStore.sessionList) {
        if (item.targetId === sessionItem.targetId) { // 如果已经在队列中了，跳出遍历，直接跳转
          itemExist = true;
          this.ActionUpdateSessionList({
            type: 'update',
            method: 'clearCount',
            data: sessionItem
          });
          break;
        }
      }
      if (!itemExist) { // 如果不存在，则进队列
        let addObj = {
          type: 'addItem', // 可取'addItem','deleteItem','update'
          data: sessionItem
        };
        this.ActionUpdateSessionList(addObj);
      }
    }

  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";
  @import "@ms/variables.scss";

  .SearchBar {
    height: 100%;
  }

  .search-bar {
    position: relative;
    @include flex();
    height: 100%;
    padding: 0 10px;
    align-items: center;

    /deep/ .el-input {
      .el-input__inner {
        height: $sizeInputHeight;
        line-height: $sizeInputHeight;
        background: $colorThemePrimary;
        border: none;
        border-radius: 6px;

        &::placeholder {
          color: $colorText5;
        }
      }

      .img-box {
        margin-right: 8px;
        @include imgBox($width: 16px, $height: 100%)
      }
    }

    .search-bar_right {
      margin-left: 10px;
      cursor: pointer;

      .img-box {
        @include imgBox($width: 30px, $height: 30px, $borderRadius: 50%);
        background-color: $colorThemePrimary;
        @include flex();
        align-items: center;
        justify-content: center;
        color: $colorText5;
        font-size: 20px;
        font-weight: 500;
      }
    }

  }

  .search-result {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    min-height: 100px;
    background-color: #ffffff;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
    white-space: pre-wrap;
    z-index: 9;
  }

  .panel {
    margin-bottom: 10px;

    .panel-title {
      @include flex();
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      font-size: 14px;
      font-weight: 600;
      color: $colorTextBlack6;

      .panel-name {

      }

      .panel-btn {
      }
    }

    .panel-content {
      .content-item {
        position: relative;
        box-sizing: border-box;
        padding: 5px 10px;
        overflow: hidden;
        line-height: 100%;
        font-size: 14px;
        font-weight: 400;
        transition: background-color .3s;

        &:hover {
          background-color: $colorThemePrimary;
        }

        .img-box {
          @include imgBox($width: 30px, $height: 30px, $borderRadius: 50%)
        }

        .item-avatar {
          float: left;
          margin-right: 10px;
          cursor: pointer;
        }

        .item-title {
          @include singleEllipsis();
          max-width: 150px;
          display: inline-block;
          line-height: 30px;
          color: $colorTextBlack6;
        }

        .item-btn {
          float: right;
          line-height: 30px;
          font-size: 12px;
          color: $colorTextBlack3;
          cursor: pointer;
        }
      }

      .content-item__group {
        cursor: pointer;
      }
    }
  }
</style>
