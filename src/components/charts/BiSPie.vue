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
      companyName: "",
      nameData: [],
      dataSource: [],
      options: {
        title: {
          text: this.companyName,
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
          // data: this.nameData
        },
        series: [
          {
            name: "风险级别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.item.options.datas.series[0].data,
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
      }
    };
  },
  created() {
    debugger;

    console.log(this.item);
    this.upData(this.item);

    // var obj = JSON.stringify(this.dataSource);
    // console.log(obj);
  },
  mounted() {
    // this.options.series[0].data = this.item.datas
  },
  methods: {
    upData(item) {
        // if (item) {
        //     this.item = item;
        // }
        // let datas = this.item.options.datas;
        // this.options.series[0].data = datas.series.data;
    }
  },
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
