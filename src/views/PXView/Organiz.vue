<template>
  <div>
    <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable class="input-with-select">
    </el-input>

    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.action.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%" class="main_table" :header-cell-style="getRowClass" :default-sort = "{prop: 'time', order: 'descending'}">
      <el-table-column prop="name" align="center" label="研发部" min-width="20%">
        <!-- <template slot-scope="scope">
          <div class="row-user-col">
            <img class="row-user-avatar" :src="scope.row.avatar">
            <span class="row-user-name">{{ scope.row.name }}</span>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column prop="module" align="center" label="级别" min-width="20%">
      </el-table-column>
      <el-table-column prop="action" align="center" label="负责人" min-width="20%">
      </el-table-column>
        <el-table-column label="操作" min-width="70%" align="center">
            <div slot-scope="scope" class="template_edit">

                <div class="leftIcon_title">
                    <img src="@a/user_icon/tianjiazibumen_icon.svg">
                    <span class="itemSpan">添加子部门</span>
                </div>

                <div class="leftIcon_title1">
                    <img src="@a/user_icon/tianjiachengyuan_icon.svg">
                    <span class="itemSpan1">添加成员</span>
                </div>

                <div class="leftIcon_title2">
                    <img src="@a/user_icon/jinyong_icon.svg">
                    <span class="itemSpan2">修改</span>
                </div>

                <div class="leftIcon_title3">
                    <img src="@a/user_icon/jinyong_icon.svg">
                    <span class="itemSpan3">移除</span>
                </div>

            </div>
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
  /deep/ .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /deep/.el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 0px;
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


      .template_edit {

          display: flex;
          flex-direction: row;
          text-align: center;
          justify-content: space-around;


          .leftIcon_title {

              display: flex;
              flex-direction: row;

              .itemSpan {
                  /*width: 120px;*/
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  line-height:19px;
                  color:rgba(24,144,255,1);
                  opacity:1;
                  padding-left: 10px;
              }
          }



          .leftIcon_title1 {

              display: flex;
              flex-direction: row;

              .itemSpan1 {
                  /*width: 120px;*/
                  font-size: 14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  line-height:19px;
                  color:rgba(72,88,239,1);
                  opacity:1;
                  padding-left: 10px;
              }
          }


          .leftIcon_title2 {

              display: flex;
              flex-direction: row;

              .itemSpan2 {
                  /*width: 120px;*/
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  line-height: 19px;
                  color: rgba(28, 141, 10, 1);
                  opacity: 1;
                  opacity: 1;
                  padding-left: 10px;
              }
          }

          .leftIcon_title3 {

              display: flex;
              flex-direction: row;

              .itemSpan3 {
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  line-height: 19px;
                  color: rgba(229, 51, 51, 1);
                  opacity: 1;
                  padding-left: 10px;
              }
          }

      }



    box-shadow:0px 10px 20px rgba(8,69,81,0.1);
    .row-user-col {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .row-user-avatar {
        margin-left: 20px;
        height: 40px;
        border-radius: 50%;
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