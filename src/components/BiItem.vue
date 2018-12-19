<template>
  <bi-table v-if="flag && item.xtype == 'bi-table'" :item.sync="item" ref="child"></bi-table>
  <bi-text v-else-if="flag && item.xtype == 'bi-text'" :item.sync="item" ref="child"></bi-text>
  <bi-chart v-else-if="flag && item.xtype == 'chart'" :item.sync="item" ref="child"></bi-chart>
  <tree-grid v-else-if="flag && item.xtype == 'tree-grid'" :item.sync="item" ref="child"></tree-grid>
</template>

<script>
import BiTable from "./BiTable";
import BiChart from "./BiChart";
import BiText from "./BiText";
import TreeGrid from "./text/Treegrid.vue"

export default {
  name:"BiItem",
  props: ["item", "config", "datas"],
  components: {
    BiTable,
    BiChart,
    BiText,
    TreeGrid
  },
  data() {
    return {
      flag: false,
      hasConfig: false
      // id:"",
      // text:"",
      // config:{},
      // options:{},
      // xtype:"",
      // datas:{}
    };
  },
  created() {
    // debugger;
    console.info(this.item);
    // debugger;
  },
  mounted() {
    // debugger;
    this.loadItems(this.item);
  },
  watch: {
    item(newItem) {
      //  debugger;
      console.info("-----");
      console.info(newItem);
      this.$set(this, "item", newItem);
    },
    deep: true
  },

  methods: {
    loadItems() {
      let config = this.item.config;
     // debugger;
      if (config) {
        config.rows = config.rows || this.config.rows;
        config.columns = config.columns || this.config.columns;
        config.type = config.type || 2;
        this.item.config = config;
        this.hasConfig = true;
        this.$emit("getDatas", this.item, this, "company");
      } else {
        // this.$emit("getDatas", this.item,this, 1);
        this.item.datas = this.datas;
        this.item.config = this.config;
        this.setItems(this.item, true);
      }
    },
    setItems(item, flag) {
      this.$set(this, "item", item);
      this.$set(this, "flag", true);
      if (this.$refs.child && this.$refs.child.upData) {
        this.$refs.child.upData(item);
      }
    }
  }
};
</script>
