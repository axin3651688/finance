<template>
  <charts :options="chartOptions" auto-resize/>
  <!-- <chart :options="map" auto-resize/> -->
  <!-- @click="item1()" -->
</template>
<script type="text/ecmascript-6">
import ECharts from "./ECharts.vue";
import EventMixins from "../mixins/EventMixins";
import bar from "./data/bar.js";
import funnel from "./data/funnel.js";
import pie from "./data/pie.js";
import gauge from "./data/gauge.js";
import radar from "./data/radar.js";
import line from "./data/line.js";
import sunburst from "./data/sunburst.js";
import themeRiver from "./data/themeRiver.js";
import map from "./map/map";
import chinaMap from "./map/china.json";
import scatter from "./data/scatter.js";
import sankey from "./data/sankey.js";

ECharts.registerMap("china", chinaMap);

export default {
  // name: "BiAdvanceChart",
  mixins: [EventMixins],
  props: {
    item: {}
  },
  components: {
    charts: ECharts
  },
  data() {
    return {
      chartOptions: this.getDataSource(this.item)
    };
  },
  created() {
    this.upData(this.item);
  },
  mounted() {
    // console.log(this.item.options.datas);
  },
  methods: {
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
    /**
     * 提示信息格式化（千分位，两位小数）
     * zdk   2019-1-8 16:36:03
     */
     getToolTip(options){
      return {
          trigger: "item",
          formatter:function(a,b,c,d){
            // debugger;
            let aa = options,unitObj = options.unitObj || {};
            if(unitObj && unitObj.mult && !isNaN(unitObj.mult) && unitObj.unitName ){
                if( ["户","个"].indexOf(unitObj.unitName) != -1 ){
                  //户数自动截取掉小数点后面的
                  let value = Math.decimalToLocalString(a.value/unitObj.mult);
                  value = value.substring(0,value.indexOf("."));
                  // return a.name + ":" + Math.numberToLocalString(a.value/unitObj.mult,null,null,0) + unitObj.unitName + "("+ Math.decimalToLocalString(a.percent) +"%)";  //龚总方法没加
                  return a.name + ":" + value + unitObj.unitName + "("+ Math.decimalToLocalString(a.percent) +"%)";
                }
                  return a.name + ":" + Math.decimalToLocalString(a.value/unitObj.mult) + unitObj.unitName + "("+ Math.decimalToLocalString(a.percent) +"%)";
              }
                return a.name + ":" + Math.decimalToLocalString(a.value) + "("+ Math.decimalToLocalString(a.percent) +"%)";
          }
      };
    },
    getDataSource(item) {
      let options = item.chartOptions;
      if (!item.options.unUseDefaultConfig && options) {
        //不使用默认配制
        let defaultOptions = this.getDefautlChartConfigByType();
        Cnbi.applyDeepIf(options || {}, defaultOptions);
      }
    // 图例数据千分位，两位小数处理  zdk 
      // this.setToolTip(options,items);
       options.tooltip = this.getToolTip(options);
      this.evalVaiables(options);
      // console.log(options);
      return options;
    },
    upData(item) {
      debugger;
      console.log(item);
      let chartType = item.options.getData.type,
        subType = this.item.options.subType;
      // debugger;
      // console.log(this.item.options.datas);

      if (chartType === 1) {
        /**
         * 就是一个值数据的图形  dataRange   value
         */
        this.chartOptions.series[0].data = this.item.options.datas; // [{ value: item.options.datas, name: "完成率" }];
      } else if (chartType === 2) {
        /**
         * 单独系列数据的图形 说白了就是series.length = 1
         */
        if (subType == "pie") {
          this.chartOptions.legend.data = this.item.options.datas.map(item => {
            return item.name;
          });
          this.chartOptions.series[0].data = this.item.options.datas;
          debugger;
          //echart图的回调函数。此时写在最后是因为暂时是在最后解决问题，可以再别的地方
          if(this.item.chartListeners){
            let lisConfig = this.item.chartListeners;
            if(lisConfig[lisConfig.way] && typeof lisConfig[lisConfig.way] == "function"){
              lisConfig[lisConfig.way](this.chartOptions,this);
            };
          }
        } else if (subType == "gauge") {
          this.chartOptions.series[0].data = [
            { value: this.item.options.datas[0].value }
          ];
        } else if (subType == "funnel") {
          // console.info(this.item);
          console.log(subType + "我是漏斗");

          this.chartOptions.series[0].data = this.item.options.datas;
        } else {
          let datas = item.options.datas;
          this.chartOptions.xAxis.data = datas[0];
          this.chartOptions.series[0].data = datas[1];
        }
      } else if (chartType === 3) {
        /**
         * 多系列数据图形 说白了就是series.length > 1
         */
        let datas = item.options.datas;
        // this.chartOptions.title = this.item.text;
        this.chartOptions.series = datas.series;
        this.chartOptions.xAxis = datas.xAxis;
        this.chartOptions.legend.data = datas.legend;
      }
    },
    getDefautlChartConfigByType() {
      let chartSubType = this.item.options.subType;
      if (!chartSubType) {
        console.error("没有正确的配置chart类型");
        return;
      }
      // console.log(chartSubType);
      // debugger;

      switch (chartSubType) {
        case "bar":
          return bar();
          break;
        case "funnel":
          return funnel();
          break;
        case "pie":
          return pie();
          break;
        case "gauge":
          return gauge();
          break;
        case "line":
          return line();
          break;
        case "radar":
          return radar();
          break;
        case "sankey":
          return sankey();
          break;
        case "sunburst":
          return sunburst();
          break;
        case "themeRiver":
          return themeRiver();
          break;
        default:
          break;
      }
    }
  }
};
</script>
