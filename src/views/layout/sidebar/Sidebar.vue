<template>
  <div>
    <div class="logo-contener">
      <img :src="user.company.avatar">
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
      >
        <div class="username" v-if="user.company.id === 121">
          <img :src="user.user.avatar" alt>
          <h3>{{user.user.trueName}}</h3>
          <p>{{user.user.phone}}</p>
        </div>
        <nav-menu :navMenus="leftMenus" v-if="this.leftMenus.length>0"/>
        <!-- 模拟链接 -->
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
    // debugger;
    console.log(this.$refs.submenu);

    findSideBar(this.userId).then(response => {
      // console.log(response.data);
      let data = response.data.data;
      this.leftMenus = data;
      let mapArry = data.map(function(data) {
        return data.code;
      });
      // console.log(mapArry);
      // debugger;
      let me = this;
      // 设个定时器把定时任务做上去,让二级目录数据自动加载
      setTimeout(function() {
        mapArry.forEach(element => {
          me.handleOpen(this.openPid, [element + ""]);
        });
        // debugger;
      }, 600);
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
    }
  },
  watch: {
    openPid(newid) {
      // debugger;
      // console.log(newid);
      this.handleOpen(this.openPid, [newid + ""]);
      this.openeds = [newid + ""];
    },
    activeId(newid) {
      // debugger;
      // console.log(newid);
      this.active = newid + "";
    }
  },
  methods: {
    handleOpen(key, code) {
      let userId = this.userId;
      var clickNodeId = "";
      if (code.length === 1) {
        clickNodeId = userId + "_" + code[0];
      } else {
        clickNodeId = userId + "_" + code[1];
      }

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
        if (code.length === 1) {
          this.fetchData(userId, code[0]);
        } else {
          this.fetchData2(userId, code);
        }
      }
    },
    fetchData(userId, code) {
      findSideBar(userId, code).then(response => {
        // console.log(response.data);
        // console.log(code);

        for (let index = 0; index < this.leftMenus.length; index++) {
          // 匹配哪个children值加进去
          if (this.leftMenus[index].code === code) {
            this.$set(this.leftMenus[index], "children", response.data.data);
          }
        }
        // console.log(this.leftMenus);
      });
    },
    fetchData2(userId, code) {
      findSideBar(userId, code[1]).then(response => {
        let data = response.data.data;
        // console.log(data);
        // console.log(code);
        debugger;
        for (let index = 0; index < this.leftMenus.length; index++) {
          // 匹配哪个children值加进去
          let flag = false;
          if (this.leftMenus[index].code === code[0]) {
            let qoose = this.leftMenus[index].children;
            for (let i = 0; i < qoose.length; i++) {
              if (qoose[i].code === code[1]) {
                debugger;
                console.log(qoose[i].text);
                this.$set(this.leftMenus[index].children[i], "children", data);
                flag = true;
                break;
              }
            }
          }
          if (flag) {
            break;
          }
        }
        // console.log(this.leftMenus);
      });
    }
  }
};
</script>