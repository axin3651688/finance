
<template>
  <tree-table :data="data" :columns="columns" :list="list" border/>
</template>
<script>
import treeTable from "@c/text/Treegrid";
export default {
  components: {
    treeTable
  },
  data() {
    return {
      columns: [],
      data: [],
      list:[],
    };
  },
  mounted() {
    // this.axios.get("/api/Report_view").then(res => {
    //   console.log(res);
    //   this.data = res.data.data;
    //   this.columns = res.data.columns;
    // });
    //  this.axios.get("/api/operating").then(res => {
    //     console.log(res);
    //     this.list = res.data.operating;
    //     console.log(this.list);
    //   });
    
  },
  methods: {}
};
</script>
<style>
</style>