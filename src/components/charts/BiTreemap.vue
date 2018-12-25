<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from "echarts";
import autoResize from "../mixins/AutoResize.js";
export default {
  props: {
    item: {
      type: Object
    },
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      diskData: []
    };
  },
  mixins: [autoResize],
  created() {
    this.axios.get("/echart/data/asset/data/disk.tree.json").then(response => {
      this.diskData = response.data;
      this.initChart();
    });
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      //   debugger;
      function colorMappingChange(value) {
        var levelOption = getLevelOption(value);
        this.chart.setOption({
          series: [
            {
              levels: levelOption
            }
          ]
        });
      }

      var formatUtil = echarts.format;

      function getLevelOption() {
        return [
          {
            itemStyle: {
              normal: {
                borderWidth: 0,
                gapWidth: 5
              }
            }
          },
          {
            itemStyle: {
              normal: {
                gapWidth: 1
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              normal: {
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          }
        ];
      }
      console.log(this.diskData);

      this.chart.setOption({
        title: {
          text: "Disk Usage",
          left: "center"
        },

        tooltip: {
          formatter: function(info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];

            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }

            return [
              '<div class="tooltip-title">' +
                formatUtil.encodeHTML(treePath.join("/")) +
                "</div>",
              "Disk Usage: " + formatUtil.addCommas(value) + " KB"
            ].join("");
          }
        },

        series: [
          {
            name: "Disk Usage",
            type: "treemap",
            visibleMin: 300,
            label: {
              show: true,
              formatter: "{b}"
            },
            itemStyle: {
              normal: {
                borderColor: "#fff"
              }
            },
            levels: getLevelOption(),
            data: this.diskData
          }
        ]
      });
    }
  }
};
</script>
