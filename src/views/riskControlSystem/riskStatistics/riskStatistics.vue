<template>
    <!--
        name: sjz
        说明：风险统计页面
    -->
    <div id="riskStatistics">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <!-- echarts图形 -->
                    <chart class="echarts" :options.sync="receive" auto-resize style="height: 100%"/>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                    <div class="grid-btn">
                        <el-link class="link" 
                        v-for="(item, index) in btns" 
                        :style="getStyle(item)" 
                        :class="{'active': index == number }" 
                        :key="item.id" 
                        @click="tableClick(item, index)">
                            {{ item.sname }}
                        </el-link>
                    </div>
                    <el-table
                    class="riskStatistics-table"
                    :data="tableData"
                    border
                    :summary-method="getSummaries"
                    show-summary
                    :height="heights"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    :header-cell-style="headerCellStyle"
                    :expand-row-keys="expandRowKeys"
                    style="width: 100%; overflow: hidden">
                        <el-table-column v-for="(item, index) in columns" :key="item.id" :prop="item.id" :label="item.text" :align="item.align" :min-width="item.width" :sortable="item.sortable">
                            <template slot-scope="scope">
                                <span>{{ getClumnsValue(scope, item) }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {
    // 风险矩阵全部记录查询
    riskmatrix_all ,
    selectQuery
} from '~api/cube.js'
// 引用vuex
import { mapGetters, mapActions } from "vuex";
import tools from 'utils/tools.js'
export default {
    data(){
        return{
            receive : {
                title: {
                    text: '当前期间风险统计情况',
                    x: 'center',
                    textStyle: {                    // 饼图图形上文本标签
                        color: "#454545",    
                        fontSize: 16,   
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {                           // 图例组件
                    orient: 'vertical',             // 布局  纵向布局 图例标记居文字的左边 vertical则反之
                    x: '',
                    itemWidth: 24,                  // 设置图例图形的宽
                    itemHeight: 18,                 // 设置图例图形的高
                    data:['未关闭','已关闭'],
                    backgroundColor: '#fff' ,
                    textStyle:{                     // 图例文字的样式
                        color:'#454545',            // 文字颜色
                        fontSize: 12                // 文字大小
                    }
                },
                color: ["rgb(250,173,20)","rgb(82,196,26)"],    // 手动设置每个图例的颜色                
                series: [                           // 系列列表
                    {
                        name:'访问来源',
                        type:'pie',                 // 类型pie表示饼图
                        radius: ['50%', '70%'],     // 饼图的半径，第一项是内半径，第二项是外半径，内半径为0为真饼图，不是环。
                        center: ['50%', '50%'],     // 设置饼的圆心坐标，不设置就会默认在中心的位置。
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {             // 是图形在高亮状态下的样式，比如在鼠标悬浮
                                show: true,
                                textStyle: {        
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {                // 标签的视觉引导线样式
                            normal: {
                                show: false         // 平常不显示
                            }
                        },
                        data:[
                            {value:10, name:'未关闭'},
                            {value:10, name:'已关闭'},
                        ]
                    }
                ]
            },
            btns: [
                { id: 1, sname: "全部", colormark: "#303133", all: true }
            ],
            tableData: [] ,
            tableData2:[] ,
            columns: [
                { id: "company", text: "公司名称", align: "left", width: "360px" },
                { id: "ncount", text: "数量", align: "center", width: "80px", sortable: true },
                { id: "closecount", text: "已关闭", align: "center", width: "120px", sortable: true },
                { id: "unclosecount", text: "未关闭", align: "center", width: "120px", sortable: true },
                { id: "ncount_zb", text: "占比（%）", align: "center", width: "120px", percentage: "%", sortable: true }
            ],
            expandRowKeys: [] ,
            number: 0 ,
            heights: 503 ,
        }
    },
    mounted(){
        let one = document.getElementsByClassName('bg-purple')[0] ;
        let two = document.getElementsByClassName('bg-purple-light')[0] ;
        one.style.height = one.clientWidth + 'px' ;
        one.style.backgroundColor= "#fff" ;
        two.style.height = one.clientWidth + 'px' ;
        two.style.backgroundColor= "#fff" ;
        // 自适应高度
        this.setClientHeight() ;
        // 风险矩阵全局记录查询
        this.riskmatrix_all_request() ;
        // 表格查询
        this.selectQuery_request() ;
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"]),
        ...mapGetters(["device", "user","showDims"])
    },
    watch: {
        // 切换年触发
        year: function(newyear){
            this.selectQuery_request(null) ;
        },
        // 切换月触发
        month: function(newmonth){
            this.selectQuery_request(null) ;
        },
        // 切换公司触发
        company: function(newcompany){
            this.selectQuery_request(null) ;
        }
    },
    methods: {
        // 自适应高度
        setClientHeight() { 
            const me = this ;
            let one = document.getElementsByClassName('bg-purple')[0] ;
            setTimeout(() => {
                me.heights = one.clientHeight - 72 ;
            }, 400)
            window.onresize = function temp(){
                let window = document.body.offsetWidth ;
                let one = document.getElementsByClassName('bg-purple')[0] ;
                let two = document.getElementsByClassName('bg-purple-light')[0] ;
                one.style.height = one.clientWidth + 'px' ;
                one.style.backgroundColor= "#fff" ;
                two.style.height = one.clientWidth + 'px' ;
                two.style.backgroundColor= "#fff" ;
                me.heights = one.clientWidth - 72 ;
                if(window > 1440)me.receive.title.textStyle.fontSize = 16;
                if(window > 960 && window <= 1440)me.receive.title.textStyle.fontSize = 14;
                if(window < 960)me.receive.title.textStyle.fontSize = 12;
            }
        },
        // 顶部按钮事件
        tableClick(item, index) {
            this.number = index ;
            if(!item.all) {
                this.selectQuery_request(item.id) ;
            } else {
                this.selectQuery_request(null) ;
            }
        },
        // 获取值 百分比处理(千分位，两位小数)
        getClumnsValue(scope, item) {
            let tmp ;
            let val = scope.row[item.id]
            if(item.percentage === '%') {
                if(val)tmp = tools.currency(val,'',2);
            } else {
                tmp = scope.row[item.id]
            }
            return tmp
        },
        // 获取样式
        getStyle(item) {
            return {
                color: item.colormark
            }
        },
        // 自定义的合计计算方法
        getSummaries({ columns, data }) { debugger
            const me = this ;
            const sums = [];
            columns.forEach((column, index) => { 
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if(me.tableData2.length === 0) {
                    sums[index] = 0 ;
                    return
                }
                if(me.columns[index].id === column.property)sums[index] = me.tableData2[0][column.property] ;
                
            })
            if(columns.length == 0) {
                me.columns.forEach((tt, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    sums[index] = 0 ;
                })
                return sums ;
            } else {
                return sums ;
            }
        },
        // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
        headerCellStyle({row, column, rowIndex, columnIndex}) {
            return {
                backgroundColor: '#f0f8ff' ,
                textAlign: 'center' ,
                color: '#303133'
            }
        },
        // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
        cellStyle({row, column, rowIndex, columnIndex}) {
            return {
                height: "48px",
                textAlign: "center",
                backgroundColor: "#F2F6FC"
            }
        },
        // 风险矩阵全局记录查询
        riskmatrix_all_request() {
            const me = this ;
            riskmatrix_all().then(res => {
                if(res.data.code === 200) {
                    let data = res.data.data.reverse() ;
                    me.btns = me.btns.concat(data) ;
                }
            })
        },
        // 表格查询
        selectQuery_request(vax) { 
            const me = this ;
            let $params = me.$store.state.prame.command;
            let params = {
                company: $params.company ,
                period: me.getPeriod($params) ,
                sqlKey: "RiskSelect.riskCensus"
            }
            if(vax && vax > 0)params.riskLevel = vax ;
            selectQuery(params).then(res => {
                if(res.data.code === 200) {
                    let data = res.data.data ;
                    me.expandRowKeys = [] ;
                    const setting = {
                        data: {
                            simpleData: {
                                enable: true,
                                idKey: "scode",
                                pIdKey: "spcode"
                            },
                            key: {
                                name: "scode",
                                children: "children"
                            }
                        }
                    }
                    if (Array.isArray(data) && data.length > 0) {
                        data = tools.sortByKey(data, "scode");
                        data = data.filter(function(item) {
                            item.id = item.scode;
                            item.label = item.company;
                            return item;
                        });
                        let isTrue = data.some(todo => { return todo.id === '1001' })
                        data.forEach((pool, index) => {
                            if(isTrue){
                                if(index === 0)me.expandRowKeys.push(pool.id) ;
                            } else {
                                me.expandRowKeys.push(pool.id) ;
                            }
                        })
                        let array = tools.transformToeTreeNodes(setting, data); 
                        me.tableData = [  array[0]  ] ; 
                        me.tableData2= [  array[1]  ] ; 
                        // 未关闭
                        me.receive.series[0].data[0].value = array[1].unclosecount ;
                        // 已关闭
                        me.receive.series[0].data[1].value = array[1].closecount ;
                    }
                } else {
                    me.$message.error(res.data.msg) ;
                }
            })
        },
        // 日期处理
        getPeriod($params) {
            let mm ;
            if($params.month > 0 && $params.month < 10) {
                mm = '0' + $params.month ;
            } else {
                mm = $params.month ;
            }
            return $params.year + mm ;
        }
    }
}
</script>
<style scoped>
.grid-content {
    padding: 20px ;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.grid-btn {
    width: 100% ;
    height: 35px;
    line-height: 35px;
    background: #fff ;
    text-align: right;
    background: #f0f9eb ;
}
.grid-btn .link {
    cursor: pointer;
    margin-left: 10px;
    padding: 10px;
    height: 35px;
    font-size: 14px ;
    font-family:'Microsoft YaHei';
    font-weight:400;
} 
.active {
    color: #fff !important;
    background-color: #2DB060 !important;
}
.link:hover {
    background: #EBEEF5 ;
}
.grid-sum {
    width: 100% ;
    height: 35px;
    background: #F2F6FC ;
}
</style>
<style>
    /** 这是对表头的行高设置*/
    .riskStatistics-table .el-table__header tr, 
    .riskStatistics-table .el-table__header th {
        padding: 0;
        height: 35px;
    }
    /** 这是对表行的行高设置*/
    .riskStatistics-table .el-table__body tr, 
    .riskStatistics-table .el-table__body td {
        padding: 0;
        height: 32px;
    }
    .riskStatistics-table .el-table__footer-wrapper .el-table__footer td{
        text-align: center ;
    }
</style>
