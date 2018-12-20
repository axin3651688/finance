<template>
  <chart :options="options" @click="item1()" auto-resize/>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Pietest",
  props: {
    item: {}
  },
  data() {
    return {
      nameData: [],
      dataSource: [],
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
          // data: []
          data: this.nameData
        },
        series: [
          {
            name: "风险级别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.getdDataSource(this.item),
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
    getdDataSource(item) {
      debugger;
      let title = this.item.options.getData.columns;
      this.nameData = title.map(function(name) {
        return name.id;
      });
      let dataObj = item.datas[0];

      delete dataObj.id;
      delete dataObj.text;
      delete dataObj.leaf;
      let dataArry = [];
      for (let i in dataObj) {
        dataArry.push(dataObj[i]);
      }
      let dataSource = [];
      console.log(dataArry);

      for (let index = 0; index < dataArry.length; index++) {
        dataSource.push({
          value: dataArry[index],
          name: this.nameData[index]
        });
      }
      return dataSource;
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
