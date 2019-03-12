<template>
  <div class="page">
    <el-table :data="tableData" border style="width: 100%" highlight-current-row>
      <p v-for="item of columns" :key="item.bb">
        <bb :item="item"/>
      </p>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import bb from "./bb";
export default {
  name: "",
  components: { bb },
  props: {},
  data() {
    return {
      tableColumn: [
        {
          prop: "billQuantitySum",
          label: "运单数量2",
          width: 100
        },
        {
          prop: "billTypeDisplay",
          label: "收料类型3"
        },
        {
          prop: "specification",
          label: "规格型号4"
        },
        {
          prop: "code",
          label: "磅单编号5",
          width: 280,
          status: "link"
        },
        {
          prop: "carNumber",
          label: "车牌号6"
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
      columns: [
        { bb: "12", id: "row", type: "index", width: 80, text: "行次" },
        {
          bb: "11",
          id: "id",
          type: "string",
          hidden: true,
          text: "编码1111111111111"
        },
        {
          bb: "10",
          id: "D",
          type: "decimal",
          width: 300,
          text: "预算累计数2222222222222222"
        },

        {
          bb: "13",
          id: "text",
          type: "string",
          width: 300,
          text: "项目3333333333333333"
        },
        {
          bb: "14",
          id: "level",
          type: "number",
          hidden: true,
          text: "级别444444444444"
        },
        {
          bb: "15",
          id: "A",
          type: "decimal",
          width: 300,
          text: "本期数55555555555555555555555"
        },
        {
          bb: "16",
          id: "B",
          type: "decimal",
          width: 300,
          text: "累计数666666666666666666"
        },
        {
          bb: "17",
          id: "C",
          type: "decimal",
          width: 300,
          text: "预算数777777777777777777777"
        }
      ],

      tableData: [
        {
          id: "1416001",
          text: "一、营业总收入",
          A: 2009872614.61,
          B: 11378908656.94,
          level: 1,
          idAfter: "1416001",
          C: 0,
          D: 22419000000
        },
        {
          id: "141600101",
          text: "其中：主营业务收入",
          level: 2,
          idAfter: "141600101",
          A: 2009872614.61,
          B: 11378908656.94,
          C: 0,
          D: 22419000000
        },
        {
          id: "141600102",
          text: "其他业务收入",
          level: 3,
          idAfter: "141600102",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        {
          id: "1426401",
          text: "减：营业成本",
          A: 1643540825.87,
          B: 9718642434.24,
          level: 1,
          idAfter: "1426401",
          C: 0,
          D: 19319000000
        },
        {
          id: "142640101",
          text: "其中：主营业务成本",
          level: 2,
          idAfter: "142640101",
          A: 737844491.53,
          B: 4873891700.86,
          C: 0,
          D: 19319000000
        },
        {
          id: "142640102",
          text: "其他业务成本",
          level: 3,
          idAfter: "142640102",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        {
          id: "1426405",
          text: "营业税金及附加",
          level: 3,
          idAfter: "1426405",
          A: 23910146.44,
          B: 203818261.02,
          C: 0,
          D: 0
        },
        {
          id: "1436601",
          text: "销售费用",
          level: 3,
          idAfter: "1436601",
          A: 544333576.65,
          B: 2753351229.46,
          C: 0,
          D: 0
        },
        {
          id: "1436602",
          text: "管理费用",
          level: 3,
          idAfter: "1436602",
          A: 330166780.9,
          B: 1809770551.26,
          C: 0,
          D: 0
        },
        {
          id: "1436603",
          text: "财务费用",
          level: 3,
          idAfter: "1436603",
          A: 18196675.74,
          B: 46007040.94,
          C: 0,
          D: 0
        },
        {
          id: "143660302",
          text: "其中：利息支出",
          level: 4,
          idAfter: "143660302",
          A: 12873241.71,
          B: 132929887.63,
          C: 0,
          D: 0
        },
        {
          id: "1436701",
          text: "资产减值损失",
          level: 3,
          idAfter: "1436701",
          A: -10910845.39,
          B: 31803650.7,
          C: 0,
          D: 0
        },
        {
          id: "1416101",
          text: "加：公允价值变动收益",
          level: 3,
          idAfter: "1416101",
          A: -197295.05,
          B: -387250.09,
          C: 0,
          D: 0
        },
        {
          id: "1416111",
          text: "投资收益",
          level: 3,
          idAfter: "1416111",
          A: 26700550.91,
          B: 62955869.37,
          C: 0,
          D: 0
        },
        {
          id: "141611101",
          text: "其中：对联营企业和合营企业的投资收益",
          level: 4,
          idAfter: "141611101",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        { id: "1416112", text: "资产处置损益", level: 3, idAfter: "1416112" },
        { id: "1416113", text: "其他收益", level: 3, idAfter: "1416113" },
        {
          id: "1402100",
          text: "二、营业利润",
          A: 392835044.6,
          B: 1722834841.98,
          level: 1,
          idAfter: "1402100",
          C: 0,
          D: 3100000000
        },
        {
          id: "1416301",
          text: "加：营业外收入",
          level: 2,
          idAfter: "1416301",
          A: 62846882.68,
          B: 158330732.87,
          C: 0,
          D: 0
        },
        {
          id: "1426711",
          text: "减：营业外支出",
          level: 2,
          idAfter: "1426711",
          A: 18640496.2,
          B: 132168299.83,
          C: 0,
          D: 0
        },
        {
          id: "142671101",
          text: "其中：非流动资产处置损失",
          level: 3,
          idAfter: "142671101",
          A: -24347.97,
          B: 1465781.44,
          C: 0,
          D: 0
        },
        {
          id: "1403100",
          text: "三、利润总额",
          level: 1,
          idAfter: "1403100",
          A: 437041431.08,
          B: 1748997275.02,
          C: 0,
          D: 3100000000
        },
        {
          id: "1426801",
          text: "减：所得税费用",
          level: 2,
          idAfter: "1426801",
          A: 53182247.24,
          B: 282901701.8,
          C: 0,
          D: 520000000
        },
        {
          id: "1400100",
          text: "四、净利润",
          level: 1,
          idAfter: "1400100",
          A: 383859183.84,
          B: 1466095573.22,
          C: 0,
          D: 2580000000
        },
        {
          id: "1400111",
          text: "归属于母公司所有者的净利润",
          level: 2,
          idAfter: "1400111",
          A: 238911240.44,
          B: 708349137.01,
          C: 0,
          D: 1164000000
        },
        {
          id: "1400112",
          text: "少数股东损益",
          level: 2,
          idAfter: "1400112",
          A: 144947943.4,
          B: 757746436.21,
          C: 0,
          D: 0
        },
        {
          id: "1400120",
          text: "每股收益：",
          level: 2,
          idAfter: "1400120",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        {
          id: "1400121",
          text: "基本每股收益",
          level: 2,
          idAfter: "1400121",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        },
        {
          id: "1400122",
          text: "稀释每股收益",
          level: 2,
          idAfter: "1400122",
          A: 0,
          B: 0,
          C: 0,
          D: 0
        }
      ]
    };
  },
  created() {},
  computed: {},
  methods: {}
};
</script>
