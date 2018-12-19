<template>
  <chart :options="options" auto-resize/>
</template>
<script>
import EventMixins from '../mixins/EventMixins'
export default {
  mixins: [EventMixins],
  props: {
    item: {}
  },

  data() {
    return {
      options: {
        title: {
          text: this.item.text
        },
        //提示框，鼠标悬浮交互时的信息提示
        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          textStyle: {
            color: "#000"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        //  位置
        grid: {
          top: 60,
          left: "4%",
          right: "4%",
          bottom: "4%",
          backgroundColor: "#666",
          containLabel: true
        },
        // 工具
        toolbox: {
          show: true,
          feature: {
            //辅助线标志
            mark: {
              show: true
            },
            //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
            dataView: {
              show: true,
              readOnly: false
            },
            //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
            saveAsImage: {
              show: true
            }
          }
        },
        //是否启用拖拽重计算特性，默认关闭(即值为false)
        // calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.item.options.datas[0],
            // 坐标轴刻度相关设置。
            axisTick: {
              // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。如下图：
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            // 数据堆叠
            stack: "vistors",
            barWidth: "35%",
            data: this.item.options.datas[1],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = [
                    "#3AA1FF",
                    "#13C2C2",
                    "rgb(25,46,94)",
                    "rgb(195,229,235)"
                  ];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.upData();
  },
  // mounted(){
  //    let me = this;
  //   if(me.item.mixins.methods.itemClick){
  //     this.$children[0].chart.on('click',function(params){
  //        me.item.mixins.methods.itemClick(me,params);
  //     });
  //   }
  // },

  watch: {
    item: {
      handler: function() {
        this.upData();
      }
    }
  },
  methods: {
    upData(item) {
      if (item) {
        this.item = item;
      }
      let datas = this.item.options.datas;
      this.options.xAxis.data = datas[0];
      this.options.series[0].data = datas[1];
    }
  }
};
</script>