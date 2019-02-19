<template>
  <el-table-column
    v-if="item.type=='index'"
    type="index"
    :label="item.text"
    width="80"
    align="center"
    fixed
  />
  <el-table-column
    v-else
    :prop="item.id"
    :label="item.text"
    :align="item.align|| 'left'"
    :render-header="labelHead"
  >
    <template slot-scope="scope">
      <el-tooltip class="item" effect="light" :content="scope.row[item.id]" placement="right">
        <span>{{scope.row[item.id]}}</span>
      </el-tooltip>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  components: {},
  props: ["item"],
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    labelHead(h, { column, index }) {
      let l = column.label.length;
      let f = 10; //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l; //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度 //然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h("div", { class: "table-head", style: { width: "100%" } }, [
        column.label
      ]);
    }
  }
};
</script>
