<template>
  <component v-if="flag && item.show" :is="item.xtype" :item.sync="item" ref="child"></component>
</template>

<script>
export default {
  name: "BiItem",
  props: ["item", "config", "datas"],
  components: {
    BiTable: () => import("./BiTable"),
    Chart: () => import("./BiChart"),
    BiText: () => import("./BiText"),
    TreeGrid: () => import("./treegrid/TreeGrid.vue"),
    STreeGrid: () => import("./text/STreegrid.vue"),
    JtreeGrid: () => import("./table/Jtreegrid.vue"),
    BiFlhz: () => import("./BiFlhz")
  },
  data() {
    return {
      flag: false,
      hasConfig: false
    };
  },

  mounted() {
    this.loadItems(this.item);
  },

  methods: {
    loadItems() {
      // debugger
      let config = this.item.config;
      if (config) {
        //config.rows = this.item.rows || config.rows || this.config.rows;
        //config.columns = this.item.columns || config.columns || this.config.columns || this.item.items[0].columns;
        config.rows = config.rows || this.item.rows || this.config.rows;
        config.columns =
          config.columns || this.item.columns || this.config.columns; //|| config.columns || this.config.columns || this.item.items[0].columns;
        config.type = config.type || 2;
        //  this.item.config = config;
        this.hasConfig = true;
        this.$emit("getDatas", this.item, this, "company");
      } else {
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
