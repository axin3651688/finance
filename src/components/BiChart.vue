<template>
  <component :is="`bi-${item.options.type}`" :item="item" class="bgwight"></component>
  <!-- <bi-column v-if="item.options.type === 'column'" :item="item" class="bgwight"></bi-column>
  <bi-gauge v-else-if="item.options.type === 'gauge'" :item="item" class="bgwight"></bi-gauge>
  <bi-pie v-else-if="item.options.type === 'pie'" :item="item" class="bgwight"></bi-pie>
  <bi-line v-else-if="item.options.type === 'line'" :item="item" class="bgwight"></bi-line>
  <bi-radar v-else-if="item.options.type === 'radar'" :item="item" class="bgwight"></bi-radar>
  <bi-bar v-else-if="item.options.type === 'bar'" :item="item" class="bgwight"></bi-bar>
  <bi-funnel v-else-if="item.options.type === 'funnel'" :item="item" class="bgwight"></bi-funnel>
  <BiSPie v-else-if="item.options.type === 'spie'" :item="item" class="bgwight"></BiSPie>
  <bi-advancechart v-else-if="item.options.type === 'advancechart'" :item="item" class="bgwight"></bi-advancechart>-->
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
    BiAdvancechart: () => import("@c/charts/BiAdvanceChart")
  },
  props: ["item"],
  data() {
    return {
      flag: false
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
    }
  },
  watch: {
    // tempData(newName, oldName) {
    //   console.log(newName);
    //    this.item.options.datas = this.tempData;
    //   console.log("111111");
    // }

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