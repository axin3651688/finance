<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import webSocket from '@mu/webSocket';
import {getClientParams} from '@mu/index';

export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    ...mapActions(['GettRreeInfo']),
    readLocalStorage() {
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      // alert('readLocalStorage');
      if (localStorage.authorization) {
        // 有 authorization 已经登陆的
        // alert('有 authorization: ' + localStorage.authorization);
        this.initSocket(localStorage.authorization); // 如果有 authorization，则建立socket连接

        // token存储到vuex中
        this.$store.dispatch(
          'setIsAutnenticated',
          !Cnbi.isEmpty(localStorage.authorization)
        );
        // 由于localStorage只能存字符串,需转json
        this.$store.dispatch('setUser', JSON.parse(localStorage.database));
        // 假如用户是新用户或被清理了缓存,不执行以下语句
        var vd = {};
        Object.keys(localStorage).forEach(keys => {
          var a = localStorage[keys];
          if (!Cnbi.isEmpty(a) && keys.indexOf('_cache') > -1) {
            var b = keys.replace('_cache', '');
            b == 'conversion' ? (vd[b] = JSON.parse(a)) : (vd[b] = a);
          }
        });
        if (!Cnbi.isEmpty(localStorage.treeInfo)) {
          this.GettRreeInfo(JSON.parse(localStorage.treeInfo));
        }

        // electron 窗口处理
        if (window.require) {
          var ipc = window.require('electron').ipcRenderer;
        }
        if (window.require) {
          ipc.send('web_autoLogin', '');
        }
      } else {
        // 没有 authorization 没有登陆
      }
    },
    initSocket(authorization) {
      // let url = 'ws://192.168.2.224:7006/socket.io/';
      let url = 'ws://192.168.1.118:7006/socket.io/';
      if (authorization != null) {
        url = url + '?Authorization=' + authorization;
      } else {
        // url = url + "?device=" + Cnbi.getDevice();
      }
      // debugger;
      webSocket({url: url});
    }
  },
  created() {
    // debugger;

    // localStorage.removeItem("authorization"); // 暂时先清掉
    this.readLocalStorage();
    let bean = getClientParams();
    let authorization = bean.authorization || bean.tikct || bean.token;
    if (!authorization) {
      authorization = localStorage.getItem('authorization');
    }
    this.initSocket(authorization);
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/variables.scss";

  #app {
    font-family: $fontFamilyMain;
    background: #ffffff;
    overflow: hidden;
    /*box-sizing: border-box;*/
    border: 1px solid #333333;
  }
</style>
