<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import webSocket from "utils/webSocket";
import { getClientParams } from "utils/index";
export default {
  name: "app",
  created() {
    //debugger;
    this.readLocalStorage();
    let bean = getClientParams();
    let authorization = bean.authorization || bean.tikct || bean.token;
    if (!authorization) {
      authorization = localStorage.getItem("authorization");
    } else {
      //alert("-----------------从地址中取行了：" + authorization);
      //暂时
      return;
    }
    // debugger;
    this.initSocket(authorization);
  },
  methods: {
    ...mapActions(["GetSideMid", "GettRreeInfo"]),
    readLocalStorage() {
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      if (localStorage.authorization) {
        // token存储到vuex中
        this.$store.dispatch(
          "setIsAutnenticated",
          !Cnbi.isEmpty(localStorage.authorization)
        );
        // 由于localStorage只能存字符串,需转json
        this.$store.dispatch("setUser", JSON.parse(localStorage.database));
        // 假如用户是新用户或被清理了缓存,不执行以下语句
        var vd = {};
        Object.keys(localStorage).forEach(keys => {
          var a = localStorage[keys];
          if (!Cnbi.isEmpty(a) && keys.indexOf("_cache") > -1) {
            var b = keys.replace("_cache", "");
            b == "conversion" ? (vd[b] = JSON.parse(a)) : (vd[b] = a);
          }
        });
        this.GetSideMid(vd);
        if (!Cnbi.isEmpty(localStorage.treeInfo)) {
          this.GettRreeInfo(JSON.parse(localStorage.treeInfo));
        }
      }
    },
    initSocket(authorization) {
      // let url = "ws://192.168.2.237:7006/socket.io/";
      let url = "ws://192.168.2.224:7006/socket.io/";
      // let url = "ws://192.168.1.122:7006/socket.io/";
      // let url = "wss://192.168.1.118:8441/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      } else {
        url = url + "?device=" + Cnbi.getDevice();
      }
      // debugger;
      webSocket({ url: url });
    },
    destroyed: function() {
      console.log("我已经离开了！");
    }
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>