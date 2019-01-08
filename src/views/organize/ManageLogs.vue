<template>
  <div>
    <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable class="input-with-select">
    </el-input>

    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.action.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%" class="main_table" :header-cell-style="getRowClass" :default-sort = "{prop: 'time', order: 'descending'}">
      <el-table-column prop="name" align="center" label="操作人" width="180">
        <template slot-scope="scope">
          <div class="row-user-col">
            <img class="row-user-avatar" :src="scope.row.avatar">
            <span class="row-user-name">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="module" align="center" label="模块" width="180">
      </el-table-column>
      <el-table-column prop="action" align="center" label="动作" width="180">
      </el-table-column>
      <el-table-column prop="time" sortable align="center" label="时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ManageLogs',
    data() {
      return {
        search:'',
        tableData: [{
          avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
          time: '2016-05-02',
          name: '王qq',
          module: '分析助手1111',
          action: '修改了报告1111',
        },{
          avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
          time: '2016-05-02',
          name: '王aq',
          module: '分析助手444',
          action: '修改了报告444',
        },  {
          avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
          time: '2016-05-04',
          name: '张aa',
          module: '分析助手2222',
          action: '修改了报告2222',
        },  {
          avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
          time: '2016-05-04',
          name: '张wa',
          module: '分析助手5555',
          action: '修改了报告5555',
        }, {
          avatar:'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
          time: '2016-05-05',
          name: '赵ss',
          module: '分析助手3333',
          action: '修改了报告3333',
        }]
      }
    },
    mounted() {

    },
    methods: {
      //设置表格第一行的颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:rgba(221,235,246,1);font-size:16px;' +
                  'font-family:Microsoft YaHei;' +
                  'font-weight:bold;' +
                  'line-height:21px;' +
                  'color:rgba(19,84,143,1);' +
                  'opacity:1;';
        } else {
          return ''
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@s/green/variables.scss";

  .containerMain {
    padding-left: 0 !important;
    height: 100vh;
  }

  .input-with-select {
    width: 220px;
    height: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    opacity: 1;
    margin: 20px 0 0 20px;
    border-radius: 8px;
  }

  .main_table{
    margin : 20px;
    border-radius:20px 20px 0px 0px;

    box-shadow:0px 10px 20px rgba(8,69,81,0.1);
    .row-user-col {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .row-user-avatar {
        margin-left: 20px;
        height: 40px;
        width: 40px;
      }
      .row-user-name{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        margin-left: 40px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
    }
  }
</style>