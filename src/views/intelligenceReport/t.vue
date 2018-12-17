<template>
  <div>
      <!-- <div id="hotTable" class="hotTable" v-if="flag">
           <HotTable :root="root" ref="testHot" :settings="hotSettings" ></HotTable>
      </div> -->
      <hot-table :settings="hotSettings"></hot-table>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
  export default {
    data: function () {
      return {
        flag:false,
        root: 'test-hot',
        hotSettings: {
          data: [        //数据，可以是数据，对象
            [1,2,3,4,5,6,7,8,9,0,1,2,3,4],
            [1,2,3,4,5,6,7,8,9,0,1,2,4,3],
            [1,2,3,4,5,6,7,8,9,0,1,2,5,6]
          ],
          startRows: 14,//行列范围
          startCols: 6,
          minRows: 5,  //最小行列
          minCols: 5,
          maxRows: 2,  //最大行列
          maxCols: 20,
          rowHeaders: false,//行表头
          colHeaders:   ['序号','客商', '余额', '1年以内','1-2年','2-3年','3年以上','客商性质', '是否内部','是否正常'
          ,'非正常分类','债务人状况*','可收回金额*','其中：当年可收回金额*','逾期账款','已形成实质性损失金额'],
            // colHeaders:[],
          //自定义列表头or 布尔值
          minSpareCols: 2, //列留白
          minSpareRows: 2,//行留白
          currentRowClassName: 'currentRow', //为选中行添加类名，可以更改样式
          currentColClassName: 'currentCol',//为选中列添加类名
          autoWrapRow: true, //自动换行
          contextMenu: {   //自定义右键菜单，可汉化，默认布尔值
            items: {
              "row_above": {
                name:'上方插入一行'
              },
              "row_below": {
                name:'下方插入一行'
              },
              "col_left": {
                name:'左方插入列'
              },
              "col_right": {
                name:'右方插入列'
              },
              "hsep1": "---------", //提供分隔线
              "remove_row": {
                name: '删除行',
              },
              "remove_col": {
                name: '删除列',
              },
              "make_read_only": {
                name: '只读',
              },                     
              "borders": {
                name: '表格线',
              },
              "commentsAddEdit": {
                name: '添加备注',
              },
              "commentsRemove": {
                name: '取消备注',
              },
              "freeze_column": {
                name: '固定列',
              },
              "unfreeze_column": {
                name: '取消列固定',
              },
              "hsep2": "---------",
                       }
          },//右键效果
          fillHandle: true, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
          fixedColumnsLeft: 0,//固定左边列数
          fixedRowsTop: 0,//固定上边列数
          mergeCells: [   //合并
            //  {row: 0, col: 0, rowspan: 2, colspan: 1},  //指定合并，从（1,1）开始行3列3合并成一格
            //  {row: 0, col: 3, rowspan: 2, colspan: 3}
          ],
          manualColumnFreeze: true, //手动固定列
          manualColumnMove: true, //手动移动列
          manualRowMove: true,   //手动移动行
          manualColumnResize: true,//手工更改列距
          manualRowResize: true,//手动更改行距
          comments: true, //添加注释
          cell: [
            // {row: 1, col: 1, comment: {value: 'this is test'}},
          ],
          customBorders:[],//添加边框
          columnSorting: true,//排序
          stretchH: 'none',//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展

        }
      };
    },
    name: 'SampleApp',
    components: {
      HotTable
    },
    created(){
        this.axios.get('/api/yszk').then((res) => {
            // console.log(res)
            let list = []
            
            res.data.columns.forEach(item => {
                list.push(item.text)
            });
            this.colHeaders = list
            console.log(this.colHeaders)
            let row = []
            res.data.rows.forEach(i=>{
                row.push(i)
            })
            this.data = row
            console.log(this.data)
            this.flag = true;
            
        })
    }
  }

</script>
<style scoped >
    #app .containerMain{
        padding-top:85px;
    }
</style>
<style> 
    .ht_master .wtHolder, 
     .handsontable .wtHider,
    .handsontable table.htCore,
    .ht_clone_bottom .handsontable,
    .handsontable .wtSpreader{
        width: 100% !important;
        height: 100% !important;
     }
    .handsontable .columnSorting.sortAction:hover {
        text-decoration: none;
    }

    button{
        margin: 20px 20px;
    }
    .handsontable .currentRow {
        background-color: #E7E8EF;
    }
    .handsontable .htRight{
      text-align:left;
    }
    .handsontable .currentCol {
        background-color: #F9F9FB;
    }
    #test-hot {
        width: 800px;
        height: 800px;
        overflow: hidden;
    }
    .handsontable td.htInvalid {
        background-color: #fff !important;
    }
  .ht_master, .ht_clone_left, .ht_clone_top, .ht_clone_bottom{
    width: 100% !important;
  }
  .handsontable thead th .relative {
    padding: 2px;
    width: 50px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* .handsontable tr:first-child th, .handsontable tr:first-child td {
    width: 50px !important;
    box-sizing: border-box;
  } */
</style>


