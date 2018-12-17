<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-option-group>
    </el-select>

    <hot-table :settings="settings"></hot-table>
  </div>
</template>
<script>
import { HotTable } from "@handsontable/vue";
import "handsontable/dist/handsontable.full.min.css";
import { fill } from "~api/fill.js";

export default {
  created() {
    debugger;
    let data = fill();
  },
  data: function() {
    return {
      options: [
        {
          label: "财务分析报表",
          options: [
            {
              value: "01",
              label: "资产负债表"
            },
            {
              value: "02",
              label: "利润表"
            },
            {
              value: "03",
              label: "现金流量表"
            }
          ]
        },
        {
          label: "应收预付及其它",
          options: [
            {
              value: "ys",
              label: "应收账款分析表"
            },
            {
              value: "yf",
              label: "预付账款分析表"
            },
            {
              value: "qt",
              label: "其他应收款分析表"
            }
          ]
        },
        {
          label: "融资情况表",
          options: [
            {
              value: "1",
              label: "债务构成情况分析表"
            },
            {
              value: "2",
              label: "下属企业贷款担保情况表"
            },
            {
              value: "3",
              label: "下属企业抵押贷款情况表"
            },
            {
              value: "4",
              label: "融资情况明细表"
            }
          ]
        },
        {
          label: "资金集中情况表",
          options: [
            {
              value: "1",
              label: "资金集中情况明细表"
            }
          ]
        }
      ],
      value: "01",

      settings: {
        data: [
          {
            lscode: "001",
            lsname: "流动资产：",
            lno: 1,
            lA: 0,
            lB: 0,
            rscode: "002",
            rsname: "流动负债：",
            rno: 73,
            rA: 0,
            rB: 0
          }
        ],
        // rowHeaders: true,
        stretchH: "all",
        manualColumnFreeze: true,
        // width: "100%",
        colHeaders: [
          "项目编码",
          "项目名称",
          "行次",
          "期末余额",
          "年初余额",
          "项目编码",
          "项目名称",
          "行次",
          "期末余额",
          "年初余额"
        ],
        hiddenColumns: {
          columns: [0, 5]
        },
        columns: [
          { data: "lscode", type: "text", readOnly: true },
          { data: "lsname", type: "text", readOnly: true },
          {
            data: "lno",
            type: "numeric",
            readOnly: true,
            className: "htCenter htMiddle"
          },
          {
            data: "lB",
            type: "numeric",
            numericFormat: {
              pattern: "0.00"
            }
          },
          {
            data: "lA",
            type: "numeric",
            numericFormat: {
              pattern: "0.00"
            }
          },

          { data: "rscode", type: "text", readOnly: true },
          { data: "rsname", type: "text", readOnly: true },
          {
            data: "rno",
            type: "numeric",
            readOnly: true,
            className: "htCenter htMiddle"
          },
          {
            data: "rB",
            type: "numeric",
            numericFormat: {
              pattern: "0.00"
            }
          },
          {
            data: "rA",
            type: "numeric",
            numericFormat: {
              pattern: "0.00"
            }
          }
        ]
      }
    };
  },
  components: {
    HotTable
  }
};
</script>
<style scoped>
</style>




