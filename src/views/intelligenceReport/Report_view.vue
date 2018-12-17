
<template>
  <tree-table :data="data" :columns="columns" :item="item" border/>
</template>
<script>
import treeTable from "@c/treegrid/TreeIndex";
export default {
  components: {
    treeTable
  },
  data() {
    return {
      columns: [],
      data: [],
      item: 0
    };
  },
  mounted() {
    this.axios.get("/api/Report_view").then(res => {
      console.log(res);
      this.data = res.data.data;
      this.columns = res.data.columns;
      this.item = this.columns.length - 1;
      // console.log(this.index)
    });
  },
  methods: {}
};
</script>
<style>
</style>