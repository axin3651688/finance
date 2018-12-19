<template>
  <el-table
    :data.sync="(item.config.rows && item.config.rows.length > 0)?item.config.rows : item.datas"
    border
    :stripe="true"
    style="width: 100%;"
    height="item.height || 480"
    :cell-style="cellStyle"
    :header-cell-style="{background:'#F0F8FF'}"
  >
    <el-tag v-for="cc in item.config.columns" v-bind:key="cc.id" v-if="!cc.hidden">
      <bi-table-column-tree :col="cc" :data.sync="item" ref="tchild"/>
      <!-- <bi-table-column v-else :col="cc" :data.sync="item" ref="child"/>   -->
    </el-tag>
  </el-table>
</template>
<script>
import BiTableColumn from "./table/BiTableColumn";
import BiTableColumnTree from "./table/BiTableColumnTree";
export default {
  name: "BiTable",
  components: {
    BiTableColumn,
    BiTableColumnTree
  },
  props: ["item"],
  data() {
    return {
      id: 0,
      text: "",
      rows: [],
      columns: [],
      //   datas:{},
      dataUrl: "",
      cubeId: { id: 2, text: "江苏农垦" },
      dims: {
        company: { id: "1", text: "江苏农垦" },
        period: { id: 201608, text: "2016年8月" },
        unit: { id: 10000, text: "万元" },
        items: [] //根据行配制生成的
      }
    };
  },

  created() {
    debugger;
    console.log(this.item);
    //this.$set(this.item,"datas",null);
    //debugger;
    //this.getTableDataParams();
  },
  mounted() {
   // debugger;
    //document.getElementsByClassName("el-tabs__item")[0].click();
  },

  methods: {
    getDatas(item) {
      let rows = item.config.rows;
      if (rows && rows.length > 0) {
        return rows;
      }
      return item.datas;
    },

    upData(item) {
            this.$set(this.item,"datas",item.datas);
            this.$set(this,"item",item);
            let refs = this.$refs;
            if(refs){
                if(refs.child){
                   refs.child.forEach(children=>{
                   if(children.upData){
                      children.upData(item);
                   }
                   
              })
            }
             if(refs.tchild){
                 refs.tchild.forEach(children=>{
                  if(children.upData){
                      children.upData(item);
                   }
              })
            }
            }
      },

    cellStyle(row, column, rowIndex, columnIndex) {
      let css = "padding: 4px 0;";
      if (row.column.label === "项目") {
        return css + "font-weight:bold";
      } else {
        return css;
      }
    },

    async getList() {
      let { data } = await this.axios.get("/api/cube/find_dim2/company/0/1/");
      console.log(data);
      this.list = data;
      return data;
    },

    getTableDataParams(rows) {
      //   var ddd =  this.getList();
      //   console.info(ddd);
      // sql:"select * from dw_dimcompany"
      // if(rows && rows.length > 0){

      //  }
      //  return ;

      //debugger;
      // this.axios.get("/api/cube/find_dim2/company/0/1/").then(res =>{
      // debugger;
      // });
      //    debugger;
      // 1111122	应收账款
      //1111123	预付款项
      // 1111221	其他应收款
      debugger;
      let url = "/get/cube/find/";
      var params = {
        cubeId: this.cubeId.id,
        subject: "0001",
        fact: "A,B,C,D",
        //periodCount:2,
        dims: {
          period: "201505,201605",
          // company:"1,1500",
          itempoint: "1111122,1111123,1111221"
        },
        dimName: "itempoint", //行项目的Id
        // sort:"B",
        //    unionDimName:"company", //行项目列名为：factId$unionDimId
        // groupBy:"id",
        //   showDims:"company",  //company_1
        //"helpDims":"111",
        order: "desc" //direction
      };
      params = {
        cubeId: this.cubeId.id,
        subjects: [
          {
            id: "1016",
            fact: "val_B",
            dims: {
              indicator: "236,19",
              fact: "B"
            },
            //   m:"0 as A,val as B, 0 as C",//辅助性度量设置
            dimName: "indicator"
          },
          {
            id: "0001",
            fact: "B",
            dims: {
              itempoint: "1111122,1111123,1111221"
            },
            dimName: "itempoint"
          },
          {
            id: "0002",
            fact: "B",
            dims: {
              itemperiod: "1416001,1403100"
            },
            dimName: "itemperiod"
          }
        ],
        dims: {
          period: "201505,201605",
          company: "1"
        },
        periodCount: 2
      };
      params.subjects = JSON.stringify(params.subjects);
      this.axios({
        method: "post",
        url: url,
        params: params
      })
        .then(res => {
          debugger;
          console.info(res);
        })
        .catch(res => {
          debugger;
          console.info(res);
        });
    }
  }
};
</script>
<style scoped>
.el-table td,
.el-table th {
  padding: 5px 0;
}
</style>
