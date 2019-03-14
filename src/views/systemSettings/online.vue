<template>
    <div class="onLine">
        <!-- 
            
            name: sjz
            time: 2019/1/16 礼拜三
            function: 模拟专用测试，在线用户界面
         --> 

        <!-- 当前在线人数 -->
        <div class="person">
            <div style="float:left;width:150px;line-height:40px">
                <b>当前在线人数:</b>
            </div>
            <div style="float:left;width: 100px; margin-top: 4px; font-weight: bold;">
                <el-tag type="success" style="font-size: 18px;">{{ this.totalElements }}</el-tag>
            </div>    
        </div>       

        <!-- 查询刷新 style="line-height: 80px;" style="line-height: 55px;height:40px;"-->
        <el-row :gutter="10">
            <!-- 
                响应式布局：
                1. xs <768px 响应式栅格数或者栅格属性对象
                2. sm ≥768px 响应式栅格数或者栅格属性对象
                3. md ≥992 响应式栅格数或者栅格属性对象
                4. lg ≥1200 响应式栅格数或者栅格属性对象
                注：全局最大为24
             -->
            <el-col :xs="12" :md="24">
                <div class="input-refresh" ref="elememt">
                    <el-form :inline="true" :model="searchForm" class="user-form-inline">
                        <el-form-item label="登录名">
                            <el-input v-model="searchForm.userName" placeholder="模糊查询" clearable ></el-input>
                        </el-form-item>

                        <!-- <el-form-item label="真实姓名">
                            <el-input v-model="searchForm.trueName" placeholder="真实姓名" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="角色">
                            <el-select v-model="searchForm.roleNames" placeholder="角色" disabled clearable>
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="普通成员" value="0"></el-option>
                            </el-select>
                        </el-form-item> -->
                    
                        <el-form-item>
                            <el-button type="text" @click="handleDelete">清除</el-button>
                            <el-button type="primary"  @click="handleSearch" icon="el-icon-search" ></el-button>
                            <el-button type="success" @click="handleRefresh" icon="el-icon-refresh"></el-button>
                            <!-- <el-button type="primary" style="height:40px;padding-top:0"><i class="el-icon-search">搜索</i></el-button> -->
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>     

        <!-- 表格展现 :cell-style="cellStyle"-->
        <el-table
        :data="tableData"
        style="width: 100%"
        :height="heights"
        cell-style="padding:0"
        border
        stripe
        class="elTable"
        >
            <el-table-column type="index" width="60" label="序列" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户名称" width="150" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="trueName" label="真实姓名" width="150" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="roleNames" label="角色" width="80" header-align="center" align="center" sortable>
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.roleNames==='1'">管理员</span>
                    <span v-else>普通成员</span>
                </template> -->
            </el-table-column>
            <el-table-column prop="belongCompanyName" label="所属公司" width="180" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="ipAdress" label="主机IP" width="180" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="loginTime" label="登录时间" width="200" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="residencetime" label="停留时间" width="200" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="browser" label="浏览器" width="100" header-align="center" align="center" sortable></el-table-column>
            <el-table-column prop="brand" label="平台" width="100" header-align="center" align="center" sortable></el-table-column>
            <el-table-column label="操作" header-align="center" align="center" sortable>
                <template slot-scope="scope">
                    <el-button type="text" @click="handleOffline(scope.$index, scope.row)">下线</el-button>
                </template>
            </el-table-column>
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
            :total="this.totalElements"
            ></el-pagination>
        </div>
    </div>     
</template>

<script>
import Vue from 'vue';
import { onlineRequest } from '~api/cube';
export default {
    data(){
        return{
            // 表格行数据
            tableData:[],
            // 默认第一页
            currentPage: 1, 
            // 默认一页100行数据展现
            pagesize: 100, 
            // 人数默认为0
            // person: 0,
            // 默认总页数为空
            totalElements: 0,
            //判断  表单是否为空 false 默认
            isSearchForm: false,
            // 表单输入默认为空
            searchForm:{ 
                trueName: "",
                userName: "",
                roleNames: ""
            },
            heights: 0,
            // 窗口的原始高度
            offsetHeight: document.body.offsetHeight,
            // form表单的原始高度
            inputRefresh: 0 ,
            datatime: ""
            /**
             * 页面原始高度：document.body.offsetHeight
             * 分页背景高度：70
             * 查询表单背景高度：60
             * 在线人数背景高度：40
             * 导航栏高度：64
             * 间隙高度：4*10 = 40
             */
            // heights: document.body.offsetHeight - 70 - 60 - 40 - 64 - 40
        }
    },
    created(){
        debugger
        let me = this;
        if(document.getElementsByClassName('input-refresh').length > 0){
            // 得到表单的高度并赋值
            me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
            if (me.inputRefresh == 0) {
                me.heights = document.body.offsetHeight - 60 - 70 - 40 - 64 - 40;
            } else {
                // 计算当前页面的高度 得出表格的高度
                me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 40 - 64 - 40;
            }
            
        }else{
            me.heights = document.body.offsetHeight - 60 - 70 - 40 - 64 - 40;
        }
        // 跳转到请求数据方法
        me.requestDataRendering(me.currentPage,me.pagesize);
    },
    mounted(){
        // 设置表格高度（自适应）
        this.setTableScollHeight();
        // const me = this
        // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
        // window.onresize = () => {
        //     // debugger
        //     return (() => {
        //         window.offsetHeight = document.body.offsetHeight;
        //         me.offsetHeight = window.offsetHeight;
        //         me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
        //     })()
        // }
    },
    watch:{
        
    },
    methods:{
        // 页面自适应
        setTableScollHeight(){
            this.heights = document.documentElement.clientHeight - 60 - 70 - 40 - 64 - 40 ;
            const me = this ;
            window.onresize = function temp(){
                debugger
                // 得到表单的高度并赋值
                me.inputRefresh = document.getElementsByClassName('input-refresh')[0].offsetHeight;
                // 计算当前页面的高度 得出表格的高度
                if(me.inputRefresh>0){
                    me.heights = document.body.offsetHeight - me.inputRefresh - 70 - 40 - 64 - 40;
                }else{
                    me.heights = document.documentElement.clientHeight - 60 - 70 - 40 - 64 - 40;
                }             
            };
        },
        /**
         * 获取的要渲染的数据  发送请求
         */
        requestDataRendering(currentPage,pagesize){
            // debugger
            let me = this;
            // item：传的参数
            let item = {
                // "keyWord": me.searchForm.trueName,
                "pageNum": currentPage,
                "pageSize": pagesize,
                // "userId": me.$store.getters.user.user.id
            };
            // 请求
            onlineRequest(item).then(res => {
                // debugger
                // me.person = res.data.data.totalElements;
                //获取总数据
                me.totalElements = res.data.data.totalElements;
                //获取行信息渲染
                // me.tableData = res.data.data.data;
                let dataTable = res.data.data.data;
                me.getTimes(dataTable);
            }); 
        },
        getTimes(row){
            // debugger
            // let etime, stime, dateBegin, usedTime, days, leave1,leave2,leave3, hours, minutes,seconds ;
            // //var date = new Date();
            // for(let i=0; i<row.length; i++){
            //     dateBegin = (row[i].loginTime).replace(/-/g, "/");//转换类型。注：因为程序识别不了‘-’时间格式，必须是‘/’的。
            //     etime = Date.parse(new Date(dateBegin));//登录时间转化成毫秒数
            //     stime = new Date().getTime(); //得到现在的时间
            //     usedTime = stime - etime ;//获得两个时间差（当前时间stime - 登录时间etime）
            //     days = Math.floor(usedTime/(24*3600*1000));
            //     leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
            //     hours=Math.floor(leave1/(3600*1000));
            //     //计算相差分钟数
            //     leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
            //     minutes=Math.floor(leave2/(60*1000));
            //     //计算相差秒数
            //     leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            //     seconds=Math.round(leave3/1000)
            //     let time = days +"天"+ hours +"时"+ minutes +"分"+ seconds +"秒";
            //     row[i].residencetime = time ;
            // }
            this.tableData = row ;
        },
        /**
         * 分页： pagesize改变时触发 
         */
        handleSizeChange: function(size) {
            this.pagesize = size;
            this.requestDataRendering(this.currentPage,this.pagesize);
        },
        /**
         * 分页： currentPage改变时会触发 
         */
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.requestDataRendering(this.currentPage,this.pagesize);
        },
        /**
         * 点击 “清除” 按钮时触发
         */
        handleDelete(){
            // debugger
            let me = this;
            me.searchForm.trueName = '';
            me.searchForm.userName = '';
            me.searchForm.roleNames = '';
            me.isSearchForm = false;
        },
        /**
         * 点击 “查询” 按钮时触发
         */
        handleSearch(){
            // debugger
            let me = this;
            //初始化
            me.isSearchForm = false;
            //获取表单的内容
            let searchForm = me.searchForm;
            //判断是否有值，有就留着，没有就删除；主要要与判断
            for(let key in searchForm){
                if(searchForm[key] == '' || searchForm[key].length == 0){
                    Vue.delete(searchForm,key);                
                }else{
                    me.isSearchForm = true ;
                }
            }           
            // debugger
            // 友情提示  没有数据供请求查询  反之 重新请求得到数据
            if(!me.isSearchForm){
                this.$message({
                    message: '警告哦，请根据用户名称、真实姓名或者角色查询！',
                    type: 'warning'
                });
            }else{
                // 每次查询都是从第一页开始。
                me.currentPage = 1 ;
                me.requestDataRendering(me.currentPage,me.pagesize);     
            }     
        },
        /**
         * 点击 “刷新” 按钮时触发
         */
        handleRefresh(){
            let me =this;
            //初始化表单用户名为空
            me.searchForm.userName = '';
            //初始化表单真名为空
            me.searchForm.trueName = '';
            //初始化角色为空  前提有值的情况下才生效
            if(me.searchForm.roleNames){me.searchForm.roleNames = '';}
            //初始化表单是否为空 false 默认为空
            me.isSearchForm = false ;
            //初始化分页默认为第一页
            me.currentPage = 1;
            //初始化分页默认每页100条数据
            me.pagesize = 100;  
            //回调函数  重新发送请求  还原最初始的数据展现。
            me.requestDataRendering(me.currentPage,me.pagesize);
        },
        /**
         * 点击 “下线” 按钮时触发
         */
        handleOffline(index, row){
            debugger
            let me = this;
            me.$confirm('此操作将强制性下线, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '下线成功!'
                });
                me.tableData.splice(index, 1);
                me.totalElements = me.tableData.length;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下线'
                });
            });
        },
        /**
         * 样式的调整，全局居中属性。弃用
         */
        // cellStyle(row){
        //     debugger
        //     let textIndent = '';
        //     //找到列  （从第一列开始）
        //     let pro = row.column.property;
        //     if (pro){
        //         let drill = "text-decoration: none;";
        //         let css = "text-align: center;" + textIndent + drill;
        //         return css;
        //     }
        // }
    }    
}
</script>

<style scoped>
/**
 * 引入公用scss样式
 */
@import '~@s/public/system.scss';
/**
 * 在线人数背景样式
 */
.person {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px; 
    background-color: #fff;
    height: 40px; /*border: 1px solid #ccc;*/
}
/**
 * el-form表单的背景样式
 */
.input-refresh {
    width: 100%;
    /* height: 80px; line-height: 80px; */
    /* max-height: 160px; */
    text-align: center;
    margin-bottom: 10px;
    background-color: #fff;
}
.el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>
