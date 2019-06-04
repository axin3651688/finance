<template>
  <chart :options.sync="receive" auto-resize/>
</template>

<script>
export default {
props: {},
data() {
    return {
        receive : {
            title: {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
            },
            series: [
                {
                    name: '2012年',
                    type: 'bar',
                    itemStyle: {   
                        //通常情况下：
                        normal:{  
        　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                                var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                                return colorList[params.dataIndex];
                            }
                        },
                        //鼠标悬停时：
                        // emphasis: {
                        //         shadowBlur: 10,
                        //         shadowOffsetX: 0,
                        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                        // }
                    },
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        }
    };
},
  mounted() {
    // this.upData();
  },
  watch: {},
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