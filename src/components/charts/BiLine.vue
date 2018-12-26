<template>
  <chart :options.sync="receive" auto-resize/>
</template>

<script>
import EventMixins from "../mixins/EventMixins";
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
          text: this.item.text
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          default: {
            data: ["好", "坏"]
          }
        },
        grid: {
          default: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          default: {
            type: "category",
            boundaryGap: false,
            data: []
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "好",
            type: "line",
            smooth: false,
            data: []
          },
          {
            name: "坏",
            type: "line",
            smooth: false,
            data: []
          }
        ]
      }
    };
  },
  created() {
    debugger;
    this.upData();
    //Cnbi.apply(this.receive, this.item.options.datas);
    // debugger;
  },
  watch: {
    receive: {
      handler: function() {
        // this.options.series[0].data = this.item.options.datas
        //   ? this.item.options.datas.slice(1, 2)[0]
        //   : [];
      }
    }
  },
  methods: {
    upData(item) {
      debugger;
      if (item) {
        this.item = item;
      }
      let dd = this.item.options.datas;
      this.receive.xAxis = dd.xAxis;
      this.receive.series = dd.series;
      this.receive.legend.data = dd.legend;
    }
  }
};
</script>