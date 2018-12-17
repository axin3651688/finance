<template lang="html">
  <div id="example">
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
      >
    </zk-table>
  </div>
</template>

<script>
import ZkSwitch from "./switchs/Switch";
export default {
  name: "example",
  props:["data","columns"],
  components: {
    ZkSwitch
  },
  data() {
    return {
      props: {
        stripe: false,
        border: false,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      }
    }
  },
  created(){
  },
  mounted(){
  },
  computed: {
    propList() {
      return Object.keys(this.props).map(item => ({
        name: item
      }));
    }
  },
  methods: {
  }
};
</script>

<style scoped >
.switch-list {
  margin: 20px 0;
  list-style: none;
  overflow: hidden;
}
.switch-item {
  margin: 20px;
  float: left;
}
.dropdown{
  /* position: absolute; */
}
</style>