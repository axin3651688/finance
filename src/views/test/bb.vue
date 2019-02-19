<template>
  <div class="page">
    <template slot-scope="scope">
      <!-- 偏差結果 -->
      <span v-if="item.status==='flag'">
        <el-tag
          :type="scope.row.deviationResult === 0 ? 'success' :scope.row.deviationResult === 1?'primary':'danger' "
          disable-transitions
        >{{scope.row.deviationResult === 0 ? '正常' :scope.row.deviationResult === 1?'超正差':'超负差'}}</el-tag>
      </span>
      <!-- 磅单编码 -->
      <a v-else-if="item.status==='link'" class="link">{{scope.row[item.prop]}}</a>
      <!-- 正常的其他列 -->
      <span v-else>{{scope.row[item.prop]}}</span>
    </template>
  </div>
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
  methods: {}
};
</script>
