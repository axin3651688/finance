<template>
  <div>father
    <child @click="getmsg" :item="item"></child>
  </div>
</template>

<script type="text/ecmascript-6">
import child from "./child";
export default {
  name: "",
  data() {
    return {
      faher: "我是father",
      item: {
        options: {
          type: "bi-gauge",
          datas: [["本期", "累计"], [2025, 54600]]
        },
        data: { id: 1, name: "123" }
      }
    };
  },
  components: { child },
  created() {
    this.update();
  },
  methods: {
    getmsg(e) {
      debugger;
      console.log("我是父组件" + e);
    },
    update() {
      this.item.options.datas = [["本期", "累计"], [2025, 5460]];
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
