<template>
  <el-table-column v-if="isFolder" :key="col.text" :label="col.text" :prop="col.id">
    <template v-for="cc in col.children">
      <bi-table-column-tree
        v-if="cc.children && cc.children.length > 0 "
        :col="cc"
        :key="cc.text"
        :tableData.sync="tableData" />
      <bi-table-column v-else :col="cc" :tableData.sync="tableData" :key="cc.text" ref="tcol"/>
    </template>
  </el-table-column>
  <bi-table-column v-else :col="col" :key="col.text" :tableData.sync="tableData" ref="tcol"/>
</template>
<script>
import BiTableColumn from "./BiTableColumn";
export default {
  name: "BiTableColumnTree",
  props: ["col", "tableData"],
  components: {
    BiTableColumn
  },
  computed: {
    isFolder() {
      return this.col.children && this.col.children.length;
    }
  },
  created(){
    //alert(JSON.stringify(this.tableData))
  //  debugger;
   
  },
  methods: {
    upData(item) {
      this.$set(this, "tableData", item);
      this.$set(this.tableData, "datas", item.datas);
      let refs = this.$refs;

      if (refs) {
        if (refs.tcol) {
          if (refs.tcol.upData) {
            refs.tcol.upData(item);
          }
        }
      }
    }
  }
};
</script>