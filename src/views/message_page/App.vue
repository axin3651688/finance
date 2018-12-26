<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import webSocket from "utils/webSocket";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    initSocket(authorization) {
      // let url = "ws://192.168.2.2:7008/socket.io/";
      let url = "ws://192.168.1.118:7006/socket.io/";
      // let url = "ws://192.168.1.118:7006/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      }
      // debugger;
      webSocket({ url: url });
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
