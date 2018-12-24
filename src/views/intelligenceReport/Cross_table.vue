<template>
  <div>
   <el-table 
   :data="rows"
   :span-method="arraySpanMethod"
    style="width: 100%">
    <el-table-column
      v-for="item in list"
      :key="item.id"
      prop="text"
      :label="item.text"
      width="150">
        <el-table-column v-if='item.children||item.children.length>0' v-for="item1 in item.children"
        :label="item1.text"  :key="item1.id">
          <el-table-column v-if='item1.children||item1.children.length>0' v-for="item2 in item1.children"
          :label="item2.text" :key="item2.id">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        list:[],
        rows:[
          
{id: "text", text: "经营规模及租金成本", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "年度总承包金", type: "string"},
{id: "text", text: "经营模式构成", type: "string"},
{id: "text", text: "亩承包金", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},



{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "面积（亩）", type: "string"}, 
{id: "text", text: "产品结构布局", type: "string"},
{id: "text", text: "产品结构布局", type: "string"},


        ]
      }
    },
    created(){
      this.axios.get("/api/cross").then(res => {
        console.log(res);
        this.list = res.data.config.columns
        // this.rows = res.data.config.rows
        // console.log(this.rows)
      })
    },
    methods:{
       arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        //  第几行
        debugger;
         if (rowIndex === 0) {
          //  第几列
           if (columnIndex === 0) {
            //  取第一列的9行取1列
            return {rowspan:9,colspan:1}
            } 
         }
         else if (rowIndex===1 || rowIndex===5) {
           if(columnIndex === 0){
             return [4, 1];
            }
          }

           if (rowIndex === 9) {
          //  第几列
           if (columnIndex === 0) {
            //  取第一列的9行取1列
            return [15,1];
            } 
         }
         else if (rowIndex===1 || rowIndex===5) {
           if(columnIndex === 0){
             return [4, 1];
            }
          }


          //  if (columnIndex === 0) {
          //    if(rowIndex  === 3){
          //       return {
          //       rowspan: 5,
          //       colspan: 1
          //     };
          //     } else if (rowIndex  === 8) {
          //       return {
          //       rowspan: 7,
          //       colspan: 1
          //     };
          //     }else{
          //       return {
          //       rowspan: 0,
          //       colspan: 0
          //     };
          //     }
          //    }




        // if (rowIndex % 2 === 0) {
        //   if (columnIndex === 0) {
        //     return [1, 2];
        //   } else if (columnIndex === 1) {
        //     return [0, 0];
        //   }
        // }

        // 列
        // if (columnIndex === 0) {
        //   if (rowIndex % 3 === 0) {
        //     return {
        //       rowspan: 3,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     };
        //   }
        // }



      }
    }
  }
</script>