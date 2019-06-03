<template>
<!--
    name: sjz
    说明：风险报告内容页面
-->
    <div id="reportComponent" :style="styleHeight">
        <div class="reportComponent_div" :numOpen="flager">
            <el-container style="height: 100%">
                <el-header class="container_header">
                    <div class="container_alert" v-show="isAlertShow">
                        <span><i class="el-icon-warning"></i>查看页面，无法操作此页面！</span>
                    </div>
                    <div class="container_btn">
                        <el-button type="primary" plain @click="exportBtn">导出</el-button>
                        <el-button type="primary" plain @click="cancelBtn">返回</el-button>       
                    </div>                                
                </el-header>
                <el-container style="height: 100%">
                    <!-- 目录部分 -->
                    <el-aside class="container_aside">
                        <div class="aside_title"><p>目录</p></div>
                        <div v-if="directory.length > 0">
                            <el-menu :default-active="directory[0].scode" class="el-menu-vertical-demo" @close="handleClose">
                                <el-menu-item class="el-menu-vertical_title" v-for="(item, index) in directory" :key="item.scode" :index="item.scode">
                                    <span slot="title">{{ item.text }}</span>
                                </el-menu-item>
                            </el-menu>
                        </div>
                        <div v-else style="textAlign:center;marginTop:20px;">暂无数据显示！</div>
                    </el-aside>
                    <!-- 正文部分 -->
                    <el-main class="container_main">
                        <div style="textAlign:center;fontSize:25px;fontWeight: 200;marginBottom: 20px;">
                            <span>{{ textBody }}</span>
                        </div>
                        <div style="width:100%;background:#ddd;marginBottom: 10px;padding: 10px 0 10px 0">
                            <span style="fontSize:22px;fontWeight: 200;">总述</span>
                        </div>
                        <div v-if="directory.length == 0" style="marginBottom: 10px;text-indent: 2em;">
                            <span v-html="html2">暂无数据显示！</span>
                        </div>
                        <div v-else style="marginBottom: 10px;text-indent: 2em;">
                            <span v-html="html2">有数据！</span>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>
// 引用公用 js 方法
import mini from "@v/riskControlSystem/sjzRiskControl/riskJavaScript.js"
export default {
    name: "riskReport",
    props: {
        dataSource: Object,
        newThis: Object,
        numOpen: Number,
        data: Object
    },
    data(){
        return {
            styleHeight:{       // 报告页面的盖度
                height: ""
            },
            isAlertShow: false, // 用来显示警告的（上报状态隐藏/ 查看状态显示）
            directory: [] ,     // 存放目录数据的
            numArray: ["一、","二、","三、","四、","五、","六、","七、"] ,
            textBody: "",
            html2: "",          // 没有数据的提示文字
        }
    },
    created(){
        // debugger
        let offsetHeight = document.body.offsetHeight ;
        this.styleHeight.height = offsetHeight - 80 + "px" ;
        if(offsetHeight <= 560)this.styleHeight.height = "560px";
    },
    mounted(){
        // 自适应高度
        this.setClientHeight() ;
    },
    computed: {
        flager: function(){
            // debugger
            if(this.numOpen == 1){
                this.setModify() ;
            }else{
                this.setView()
            }
        }
    },
    methods: {
        // 自适应高度
        setClientHeight(){
            let offsetHeight = document.body.offsetHeight ;
            this.styleHeight.height = offsetHeight - 80 + "px" ;
            const me = this ;
            window.onresize = function temp(){ 
                if(document.body.offsetHeight >= 560){
                    me.styleHeight.height = document.body.offsetHeight - 80 + "px" ;
                }else{
                    me.styleHeight.height = "560px";
                }                
            }           
        },
        // 返回按钮
        cancelBtn(){
            this.newThis.numOpen = null ;
            this.newThis.isShow = false ;
        },
        // 导出按钮
        exportBtn(){
            this.$message('暂无此功能!');
        },
        // 修改按钮触发
        setModify(){
            debugger
            this.isAlertShow = false ;  // 提示-隐藏
            // 这家公司有几条风险（总共）
            let len = this.data.report_data.length ;
            // 过滤出有数据的数据(目录)
            this.directory = this.data.stype_data.filter((res, index) => { return res.ncount > 0 ; }) ;
            // 前缀+序号的（大写的）
            this.directory.forEach((res, index) => { res.text = this.numArray[index] + res.sname }) ;
            // 获取从父组件传递过来的表格信息数据
            let rowData = this.dataSource.row.row ;
            // 生成文字（正文标题）
            this.textBody = rowData.company + '' + this.dataSource.year + '年' + this.dataSource.month + '月风险报告' ;
            // 根据风险类型查出风险几条 ；
            let html = mini.getReportOverviewText(this.directory) ; 
            // 没有数据时的提示文字
            if(this.directory.length === 0){
                this.html2 = '截止'+this.dataSource.year + '年' + this.dataSource.month +'月份无数据显示！' ;
            }else{
                this.html2 = '截止'+this.dataSource.year + '年' + this.dataSource.month +'月份，经风险评估分析，'+rowData.company+'在风险上面共存在'+len+'条，'+
                    '从风险类型来看，其中'+ html ;
            }
        },
        // 查看按钮触发
        setView(){
            this.isAlertShow = true ;   // 提示-显示
        }
    }
}
</script>
<style scoped>
/*最外层的*/
#reportComponent{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    color:#606266;
}
/*里层的*/
.reportComponent_div{
    width: 100%;
    height: 100%;
}
/*布局的头部（按钮的那一块）*/
.container_header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: right;
    background-color: #D3DCE6;
}
/*左边的部分（目录一块）*/
.container_aside{
    width: 200px;
    height: 100%;
    border: 1px solid #dcdfe6;
}
/*右边的部分（正文一块）*/
.container_main {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
}
/*警告弹出框（查看按钮时提示用的）*/
.container_alert{
    color: #e6a23c;
    width: 250px;
    height: 40px;
    margin-left: 40%;
    float: left;
}
/*按钮（查看按钮时提示用的）*/
.container_btn{
    float: right ;
    height: 40px;
    width: 150px;
}
/*目录字体设置*/
.aside_title{
    font-size: 28px;
    font-weight: 100;
    letter-spacing: 10px;
    text-align: center;
    margin-top: 50px;
    color:#606266;
    /* position: fixed; */
}
.el-menu-vertical-demo{
    background-color: #F0F2F5;
}
.el-menu-vertical_title{
    font-size: 20px;
    margin-left: 30px;
    /* text-align: center; */
}
</style>
<style>
/* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  } */
  /* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  } */
</style>
