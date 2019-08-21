<template>
    <!--
        name: sjz
        说明：风险统计页面
    -->
    <div id="riskStatistics">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <!-- echarts图形 -->
                    <chart class="echarts" :options.sync="receive" auto-resize style="height: 100%"/>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                    <div class="grid-btn">
                        <span v-for="(item, index) in btns" :key="item.id" @click="tableClick(item)">{{ item.sname }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {
    // 风险矩阵全部记录查询
    riskmatrix_all
} from '~api/cube.js'
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
                            {value:335, name:'未关闭'},
                            {value:310, name:'已关闭'},
                        ]
                    }
                ]
            },
            btns: [
                { id: 1, sname: "全部" },
                { id: 1, sname: "全部" },
                { id: 1, sname: "全部" },
                { id: 1, sname: "全部" }
            ]
        }
    },
    mounted(){
        let one = document.getElementsByClassName('bg-purple')[0] ;
        let two = document.getElementsByClassName('bg-purple-light')[0] ;
        one.style.height = one.clientWidth + 'px' ;
        one.style.backgroundColor= "#fff" ;
        two.style.height = one.clientWidth + 'px' ;
        two.style.backgroundColor= "#ffeeaa" ;
        // 自适应高度
        this.setClientHeight() ;
        // 风险矩阵全局记录查询
        this.riskmatrix_all_request() ;
    },
    methods: {
        // 自适应高度
        setClientHeight() {
            const me = this ;
            window.onresize = function temp(){
                let window = document.body.offsetWidth ;
                let one = document.getElementsByClassName('bg-purple')[0] ;
                let two = document.getElementsByClassName('bg-purple-light')[0] ;
                one.style.height = one.clientWidth + 'px' ;
                one.style.backgroundColor= "#fff" ;
                two.style.height = one.clientWidth + 'px' ;
                two.style.backgroundColor= "#ffeeaa" ;
                if(window > 1440)me.receive.title.textStyle.fontSize = 16;
                if(window > 960 && window <= 1440)me.receive.title.textStyle.fontSize = 14;
                if(window < 960)me.receive.title.textStyle.fontSize = 12;
            }
        }
    }
}
</script>
<style scoped>
.bg-purple {
    padding: 20px;
}
</style>
