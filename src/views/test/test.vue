<template>
  <div class="page">
    <el-table :data="tableData" border style="width: 100%" highlight-current-row>
      <el-table-column type="index" label="序号" width="80" align="center" fixed></el-table-column>
      <el-table-column
        v-for="item in tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 偏差結果 -->
          <span v-if="item.status==='flag'">
            <el-tag
              :type="scope.row.deviationResult === 0 ? 'success' :scope.row.deviationResult === 1?'primary':'danger' "
              disable-transitions
            >{{scope.row.deviationResult === 0 ? '正常' :scope.row.deviationResult === 1?'超正差':'超负差'}}</el-tag>
          </span>
          <!-- 磅单编码 -->
          <a
            v-else-if="item.status==='link'"
            class="link"
            @click.prevent="linkToinfo(scope.row)"
          >{{scope.row[item.prop]}}</a>
          <!-- 正常的其他列 -->
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <a href="#" class="link" @click.prevent="linkToinfo(scope.row)">查看详情</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      tableColumn: [
        {
          prop: "billQuantitySum",
          label: "运单数量",
          width: 100
        },
        {
          prop: "billTypeDisplay",
          label: "收料类型"
        },
        {
          prop: "specification",
          label: "规格型号"
        },
        {
          prop: "code",
          label: "磅单编号",
          width: 280,
          status: "link"
        },
        {
          prop: "carNumber",
          label: "车牌号"
        },
        {
          prop: "providerName",
          label: "发料单位",
          width: 280
        },
        {
          prop: "realQuantitySum",
          label: "实际质量"
        },

        {
          prop: "djly",
          label: "单据来源"
        },
        {
          prop: "completionTime",
          label: "完成时间",
          width: 200
        },
        {
          prop: "deviationResult",
          label: "偏差結果",
          status: "flag"
        }
      ],
      tableData: [
        {
          billQuantitySum: 12,
          billTypeDisplay: "qwe",
          specification: 12,
          code: 345
        }
      ]
    };
  },
  created() {},
  computed: {},
  methods: {}
};
</script>
