<template>
  <div>
    <el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）">
      </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）">
      </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      spanArr:[],
        tableData6: [{
          id: '1',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '1',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '2',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '2',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '2',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '2',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        column_row_offset: {  
        id: [4, 2, 1,1,1,1],  
        name: [2, 1, 1, 1,1,1,1],  
        amount1: [1, 1, 1, 1, 1,1,1,1],  
        amount2: [1, 1, 1, 1, 1,1,1,1],  
        amount3: [1, 1, 1, 1, 1,1,1,1]  
      },  
      now_col_row_num: {},  
      now_col_offset: {}
      };
    },
    
    mounted(){
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.getSpanArr(this.tableData6);
    },
    methods: {  
      getSpanArr(data) {　
        //   for (var i = 0; i < data.length; i++) {
        //     if (i === 0) {
        //       this.spanArr.push(1);
        //       this.pos = 0
        //     } else {
        //       // 判断当前元素与上一个元素是否相同
        //     if (data[i].id === data[i - 1].id) {
        //         this.spanArr[this.pos] += 1;
        //         this.spanArr.push(0);
        //       } else {
        //         this.spanArr.push(1);
        //         this.pos = i;
        //       }
        //     }
        // }


        let spanOneArr = [],
      spanTwoArr = [],
      concatOne = 0,
      concatTwo = 0;
  data.forEach((item,index)=>{
    if(index === 0){
      spanOneArr.push(1);
      spanTwoArr.push(1);
    }else{
      if(item.topic === data[index - 1].id){ //第一列需合并相同内容的判断条件
        spanOneArr[concatOne] += 1;
        spanOneArr.push(0);
      }else{
        spanOneArr.push(1);
        concatOne = index;
      };
      if(item.name === data[index - 1].name){//第二列和第16列需合并相同内容的判断条件
        spanTwoArr[concatTwo] += 1;
        spanTwoArr.push(0);
      }else{
        spanTwoArr.push(1);
        concatTwo = index;
      };
    }
  });
  return  {
    one: spanOneArr,
    two: spanTwoArr
  }

    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (!this.now_col_row_num[column.property]) {  
      //   this.now_col_row_num[column.property] = Object.assign([], this.column_row_offset[column.property]);  
      //   let a = this.now_col_row_num[column.property].shift();  
      //   this.now_col_offset[column.property] = a;  
      //   return {  
      //     rowspan: a,  
      //     colspan: 1  
      //   };  
      // } else if (rowIndex >= this.now_col_offset[column.property]) {  
      //   let a = this.now_col_row_num[column.property].shift();  
      //   this.now_col_offset[column.property] += a;  
      //   return {  
      //     rowspan: a,  
      //     colspan: 1  
      //   };  
      // } else {  
      //   return {  
      //     rowspan: 0,  
      //     colspan: 0  
      //   };  
      // }  



          // if (columnIndex === 0) {
          //   const _row = this.spanArr[rowIndex];
          //   const _col = _row > 0 ? 1 : 0;
          //   // alert(_row);
          //   // alert(_col);
          //   return {
          //         rowspan: _row,
          //         colspan: _col
          //   }
          // }
        }
       }
  };
</script>