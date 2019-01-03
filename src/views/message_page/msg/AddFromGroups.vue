<template>
  <div class="AddFromFriends">
    <template v-if="addFromGroupsInstance">
      <div class="panel-left">
        <el-scrollbar>
          <el-collapse accordion>
            <el-collapse-item
              v-for="group in addFromGroupsInstance.groupList"
              :key="group.id"
            >
              <template slot="title">
                <div class="item-wrap" @click="group.getMemberList()">
                  <h3 class="item-title">
                    <span>{{group.text}}</span>
                    <span>（{{group.userCount}}人）</span>
                  </h3>
                  <p class="item-info">
                    {{group.info}}
                  </p>
                </div>
              </template>
              <ul class="sub-item" v-if="group.memberList">
                <li v-for="member in group.memberList"
                    :key="member.id"
                    @click="addFromGroupsInstance.changeMemberState(member)"
                >
                  <figure>
                    <div class="img-box">
                      <img :src="member.avatar"/>
                    </div>
                    <div class="info">
                      <h3>{{member.trueName}}</h3>
                      <p>{{member.position}}</p>
                    </div>
                  </figure>
                  <i class="list-icon list-icon__checked" v-if="member.isChecked"></i>
                  <i class="list-icon list-icon__normal" v-else></i>
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </div>
      <div class="panel-right">
        <div class="panel-right-top">
          已添加 <span>{{addFromGroupsInstance.addList | getLength}}</span> 人
        </div>
        <div class="panel-right-content" v-if="addFromGroupsInstance">
          <ul v-if="addFromGroupsInstance.addList.length">
            <li v-for="member in addFromGroupsInstance.addList" :key="member.id">
              <div class="img-box">
                <img :src="member.avatar" alt="">
                <div class="close-cover" @click="addFromGroupsInstance.changeMemberState(member)"></div>
              </div>
              <p class="info">{{member.trueName}}</p>
            </li>
          </ul>
        </div>
        <el-button type="primary" size="medium" class="my-btn" @click="commitAddMembers">添 加</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {ALL_COMPANY_CONTACT_LIST} from '~api/message.js'

// 从团队列表添加成员到群组的类,单例模式
class AddFromGroups {
  constructor(groupList) {
    if (!AddFromGroups.instance) {
      this.groupList = groupList;
      this.addList = [];
      AddFromGroups.instance = this
    }
    return AddFromGroups.instance
  }

  changeMemberState(member) {
    console.log('当前点击的member：', member);
    if (member.isChecked) {
      // 如果本来是 选中状态 就从 addList 中移除
      let index = this.addList.indexOf(member);
      this.addList.splice(index, 1)
    } else {
      // 如果本来是 未选中状态 就添加到 addList 中
      this.addList.push(member)
    }
    // 最后切换member的选中状态
    member.changeCheckState()
  }
}

// 团队类
class Group {
  constructor(groupData) {
    this._init(groupData);
    this.memberList = [];
    this.ajaxMethod = new AjaxMethod()
  }

  _init(obj) {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      this[key] = obj[key]
    })
  }

  getMemberList() {
    // debugger;
    // 这里做一个判断，如果拿到了成员列表，就不再发请求了
    if (!this.memberList.length) {
      let memberList = this.ajaxMethod.getMemberList(this.children);
      this.setMemberList(memberList)
    }
  }

  setMemberList(memberList) { // 给团队设置团队成员（团队成员可能是后发请求获得）
    if (memberList && memberList.length) {
      let newMemberList = [];
      memberList.forEach(member => {
        let newMember = new Member(member);
        newMemberList.push(newMember)
      });
      this.memberList = newMemberList
    }
  }
}

// 团队成员类
class Member {
  constructor(memberData) {
    this._init(memberData);
    this.isChecked = false;
  }

  _init(obj) { // 用传进来的对象初始化一个 member 成员
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

// 团队成员Ajax获取类,单例
class AjaxMethod {
  constructor(httpRequest) {
    if (!AjaxMethod.instance) {
      this.request = httpRequest;
      AjaxMethod.instance = this
    }
    return AjaxMethod.instance
  }

  getMemberList(children) {
    console.log('AjaxMethod 调用了');
    return children
  }
}

export default {
  name: 'AddFromFriends',
  props: ['groupId'],
  data() {
    return {
      companyList: [], // 我的公司列表
      addFromGroupsInstance: null, // 从团队列表添加好友到群组的类实例，单例模式
      groupList: [] // 团队（公司） 列表
    }
  },
  computed: {
    ...mapGetters(['user', 'messageStore']),
    loginUserId() {
      return this.user.user.id;
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
    // 提交添加的群成员
    commitAddMembers() {
      console.log('添加群成员到', this.groupId, this.addFromGroupsInstance.addList)

    },

    // 获取公司列表
    getCompanyList() {
      ALL_COMPANY_CONTACT_LIST(this.loginUserId).then(res => {
        console.log('我公司列表：', res.data);
        if (res.data.code === 200) {
          this.companyList = res.data.data;
          this.getAddFromGroupsInstance(this.companyList)
        }
      })
    },

    getAddFromGroupsInstance(groupList) { // 获取当前窗口实例
      let newGroupList = [];
      groupList.forEach(group => {
        let newGroup = new Group(group);
        newGroupList.push(newGroup)
      });
      this.addFromGroupsInstance =  new AddFromGroups(newGroupList);
      console.log('从团队中添加好友实例：', this.addFromGroupsInstance);
    }
  },
  mounted() {
    // todo: 5添加群成员 from groups
    // this.addFromGroupsInstance = this.getAddFromGroupsInstance(this.groupList);
    // console.log('从团队中添加好友实例：', this.addFromGroupsInstance);
    this.getCompanyList()
  }
}
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .AddFromFriends {
    display: flex;
    height: 100%;
  }

  .panel-left {
    flex: .5;
    height: 100%;
    border-right: 1px solid $colorBorder2;

    /deep/ .el-collapse {
      border: none;
      overflow: hidden;

      .el-collapse-item__header.is-active {
        border-bottom-color: #ebeef5;
      }

      .el-collapse-item__header {
        $itemHeaderHeight: 80px;
        height: $itemHeaderHeight;

        .item-wrap {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 15px 30px;

          h3 {
            line-height: 21px;
            color: $colorText1;
            font-size: 16px;
            font-weight: bold;
          }

          p {
            margin-top: 10px;
            line-height: 20px;
            color: $colorText3;
          }
        }

        .el-collapse-item__arrow {
          line-height: $itemHeaderHeight;
          height: $itemHeaderHeight;
          margin-right: 22px;
        }
      }

      /deep/ .el-collapse-item__content {
        padding-bottom: 0;

        ul.sub-item {
          li {
            position: relative;
            height: 60px;
            padding: 0 30px;
            cursor: pointer;
            transition: all .3s;

            &:hover {
              box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
              border-right-color: $colorTheme;
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
              background: url("../assets/icon/list_icon.svg") no-repeat;
            }

            .list-icon__normal {
              background: url("../assets/icon/group_person_add.svg") no-repeat;
            }
          }

          figure {
            display: flex;
            align-items: center;
            height: 100%;
            border-top: 1px solid $colorBorder2;
            margin-top: -1px;

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
              line-height: 20px;

              h3 {
                height: 19px;
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
    }
  }

  .panel-right {
    flex: .5;
    position: relative;
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
          background: rgba(255, 255, 255, .2) url('../assets/icon/group_person_unselected.svg') no-repeat;
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
      overflow-x: hidden !important;
    }
  }
</style>
