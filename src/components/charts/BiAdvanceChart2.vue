<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
  <!-- @click="item1()" -->
</template>
<script type="text/ecmascript-6">
import EventMixins from "../mixins/EventMixins";
import pie from "./data/pie.js";
import gauge from "./data/gauge.js";
import autoResize from "../mixins/AutoResize.js";
export default {
  name: "BiAdvanceChart",
  mixins: [EventMixins,autoResize],
  props: {
    item: {}
  },
  data() {
    return {
      chartOptions: this.getDataSource(this.item)
    };
  },
  created() {
    // var obj = JSON.stringify(this.dataSource);
    // console.log(obj);
  },
  mounted() {
    // this.options.series[0].data = this.item.datas
  },

  methods: {
    item1() {
      this.$router.push("/list");
    },
    /** 
     *  动态替换配制中的变量 
     *  var third = eval('('+ str +')');
     *   var forth = eval('(function(){return '+ str +';})()');
     *   var second = (new Function('return '+ str +';'))();
         var second = new Function('return '+ str +';')();
     */
    evalVaiables(chartOptions) {
      let judgeLen = 5,
        prefix = "this.";
      for (var a in chartOptions) {
        let val = chartOptions[a];
        let type = typeof val;
        if (type == "object") {
          this.evalVaiables(val); //递归遍历
        } else if (type == "string") {
          if (val.length > judgeLen) {
            let start = val.substring(0, judgeLen);
            if (start === prefix) {
              chartOptions[a] = eval(val);
            }
          }
        }
      }
      return chartOptions;
    },
    getDataSource(item) {
      // if (item.chartOptions) {
      //   debugger;
      //   this.evalVaiables(item.chartOptions);
      //   return item.chartOptions;
      // }
      return this.getDefautlChartConfigByType();
    },
    upData(item) {
      let chartType = item.options.getData.type;

      if (chartType === 1) {
        /**
         * 就是一个值数据的图形  dataRange   value
         */
      } else if (chartType === 2) {
        /**
         * 单独系列数据的图形 说白了就是series.length = 1
         */
        this.chartOptions.series[0].data = item.options.datas;
      } else if (chartType === 3) {
        /**
         * 多系列数据图形 说白了就是series.length > 1
         */
        let datas = item.options.datas;
        this.chartOptions.series = datas.series;
        this.chartOptions.xAxis = datas.xAxis;
        this.chartOptions.legend.data = datas.legend;
      }
    },
    getDefautlChartConfigByType() {
      let chartSubType = this.item.options.getData.subType;
      if (!chartSubType) {
        console.error("没有正确的配置chart类型");
        return;
      }
      console.log(typeof chartSubType);
      debugger;
      switch (chartSubType) {
        case "pie":
          return pie(this.item);
          break;
        case "gauge":
          console.log(chartSubType);
          debugger;
          return gauge(this.item);
          break;
        case "pie":
          return pie(this.item);
          break;

        default:
          break;
      }
      // return pie(this.item);
      // return eval(chartSubType + "()");
    }
  }
};
</script>
