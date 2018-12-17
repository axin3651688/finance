<template>
  <div>
    <div class="logo-contener">
      <img :src="user.company.avatar">
    </div>
    <el-scrollbar style="flex:1;">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        ref="leftmenu"
        @open="handleOpen"
        :default-openeds="openeds"
        :default-active="active"
        class="leftmemu"
        unique-opened
      >
        <div class="username" v-if="user.company.id === 121">
          <img :src="user.avatar" alt>
          <h3>{{user.user.trueName}}</h3>
          <p>{{user.user.phone}}</p>
        </div>
        <template v-for="item in listItemOne">
          <el-submenu v-if="item.children" :index="item.code" :key="item.code">
            <template slot="title">
              <img :src="item.avatar" alt class="avatarleft fa-margin iconfont">
              <!-- <i class="fa fa-margin fa-server"></i> -->
              <!-- <i class="iconfont fa-margin">&#xe664;</i> -->
              <router-link :to="item.url">
                <span class="eachItem">{{item.text}}</span>
              </router-link>
            </template>
            <el-menu-item
              v-if="item.children"
              v-for="(child,seq) in item.children"
              :index="child.code"
              :key="seq"
              @click="handleclick(child)"
            >
              <template slot="title">
                <span>{{child.text}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </template>
        <!-- 模拟链接 -->
        <!-- <el-submenu index="123">
            <span slot="title">各种chart图表</span>
            <el-menu-item v-for="item of chartData" :index="item.id" :key="item.id">
              <template slot="title">
                <router-link :to="item.p">
                  <span>{{item.n}}</span>
                </router-link>
              </template>
            </el-menu-item>
        </el-submenu>-->
        <el-submenu index="123">
          <span slot="title">消息</span>
          <el-menu-item index="45456">
            <router-link to="/message">
              <span>消息</span>
            </router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { findSideBar } from "~api/interface.js";
import avatajson from "@a/icons/awata.json";
import modeHandle from "utils/modeHandle";
export default {
  name: "Leftmenu",
  created() {
    // debugger;
    findSideBar(this.userId).then(response => {
      // console.log(response.data);
      let data = response.data.data;
      this.listItemOne = data;
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
  mounted() {},
  data() {
    return {
      openeds: [],
      active: "",
      userId: this.$store.getters.user.user.id,
      listItemOne: [],
      nodes: [],
      clickNodeId: "",
      dataPath: ["/module?jsnk-zbfx", "/Risk", "/center"],
      chartData: [
        { p: "/BiArea", n: " 面积图", id: "1" },
        { p: "/BiBar", n: " 柱图(横)", id: "2" },
        { p: "/BiMSCloumnLine", n: " 柱线混合图", id: "3" },
        { p: "/BiPieLuntai", n: " 轮胎图", id: "4" },
        { p: "/BiFunnel", n: " 漏斗图", id: "5" },
        { p: "/BiRadar", n: " 雷达图", id: "6" },
        { p: "/BiRosepie", n: " 玫瑰饼图", id: "7" },
        { p: "/BiTreemap", n: " 矩形树图", id: "8" },
        { p: "/BiRosepie", n: " 玫瑰饼图", id: "9" }
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
      console.log(newid);
      this.handleOpen(this.openPid, [newid + ""]);
      this.openeds = [newid + ""];
    },
    activeId(newid) {
      // debugger;
      console.log(newid);
      this.active = newid + "";
    }
  },
  methods: {
    ...mapActions(["GetSideMid"]),
    handleclick(e) {
      console.log(e);
      modeHandle(e);
      // this.$router.push({ path: "/module" });
    },

    handleOpen(key, keyPath) {
      // debugger;
      // console.log(keyPath);
      this.fetchData(this.userId, keyPath[0]);
    },

    fetchData(userId, code) {
      var clickNodeId = userId + "_" + code;
      var flag = false;
      // 只要侧边栏被点开请求过一次,那么下次就不再发送请求11
      // 如果在数组中,找到相同的clickNodeId,那么标记改为真
      for (let index = 0; index < this.nodes.length; index++) {
        if (this.nodes[index] === clickNodeId) {
          flag = true;
          break;
        }
      }
      // debugger;
      if (!flag) {
        findSideBar(userId, code).then(response => {
          this.nodes.push(clickNodeId);
          if (Number(code) < 9999) {
            // console.log(code);
            // console.log(this.nodes);
            for (let index = 0; index < this.listItemOne.length; index++) {
              // 匹配哪个children值加进去
              if (this.listItemOne[index].code === code) {
                this.$set(
                  this.listItemOne[index],
                  "children",
                  response.data.data
                );
              }
            }
            // console.log(this.listItemOne);
          } else console.log(code);
        });
      }
    }
  }
};
</script>