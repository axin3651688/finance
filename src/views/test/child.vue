<template>
  <div class="page">
    <bi-column></bi-column>
    <bi-pie v-if="itemqq.length" :item="itemqq"></bi-pie>
    <echarts :item="itemData"></echarts>
    <el-button type="primary" @click="update">主要按钮</el-button>
    <el-button type="primary" @click="sendMsgToParent">子向父传值按钮</el-button>child
  </div>
</template>

<script type="text/ecmascript-6">
import BiColumn from "@v/test/BiColumn";
import BiPie from "@c/charts/BiPie.vue";
import echarts from "./echarts";

export default {
  name: "",
  data() {
    return {
      child: "我是child",
      itemChild: {
        options: {
          type: "bi-gauge",
          datas: [["本期", "累计"], [333, 333]]
        },
        data: {
          id: 1,
          name: "123"
        }
      },
      itemData: {},
      itemqq: []
    };
  },
  props: ["item"],
  components: {
    BiColumn,
    BiPie,
    echarts
  },
  created() {
    this.itemData = this.item;
    this.add();
  },
  methods: {
    add() {
      this.axios.get("/api/Risk").then(response => {
        this.itemqq = response.data.content;

        console.log(response.data);
      });
    },
    sendMsgToParent() {
      this.$emit("click", "this message is from child");
    },
    update() {
      alert("111");
      // this.itemData.options.datas = [["本期", "累计"], [1000, 1000]];

      this.itemData = this.itemChild;
      // console.log(this.itemData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>