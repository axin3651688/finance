<template>
  <el-table-column v-if="isFolder" :key="col.text" :label="col.text" :prop="col.id">
    <template v-for="cc in col.children">
      <bi-table-column-tree
        v-if="cc.children && cc.children.length > 0 "
        :col="cc"
        :key="cc.text"
        :tableData.sync="tableData"
      />
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
      console.log("isFolder");
      console.log(this.col.children && this.col.children.length);

      return this.col.children && this.col.children.length;
    }
  }
};
</script>