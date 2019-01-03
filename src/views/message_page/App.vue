<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import "@ms/index.scss"; // global css
import { mapActions } from "vuex";
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
          var ipc = window.require("electron").ipcRenderer;
        }
        if (window.require) {
          ipc.send("web_autoLogin", "");
        }

        // token存储到vuex中
        this.$store.dispatch(
          "setIsAutnenticated",
          !Cnbi.isEmpty(localStorage.authorization)
        );
        // 由于localStorage只能存字符串,需转json
        this.$store.dispatch("setUser", JSON.parse(localStorage.database));
        // this.$store.dispatch("GET_YEAR", JSON.parse(localStorage.year_cache));这句话不知为什么不起作用?
        var vd = {};
        Object.keys(localStorage).forEach(keys => {
          var a = localStorage[keys];
          if (!Cnbi.isEmpty(a) && keys.indexOf("_cache") > -1) {
            var b = keys.replace("_cache", "");
            vd[b] = a;
          }
        });
        this.GetSideMid(vd);
        if (!Cnbi.isEmpty(localStorage.treeInfo)) {
          this.GettRreeInfo(JSON.parse(localStorage.treeInfo));
        }
      } else {
        // 没有 authorization 没有登陆
      }
    },
    initSocket(authorization) {
      // let url = "ws://192.168.2.2:7008/socket.io/";
      // let url = "ws://192.168.2.224:7006/socket.io/";
      // let url = "ws://192.168.1.118:7006/socket.io/";
      let url = "wss://192.168.1.118:8441/socket.io/";
      // let url = "ws://192.168.1.139:7006/socket.io/";
      // let url = "ws://192.168.2.2:7006/socket.io/";
      // let url = "ws://192.168.1.118:7006/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      }
      // debugger;
      webSocket({ url: url });
    }
  },
  created() {
    // debugger;
    this.readLocalStorage();
    let authorization = localStorage.getItem("authorization");
    this.initSocket(authorization);
  }
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
