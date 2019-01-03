<template>
  <component v-if="flag" :is="`bi-${item.options.type}`" :item="item" class="bgwight"></component>
  <component v-else :is="`bi-div`" :item="item" class="bgwight"></component>
</template>
<script>
import { getConfigModelDatas } from "../utils/math";
export default {
  name: "BiChart",
  components: {
    BiColumn: () => import("@c/charts/BiColumn"),
    BiGauge: () => import("@c/charts/BiGauge"),
    BiLine: () => import("@c/charts/BiLine"),
    BiPie: () => import("@c/charts/BiPie"),
    BiRadar: () => import("@c/charts/BiRadar"),
    BiFunnel: () => import("@c/charts/BiFunnel"),
    BiSPie: () => import("@c/charts/BiSPie"),
    BiAdvancechart: () => import("@c/charts/BiAdvanceChart"),
    BiDiv: () => import("@c/charts/BiDiv")
  },
  props: ["item"],
  data() {
    return {
      flag: true
    };
  },
  created() {
    console.log(this.item.options.type);

    this.upData();
  },
  methods: {
    upData(from) {
      let config = this.item.options.getData;
      if (!config || !config.type) {
        console.error(this.item.text + "没有配制正确！");
        return;
      }
      if (config.type === 2) {
        // debugger;
      }
      let tempData = getConfigModelDatas(
        config,
        this.item.datas,
        this.item.config.rows,
        this.item.config.columns
      );
      this.item.options.datas = tempData;
      this.$set(this, "item", this.item);
      this.$set(this.item.options, "datas", tempData);
      let children = this.$children;
      if (from && children && children.length > 0 && children[0].upData) {
        children[0].upData(this.item);
      }
      //判断为零时的渲染状态。
      if (this.item.watchState) {
        this.setFlagState();
      }
    },
    setFlagState() {
      if (this.item.datas && this.item.datas.length > 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },
  watch: {
    // tempData(newName, oldName) {
    //   console.log(newName);
    //    this.item.options.datas = this.tempData;
    //   console.log("111111");
    // }
    flag: function(val) {
      return this.flag;
    },
    item: {
      handler(newName, oldName) {
        console.log(1);
        //
      },
      deep: true
    }
  }
};
</script>

<style lang='scss' scoped>
.tjspChartStyle {
  margin-bottom: 24px;
  background: #fff;
  //圆角 阴影
  border-radius: 20px;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.1);
}
.bgwight {
  margin-bottom: 24px;
  background: #fff;
  //圆角 阴影
  // border-radius: 20px;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>