<template>
    <div style="height:100%;width:100%;overflow: auto;">
        
        <!-- 
            name : sjz
            time : 2019/2/21 10:44:44 
            说明 : '市管企业经营业绩情况表'的Demo，由于表格拼凑而成，json无法配置，即单独写一份；
         -->
        <div style="width:1586px;">
            <el-table
            :data="tableData1"
            :span-method="arraySpanMethod"
            :header-cell-style="{background:'rgb(240, 248, 255)'}"
            :height="heights"
            style="width:100%;margin-top:20px"
            :show-header="true"
            border
            >
                <el-table-column prop="sname" label="" width="115" align="center"></el-table-column>
                <el-table-column label="资产总额" align="center">
                    <el-table-column prop="factza" label="本月末" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zhbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ztbzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="所有者权益" align="center">
                    <el-table-column prop="factsa" label="本月末" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stbzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="资产负债率%" align="center">
                    <el-table-column prop="factza" label="本月末" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zlhbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zltbzz" label="同比增长（%）" type="unit" :width="widthx" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData1, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        
            <!-- 2 -->
            <el-table
            :data="tableData2"
            :span-method="arraySpanMethod"
            :header-cell-style="{background:'rgb(240, 248, 255)'}"
            :height="heights"
            style="width:100%"
            border
            >
                <el-table-column prop="sname" label="" width="115" align="center"></el-table-column>
                <el-table-column label="营业收入" align="center">
                    <el-table-column prop="srbqdys" label="本月末" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="srhbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="srtbzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="srbqljs" label="本年累计" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="srtbljzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="利润总额" align="center">
                    <el-table-column prop="lrbqdys" label="本月末" type="decimal" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lrhbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lrtbzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lrbqljs" label="本年累计" type="decimal" :width="widths" align="center">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lrtbljzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- 3 -->
            <el-table
            :data="tableData2"
            :span-method="arraySpanMethod"
            :header-cell-style="{background:'rgb(240, 248, 255)'}"
            :height="heightx"
            style="width:100%"
            border
            >
                <el-table-column prop="sname" label="" width="115" align="center"></el-table-column>
                <el-table-column label="成本费用利润率%" align="center">
                    <el-table-column prop="cblbys" label="本月末" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cblrhbzz" label="环比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cblrtbzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cblj" label="本年累计" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cblrtbljzz" label="同比增长（%）" type="unit" :width="widths" align="right">
                        <template slot-scope="scope">
                            <span>{{ getCellValues(tableData2, scope) }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
// import request from "utils/http";
import { eva_city_Request } from "~api/cube";
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            widths: 147,
            widthx: 294,
            heights: 103,
            heightx: 103,
            // 窗口的原始高度
            offsetHeight: document.body.offsetHeight,
            companyId : "",       // 默认的公司
            yearId : "",          // 默认的年份
            monthId: "",          // 默认的月份
            conversionId:{ },     // 默认的单位
            conversionNid: 1,     // ‘元’的Id
            // 1.
            tableData1:[
                
            ],
            // 2.
            tableData2:[
               
            ],
            // // 3.
            // tableData3:[
                
            // ]
        }
    },
    created(){
        debugger
        // 窗口的高度
        let offsetHeight = document.body.offsetHeight ;
        /**
         * 第三张表的高度(heightx) = 
         *      窗口高度(offsetHeight) - 前两张表的高度(this.heights * 2) - 顶部距离20 - 空白距离82 ;
         */
        // this.heights = 103 ;
        this.heightx = 
                offsetHeight - (this.heights * 2) - 20 - 82 ; 
        // 获得默认的公司、日期、单位
        this.companyId = this.$store.getters.company ;
        this.yearId = this.$store.getters.year ;
        this.monthId = this.$store.getters.month ;
        this.conversionId = this.$store.getters.conversion ;
        // 表格的数据请求(唯一请求)
        this.tableDataRequest(this.companyId, this.yearId, this.monthId, this.conversionId) ;  

    },
    mounted(){
        // 页面大小改变时触发  主要用来自适应页面的布局的 注：一个组件只能写一个页面触发，写多个也只有一个生效
        const me = this ;
        window.onresize = () => {
            return (() => {
                window.offsetHeight = document.body.offsetHeight ;
                me.offsetHeight = window.offsetHeight ;
            })()
        }
    },
    watch: {
        // 切换年时触发
        year(newV) {
            this.getData('year',newV) ;
        },
        // 切换月时触发
        month(newV) {
            this.getData('month',newV) ;
        },
        // 切换公司时触发
        company(newV) {
            this.getData('company',newV) ;
        },
        // 切换单位时触发（元、千元、万元、亿元）
        conversion(newV) {
            this.getData('conversion',newV) ;
        },
        // 监听offsetHeight属性值的变化，打印并观察offsetHeight发生变化的值：
        offsetHeight(val){
            // debugger
            if(!this.timer){
                // debugger
                // 一旦监听到的offsetHeight值改变，就将其重新赋给data里的offsetHeight
                this.offsetHeight = val
                this.timer = true
                let me = this
                setTimeout(function(){
                    // debugger
                    me.heightx = me.offsetHeight - (me.heights * 2) - 20 - 82 ;  
                    // 打印offsetHeight变化的值
                    console.log(me.offsetHeight)
                    me.timer = false
                },400)
            }
        }
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"])
    },
    methods:{
        // 单元格合并触发引用
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            
        },
        // 导航栏切换时触发，重新发送请求
        getData(vax, value){
            // debugger
            let me = this ;
            if(vax === 'year') {
                me.yearId = me.$store.getters[vax] ;
            } else if(vax === 'month') {
                me.monthId = me.$store.getters[vax] ;
            } else if(vax === 'company') {
                me.companyId = me.$store.getters[vax] ;
            } else {
                me.conversionId = me.$store.getters[vax] ;
            }
            // 重新发送请求数据
            me.tableDataRequest(me.companyId, me.yearId, me.monthId, me.conversionId);
        },
        // 数据请求时触发
        tableDataRequest(companyId, yearId, monthId, conversionId){
            // debugger
            let sql1, sql2, bq, sq, sntq, items, tab ;
            if(monthId>0 && monthId<10){    // 月份不是两位数的前置 + "0" ;
                monthId = "0" + monthId ;
            }
            bq = yearId + monthId ;                     // 本期
            if(monthId-1 > 0){               
                sq = yearId +  monthId - 1  ;                
            } else {
                sq = ( yearId-1 ) + "12" ;              // 上期
            }            
            sntq = ( yearId - 1 ) + monthId ;           // 上年同期
            for(let i=0; i<2; i++){
                if(i){
                    sql2 = `WITH T1 AS( SELECT :company AS SCODE,SRBQDYS, SRBQLJS, SRSQDYS,SRSNTQDYS, ROUND(DECODE(SRSQDYS,0,0,(SRBQDYS-SRSQDYS)/SRSQDYS),4) AS SRHBZZ, ROUND(DECODE(SRSNTQDYS,0,0,(SRBQDYS-SRSNTQDYS)/SRSNTQDYS),4) AS SRTBZZ, ROUND(DECODE(SRSNTQLJS,0,0,(SRBQLJS-SRSNTQLJS)/SRSNTQLJS),4) AS SRTBLJZZ FROM( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS SRBQDYS, SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS SRBQLJS, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS SRSQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS SRSNTQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS SRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1416001' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company) ), T2 AS( SELECT :company AS SCODE,LRBQDYS,LRSQDYS,LRSNTQDYS,LRBQLJS,LRSNTQLJS, ROUND(DECODE(LRSQDYS,0,0,(LRBQDYS-LRSQDYS)/LRSQDYS),4) AS LRHBZZ, ROUND(DECODE(LRSNTQDYS,0,0,(LRBQDYS-LRSNTQDYS)/LRSNTQDYS),4) AS LRTBZZ, ROUND(DECODE(LRSNTQLJS,0,0,(LRBQLJS-LRSNTQLJS)/LRSNTQLJS),4) AS LRTBLJZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS LRBQDYS, SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS LRBQLJS, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS LRSQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS LRSNTQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS LRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1403100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ), T3 AS( SELECT :company AS SCODE,CBBQDYS,CBSQDYS,CBSNTQDYS,CBBQLJS, ROUND(DECODE(CBSQDYS,0,0,(CBBQDYS-CBSQDYS)/CBSQDYS),4) AS CBHBZZ, ROUND(DECODE(CBSNTQDYS,0,0,(CBBQDYS-CBSNTQDYS)/CBSNTQDYS),4) AS CBTBZZ, ROUND(DECODE(CBSNTQLJS,0,0,(CBBQLJS-CBSNTQLJS)/CBSNTQLJS),4) AS CBTBLJZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS CBBQDYS, SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS CBBQLJS, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS CBSQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS CBSNTQDYS, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS CBSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1426400' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '效益状况' as sname, T1.SRBQDYS,T1.SRHBZZ,T1.SRTBZZ,T1.SRBQLJS,T1.SRTBLJZZ, T2.LRBQDYS,T2.LRHBZZ,T2.LRTBZZ,T2.LRBQLJS,T2.LRTBLJZZ, CBLBYS,CBLRHBZZ,CBLRTBZZ,CBLJ,CBLRTBLJZZ FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE LEFT JOIN ( SELECT SCODE,CBLBYS,CBLBYS-CBSQ AS CBLRHBZZ,CBLBYS-CBSN AS CBLRTBZZ,CBLJ,CBLJ-CBSNLJ AS CBLRTBLJZZ FROM ( SELECT T2.SCODE,ROUND(DECODE(T3.CBBQDYS,0,0,T2.LRBQDYS/T3.CBBQDYS),4) AS CBLBYS, ROUND(DECODE(T3.CBBQDYS,0,0,T2.LRSNTQDYS/T3.CBBQDYS),4) AS CBSQ, ROUND(DECODE(T3.CBBQDYS,0,0,T2.LRSNTQDYS/T3.CBBQDYS),4) AS CBSN, ROUND(DECODE(T3.CBBQLJS,0,0,T2.LRBQLJS/T3.CBBQLJS),4) AS CBLJ, ROUND(DECODE(T3.CBBQLJS,0,0,T2.LRSNTQLJS/T3.CBBQLJS),4) AS CBSNLJ FROM T2 LEFT JOIN T3 ON T2.SCODE = T3.SCODE ) ) T4 ON T1.SCODE = T4.SCODE `
                }else{
                    sql2 = `WITH T1 AS( SELECT :company AS SCODE,FACTZA,ZSQTQ,ZSNTQ,ROUND(DECODE(ZSQTQ,0,0,(FACTZA-ZSQTQ)/ZSQTQ),4) AS ZHBZZ, ROUND(DECODE(ZSNTQ,0,0,(FACTZA-ZSNTQ)/ZSNTQ),4) AS ZTBZZ FROM( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS FACTZA, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS ZSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS ZSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1100100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company) ), T3 AS( SELECT :company AS SSCODE, FACTSA,SSQTQ,SSNTQ,ROUND(DECODE(SSQTQ,0,0,(FACTSA-SSNTQ)/SSQTQ),4) AS SHBZZ, ROUND(DECODE(SSNTQ,0,0,(FACTSA-SSNTQ)/SSNTQ),4) AS STBZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS FACTSA, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS SSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS SSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1300100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ), T2 AS ( SELECT :company AS SCODE, FACTFA, FSQTQ,FSNTQ , ROUND(DECODE(FSQTQ,0,0,(FACTFA-FSQTQ)/FSQTQ),4) AS FHBZZ, ROUND(DECODE(FSNTQ,0,0,(FACTFA-FSNTQ)/FSNTQ),4) AS FTBZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS FACTFA, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS FSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS FSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1200100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '资产状况' as sname, T.FACTZA,T.ZHBZZ,T.ZTBZZ,T3.FACTSA,T3.SHBZZ,T3.STBZZ ,T4.FACTBA,T4.ZLHBZZ,T4.ZLTBZZ FROM T1 T LEFT JOIN T3 ON T.SCODE = T3.SSCODE LEFT JOIN ( SELECT SCODE,FACTBA,FACTBA-FACTSQA AS ZLHBZZ,FACTBA-FACTSNA AS ZLTBZZ FROM( SELECT T1.SCODE,ROUND(DECODE(T1.FACTZA,0,0,T2.FACTFA/T1.FACTZA),4) AS FACTBA, ROUND(DECODE(T1.FACTZA,0,0,T2.FSQTQ/T1.FACTZA),4) AS FACTSQA, ROUND(DECODE(T1.FACTZA,0,0,T2.FSNTQ/T1.FACTZA),4) AS FACTSNA FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE ) ) T4 ON T.SCODE = T4.SCODE`           
                }
                // 全局替换
                sql1 = sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+bq+"'").replace(/:comparePeriod/g,"'"+sntq+"'").replace(/:sq/g,"'"+sq+"'") ;  
                items = {
                    'cubeId': 4,
                    'sql' : sql1
                }
                this.tableData1 = [] ;
                this.tableData2 = [] ;
                this.cityResults_new(items) ;
            }           
        },
        // 循环请求数据
        cityResults_new(items ){
            // debugger
            eva_city_Request(items).then(res => {
                // debugger
                if(res.data.code === 200){
                    if(this.tableData1.length > 0){
                        this.tableData2 = res.data.data ;
                    } else {
                        this.tableData1 = res.data.data ;
                    }
                    // this.tableData1 = res.data.data ;
                }
            });
        },
        // 数据处理
        getCellValues(tableData1, scope){
            debugger
            let prop = scope.column.property ;
            let type = scope.column.type ;
            let data = scope.row ;
            let value = data[prop] ;
            let newId = this.conversionId.id ;      // 改变的单位id
            let oldId = this.conversionNid ;        // 元的id
            // % 处理
            if(type === "unit"){
                if(value){
                    value = Math.decimalToLocalString(value*100) + "%" ;
                } else {
                    value = '--' ;
                }
            }
            if(type === "decimal"){
                if(value){
                    // 单位的改变 元 、 千元 、 万元 、 亿元            
                    if(newId > oldId){
                       value = Math.decimalToLocalString(value / newId) ; 
                    }else{
                        value = Math.decimalToLocalString(value) ;
                        if(!value){
                            value = '--' ;
                        }
                    }
                }else{
                    value = '--' ;
                }
            }
            return value ;
        }
    }
}
</script>

<style scoped>
    

/**
 * 主要这对了 “表头” 显示浅蓝色背景
 */
/* .has-gutter tr th {
    background-color: rgb(240, 248, 255);
} */
/**
 * 以下两个是针对el-table树表的 “行高” 的，这样写才生效；（百度查找）
 */
/* .el-table__header tr, .el-table__header th {
    padding: 0;
    height: 45px;
}
.el-table__body tr, .el-table__body td {
    padding: 0;
    height: 88px;
} */
</style>
