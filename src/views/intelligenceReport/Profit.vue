<template>
    <div>
        <div class="title">
            <p>利润表</p>
            <h4>(1010)江苏农垦集团(母公司)(期间:2018年7月 单位:元)</h4>
        </div>
        
        <div class="content">
        <div class="left">
            <h4>所有行业</h4>
            <span></span>
            <el-input v-model="input" placeholder="快速检索" class="put"></el-input>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        
        <div class="right">
            <div class="top">
                <div class="nav">
                    <h4>(1010)江苏农垦集团（母公司）(期间：2018年7月 单位：元)</h4>
                    <span></span>
                    <el-button class="refresh">刷新</el-button>
                </div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">一季度</el-menu-item>
                <el-menu-item index="2">二季度</el-menu-item>
                <el-menu-item index="3">三季度</el-menu-item>
                <el-menu-item index="4">年度</el-menu-item>
                </el-menu>
            </div>
            <el-table
            :data="tableData"
            >
                <el-table-column
                    prop="number"
                    label="序号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="excellent"
                    label="优秀值">
                </el-table-column>
                <el-table-column
                    prop="good"
                    label="良好值">
                </el-table-column>
                <el-table-column
                    prop="average"
                    label="平均值">
                </el-table-column>
                <el-table-column
                    prop="Lower"
                    label="较低值">
                </el-table-column>
                <el-table-column
                    prop="Poor"
                    label="较差值">
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
      return {
           input: '',
           activeIndex: '1',
            data:[],
            tableData: [],
            defaultProps: {
            children: 'children',
            label: 'label'
            }
      }
    },
    created(){
        this.axios.get('/apis/Configtest1').then((response) => {
            this.data = response.data.rows

        })

        this.axios.get('/apis/Configtest2').then((response) => {
            console.log(response)
            this.tableData = response.data.rows
        })

    },
     methods: {
      handleNodeClick(data) {
        console.log(data);
      },
       handleClick(tab, event) {
        console.log(tab, event);
      },
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }

     }
    } 
</script>
<style lang="scss" scoped>
#app .containerMain{
    padding-left:0;
    padding-right:0;
}
    .title{
        // width:100%;
        height:98px;
        padding:20px 0 0 32px;
        box-sizing: border-box;
        background:rgba(255,255,255,1);
        p{
            width:42px;
            height:13px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(143,143,143,1);
        }
        h4{
            width:528px;
            height:19px;
            font-size:18px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-top:23px;
        }
    }
    .content{
        display: flex;
        width: 100%;
        height: 100%;
        padding:24px;
         .left{
            width: 300px;
            background:rgba(255,255,255,1);
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            flex:1;
            h4{
                margin:20px 0 18px 16px;
                font-size:18px;
            }
            span{
                display:block;
                width:300px;
                height:1px;
                background:rgba(232,232,232,1);
            }
            .put{
                width:268px;
                height:36px;
                margin:12px 16px 20px 16px;
                background:rgba(250,250,250,1);
                border-radius:5px;
            }
        }
        .right{
            width: 100%;
            height: 100%;
            margin-left:24px;
            .top{
               width:100%;
                height:111px;
                margin-bottom:24px;
                background:rgba(255,255,255,1); 
                .nav{
                    margin-left:30px;
                    overflow: hidden;
                
                    h4{
                        padding-top:20px;
                        float: left;
                        
                    }
                    span{
                        width: 1px;
                        height: 26px;
                        float: left;
                        margin:16px 30px 0 30px;
                        background:rgba(153,153,153,1);
                    }
                }
                .refresh{
                    width:88px;
                    margin-top:10px;
                    height:40px;
                    border:1px solid rgba(24,144,255,1);
                    border-radius:5px;
                    font-size:16px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(24,144,255,1);
                    float: left;
                }
            }
        }
        // .el-table tr{
        //     background:rgba(250,250,250,1);
        // }
    }
</style>