<template>
    <bi-table v-if="item&&item.xtype == 'bi-table'" :item = "item"></bi-table>
    <bi-text  v-else-if="item&&item.xtype == 'text'"  :item = "item"></bi-text>     
    <bi-chart v-else-if="item&&item.xtype == 'chart'" :item = "item"></bi-chart>         
</template>

<script>
import BiTable from "./table/table";
import BiChart from "./chart";
import BiText from "./text/text";
export default {
  props: ["item", "config"],
  components: {
    BiTable,
    BiChart,
    BiText
  },
  data() {
    return {
      flag: false,
      params: {
        dims: {
          period: "201605",
          company: "1"
          //,itempoint:"1111122,1111123,1111221"
        },
        dimName: "itemperiod", //行项目的Id
        // sort:"B",
        //    unionDimName:"company", //行项目列名为：factId$unionDimId
        // groupBy:"id",
        //   showDims:"company",  //company_1
        // "helpDims":"111",
        order: "desc" //direction
      }
    };
  },
  created() {
    debugger;
    console.log(this.item);

    this.generateApiModelDatas(this, this.params);
  },
  mounted() {
    // let config = this.item.config;
    // let parent = this.$parent;
  },
  methods: {
    loadItems(item) {
      return item;
    },
    setItems(item, flag) {
      //
      // debugger;
      this.$set(this, "item", item);
      this.$set(this, "flag", true);
    },
    /**
     * 取数总接口
     */
    generateApiModelDatas(item, params) {
      try {
        let config = item.config;
        Cnbi.paramsHandler(config, params);
        let dataType = config.type || 1;
        if (config.sql) {
          params.sql = config.sql;
          this.setDatas(item, params);
        } else if (config.cube) {
          this.setDatas(item, params);
        } else if (config.defined) {
          return config.datas;
        } else if (config.random) {
          this.queryDataAfter(
            item,
            Math.createRandomDatas(
              config.rows,
              config.columns,
              config.range,
              dataType
            )
          );
        }
      } catch (error) {
        console.log(item);
        console.error(error);
      }
    },
    queryDataAfter(item, datas) {
      item.datas = datas;

      this.$set(this, "datas", datas);
      this.$set(this, "flag", true);
    },
    setDatas(item, params) {
      this.axios({
        method: "post",
        url: "/get/cube/find/",
        params: params
      })
        .then(res => {
          //debugger;
          this.queryDataAfter(item, res.data.data);
        })
        .catch(res => {
          console.info(res);
        });
    }
  }
};
</script>
