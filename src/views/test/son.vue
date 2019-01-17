<template>
  <div>
    <button @click="change">子传父</button>
    <table border="1" cellspacing="0" width="600px">
      <tr>
        <th colspan="3">儿子的数据</th>
      </tr>
      <tr>
        <td>Myname</td>
        <td>{{cn}}</td>
        <td>
          <input type="text" v-model="cn">
        </td>
      </tr>
      <tr>
        <td>Myage</td>
        <td>{{ca}}</td>
        <td>
          <input type="text" v-model="ca">
        </td>
      </tr>
    </table>
    <sun :sn="cn" :sa="ca"></sun>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["fn", "fa"], //接收数据
  data() {
    //每接收一个，返回一次，时时更新
    return {
      cn: this.fn,
      ca: this.fa
    };
  },
  watch: {
    //监听 数据改变
    fn() {
      this.cn = this.fn;
    },
    fa() {
      this.ca = this.fa;
    }
  },
  methods: {
    change() {
      let obj = {
        //数据写入对象
        cname: this.cn,
        cage: this.ca
      };
      this.$emit("childbyvalue", obj); //触发    发送数据
    }
  },
  components: {
    sun: () => import("./sun")
  }
};
</script>

<style  lang="scss" scoped>
</style>
