<template>
  <div>
    <chart :options="receive" auto-resize/>
    <div class="smodal">
      <s-modal :dialogVisible.sync="dialogVisible" :vueChart="vueChart" :plateSelect="plateSelect"></s-modal>
    </div>
  </div>
</template>

<script>
import EventMixins from "../mixins/EventMixins";
import SModal from "@v/common/SModal";
export default {
  mixins: [EventMixins],
  components: {SModal},
  props: {
    item: {
      type: Object,
      default: {
        options: {
          type: "gauge",
          datas: "0.88"
        }
      },
      bnlj: 0,
      bnmb: 0
    }
  },
  // created() {
  //   //debugger;
  //   //console.log(this.item);
  // },
  data() {
    return {
      dialogVisible:false,
      vueChart:{
        content:this
      },
      plateSelect: {
        // id:"company",
        // data:""
      },
      receive: {
        title: {
          // 	padding:[410,0,0,0],    //标题相对于容器边距
          text: this.item.text,
          link: false,
          top: "10",
          x: "center", //标题块相对于容器位置
          // y:260,
          textAlign: "left",
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            // fontWeight: 'bold',
            fontSize: 16,
            color: "#8796B0",
            align: "center"
          }
        },
        tooltip: {
          //"{a}{b} : {c}% <br/>"+"本期累计:"+this.item.bnlj+"<br/> 本年目标:"+this.item.bnmb
          confine: true,
          formatter: ""
        },
        series: [
          {
            name: "目标完成率",
            type: "gauge",
            min: 0,
            max: 200, //设置最大刻度
            splitNumber:8,
            //设置仪表盘的园的程度，这里设置的是半圆
            startAngle: 170,
            endAngle: 10,
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.25, "#F24764"],
                  [0.5, "#FBCE14"],
                  [0.75, "#11C3C2"],
                  [1, "#2FC35B"]
                ],
                width: 20 //表盘宽度
              }
            },
            axisLabel: {
              textStyle: {
                // 属性lineStyle控制线条样式
                fontSize: 9 //改变仪表盘内刻度数字的大小
              }
            },
            center: ["50%", "70%"], //整体的位置设置
            radius: "85%", //仪表盘大小
            //设置指针样式
            pointer: {
              show: true,
              length: "65%",
              width: 5
            },
            detail: {
              //			      show:false,
              //格式化表盘的数据
              formatter: function(a,b,c){
              
                return Math.decimalToLocalString(a) + "%";
              },
              textStyle: {
                fontSize: 13
              },
              offsetCenter: [0, 20] // 文字块相对于圆心偏移量
            },
            data: [{ value: this.item.options.datas }],
            markPoint: {
              //最新发明，给指针中心加个空心轴
              symbol: "circle",
              symbolSize: 5,
              data: [
                //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                { x: "50%", y: "45%", itemStyle: { color: "#fff" } }
              ]
            }
          }
        ]
      }
    };
  },
  created() {
    // debugger
    // let me = this;
    // let GaData = this.item.datas;
    // let GItemScode = this.item.GItemScode;
    // if(GItemScode&&GaData&&GaData.length>0){
    //   GaData.forEach(element => {
    //     if(element.id==GItemScode){
    //       me.item.bnlj = element.bnlj;
    //       me.item.bnmb = element.bnmb;
    //     }
    //   });
    // }
    debugger;
    this.upData(this.item);
  },
  mounted() {},
  methods: {
    upData(item) {
      if (item) {
        this.item = item;
      }
      // debugger;
      let companyId = this.$store.getters.treeInfo.id;
      if (companyId == "121") {
        let fixedFirst = 0;
        let color = [
          [0.4, "#F24764"],
          [0.6, "#FBCE14"],
          [0.8, "#11C3C2"],
          [1, "#2FC35B"]
        ];
        this.receive.series[0].max = 125;
        fixedFirst = 50/125;
        this.receive.series[0].axisLine.lineStyle.color = color;
        this.receive.series[0].splitNumber = 5;
      } else {
        let fixedFirst = 0;
        this.receive.series[0].max = 200;
        fixedFirst = 50/200;
        this.receive.series[0].axisLine.lineStyle.color[0][0] = fixedFirst;
        this.receive.series[0].splitNumber = 8;
      }
      this.receive.series[0].data[0].value = item.options.datas; //.toLocaleString();
      let GItemScoded = item.GItemScode;
      let tempData = {};
      if (GItemScoded) {
        tempData = item.datas.filter(ele => {
          return ele.id == GItemScoded;
        }); //bnlj bnmb
      }
      // debugger
      let titleText = this.item.text.replace("（%）","");
      if (tempData && tempData.length > 0) {
        this.receive.tooltip.formatter =
          titleText + ":" + 
          Math.decimalToLocalString(item.options.datas) +"% <br/> 本年累计:" +
          Math.decimalToLocalString((tempData[0].bnlj || 0)) + "万元" +
          "<br/> 本年目标:" +
          Math.decimalToLocalString((tempData[0].bnmb || 0)) + "万元";
      } else {
        this.receive.tooltip.formatter =
          titleText + ":" + 
          Math.decimalToLocalString((0)) +"% <br/> 本年累计:" +
          Math.decimalToLocalString((0)) + "万元" +
          "<br/> 本年目标:" +
          Math.decimalToLocalString((0)) + "万元";
      }
    }
  }
};
</script>