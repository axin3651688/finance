<template>
  <el-table-column v-if="isFolder" :key="col.text" :label="col.text" :prop="col.id" >
    <template v-for="cc in col.children">
      <bi-table-column-tree
        v-if="cc.children && cc.children.length > 0 "
        :col="cc"
        :key="cc.text"
        :data="data"
      ></bi-table-column-tree>
      <bi-table-column v-else :col="cc" :data="data" :key="cc.text" ref="tcol"/>
    </template>
  </el-table-column>
  <bi-table-column v-else :col="col" :key="col.text" :data="data" ref="tcol"/>
</template>
<script>
import BiTableColumn from "./BiTableColumn";
export default {
  name: "BiTableColumnTree",
  props: ["col", "data"],
  components: {
    BiTableColumn
  },
  computed: {
    isFolder() {
      return this.col.children && this.col.children.length;
    }
  },
  methods: {
    upData(item) {
      this.$set(this, "data", item);
      this.$set(this.data, "datas", item.datas);
      let refs = this.$refs;
      debugger;
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