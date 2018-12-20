<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import webSocket from "../../utils/webSocket";
export default {
  name: "app",
  created() {
    this.readLocalStorage();
    let authorization = localStorage.getItem("authorization");
    this.initSocket(authorization);
  },
  methods: {
    ...mapActions(["GetSideMid"]),
    readLocalStorage() {
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      if (localStorage.authorization) {
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
          this.GetSideMid({ year: localStorage.year_cache });
        }
        if (!this.isEmpty(localStorage.month_cache)) {
          this.GetSideMid({ month: localStorage.month_cache });
        }
        if (!this.isEmpty(localStorage.module_cache)) {
          this.GetSideMid({ module: localStorage.module_cache });
        }
      }
    },
    initSocket(authorization) {
      let url = "ws://192.168.1.118:7006/socket.io/";
     // let url = "ws://192.168.1.139:7006/socket.io/";
      if (null != authorization) {
        url = url + "?Authorization=" + authorization;
      }
      // debugger;
      webSocket({ url: url });
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
}
</style>