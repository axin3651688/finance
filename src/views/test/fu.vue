<template>
  <div class="page">
    <table border="1" cellspacing="0" width="600px">
      <tr>
        <th colspan="3">父亲的数据</th>
      </tr>
      <tr>
        <td>name</td>
        <td>{{name}}</td>
        <td>
          <input type="text" v-model="name">
        </td>
      </tr>
      <tr>
        <td>age</td>
        <td>{{age}}</td>
        <td>
          <input type="text" v-model="age">
        </td>
      </tr>
    </table>
    <son :fn="name" :fa="age" @childbyvalue="childByValue"></son>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      name: "father",
      age: 20
    };
  },
  components: {
    son: () => import("./son")
  },

  methods: {
    childByValue(childValue) {
      this.name = childValue.cname;
      this.age = childValue.cage;
    }
  },
  created() {
    let that = this;
    debugger;

    this.$bus.$on("sonbyvalue", function(val) {
      //获取页面中数据  绑定
      that.name = val.cname;
      that.age = val.cage;
    });
  }
  //   beforeDestroy() {
  //     this.$bus.off("sonbyvalue", function(val) {
  //       //获取页面中数据  绑定
  //       that.name = val.cname;
  //       that.age = val.cage;
  //     });
  //   }
};
</script>

<style  lang="scss" scoped>
</style>
