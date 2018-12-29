<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import "@ms/index.scss"; // global css
import {mapActions} from "vuex";
import webSocket from "utils/webSocket";

export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GetSideMid", "GettRreeInfo"]),
    readLocalStorage() {
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      if (localStorage.authorization) {
        // 有 authorization 已经登陆的
        if (window.require) {
          var ipc = window.require('electron').ipcRenderer
        }
        if (window.require) {
          ipc.send('web_autoLogin', '')
        }

        // token存储到vuex中
        this.$store.dispatch(
          "setIsAutnenticated",
          !this.isEmpty(localStorage.authorization)
        );
        // 由于localStorage只能存字符串,需转json
        this.$store.dispatch("setUser", JSON.parse(localStorage.database));
        // this.$store.dispatch("GET_YEAR", JSON.parse(localStorage.year_cache));这句话不知为什么不起作用?
        // 假如用户是新用户或被清理了缓存,不执行以下语句

        if (!this.isEmpty(localStorage.company_cache)) {
          // debugger;
          this.GetSideMid({
            company: localStorage.company_cache,
            companyName: localStorage.companyName_cache
          });
        }
        if (!this.isEmpty(localStorage.year_cache)) {
          // debugger;
          this.GetSideMid({year: localStorage.year_cache});
        }
        if (!this.isEmpty(localStorage.month_cache)) {
          this.GetSideMid({month: localStorage.month_cache});
        }
        if (!this.isEmpty(localStorage.date_cache)) {
          this.GetSideMid({date: localStorage.date_cache});
        }
        if (!this.isEmpty(localStorage.module_cache)) {
          this.GetSideMid({module: localStorage.module_cache});
        }
        if (!this.isEmpty(localStorage.treeInfo)) {
          this.GettRreeInfo(JSON.parse(localStorage.treeInfo));
        }
      } else {
        // 没有 authorization 没有登陆
      }
    },
    initSocket(authorization) {
      // let url = "ws://192.168.2.2:7008/socket.io/";
      let url = "ws://192.168.2.237:7006/socket.io/";
      // let url = "ws://192.168.1.139:7006/socket.io/";
      // let url = "ws://192.168.2.2:7006/socket.io/";
      // let url = "ws://192.168.1.118:7006/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      }
      // debugger;
      webSocket({url: url});
    }
  },
  created() {
    // debugger;
    this.readLocalStorage();
    let authorization = localStorage.getItem("authorization");
    this.initSocket(authorization);
  },
};
</script>

<style>
  html {
    overflow: hidden;
  }
  body {
    overflow: hidden;
  }
</style>
<style lang="scss" scoped>
  @import "@ms/variables.scss";

  #app {
    font-family: $fontFamilyMain;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #333333;
    // margin: -1px;
    /*box-shadow:#999 0px 0px 10px;*/
    /*margin: 10px;*/
  }
</style>
