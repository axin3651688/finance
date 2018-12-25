<template>
  <div class="a">
    <!-- :span-method="rowSpanAndColSpanHandler "  :span-method="arraySpanMethod" -->
   <el-table 
   :data="rows"
   :span-method="objectSpanMethod"
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
        spanArr:[],
        arr:[],
        list:[],
        rows:[
          {id:35,text:"行项目四",A:25,B:545,group:2,groupName:"bb公司"},
          {id:36,text:"行项目五",A:25,B:545,group:2,groupName:"bb公司"},
          {id:37,text:"行项目六",A:25,B:545,group:2,groupName:"bb公司"},

          {id:23,text:"行项目一",A:25,B:545,group:1,groupName:"xx公司"},
          {id:24,text:"行项目二",A:25,B:545,group:1,groupName:"xx公司",rowspan:1},
          {id:25,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司",rowspan:1},
          {id:35,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司",rowspan:1},
          {id:36,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司",rowspan:1},
          {id:37,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司"},
          {id:38,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司"},
          {id:39,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司"},
          {id:40,text:"行项目三",A:25,B:545,group:1,groupName:"xx公司"},

          {id:36,text:"行项目三",A:25,B:545,groupName:"xx公司"},
          {id:37,text:"行项目三",A:25,B:545,groupName:"xx公司"},
          {id:38,text:"行项目三",A:25,B:545,groupName:"xx公司"},
          {id:39,text:"行项目三",A:25,B:545,groupName:"xx公司"},
        ],
        // groupConfig:{
        //     idProperty:"group",
        //     textProperty:"groupName"
        // },
        unionCloumns:[0,1,2,3,4,5,6,7]
      }
    },
    created(){
      console.log("11",this.arr)
      console.log("12",this.spanArr)
      
      this.axios.get("/api/cross").then(res => {
        console.log(res);
        this.list = res.data.config.columns
        // this.rows = res.data.config.rows
        // console.log(this.rows)
      })
      this.rows.forEach((item,index)=>{
        item.index = index
      })
      // this.getCellRowSpan(this.rows)
    },
    mounted(){
      this.getSpanArr(this.rows);
    },
    methods:{

      //  getCellRowSpan(datas,row,config){
      //   return datas.filter(record=>record[config.idProperty] === row[config.idProperty]).length;
      // },

      // rowSpanAndColSpanHandler({row, column, rowIndex, columnIndex}){
      //   debugger
      //   let config =  this.groupConfig;
      //   let cells = {rowspan:0,colspan:0};
        // let rowspan = this.rows[0].rowspan

      //哪一列合并多少行，可以传过来，如果没有传的话，就再计算一下
      // if(this.unionCloumns.indexOf(columnIndex) != -1){
      //    let datas = this.$children[0].data;
      //   //  console.log(datas)
      //    let rowspan = row.rowspan || this.getCellRowSpan(datas,row,config) || 0 ;
      //    cells.rowspan = rowspan;
      // }
      
      //哪一行合并多少列，通过数据传过来
      // if(row.colspan){
      //     cells.colspan = row.colspan;
      // }
      // Todo colspan from where...? 
      //  return cells;

      // },

       getSpanArr(data) {　
          for (var i = 0; i < data.length; i++) {
            console.log(data[i].rowspan)
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
            if (data[i].group === data[i - 1].group) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } 
              else {
                this.spanArr.push(1);
                this.pos = i;
              }
              if( data[i].rowspan === data[i - 1].rowspan){
                this.arr[this.pos] += 1;
                this.arr.push(0);
              }
              else {
                this.arr.push(1);
                this.pos = i;
              }
            }
        }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(this.item &&  this.item.colAndRowSan && typeof(colAndRowSan) == "function"){
          return this.item.colAndRowSanHandler({ row, column, rowIndex, columnIndex });
      }
        //   if (columnIndex === this.unionCloumns[0]) {
        //     const _row = this.spanArr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     // console.log("行",_row);
        //     // console.log("列",_col);
        //     return {
        //           rowspan: _row,
        //           colspan: _col
        //     }
        //   }
        //  if (columnIndex === this.unionCloumns[1]) {
        //     const _row = this.arr[rowIndex];
        //     const _col = _row > 0 ? 1 : 0;
        //     // console.log("行",_row);
        //     // console.log("列",_col);
        //     return {
        //           rowspan: _row,
        //           colspan: _col
        //     }
        //   }
        }
    }
  }

  // 获取行的位置就要获取列的位置
</script>
<style lang = "scss" scopde>
   .a {
     .el-table td{
       padding:4px 0;
     }
   }
</style>
