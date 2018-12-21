<template>
  <bi-column v-if="item.options.type === 'column'" :item="item" class="bgwight"></bi-column>
  <bi-gauge v-else-if="item.options.type === 'gauge'" :item="item" class="bgwight"></bi-gauge>
  <bi-pie v-else-if="item.options.type === 'pie'" :item="item" class="bgwight"></bi-pie>
  <bi-line v-else-if="item.options.type === 'line'" :item="item" class="bgwight"></bi-line>
  <bi-rosepie v-else-if="item.options.type === 'rosepie'" :item="item" class="bgwight"></bi-rosepie>
  <bi-circlepie v-else-if="item.options.type === 'circlepie'" :item="item" class="bgwight"></bi-circlepie>
  <bi-radar v-else-if="item.options.type === 'radar'" :item="item" class="bgwight"></bi-radar>
  <bi-bar v-else-if="item.options.type === 'bar'" :item="item" class="bgwight"></bi-bar>
  <BiMSCloumnLine v-else-if="item.options.type === 'mscloumnline'" :item="item" class="bgwight"></BiMSCloumnLine>
  <bi-funnel v-else-if="item.options.type === 'funnel'" :item="item" class="bgwight"></bi-funnel>
  <bi-area v-else-if="item.options.type === 'area'" :item="item" class="bgwight"></bi-area>
  <BiSPie v-else-if="item.options.type === 'spie'" :item="item" class="bgwight"></BiSPie>
</template>
<script>
import BiColumn from "@c/charts/BiColumn";
import BiGauge from "@c/charts/BiGauge";
import BiLine from "@c/charts/BiLine";
import BiPie from "@c/charts/BiPie";
import BiRosepie from "@c/charts/BiRosepie";
import BiCirclepie from "@c/charts/PieChart3";
import BiRadar from "@c/charts/BiRadar";
import BiBar from "@c/charts/BiBar";
import BiMSCloumnLine from "@c/charts/BiMSCloumnLine";
import BiArea from "@c/charts/BiArea";
import BiFunnel from "@c/charts/BiFunnel";
import BiSPie from "@c/charts/BiSPie";
import { getCellValue, getConfigModelDatas } from "../utils/math";
export default {
  name:"BiChart",
  components: {
    BiColumn,
    BiGauge,
    BiLine,
    BiPie,
    BiRosepie,
    BiCirclepie,
    BiRadar,
    BiBar,
    BiMSCloumnLine,
    BiArea,
    BiFunnel,
    BiSPie
  },
  props: ["item"],
  data() {
    return {
      flag: false
    };
  },
  //"dataFormular":{"label":"text","value":"B","scope":true}  ==> data = [{label:"xxx",value:2122}]
  created() {
    this.upData();
  },
  methods: {
    upData(from) {
      let config = this.item.options.getData;
      if (!config || !config.type) {
        console.error(this.item.text + "没有配制正确！");
        return;
      }
      if (config.type === 5) {
        debugger;
      }

      let tempData = getConfigModelDatas(
        config,
        this.item.datas,
        this.item.config.rows,
        this.item.config.columns
      );
      console.log(tempData);
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