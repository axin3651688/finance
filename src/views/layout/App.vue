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
    initSocket(authorization) {
      // let url = "ws://192.168.2.237:7006/socket.io/";
      let url = "ws://192.168.2.224:7006/socket.io/";
      // let url = "ws://192.168.1.122:7006/socket.io/";
      // let url = "wss://192.168.1.118:7006/socket.io/";
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