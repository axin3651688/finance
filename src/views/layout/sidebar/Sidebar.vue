<template>
  <div>
    <div class="logo-contener">
      <img :src="user.company.avatar">
    </div>
    <el-scrollbar style="flex:1;">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        :default-openeds="openeds"
        :default-active="active"
        class="leftmemu"
        unique-opened
      >
        <nav-menu :navMenus="leftMenus" v-if="this.leftMenus.length>0"/>
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

export default {
  name: "Leftmenu",
  created() {
    findSideBar(this.userId).then(response => {
      let data = response.data.data;
      this.leftMenus = data;
      this.auotoAdd(data);
    });
  },
  components: {
    NavMenu
  },

  data() {
    return {
      openeds: [],
      active: "",
      userId: this.$store.getters.user.user.id,
      leftMenus: [],
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
    }
  },
  watch: {
    openPid(newid) {
      // debugger;
      this.openeds = [newid + ""];
    },
    activeId(newid) {
      // debugger;
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
    /**
     * 加载数据
     * @param  userId   用户id
     * @param  code     编码
     */
    fetchData(userId, code) {
      findSideBar(userId, code).then(response => {
        let data = response.data.data;
        // console.log(data);

        data.forEach(ele => {
          // console.log(this.nodes);
          if (ele.leaf == 0) {
            this.fetchData(userId, ele.code);
          }
        });
        this.setTreeNodeChildren(null, code, data);
      });
    },
    auotoAdd(data) {
      let mapArry = data.map(function(data) {
        return data.code;
      });
      // 设个定时器把定时任务做上去, 让二级目录数据自动加载;
      let me = this;

      setTimeout(function() {
        mapArry.forEach(element => {
          debugger;
          me.fetchData(me.userId, element);
        });
      }, 600);
    }
  }
};
</script>