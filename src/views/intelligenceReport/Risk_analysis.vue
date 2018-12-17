<template>
        <div class="risk">
            <bi-pie v-if="item.datas.length" :item="item" id="ids" @click.native="item1()"></bi-pie>
            <bi-pie v-if="item.datas.length" :item="item"></bi-pie>
            <router-view/>
        </div>
</template>

<script type="text/ecmascript-6">
import BiPie from "@c/charts/BiPie.vue";
export default {
  components: {
    BiPie
  },
  data() {
    return {
      ids: "",
      chart: null,
      item: {
        text: "风险级别占比情况",
        datas: []
      }
    };
  },
  mounted() {
    this.add();
  },
  methods: {
    add() {
      this.axios.get("/api/Risk").then(response => {
        this.item.datas = response.data.content;
      });
    },
    item1() {
      this.$router.push("/list");
    }
    // initChart() {
    // var myChart = echarts.init(document.getElementById('item1'))
    // console.log(myChart)
    //     myChart.on('click',function(params){
    //         console.log(params.name)
    //     })
    // },
  }
};
</script>

<style lang="scss" scoped>
.risk {
  display: flex;
  margin: 20px;
}
// .item1,.item2{
//     width: 390px;
//     height: 337px;
//     margin-right:20px;
//     border:1px solid #ccc;
//     float: left;
// }
</style>