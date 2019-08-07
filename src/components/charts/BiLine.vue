<template>
  <chart :options.sync="receive" auto-resize/>
</template>

<script>
import EventMixins from '../mixins/EventMixins'
export default {
  mixins: [EventMixins],
  props: {
    item: {
      type: Object,
      default: {
        type: "bi-gauge",
        datas: [
          {
            A: 23,
            B: 23,
            id: "143660303",
            text: " 利息收入",
            title: "$660301"
          }
        ]
      }
    }
  },

  data() {
    return {
      receive: {
        title: {
          text: this.item.text,
          x:"center",
          top:"10",
          textStyle:{
            fontSize:16,
            color: '#8796B0'
          }
        },
        // tooltip: {
        //   trigger: "axis"
        //   ,
        //   formatter:function(a,b,c,d,e){
        //     debugger;
        //     let value = "";
        //     if(a && a.length > 0){
        //       value += a[0].name + "指标如下:<br>";
        //       a.forEach(ele => {
        //         debugger;
        //         value += ele.seriesName + ":" + Math.decimalToLocalString(ele.data)  + "<br/>";
        //       });
        //     }
        //     return value;
        //     // return Math.decimalToLocalString(b);
        //   }
        // },
        legend: {
          // default: {
            data: ["好", "坏"],
          // },
          textStyle:{
            fontSize:10
          },
          x:"center",
          y:"90%"
        },
        grid: {
          // default: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          // }
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],
          axisLabel : {
              textStyle: {
                  fontSize: 10
                  
              }
          }
        },
        yAxis: [
          {
            type: "value",
            axisLabel : {
              textStyle: {
                fontSize: 10
              }
            }
            // ,
            // formatter: function(a,b,c){
            //   debugger
            //   return Math.decimalToLocalString(a) + "%";
            // },
          },
          {
            type: "value",
            axisLabel : {
                textStyle: {
                    fontSize: 10
                    
                }
            },
            splitLine:{
              show:false
            }
          }
        ],
        series: [
          {
            name: "好",
            type: "line",
            smooth: true,
            data: []
          },
          {
            name: "坏",
            type: "line",
            smooth: true,
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.upData();
    //Cnbi.apply(this.receive, this.item.options.datas);
    // debugger;
  },
  watch: {
    // receive: {
    //   handler: function(old, newValue) {
    //     let me = this;
    //   },
    //   deep: true
    // }
  },
  methods: {
    upData(item) {  
      if (item) {
        this.item = item;
      }
      let dd = this.item.options.datas;
      this.handleDataFormat(dd);
      this.receive.xAxis = dd.xAxis;
      this.receive.series = dd.series;
      //颜色的设置
      if(this.item.options.color){
        this.receive.color = this.item.options.color;
      }
      let me = this;
      me.unit = {};
      if( dd.series){
        dd.series.forEach(aa =>{
          if(aa.unit){
            me.unit[aa.name] = aa.unit;
          }
        });
      }
      let tooltip = {
          trigger: "axis",
          formatter:function(a,b,c,d,e){
            let value = "";
            if(a && a.length > 0){
              value += a[0].name + "指标如下:<br>";
              //过滤掉父公司。
              // a = me.parseItemsOfCompany(a);
              a.forEach(ele => {
                let unitFlag = false;
                //判断是否有unit
                for(let porp in me.unit){
                  unitFlag = true;
                  break;
                }
                if(unitFlag){
                  if(me.unit[ele.seriesName] == "%"){
                    ele.data = ele.data * 100;
                  }
                  value += ele.seriesName + ":" + Math.decimalToLocalString(ele.data)  + me.unit[ele.seriesName] + "<br/>";
                }else{
                  value += ele.seriesName + ":" + Math.decimalToLocalString(ele.data)  +  "<br/>";  //如果没有unit  那就默认不给单位
                }
              });
            }
            return value;
          }
        };
      tooltip.formatter.call(this,me.unit);
      this.receive.tooltip = tooltip;

      // if(dd.series && dd.series.length > 0){
      //   dd.series.forEach(element => {
      //     if(element.data && element.data.length){
      //       element.data.forEach(function(tt,indx){
      //         tt = Math.decimalToLocalString(tt);
      //       });
      //     }
      //   });
      // }
      this.receive.legend.data = dd.legend;
      
    },
    /**
     * 管理驾驶的指标的根据单体、合并变化。
     * @author szc 2019年4月17日16:01:27
     */
    parseItemsOfCompany (aItems) {
      let me = this,arr = [],series = this.item.options.datas.series;
      if(aItems.length > series.length){
        for(let i = 0; i < aItems.length; i++){
          let it = aItems[i];
          for(let j = 0; j < series.length; j++){
            let serItem = series[j];
            if(it.seriesName == serItem.name){
              arr.push(it);
            }
          }
        }
      }else {
        arr = aItems;
      }
      return arr;
    },
    handleDataFormat (dd) {
      //加一个y轴的对应
      if(dd && dd.series && dd.series.length > 0){
        dd.series.forEach(ele => {
          if(ele.unit && ele.unit === "%"){
            ele.yAxisIndex = 1;
          }else {
            ele.yAxisIndex = 0;
          }
        });
      }
    }
  }
};
</script>