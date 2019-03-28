<template>
  <div>
    <div class="logo-contener">
      <!-- <img :src="user.company.avatar"> -->
      <img src="http://jiaxin365.cn/images/tjsp.svg">
    </div>
    <el-scrollbar style="flex:1;">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        @open="handleOpen"
        :default-openeds="openeds"
        :default-active="active"
        class="leftmemu"
        unique-opened
        ref="leftMenu"
      >
      <!-- v-if="user.company.id === 121" -->
      <div class="username" v-if="true">
          <!-- <img :src="user.user.avatar" alt/> -->
          <img :src="user.user.avatar" alt/>
          <h3>{{user.user.trueName}}</h3>
          <p>{{user.user.phone}}</p>
        </div>
        <nav-menu :navMenus="leftMenus" :state="isCollapse" v-if="flagSide"/>
        <!-- 模拟链接 -->
        <!--
        <el-submenu index="123">
          <span slot="title">各种chart图表</span>
          <el-menu-item v-for="item of chartData" :index="item.id" :key="item.id">
            <template slot="title">
              <router-link :to="item.p">
                <span>{{item.n}}</span>
              </router-link>
            </template>
          </el-menu-item>
        </el-submenu>
        -->
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { findSideBar } from "~api/interface.js";
import NavMenu from "./NavMenu.vue";
//
export default {
  name: "Leftmenu",
  created() {
    // let num = 247;
    //头像图片的地址。
    let userCng = this.$store.getters.user.user;
    this.avarUrl = userCng.avarUrl? userCng.avarUrl:userCng.avatar;
    let num = this.$store.getters.user.user.roleId;
    findSideBar(num).then(response => {
      let data = response.data.data;
      //排序 这个本是sql来处理的，但是没有，所以在此加一个自己的排序。
      if(data && data.length > 0 && data[1].sort){
        this.sortBySsort(data,"sort");
      }
      this.leftMenus = data;
      this.auotoAdd(data);
    });
  },
  mounted() {
    //缓存中的侧边栏的内容。
    let siderState = JSON.parse(localStorage.siderState);
    if(siderState){
      document.title = siderState.text;
      this.openeds = [siderState.pid + ""];
      this.active = siderState.code;
      // this.$refs.leftMenu.open(siderState.pid);
      // this.handleOpen(siderState.code,[siderState.pid + ""])
    }
  },
  components: {
    NavMenu
  },

  data() {
    return {
      //头像的地址
      avarUrl:"",
      openeds: [],
      active: "",
      // userId: this.$store.getters.user.user.id,
      userId: this.$store.getters.user.user.roleId,
      leftMenus: [],
      nodes: [],
      clickNodeId: "",
      chartData: [
        { p: "/BiFunnel", n: " 漏斗图", id: "5" },
        { p: "/BiRadar", n: " 雷达图", id: "6" },
        { p: "/BiTreemap", n: " 矩形树图", id: "8" }
      ]
    };
  },
  computed: {
    ...mapGetters(["sidebar", "user", "openPid", "activeId"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    flagSide() {
      return !Cnbi.isEmpty(this.leftMenus);
    }
  },
  watch: {
    // openPid(newid) {
    //   debugger;
    // //   
    // //   console.log(newid);
    //   this.handleOpen(this.openPid, [newid + ""]);
    //   // this.openeds = [newid + ""];
    // },
    activeId(newid) {
      debugger;
      this.active = newid + "";
    }
  },
  methods: {
    /**
     * 递归设置节点的孩子
     * @param  nodes   所有节点
     * @param  nodeId   节点编码
     * @param  children  节点的孩子
     */
    setTreeNodeChildren(nodes, nodeId, children) {
      if (!children) return;
      if (!nodes) nodes = this.leftMenus;
      nodes.forEach(node => {
        if (node.code == nodeId) {
          node.children = children;
        } else if (node.leaf == 0) {
          this.setTreeNodeChildren(node.children, nodeId, children);
        }
      });
    },
    sortBySsort(array, key) {
      return array.sort((a, b) => {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      })
    },
    handleOpen(key, code) {
      debugger;
      let userId = this.userId;
      var clickNodeId = "";
      clickNodeId = userId + "_" + code[0];
      var flag = false;
      // 只要侧边栏被点开请求过一次,那么下次就不再发送请求
      // 如果在数组中,找到相同的clickNodeId,那么标记改为真
      for (let index = 0; index < this.nodes.length; index++) {
        if (this.nodes[index] === clickNodeId) {
          flag = true;
          break;
        }
      }
      this.nodes.push(clickNodeId);
      if (!flag) {
        // console.log(code);
        this.fetchData(userId, code, this.leftMenus);
        // console.log(this.leftMenus);
      }else {
        // this.openNodeOfBefore();
      }

    },
    /**
     * 菜单节点收起的回调。
     */
    handleClose (index,indexPath) {
      let me = this;
    },
    /**
     * 展开之前的菜单节点 2019年3月28日11:01:14 szc
     */
    openNodeOfBefore () {
      let siderState = JSON.parse(localStorage.siderState);
      if(siderState){
        this.openeds = [siderState.pid + ""];
        this.active = siderState.code;
      }
    },
    /**
     * 加载数据
     * @param  userId   用户id
     * @param  code     编码
     */
    fetchData(userId, code) {
      findSideBar(userId, code[0]).then(response => {
        debugger;
        let data = response.data.data;
        data.forEach(ele => {
          if (ele.leaf == 0) {
            this.handleOpen(null, [ele.code]);
          }
        });
        this.setTreeNodeChildren(null, code[0], data);
      });
    },
    auotoAdd(data) {
      let mapArry = data.map(function(data) {
        return data.code;
      });
      let me = this;
      // 设个定时器把定时任务做上去, 让二级目录数据自动加载;
      setTimeout(function() {
        mapArry.forEach(element => {
          me.handleOpen(me.openPid, [element + ""]);
        });
      }, 600);
    }
  }
};
</script>