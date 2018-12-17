<template>
  <chart :options="options" auto-resize/>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Pietest",
  props: {
    item: {}
  },
  data() {
    return {
      options: {
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
          left: "left",
          data: []
        },
        series: [
          {
            name: "风险级别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.item.datas,
            itemStyle: {
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
  created() {},
  mounted() {
    // this.options.series[0].data = this.item.datas
  },
  methods: {},
  watch: {
    item: {
      handler(newname, oldname) {
        console.log(newname);
        this.item = newname;
        // debugger
      },
      deep: true
    }
  }
};
</script>
