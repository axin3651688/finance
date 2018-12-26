<template>
  <bi-column v-if="item.options.type === 'column'" :item="item" class="bgwight"></bi-column>
  <bi-gauge v-else-if="item.options.type === 'gauge'" :item="item" class="bgwight"></bi-gauge>
  <bi-pie v-else-if="item.options.type === 'pie'" :item="item" class="bgwight"></bi-pie>
  <bi-line v-else-if="item.options.type === 'line'" :item="item" class="bgwight"></bi-line>
  <bi-radar v-else-if="item.options.type === 'radar'" :item="item" class="bgwight"></bi-radar>
  <bi-bar v-else-if="item.options.type === 'bar'" :item="item" class="bgwight"></bi-bar>
  <bi-funnel v-else-if="item.options.type === 'funnel'" :item="item" class="bgwight"></bi-funnel>
  <BiSPie v-else-if="item.options.type === 'spie'" :item="item" class="bgwight"></BiSPie>
  <BiAdvanceChart v-else-if="item.options.type === 'advancechart'" :item="item" class="bgwight"></BiAdvanceChart>
</template>
<script>
import BiColumn from "@c/charts/BiColumn";
import BiGauge from "@c/charts/BiGauge";
import BiLine from "@c/charts/BiLine";
import BiPie from "@c/charts/BiPie";
import BiRadar from "@c/charts/BiRadar";
import BiFunnel from "@c/charts/BiFunnel";
import BiSPie from "@c/charts/BiSPie";
import BiAdvanceChart from "@c/charts/BiAdvanceChart";
import { getConfigModelDatas } from "../utils/math";
export default {
  name: "BiChart",
  components: {
    BiColumn,
    BiGauge,
    BiLine,
    BiPie,
    BiRadar,
    BiFunnel,
    BiSPie,
    BiAdvanceChart
  },
  props: ["item"],
  data() {
    return {
      flag: false
    };
  },
  created() {
    debugger;
    console.log(this.item.options.type);

    this.upData();
  },
  methods: {
    upData(from) {
      debugger;
      let config = this.item.options.getData;
      if (!config || !config.type) {
        console.error(this.item.text + "没有配制正确！");
        return;
      }
      if (config.type === 5) {
        //debugger;
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
        //debugger;
      },
      deep: true
    }
  }
};
</script>

<style lang='scss' scoped>
.bgwight {
  margin-top: 24px;
  background: #fff;
}
</style>