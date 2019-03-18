<template>
    <div class="log">
        <!-- 
            name: sjz
            time: 2019/1/16 礼拜三
            function: 模拟专用测试，日志管理界面
         -->
        <!-- 查询刷新 -->
        <!-- <el-row :gutter="10"> -->
            <!-- 
                响应式布局：
                1. xs <768px 响应式栅格数或者栅格属性对象
                2. sm ≥768px 响应式栅格数或者栅格属性对象
                3. md ≥992 响应式栅格数或者栅格属性对象
                4. lg ≥1200 响应式栅格数或者栅格属性对象
                注：全局最大为24
             -->
            <!-- <el-col :xs="12" :md="24"> -->
                <div class="input-refresh">
                    <!-- <el-form :inline="true" :model="searchForm" class="user-form-inline">
                        <el-form-item label="用户名称">
                            <el-input v-model="searchForm.username" placeholder="用户名称" clearable ></el-input>
                        </el-form-item> -->

                        <!-- <el-form-item label="真实姓名">
                            <el-input v-model="searchForm.truename" placeholder="真实姓名" disabled clearable></el-input>
                        </el-form-item> -->

                        <!-- <el-form-item label="类型">
                            <el-select v-model="searchForm.stype" placeholder="类型" clearable>
                                <el-option label="其他" value="3"></el-option>
                                <el-option label="退出" value="2"></el-option>
                                <el-option label="登录" value="1"></el-option>
                                <el-option label="查询" value="0"></el-option>
                            </el-select>
                        </el-form-item> -->

                        <!-- <el-form-item>
                            <el-button type="text" @click="handleDelete">清除</el-button>
                            <el-button type="primary"  @click="handleSearch" icon="el-icon-search" ></el-button>
                            <el-button type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button> -->
                            <!-- <el-button type="primary" style="height:40px;padding-top:0"><i class="el-icon-search">搜索</i></el-button> -->
                        <!-- </el-form-item> -->
                    <!-- </el-form> -->
                </div>
            <!-- </el-col> -->
        <!-- </el-row>          -->

        <!-- 表格展现 :cell-style="cellStyle"height="720"-->
        <el-table
        :data="tableData"
        style="width: 100%"
        :height="heights"
        border
        stripe
        >
            <el-table-column prop="row_id" width="75" label="序列" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="suser" label="用户名称" width="120" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="struename" label="真实姓名" width="120" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="ntype" label="类型" width="80" header-align="center" align ="center" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.ntype===0">查询</span>
                    <span v-if="scope.row.ntype===1">登录</span>
                    <span v-if="scope.row.ntype===2">退出</span>
                    <span v-if="scope.row.ntype > 2">其他</span>
                </template>
            </el-table-column>
            <el-table-column prop="nlevel" label="日志级别" width="110" header-align="center" align ="center" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.nlevel>=0">通知</span>
                </template>
            </el-table-column>
            <el-table-column prop="soperatetime" label="操作时间" width="200" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="sbroswer" label="浏览器" width="100" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="shostname" label="主机IP" width="180" header-align="center" align ="center" sortable></el-table-column>
            <el-table-column prop="scontent" label="内容" header-align="center" width="600" show-overflow-tooltip align ="left" sortable></el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 500, 1000]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.allNum"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { dataRequest } from '~api/cube';
// import request from "utils/http";
export default {
    data(){
        return{
            //行数据数组 展现
            tableData:[],
            // datas:[],
            // 分页---默认第一页
            currentPage: 1,
            // 分页---默认每页100行数据
            pagesize: 100,
            // 查询时起作用  默认（类型）为空
            // stype:"",
            // 查询时起作用  默认（用户名称）为空
            // username:"",
            // 查询时起作用  默认（真实姓名）为空
            // truename:"",
            // 分页---总数据  默认为空 渲染数据时起作用
            allNum: 0,
            // 默认表单为空 查询时期作用
            isSearchForm: false,
            // 窗口的原始高度
            offsetHeight: document.body.offsetHeight,
            // form表单的原始高度
            inputRefresh: 0,
            // 表格初始化高度为 0 等待计算赋值
            heights: 0,
            //列 样式处理
            // drillProperties:["R","suser","truename","ntype","nlevel","soperatetime","sbroswer","shostip"],
            // 表单输入默认为空
            searchForm:{ 
                username: "",
                truename: "",
                stype: ""
            }
            /**
             * 页面原始高度：document.body.offsetHeight
             * 分页背景高度：70
             * 查询表单背景高度：60 -----------inputRefresh
             * 导航栏高度：64
             * 间隙高度：3*10 = 30
             */
        }
    },
    created(){
        debugger
        let me =this;
        // if(document.getElementsByClassName('input-refresh').length>0){
        //     // 得到表单的高度并赋值
        //     me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
        //     if(me.inputRefresh == 0) {
        //         me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
        //     } else {
        //         // 计算当前页面的高度 得出表格的高度
        //         me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 64 - 30;
        //     }
        // } else {
        //     me.heights = document.body.offsetHeight - 60 - 70 - 64 - 30;
        // } 
        this.heights = document.body.offsetHeight - 154 ;  
        // 跳转到请求数据方法
        me.requestDataRendering(me.currentPage,me.pagesize);
    },
    mounted(){
        // 设置表格高度（自适应）
        this.setTableScollHeight();
    },
    watch:{
        
    },
    methods:{
        // 页面自适应
        setTableScollHeight(){
            this.heights = document.body.offsetHeight - 154 ;
            const me = this ;
            window.onresize = function temp(){
                debugger
                // // 得到表单的高度并赋值
                // me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
                // // 计算当前页面的高度 得出表格的高度
                // if(me.inputRefresh>0){
                //     me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 40 - 64 - 40;
                // }else{
                //     me.heights = document.documentElement.clientHeight - 60 - 70 - 40 - 64 - 40;
                // } 
                me.heights = document.body.offsetHeight - 154 ;            
            };
        },
        /**
         * 获取的要渲染的数据  发送请求
         */
        requestDataRendering(currentPage,pagesize){
            debugger
            let me = this;
            // item：传的参数
            let item = {
                // "page": currentPage,
                "pageNum": currentPage,
                "pageSize": pagesize,
                // "type":me.searchForm.stype,
                // "username": me.searchForm.username
            };
            dataRequest(item).then(res => {
                // debugger
                //获取总数据
                me.allNum = res.data.data.total;
                //获取行信息渲染
                me.tableData = res.data.data.datas;
            }); 
        },
        /**
         * 分页： pagesize改变时触发 select
         */
        handleSizeChange: function(size) {
            // debugger
            this.pagesize = size;
            this.requestDataRendering(this.currentPage,this.pagesize);
        },
        /**
         * 分页： currentPage改变时会触发 <1 2 3...>
         */
        handleCurrentChange: function(currentPage) {
            // debugger
            this.currentPage = currentPage;
            this.requestDataRendering(this.currentPage,this.pagesize);
        },
        /**
         * 点击 “清除” 按钮时触发
         */
        handleDelete(){
            // debugger
            let me = this;
            me.searchForm.username = '';
            me.searchForm.truename = '';
            me.searchForm.stype = '';
            //
            me.isSearchForm = true ;

        },
        /**
         * 点击 “查询” 按钮时触发 根据表单的输入字段来匹配数据渲染
         */
        handleSearch(){
            debugger
            const me = this;
            //初始化
            me.isSearchForm = false;
            //获取表单的内容
            let searchForm = me.searchForm;
            //判断是否有值，有就留着，没有就删除；主要要与判断
            for(let key in searchForm){
                if(searchForm[key] == '' || searchForm[key].length == 0){
                    Vue.delete(searchForm,key);
                    // if(!me.isSearchForm){
                    //     me.isSearchForm = false;
                    // }
                }else{
                    me.isSearchForm = true ;
                }
            }
           
            // debugger
            // 友情提示  没有数据供请求查询  反之 重新请求得到数据
            if(!me.isSearchForm){
                this.$message({
                    message: '警告哦，请根据用户名称、真实姓名或者类型查询！',
                    type: 'warning'
                });
            }else{
                // 每次查询都是从第一页开始。
                me.currentPage = 1 ;
                me.requestDataRendering(me.currentPage,me.pagesize);     
            }                
        },
        /**
         * 点击 “刷新” 按钮时触发 初始化
         */
        handleRefresh(){
            debugger
            let me =this;
            //初始化表单的用户名称
            me.searchForm.username = '';
            //初始化表单的真实姓名
            me.searchForm.truename = '';
            //初始化表单的类型:有值才能赋空值，不然显示有问题
            if(me.searchForm.stype){me.searchForm.stype = '';}
            //初始化表单是否为空 false 默认为空
            me.isSearchForm = false ;
            //初始化分页默认为第一页
            me.currentPage = 1;
            //初始化分页默认每页100条数据
            me.pagesize = 100;  
            //回调函数  重新发送请求  还原最初始的数据展现。
            me.requestDataRendering(me.currentPage,me.pagesize);
        }
    }
}
</script>


<style  scoped>
/**
 * 引入公用scss样式
 */
@import '~@s/public/system.scss';
/**
 * el-form表单的背景样式
 */
.input-refresh {
    width: 100%;
    /* height: 80px; line-height: 80px; */
    /* max-height: 160px; */
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
}
.el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
}

/**
 * .cell：主要针对了树表 “行信息居中” 显示
 * 注：由于全局变化，所以弃用
 */
/* .cell {
    text-align: center;
} */

</style>
