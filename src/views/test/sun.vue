<template>
  <div>
    <button @click="sonchange">孙子传父</button>
    <table border="1" cellspacing="0" width="600px">
      <tr>
        <th colspan="3">孙子的数据</th>
      </tr>
      <tr>
        <td>Myname</td>
        <td>{{wn}}</td>
        <td>
          <input type="text" v-model="wn">
        </td>
      </tr>
      <tr>
        <td>Myage</td>
        <td>{{wa}}</td>
        <td>
          <input type="text" v-model="wa">
        </td>
      </tr>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["sn", "sa"], //接收数据
  template: "#son",
  methods: {
    sonchange() {
      let obj1 = {
        //数据写入对象
        cname: this.wn,
        cage: this.wa
      };
      this.$bus.emit("sonbyvalue", obj1); //触发    发送数据
    }
  },

  data: function() {
    //时时更新接收数据
    return {
      wn: this.sn,
      wa: this.sa
    };
  },
  watch: {
    //监听 数据改变
    sn: function() {
      this.wn = this.sn;
    },
    sa: function() {
      this.wa = this.sa;
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
