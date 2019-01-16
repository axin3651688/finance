<template>
  <div class="AddFromFriends vue-module" v-if="addFromFriendsInstance">
    <div class="panel-left">
      <el-scrollbar>
        <ul class="sub-item">
          <li v-for="friend in addFromFriendsInstance.friendList"
              :key="friend.id"
              @click="addFromFriendsInstance.changeFriendState(friend)"
          >
            <figure>
              <div class="img-box">
                <img :src="friend.avatar"/>
              </div>
              <div class="info">
                <h3>{{friend.trueName}}</h3>
                <p>{{friend.phone}}</p>
              </div>
            </figure>
            <i class="list-icon list-icon__checked" v-if="friend.isChecked"></i>
            <i class="list-icon list-icon__normal" v-else></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="panel-right">
      <div class="panel-right-top">
        已添加 <span>{{addFromFriendsInstance.addList | getLength}}</span> 人
      </div>
      <div class="panel-right-content">
        <ul>
          <li v-for="friend in addFromFriendsInstance.addList" :key="friend.id">
            <div class="img-box">
              <img :src="friend.avatar" alt="">
              <div class="close-cover" @click="addFromFriendsInstance.changeFriendState(friend)"></div>
            </div>
            <p class="info">{{friend.trueName}}</p>
          </li>
        </ul>
      </div>
      <el-button type="primary" size="medium" class="my-btn">添 加</el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {
  requestMyfriends,
  CONTACT_INFO
} from '~api/message.js'

// 从好友列表添加成员到群组的类,单例模式
class AddFromFriends {
  constructor(friendList) {
    if (!AddFromFriends.instance) {
      this.friendList = friendList;
      this.addList = [];
      AddFromFriends.instance = this
    }
    return AddFromFriends.instance
  }

  changeFriendState(friend) {
    if (friend.isChecked) {
      // 如果本来是 选中状态 就从 addList 中移除
      let index = this.addList.indexOf(friend);
      this.addList.splice(index, 1)
    } else {
      // 如果本来是 未选中状态 就添加到 addList 中
      this.addList.push(friend)
    }
    // 最后切换friend的选中状态
    friend.changeCheckState()
  }

  moveToAddList(friend) {
    friend.changeCheckState();
    this.addList.push(friend)
  }

  removeFromAddList(friend) {
    let index = this.addList.indexOf(friend);
    this.addList.splice(index, 1);
    friend.changeCheckState();
  }
}

// 好友类
class Friend {
  constructor(obj) {
    this._init(obj)
  }

  _init(obj) { // 用传进来的对象初始化一个Friend
    // debugger;
    let keys = Object.keys(obj);
    keys.forEach(key => {
      this[key] = obj[key]
    });
  }

  changeCheckState() { // 切换选择状态
    this.isChecked = !this.isChecked;
    console.log(`${this.name}的选中状态：${this.isChecked}`)
  }
}

export default {
  name: 'AddFromFriends',
  data() {
    return {
      friendList: [],
      addFromFriendsInstance: null // 从好友列表添加好友到群组的类实例，单例模式
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id
    }
  },
  filters: {
    getLength(data) { // 得到一个对象或数组的长度
      let length = 0;
      if (data instanceof Array) {
        length = data.length
      } else if (data instanceof Object) {
        length = Object.keys(data).length
      }
      return length
    }
  },
  methods: {
    getFriendList() {
      // let userId = this.user.user.id;
      // alert(params.type)
      requestMyfriends(this.loginUserId).then(res => {
        console.log('获取我的好友列表-->>', res.data);
        if (res.data.code === 200) {
          this.friendList = res.data.data;
          let formatFriendList = this.formatFriendList(this.friendList);
          this.addFromFriendsInstance = new AddFromFriends(formatFriendList); // 实例化一个从好友中添加群组成员的对象
          console.log('addFromFriendsInstance:', this.addFromFriendsInstance)
        }
      })
    },

    // 将请求回来的好友列表遍历一遍，增加一个 isChecked 字段，用于判断它有没有被选中
    formatFriendList(friendList) {
      // debugger;
      if (!friendList.length) return friendList; // 如果是空数组直接return
      let newList = [];
      friendList.forEach(friend => {
        friend['isChecked'] = false;
        let friendInstance = new Friend(friend); // 用好友信息实例化一个好友实例
        newList.push(friendInstance)
      });
      return newList
    }
  },
  mounted() {
    // todo: 5添加群成员 from friends
    this.getFriendList()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/message/variables.scss";

  .AddFromFriends {
    display: flex;
    height: 100%;
  }

  .panel-left {
    flex: .5;
    height: 100%;
    border-right: 1px solid $colorBorder2;

    ul.sub-item {
      li {
        position: relative;
        height: 60px;
        padding: 0 30px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
        }

        .list-icon {
          position: absolute;
          width: 24px;
          height: 24px;
          right: 24px;
          top: 50%;
          background-size: 24px 24px;
          transform: translateY(-50%);
        }

        .list-icon__checked {
          background: url("../../assets/green/list_icon.svg") no-repeat;
        }

        .list-icon__normal {
          background: url("../../assets/green/group_person_add.svg") no-repeat;
        }
      }

      figure {
        display: flex;
        align-items: center;
        height: 100%;
        border-bottom: 1px solid $colorBorder2;

        .img-box {
          width: 40px;
          height: 40px;
          overflow: hidden;
          margin-right: 20px;
          border-radius: 8px;
          background: $colorTheme;
        }

        .info {
          font-family: $fontFamilyMain;
          font-weight: 400;
          line-height: 18px;

          h3 {
            font-size: 14px;
            color: $colorText1;
          }

          p {
            height: 16px;
            font-size: 12px;
            color: $colorText5;
          }
        }
      }
    }
  }

  .panel-right {
    position: relative;
    flex: .5;
    box-sizing: border-box;
    border-left: 1px solid $colorBorder2;
    margin-left: -1px;

    .panel-right-top {
      margin-top: 30px;
      margin-left: 20px;
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: $colorText3;
    }

    .panel-right-content {
      height: calc(100% - 140px);

      li {
        float: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 19px;
        cursor: pointer;

        &:hover {
          .close-cover {
            opacity: 1;
          }
        }
      }

      .img-box {
        $itemSize: 40px;
        position: relative;
        width: $itemSize;
        height: $itemSize;
        margin-bottom: 10px;
        overflow: hidden;
        border-radius: 12px;
        background: #e5e5e5;

        img, .close-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .close-cover {
          opacity: 0;
          background: rgba(255, 255, 255, .2) url('../../assets/green/group_person_unselected.svg') no-repeat;
          background-size: $itemSize $itemSize;
          transition: all .3s;
        }
      }
    }

    .my-btn {
      position: absolute;
      bottom: 40px;
      right: 40px;
      border: none;
      background: $colorTheme;
    }
  }

  /deep/ .el-scrollbar {
    height: 100%;

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
