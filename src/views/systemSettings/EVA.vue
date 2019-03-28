<template>
  <div >
    <!-- style="margin-top:5px;" -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="经济增加值（EVA）计算表" name="first">
        <!-- v-model="item.value" @input="handleClick(item)" -->
        <div style="marginBottom: 5px;">
          <el-button-group>
            <el-button class="btn" v-for="(item,index) in items" :key="item.id" @click="buttonClick(item)">{{ item.text }}</el-button>
          </el-button-group>
        </div>
        <div>
          <el-input
            v-for="(item ,key) in vars"
            :key="key"
            :placeholder="item.text"
            @change="handleClick(item)"
            @keyup.enter.native="handleClick(item)"
            onblur=""
            onfocus=""
            v-model="item.display_num"
            :style="item.wclass"
            clearable
          >
            <template slot="prepend">{{item.text}}</template>
          </el-input>

          <table class="table table-bordered table-striped" style="margin-top:5px;">
            <thead>
              <tr>
                <td style="width:180px">
                  <i class="el-icon-info"></i>
                </td>
                <td style="width:230px">项 目</td>
                <td colspan="2" style="width:400px">本期金额</td>
                <td style="width:200px">调整后</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="7" class="bd">税后净营业利润</td>
                <td>净利润</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.v1400100A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1400100A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1400100A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1400100A|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>研究与开发费</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.v1435301A" readonly class="exps">
                  -->
                  <span class="expsv">{{exps.v1435301A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1435301A_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1435301A_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>利息支出</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.v1436604A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1436604A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1436604A_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1436604A_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>营业外收支净额</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.yywsrje" readonly class="exps"> -->
                  <span class="expsv">{{exps.yywsrje|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.yywsrje_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.yywsrje_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>其中：营业外收入</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.v1416301A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1416301A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1416301A_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1416301A_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td class="textIndent">营业外支出</td>
                <td colspan="2" class="br">
                  <!-- <input v-model="exps.v1426711A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1426711A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1426711A_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1426711A_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="bd">税后净营业利润</td>
                <td class="br">
                  <!-- <input v-model="exps.yywsrlr" readonly class="exps"> -->
                  <span class="expsv">{{exps.yywsrlr|NumFormat}}</span>
                </td>
              </tr>

              <tr>
                <td rowspan="11" class="bd">资本占用</td>
                <td class="bc">项目</td>
                <td class="bc">期初余额</td>
                <td class="bc">期末余额</td>
                <td class="bc">调整后</td>
              </tr>
              <tr>
                <td>资产总额</td>
                <td class="br">
                  <!-- <input v-model="exps.v1100100A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1100100A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1100100B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1100100B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input :value="exps.v1100100_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1100100_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>无息流动负债</td>
                <td class="br">
                  <!-- <input :value="exps.wxldfzA" readonly class="exps"> -->
                  <span class="expsv">{{exps.wxldfzA|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input :value="exps.wxldfzB" readonly class="exps"> -->
                  <span class="expsv">{{exps.wxldfzB|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input :value="exps.wxldfz_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.wxldfz_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>其中： 流动负债</td>
                <td class="br">
                  <!-- <input v-model="exps.v1210100A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1210100A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1210100B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1210100B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1210100_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1210100_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td class="textIndent">短期借款</td>
                <td class="br">
                  <!-- <input v-model="exps.v1212001A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1212001A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1212001B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1212001B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1212001_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1212001_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td class="textIndent">一年内到期的长期负债</td>
                <td class="br">
                  <!-- <input v-model="exps.v1217001A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1217001A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1217001B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1217001B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1217001_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1217001_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>在建工程</td>
                <td class="br">
                  <!-- <input v-model="exps.v1131604A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131604A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1131604B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131604B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1131604_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131604_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>工程物资</td>
                <td class="br">
                  <!-- <input v-model="exps.v1131605A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131605A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1131605B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131605B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1131605_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1131605_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>专项应付款</td>
                <td class="br">
                  <!-- <input v-model="exps.v1222711A" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1222711A|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1222711B" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1222711B|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.v1222711_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.v1222711_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td>资本化费用</td>
                <td class="br">
                  <!-- <input :value="vars[2].value" readonly class="exps"> -->
                  <span class="expsv">{{vars[2].value|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input :value="vars[3].value" readonly class="exps"> -->
                  <span class="expsv">{{vars[3].value|NumFormat}}</span>
                </td>
                <td class="br">
                  <!-- <input v-model="exps.znhfy_tz" readonly class="exps"> -->
                  <span class="expsv">{{exps.znhfy_tz|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="bd">资本占用金额</td>
                <td class="br">
                  <!-- <input v-model="exps.zbzyje" readonly class="exps"> -->
                  <span class="expsv">{{exps.zbzyje|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td rowspan="2"></td>
                <td colspan="3" class="bd">资产负债率(%)</td>
                <td class="br">
                  <!-- <input v-model="exps.zcfzlv" readonly class="exps"> -->
                  <span class="expsv">{{exps.zcfzlv|NumFormat}}</span>
                </td>
              </tr>

              <tr>
                <td colspan="3" class="bd">资本成本率(%)</td>
                <td class="br">
                  <!-- <input :value="vars[1].value" readonly class="exps"> -->
                  <span class="expsv">{{vars[1].value|NumFormat}}</span>
                </td>
              </tr>
              <tr>
                <td class="bd">EVA</td>
                <td colspan="3" class="bd">无息流动负债-资本占用×资本成本率</td>
                <td class="br">
                  <!-- <input v-model="exps.shjlr" readonly class="exps"> -->
                  <span class="expsv">{{exps.shjlr|NumFormat}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import request from "utils/http";
import { eva_city_Request } from "~api/cube";
import tools from "utils/tools";
import { mapGetters } from "vuex";
import Vue from "vue";
// import EventMixins from "../mixins/EventMixins";
// 注册
Vue.filter("NumFormat", function(value) {
  // 返回处理后的值
  return tools.currency(value, "", 2);
});
export default {
  name: "Eva",
  // mixins: [EventMixins],
  data() {
    return {
      // tab页展示默认第一
      activeName: "first",
      items: [
          { id: "1", text: "刷新" },
          { id: "2", text: "导出" }
      ],
      localStorage_new: [],
      gridData: [
        {
          sname: "营业外收支净额",
          expression: "营业外支出本期金额-营业外收入本期金额"
        },
        {
          sname: "研究与开发费[调整后]",
          expression: "研究与开发费*(1-税率)"
        },
        {
          sname: "利息支出[调整后]",
          expression: "利息支出*(1-税率)"
        },
        {
          sname: "其中：营业外收入[调整后]",
          expression: "其中：营业外收入*(1-税率)"
        },
        {
          sname: "营业外支出[调整后]",
          expression: "营业外支出*(1-税率)"
        },
        {
          sname: "税后净营业利润",
          expression: "净利润 + 研究与开发费 + 利息支出 + 营业外收支净额"
        }
      ],
      ArrData: [],
      ArrData2:[],
      exps: {
        v1400100A: 1000, //净利润

        v1435301A: 1000, //研究与开发费
        v1435301A_tz: 0, //调整后 研究与开发费 v1435301A*(1-zbcblv)

        v1436604A: 2000, //利息支出
        v1436604A_tz: 0,

        v1416301A: 2000, //营业外收入
        v1416301A_tz: 0,

        v1426711A: 3000, //营业外支出
        v1426711A_tz: 0,

        yywsrje: 0, //营业外收支净额 = 营业外支出本期金额-营业外收入本期金额
        yywsrje_tz: 0,

        yywsrlr: 0, //税后净营业利润 = 净利润 + 研究与开发费 + 利息支出 + 营业外收支净额

        v1100100A: 1000, //资产总计 期初
        v1100100B: 20000, //资产总计 期末
        v1100100_tz: 0,

        v1210100A: 0, //无息流动负债
        v1210100B: 0,
        v1210100_tz: 0,

        v1212001A: 0, //短期借款
        v1212001B: 0,
        v1212001_tz: 0,

        v1217001A: 0, //一年到期的长期负债
        v1217001B: 0,
        v1217001_tz: 0,

        v1131604A: 0, ////营业外收支净额 营业外支出本期金额-营业外收入本期金额
        v1131604B: 0,
        v1131604_tz: 0,

        v1131605A: 0, //工程物资
        v1131605B: 0,
        v1131605_tz: 0,

        v1222711A: 0, //专项应付款
        v1222711B: 0,
        v1222711_tz: 0,

        //无息流动负债 = 流动负债-短期借款-一年内到期的长期负债
        wxldfzA: 0,
        wxldfzB: 0,
        wxldfz_tz: 0,

        //负债合计
        v1200100B: 0,

        //资产负债率 负债合计期末余额/资产合计期末余额*100
        zcfzlv: 0,

        //资本化费用调整后
        znhfy_tz: 0,

        zbzyje: 0, //资本占用金额

        //#region 税后净利润 =  税后净营业利润-资本占用×资本成本率 //#endregion
        shjlr: 0
      },
      vars: [
        {
          code: "sl",
          value: 0,
          display_num: "", //用来显示的值
          text: "税率(%)",
          wclass: "width:180px;"
        },
        {
          code: "zbcblv",
          value: 0,
          display_num: "", //用来显示的值
          text: "资本成本率(%)",
          wclass: "width:230px"
        },
        {
          code: "zbhfyqc",
          value: 0,
          display_num: "", //用来显示的值 A
          text: "资本化费用期初余额",
          wclass: "width:300px"
        },
        {
          code: "zbhfyqm",
          value: 0,
          display_num: "", //用来显示的值 B
          text: "资本化费用期末余额",
          wclass: "width:300px"
        }
      ],
      companyId: "",     // 默认的公司id
      yearId: "",        // 默认的年份
      monthId: "",       // 默认的月份
      conversionId: "",  // 默认的单位
      conversionNid: 1,  // 单位 元 id

      num : -1
    };
  },
  created(){
    debugger
    // 获得默认的公司、日期、单位
        this.companyId = this.$store.getters.company ;
        this.yearId = this.$store.getters.year ;
        this.monthId = this.$store.getters.month ;
        this.conversionId = this.$store.getters.conversion ;
    //  
        let cc = JSON.parse(localStorage.getItem("majun"));
        if(cc){
          this.vars = [] ;
          this.vars = cc ;
        }
                       
    // 表格的数据请求(唯一请求)
        this.tableDataRequest(this.companyId, this.yearId, this.monthId, this.conversionId) ;  
  },
  watch: {
    year(newV) {
      this.getData('year',newV);
    },
    month(newV) {
      this.getData('month',newV);
    },
    company(newV) {
      this.getData('company',newV);
    },
    conversion(newV) {
      this.getData('conversion',newV);
    }
  },
  computed: {
    ...mapGetters(["year", "month", "company", "conversion"])
  },
  mounted() {
    //计算公式 资产总计
    // this.updatePjsData(["v1100100", "v1210100", "v1212001", "v1217001"]);
    //表达式公
    // this.setExpressionData();
  },
  methods: {
    focus(item){
      // debugger
    },
    // 导出按钮、刷新按钮功能
    buttonClick(item){
      // debugger
      let me = this ;
      // 1.刷新   2.导出
      if(item.id == "1"){
        me.tableDataRequest(me.companyId, me.yearId, me.monthId, me.conversionId);
      }else{
        alert('暂时没做！')
      }
    },
    // 导航栏切换触发 注：公司、日期、单位
    getData(vax, value){
        // debugger
        let me = this ;
        if(vax === 'year') {
            me.yearId = me.$store.getters[vax] ;
        } else if(vax === 'month') {
            me.monthId = me.$store.getters[vax] ;
        } else if(vax === 'company') {
            me.companyId = me.$store.getters[vax] ;
        } else {
            me.conversionId = me.$store.getters[vax] ;
        }
        // me.num = -1 ;
        me.ArrData = [] ;
        me.ArrData2= [] ;
        // 重新发送请求数据
        me.tableDataRequest(me.companyId, me.yearId, me.monthId, me.conversionId);
    },
    // 数据请求（唯一）
    tableDataRequest(companyId, yearId, monthId, conversionId){
        // debugger
      let _period, _year, _sql, _sql2,_sql3, items ;
      // 月份处理 1~9 之间 前缀要加 ‘0’
      if(monthId>0 && monthId<10){
          monthId = "0" + monthId ;
      }
      _period = yearId + monthId ;
      _year = yearId - 1 + "12"; 
      for(let i=0; i<2; i++){
        if(i){
            // _sql2 = `WITH T AS(SELECT CASE WHEN SCODE ='1100100' THEN '资产总额' WHEN SCODE='1210100' THEN '其中： 流动负债' WHEN SCODE ='1212001'THEN ' 短期借款' WHEN SCODE ='1131604' THEN '在建工程' WHEN SCODE ='1131605' THEN '工程物资' WHEN SCODE='1222711' THEN '专项应付款' WHEN SCODE ='1217001' THEN ' 一年内到期的长期负债' ELSE SNAME END AS SNAME,SCODE FROM DW_DIMITEMPOINT WHERE SCODE IN ('1100100','1131604','1131605','1222711','1217001','1210100','1212001','1200100')) SELECT SCODE, SNAME,A,B FROM( SELECT T.SCODE,T.SNAME,T1.QCYE AS A,T1.QMYE AS B FROM T LEFT JOIN (SELECT DIM_ITEMPOINT, SUM(CASE WHEN DIM_PERIOD =:sn THEN NVL(FACT_A,0) ELSE 0 END) AS QCYE, SUM(CASE WHEN DIM_PERIOD =:period THEN NVL(FACT_A,0) ELSE 0 END) AS QMYE FROM DW_FACTFINANCEPOINT WHERE DIM_COMPANY =:company AND DIM_PERIOD IN (:period,:sn) AND DIM_ITEMPOINT IN ('1100100','1131604','1131605','1222711','1217001','1210100','1212001','1200100') GROUP BY DIM_ITEMPOINT)T1 ON T.SCODE =T1.DIM_ITEMPOINT UNION ALL SELECT '99' AS SCODE,'资本化费用' AS SNAME,FACT_A AS QCYE,FACT_B AS QMYE FROM DW_FACTEVACALCULATE WHERE DIM_COMPANY =:company AND DIM_PERIOD=:period )ORDER BY DECODE (SNAME,'资产总额',1,'其中： 流动负债',2,' 短期借款',3,' 一年内到期的长期负债',4,'在建工程',5,'工程物资',6,'专项应付款',7)`;
            _sql3 = `WITH T AS(SELECT CASE WHEN SCODE ='1100100' THEN '资产总额' WHEN SCODE='1210100' THEN '其中： 流动负债' WHEN SCODE ='1212001'THEN ' 短期借款' WHEN SCODE ='1131604' THEN '在建工程' WHEN SCODE ='1131605' THEN '工程物资' WHEN SCODE='1222711' THEN '专项应付款' WHEN SCODE ='1217001' THEN ' 一年内到期的长期负债' ELSE SNAME END AS SNAME,SCODE FROM DW_DIMITEMPOINT WHERE SCODE IN ('1100100','1131604','1131605','1222711','1217001','1210100','1212001','1200100')) SELECT SCODE, SNAME,A,B FROM( SELECT T.SCODE,T.SNAME,T1.QCYE AS A,T1.QMYE AS B FROM T LEFT JOIN (SELECT DIM_ITEMPOINT, SUM(CASE WHEN DIM_PERIOD =:sn THEN NVL(FACT_B,0) ELSE 0 END) AS QCYE, SUM(CASE WHEN DIM_PERIOD =:period THEN NVL(FACT_B,0) ELSE 0 END) AS QMYE FROM DW_FACTFINANCEPOINT WHERE DIM_COMPANY =:company AND DIM_PERIOD IN (:period,:sn) AND DIM_ITEMPOINT IN ('1100100','1131604','1131605','1222711','1217001','1210100','1212001','1200100') GROUP BY DIM_ITEMPOINT)T1 ON T.SCODE =T1.DIM_ITEMPOINT UNION ALL SELECT T3.SCODE,T3.SNAME,T2.QCYE AS A,T2.QMYE AS B FROM (SELECT SCODE,SNAME FROM DW_DIMITEM WHERE SCODE LIKE '4101%') T3 LEFT JOIN (SELECT '4101' AS SCODE,FACT_A AS QCYE,FACT_B AS QMYE FROM DW_FACTEVACALCULATE WHERE DIM_COMPANY =:company AND DIM_PERIOD=:period )T2 ON T3.SCODE =T2.SCODE )ORDER BY DECODE (SNAME,'资产总额',1,'其中： 流动负债',2,' 短期借款',3,' 一年内到期的长期负债',4,'在建工程',5,'工程物资',6,'专项应付款',7)`;
            _sql = _sql3.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+_period+"'").replace(/:sn/g,"'"+_year+"'") ;
            items = {
                'cubeId': 4,
                'sql' : encodeURI(_sql)
            }
            this.eva_city_Request_second(items) ;
        }else{
            _sql2 = `WITH T AS(SELECT CASE WHEN SCODE ='1400100' THEN '净利润' WHEN SCODE ='1435301' THEN '研究与开发费' WHEN SCODE ='1436604' THEN '利息支出' WHEN SCODE='1416301' THEN '其中：营业外收入' WHEN SCODE ='1426711' THEN ' 营业外支出' ELSE SNAME END AS SNAME,SCODE FROM DW_DIMITEMPERIOD WHERE SCODE IN ('1400100','1435301','1436604','1416301','1426711')) SELECT SCODE,SNAME,B FROM ( SELECT T.SCODE,T.SNAME,T1.FACT_B AS B FROM T LEFT JOIN (SELECT DIM_ITEMPERIOD,SUM(NVL(FACT_B,0)) FACT_B FROM DW_FACTFINANCEPERIOD WHERE DIM_PERIOD=:period AND DIM_COMPANY=:company AND DIM_ITEMPERIOD IN ('1400100','1435301','1436604','1416301','1426711') GROUP BY DIM_ITEMPERIOD) T1 ON T.SCODE = T1.DIM_ITEMPERIOD) ORDER BY DECODE (SNAME,'净利润',1,'研究与开发费',2,'利息支出',3,'其中：营业外收入',4,' 营业外支出',5)`
            _sql = _sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+_period+"'");
            items = {
                'cubeId': 4,
                'sql' : encodeURI(_sql)
            }
            this.eva_city_Request_first(items) ;
        }
        // _sql = _sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+_period+"'").replace(/:sn/g,"'"+_year+"'") ;
        // items = {
        //     'cubeId': 4,
        //     'sql' : encodeURI(_sql)
        // }
        // this.eva_city_Request_first(items) ;
      }      
    },
    // 数据请求
    eva_city_Request_first(items){
        // debugger
      let me = this ;
      eva_city_Request(items).then(res => {
          // debugger
          if(res.data.code === 200){
                me.ArrData = res.data.data ;
                // 单位的改变 元 、 千元 、 万元 、 亿元         
                if(me.conversionId.id > me.conversionNid){ // 大于默认的单位‘元’
                    let newId = me.conversionId.id ;
                    me.ArrData.forEach(items => {
                      // debugger
                      // items.B = Math.decimalToLocalString(items.B / newId) ;
                      items.B = items.B / newId ;
                    })
                }
                me.ArrData.forEach(item => {
                  // debugger
                  item.scode = "v" + item.scode + "A"  ;
                  if(!item.B){
                    item.B = 0 ;
                  }
                  me.exps[item.scode] = item.B ;
              }) ;
            }              
            //计算公式 资产总计
              // me.updatePjsData(["v1100100", "v1210100", "v1212001", "v1217001"]);
              
              console.log("me.ArrData:", me.ArrData) ;
              // debugger   
              me.setExpressionData();
              me.handleClick(me.vars[0]) ;         
          
      }) ; 
    },
    // 2.0
    eva_city_Request_second(items){
        let me = this ;
        // debugger
        eva_city_Request(items).then(res => {
          // debugger
            if(res.data.code === 200){
                me.ArrData2 = res.data.data ;
                // 单位的改变 元 、 千元 、 万元 、 亿元         
                if(me.conversionId.id > me.conversionNid){ // 大于默认的单位‘元’
                  let newId = me.conversionId.id ;
                  me.ArrData2.forEach(items => {
                    // debugger
                    items.A = items.A / newId ;
                    items.B = items.B / newId ;
                  })
                }
                me.ArrData2.forEach(item => {
                  // debugger
                  item.scodea = "v" + item.scode + "A"  ;
                  item.scodeb = "v" + item.scode + "B"  ;
                  if(!item.A){ item.A = 0 ; }
                  if(!item.B){ item.B = 0 ; }
                  me.exps[item.scodea] = item.A ;
                  me.exps[item.scodeb] = item.B ;
                }) ;
                // me.ArrData2.forEach(ress => {
                //   me.vars.forEach(recc => {
                //     // debugger
                //     if(ress.scode=="4101" && recc.code == "zbhfyqc"){
                //         recc.value = ress.A ;
                //         recc.display_num = ress.A ;
                //     }else if(ress.scode=="4101" && recc.code == "zbhfyqm"){
                //         recc.value = ress.B ;
                //         recc.display_num = ress.B ;
                //     }
                //   })
                // });
              //计算公式 资产总计
              me.updatePjsData(["v1100100", "v1210100", "v1212001", "v1217001","v1131604","v1131605","v1222711","v4101"]);
              console.log("me.ArrData:", me.ArrData) ; 
              // debugger  
              me.setExpressionData();        
            }
        })
    },
    setExpressionData() {
      debugger
      //营业外收支净额 营业外支出本期金额-营业外收入本期金额     
      this.exps.yywsrje = this.exps.v1426711A - this.exps.v1416301A;
      //资产负债率 = 负债合计期末余额/资产合计期末余额 *100
      this.exps.zcfzlv = (this.exps.v1200100B / this.exps.v1100100B) * 100;
      if (!this.exps.zcfzlv) {
        this.exps.zcfzlv = 0;
      }
      //税后净营业利润 = 净利润 + 研究与开发费 + 利息支出 + 营业外收支净额
      this.exps.yywsrlr =
        this.exps.v1400100A +
        this.exps.v1435301A_tz +
        this.exps.v1436604A_tz +
        this.exps.yywsrje_tz;

      //无息流动负债 = 流动负债-短期借款-一年内到期的长期负债
      this.exps.wxldfzA =
        this.exps.v1210100A - this.exps.v1212001A - this.exps.v1217001A;
      this.exps.wxldfzB =
        this.exps.v1210100B - this.exps.v1212001B - this.exps.v1217001B;
      this.exps.wxldfz_tz =
        this.exps.v1210100_tz - this.exps.v1212001_tz - this.exps.v1217001_tz;

      if(this.vars[2].value == 0){ 
          this.vars[2].display_num = '' ;
      }
      if(this.vars[3].value == 0){ 
          this.vars[3].display_num = '' ;
      }

      //资本化费用调整数
      this.exps.znhfy_tz = (this.vars[2].value + this.vars[3].value) / 2

      //资本占用金额 = 资产总额 - 无息流动负债 - 在建工程 - 工程物资 - 专项应付款 + 资本化费用
      this.exps.zbzyje =
        this.exps.v1100100_tz -
        this.exps.wxldfz_tz -
        this.exps.v1131604_tz -
        this.exps.v1131605_tz -
        this.exps.v1222711_tz +
        this.exps.znhfy_tz;
      // 无息流动负债 =  税后净营业利润-资本占用×资本成本率
      this.exps.shjlr =
        this.exps.wxldfz_tz - (this.exps.zbzyje * (this.vars[1].value / 100));     
    },
    updatePjsData(arr, code) {
      arr.forEach(element => {
        this.exps[element + "_tz"] =
          (this.exps[element + "A"] + this.exps[element + "B"]) / 2;
      });
    },
    updateTzhData(arr, newV) {
      arr.forEach(element => {
        // debugger
        this.exps[element + "_tz"] = this.exps[element] * (1 - newV / 100);
      });
    },
    handleClick(item) {
      this.$nextTick(() => {
        debugger;
        item.value = item.display_num;
        if(typeof item.value === "string"){
          //输入数字
          item.value = item.value.replace(/[^\d.]/g, "").replace(/^0/, "") - 0;
        }
        
          //税率
          if (item.code === "sl") {
            //调整后数据
            this.updateTzhData(
              ["v1435301A", "v1436604A", "v1416301A", "v1426711A"],
              item.value
            );
            //营业外收支净额 营业外支出本期金额-营业外收入本期金额
            this.exps.yywsrje = this.exps.v1426711A - this.exps.v1416301A;
            this.updateTzhData(["yywsrje"], item.value);
          }
          this.setExpressionData();

          //格式化数据
        if(item.value!=""){  
          debugger
          item.display_num = tools.currency(item.value, "", 2);
          // 清除localStorage里的名为 "majun" 的缓存信息  
          localStorage.removeItem("majun"); 
          // 把存储的信息塞到名为 "majun" 的字段里  
          localStorage.setItem("majun", JSON.stringify(this.vars)) ;
          // 读取localStorage里的majun的信息（注：必须转化，因为localStorage只能存字符串形式的）
          let cc = JSON.parse(localStorage.getItem("majun"));
          
        }
      });
    }
  }
};
</script>
<style scoped>
/* 导出、刷新按钮样式 */
.btn {
  width: 91px;
  color: #606266;
}
</style>

<style>
.el-icon-info {
  cursor: pointer;
}
.el-input__inner {
  text-align: right !important;
}
</style>

<style scoped>
table {
  background-color: transparent;
}
input {
  border: 0;
}
.textIndent {
  text-indent: 2em;
}
.br {
  text-align: right;
  /* padding: 0px !important; */
}
input.exps {
  display: none;
  /* width: 100%;
  height: 100%; */
  text-align: right;
}
span.expsv {
  width: 100%;
  height: 100%;
}
.bd {
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
.bc {
  text-align: center;
  vertical-align: middle;
  background: rgb(240, 248, 255) !important;
}

caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777;
  text-align: left;
}
th {
  text-align: left;
}
.table {
  /* width: 100%;*/
  max-width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  /* line-height: 1.42857143; */
  /* vertical-align: top; */
  border-top: 1px solid #ddd;
  background-color: #fff;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 2px solid #ddd;
}
.table .table {
  background-color: #fff;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
  color: #606266;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
  text-align: center;
  color: #909399;
  background: rgb(240, 248, 255);
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
table col[class*="col-"] {
  position: static;
  display: table-column;
  float: none;
}
table td[class*="col-"],
table th[class*="col-"] {
  position: static;
  display: table-cell;
  float: none;
}
.table > thead > tr > td.active,
.table > tbody > tr > td.active,
.table > tfoot > tr > td.active,
.table > thead > tr > th.active,
.table > tbody > tr > th.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > tbody > tr.active > td,
.table > tfoot > tr.active > td,
.table > thead > tr.active > th,
.table > tbody > tr.active > th,
.table > tfoot > tr.active > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #e8e8e8;
}
.table > thead > tr > td.success,
.table > tbody > tr > td.success,
.table > tfoot > tr > td.success,
.table > thead > tr > th.success,
.table > tbody > tr > th.success,
.table > tfoot > tr > th.success,
.table > thead > tr.success > td,
.table > tbody > tr.success > td,
.table > tfoot > tr.success > td,
.table > thead > tr.success > th,
.table > tbody > tr.success > th,
.table > tfoot > tr.success > th {
  background-color: #dff0d8;
}
.table-hover > tbody > tr > td.success:hover,
.table-hover > tbody > tr > th.success:hover,
.table-hover > tbody > tr.success:hover > td,
.table-hover > tbody > tr:hover > .success,
.table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6;
}
.table > thead > tr > td.info,
.table > tbody > tr > td.info,
.table > tfoot > tr > td.info,
.table > thead > tr > th.info,
.table > tbody > tr > th.info,
.table > tfoot > tr > th.info,
.table > thead > tr.info > td,
.table > tbody > tr.info > td,
.table > tfoot > tr.info > td,
.table > thead > tr.info > th,
.table > tbody > tr.info > th,
.table > tfoot > tr.info > th {
  background-color: #d9edf7;
}
.table-hover > tbody > tr > td.info:hover,
.table-hover > tbody > tr > th.info:hover,
.table-hover > tbody > tr.info:hover > td,
.table-hover > tbody > tr:hover > .info,
.table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3;
}
.table > thead > tr > td.warning,
.table > tbody > tr > td.warning,
.table > tfoot > tr > td.warning,
.table > thead > tr > th.warning,
.table > tbody > tr > th.warning,
.table > tfoot > tr > th.warning,
.table > thead > tr.warning > td,
.table > tbody > tr.warning > td,
.table > tfoot > tr.warning > td,
.table > thead > tr.warning > th,
.table > tbody > tr.warning > th,
.table > tfoot > tr.warning > th {
  background-color: #fcf8e3;
}
.table-hover > tbody > tr > td.warning:hover,
.table-hover > tbody > tr > th.warning:hover,
.table-hover > tbody > tr.warning:hover > td,
.table-hover > tbody > tr:hover > .warning,
.table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc;
}
.table > thead > tr > td.danger,
.table > tbody > tr > td.danger,
.table > tfoot > tr > td.danger,
.table > thead > tr > th.danger,
.table > tbody > tr > th.danger,
.table > tfoot > tr > th.danger,
.table > thead > tr.danger > td,
.table > tbody > tr.danger > td,
.table > tfoot > tr.danger > td,
.table > thead > tr.danger > th,
.table > tbody > tr.danger > th,
.table > tfoot > tr.danger > th {
  background-color: #f2dede;
}
.table-hover > tbody > tr > td.danger:hover,
.table-hover > tbody > tr > th.danger:hover,
.table-hover > tbody > tr.danger:hover > td,
.table-hover > tbody > tr:hover > .danger,
.table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc;
}
.table-responsive {
  min-height: 0.01%;
  overflow-x: auto;
}
@media screen and (max-width: 767px) {
  .table-responsive {
    width: 100%;
    margin-bottom: 15px;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
  }
  .table-responsive > .table {
    margin-bottom: 0;
  }
  .table-responsive > .table > thead > tr > th,
  .table-responsive > .table > tbody > tr > th,
  .table-responsive > .table > tfoot > tr > th,
  .table-responsive > .table > thead > tr > td,
  .table-responsive > .table > tbody > tr > td,
  .table-responsive > .table > tfoot > tr > td {
    white-space: nowrap;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:first-child,
  .table-responsive > .table-bordered > tbody > tr > th:first-child,
  .table-responsive > .table-bordered > tfoot > tr > th:first-child,
  .table-responsive > .table-bordered > thead > tr > td:first-child,
  .table-responsive > .table-bordered > tbody > tr > td:first-child,
  .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:last-child,
  .table-responsive > .table-bordered > tbody > tr > th:last-child,
  .table-responsive > .table-bordered > tfoot > tr > th:last-child,
  .table-responsive > .table-bordered > thead > tr > td:last-child,
  .table-responsive > .table-bordered > tbody > tr > td:last-child,
  .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0;
  }
  .table-responsive > .table-bordered > tbody > tr:last-child > th,
  .table-responsive > .table-bordered > tfoot > tr:last-child > th,
  .table-responsive > .table-bordered > tbody > tr:last-child > td,
  .table-responsive > .table-bordered > tfoot > tr:last-child > td {
    border-bottom: 0;
  }
}
</style>

