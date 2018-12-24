<template>
  <chart :options="chartOptions"  auto-resize/>
  <!-- @click="item1()" -->
</template>
<script type="text/ecmascript-6">
import EventMixins from '../mixins/EventMixins'
export default {
  name: "BiAdvanceChart",
  mixins: [EventMixins],
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
    evalVaiables(chartOptions){
      let judgeLen = 5,prefix =  "this."; 
        for (var a in chartOptions) {
          let val = chartOptions[a]; 
          let type = typeof (val);
          if(type == "object") {
              this.evalVaiables(val); //递归遍历
          }else if(type == "string"){
             if(val.length > judgeLen){
               let start =  val.substring(0,judgeLen);
               if(start === prefix){
                    chartOptions[a] = eval(val);
               }
             }
           
         }
        }
      return chartOptions;
    },
    getDataSource(item) {
       if(this.item.chartOptions){
         this.evalVaiables(this.item.chartOptions);
         return this.item.chartOptions;
       }
      return this.getDefautlChartConfigByType();
    },
    upData(item) {
     
      let chartType = this.item.options.getData.type;
      if(chartType === 1){
        /**
         * 就是一个值数据的图形  dataRange   value
         */
      }else if(chartType === 2){
         /**
            * 单独系列数据的图形 说白了就是series.length = 1
          */
            this.chartOptions.series[0].data = this.item.options.datas;
      }else if(chartType === 3){
           /**
            * 多系列数据图形 说白了就是series.length > 1
            */
           this.chartOptions.series = this.item.options.datas.series;
      }
      
    },
    getDefautlChartConfigByType(){
         let chartSubType = this.item.options.getData.subType;
         if(chartSubType === "pie"){
            return this.getDefaultPieConfig();
         }
    },
    getDefaultPieConfig(){
      return {
        title: {
          text: this.item.text,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
          //     position:function(params){
          //     console.log(params)
          // }
        },
        legend: {
          orient: "vertical",
          left: "5%",
          top: "10%",
          // data: []
          data: []
        },
        series: [
          {
            name: this.item.text,
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            // data: this.item.datas,

            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>
