<template>
  <el-table-column v-if="isFolder" :key="col.text" :label="col.text" :prop="col.id">
    <template v-for="cc in col.children">
      <bi-table-column-tree
        v-if="cc.children && cc.children.length > 0 "
        :col="cc"
        :key="cc.text"
        :cube.sync="cube"
      />
      <bi-table-column v-else :col="cc" :cube.sync="cube" :key="cc.text" ref="tcol"/>
    </template>
  </el-table-column>
  <bi-table-column v-else :col="col" :key="col.text" :cube.sync="cube" ref="tcol"/>
</template>
<script>
import BiTableColumn from "./BiTableColumn1";
export default {
  name: "BiTableColumnTree",
  props: ["col", "cube"],
  components: {
    BiTableColumn
  },
  computed: {
    isFolder() {
      return this.col.children && this.col.children.length;
    }
  },
  created() {},
  methods: {
    upData(item) {
      this.$set(this, "cube", item);
      this.$set(this.cube, "datas", item.datas);
      let refs = this.$refs;

      if (refs) {
        if (refs.tcol) {
          if (refs.tcol.upData) {
            refs.tcol.upData(item);
          }
        }
      }

      let bb = {"source_id":"4","token":"bGl1cWklN0UyNDQlNDAxOTIxNjgxMTE5TW96aWxsYTUwV2luZG93c05UNjFXaW42NHg2NEFwcGxlV2ViS2l0NTM3MzZLSFRNTGxpa2VHZWNrb2NuYmlzb2Z0MzAyQ2hyb21lNjYwMzM1OTE4MUVsZWN0cm9uMzAxM1NhZmFyaTUzNzM2JTQwNTkzNiU3RTElN0U2MDAwMDA","scope":"0","tdsourcetag":"s_pctim_aioms"}
    }
  }
};
</script>