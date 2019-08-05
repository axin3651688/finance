<template>
    <div id="sg" style="height:100%;width:100%;overflow: auto;">

        <div style="width:1586px;" :style="contenStyleObj">
            <el-tabs v-model="activeName">
                <el-tab-pane label="市管企业经营业绩情况表" name="first" >
                    <div v-if="isShow">
                        <div class="isShow">
                            <span>此公司没有查看此报表的权限！</span>
                        </div>
                    </div>
                    <div v-else>
                        <div style="marginBottom: 5px;">
                            <el-button-group>
                                <el-button class="btn" type="primary" plain v-for="(item,index) in items" :key="item.id" @click="buttonClick(item)">{{ item.text }}</el-button>
                            </el-button-group>
                        </div>
                        <table class="table2" style="float:left;">
                            <tr class="tr0">
                                <th class="heightx" style="height:122px;line-height: 122px;">资产状况</th>
                            </tr>
                            <tr class="tr0">
                                <th class="heightx" style="height:245px;line-height:245px;">效益状况</th>
                            </tr>
                        </table>
                        <table class="table" id="cityResults2">
                            <tr class="tr1">
                                <!-- <th rowspan="3" class="heightx" style="width:150px;">资产状况</th> -->
                                <th colspan="3" class="heights" style="width:450px;">资产总额</th>
                                <th colspan="3" class="heights" style="width:450px;">所有者权益总额</th>
                                <th colspan="4" class="heights" style="width:600px;">资产负债率（%）</th>
                            </tr>
                            <tr class="tr2">
                                <th style="width:150px">本月末</th>
                                <th style="width:150px">环比增长（%）</th>
                                <th style="width:150px">同比增长（%）</th>
                                <th style="width:150px">本月末</th>
                                <th style="width:150px">环比增长（%）</th>
                                <th style="width:150px">同比增长（%）</th>
                                <th style="width:150px">本月末</th>
                                <th style="width:150px">环比增长（%）</th>
                                <th colspan="2" style="width:300px">同比增长（%）</th>                       
                            </tr>
                            <tr class="tr3">
                                <!-- <td>{{ getCellValue(exps.factzb) }}</td> -->
                                <td>{{ exps.factzb }}</td>
                                <td>{{ exps.zhbzz }}</td>
                                <td>{{ exps.ztbzz }}</td>
                                <td>{{ exps.factsa }}</td>
                                <td>{{ exps.shbzz }}</td>
                                <td>{{ exps.stbzz }}</td>
                                <td>{{ exps.factba }}</td>
                                <td>{{ exps.zlhbzz }}</td>
                                <td colspan="2">{{ exps.zltbzz }}</td>
                            </tr>
                            <tr class="tr1">
                                <!-- <th rowspan="6" class="heightx" style="width:150px;line-height:32px">效益状况</th> -->
                                <th colspan="5" class="heights" style="width:750px;">营业收入</th>
                                <th colspan="5" class="heights" style="width:750px;">利润总额</th>
                            </tr>
                            <tr class="tr2">
                                <th style="width:150px">本月末</th>
                                <th style="width:150px">环比增长（%）</th>
                                <th style="width:150px">同比增长（%）</th>
                                <th style="width:150px">本年累计</th>
                                <th style="width:150px">同比增长（%）</th>
                                <th style="width:150px">本月末</th>
                                <th style="width:150px">环比增长（%）</th>
                                <th style="width:150px">同比增长（%）</th>
                                <th style="width:150px">本年累计</th>
                                <th style="width:150px">同比增长（%）</th>
                            </tr>
                            <tr class="tr3">
                                <td>{{ expx.srbqdys }}</td>
                                <td>{{ expx.srhbzz }}</td>
                                <td>{{ expx.srtbzz }}</td>
                                <td>{{ expx.srbqljs }}</td>
                                <td>{{ expx.srtbljzz }}</td>
                                <td>{{ expx.lrbqdys }}</td>
                                <td>{{ expx.lrhbzz }}</td>
                                <td>{{ expx.lrtbzz }}</td>
                                <td>{{ expx.lrbqljs }}</td>
                                <td>{{ expx.lrtbljzz }}</td>
                            </tr>
                            <tr class="tr1">
                                <th colspan="10" class="heights" style="width:750px;">成本费用利润率（%）</th>
                            </tr>
                            <tr class="tr2">
                                <th colspan="2" style="width:150px">本月末</th>
                                <th colspan="2" style="width:150px">环比增长（%）</th>
                                <th colspan="2" style="width:150px">同比增长（%）</th>
                                <th colspan="2" style="width:150px">本年累计</th>
                                <th colspan="2" style="width:150px">同比增长（%）</th>
                            </tr>
                            <tr class="tr3">
                                <td colspan="2" >{{ expx.cblbys }}</td>
                                <td colspan="2" >{{ expx.cblrhbzz }}</td>
                                <td colspan="2" >{{ expx.cblrtbzz }}</td>
                                <td colspan="2" >{{ expx.cblj }}</td>
                                <td colspan="2" >{{ expx.cblrtbljzz }}</td>
                            </tr>
                        </table>
                    </div>                   
                </el-tab-pane>
            </el-tabs>
            <!-- font-weight: bolder; -->
            
        </div>
    </div>
</template>
<script>
import { eva_city_Request } from "~api/cube";
import { mapGetters } from "vuex";
import {
    exportExcle
} from "@/api/SZCExport.js";
export default {
    data(){
        return {
            tableData: [],
            tableData2:[],
            isShow: true ,
            items: [
                { id: "1", text: "刷新" },
                { id: "2", text: "导出" }
            ],
            expsSort: [
                // 资产总额
                "factzb",
                "zhbzz",     // %
                "ztbzz",     // %
                // 所有者权益    
                "factsa",
                "shbzz",     // %
                "stbzz0" ,     // %
                // 资产负债率（%）    
                "factba",     // %
                "zlhbzz",     // %
                "zltbzz"     // %
            ],
            exps: {
            // 资产总额                 
                factzb: 0 ,
                zhbzz : 0 ,     // %
                ztbzz : 0 ,     // %
            // 所有者权益    
                factsa: 0 ,
                shbzz : 0 ,     // %
                stbzz : 0 ,     // %
            // 资产负债率（%）    
                factba: 0 ,     // %
                zlhbzz: 0 ,     // %
                zltbzz: 0       // %
            },    
            expxSort: [
            // 营业收入
                "srbqdys",
                "srhbzz",     // %
                "srtbzz",     // %
                "srbqljs",
                "srtbljzz",     // %
            // 利润总额
                "lrbqdys",
                "lrhbzz",     // %
                "lrtbzz" ,     // %
                "lrbqljs",
                "lrtbljzz",     // %
            // 成本费用利润率（%）
                "cblbys",
                "cblrhbzz",     // %
                "cblrtbzz",     // %
                "cblj",
                "cblrtbljzz"    // %
            ],   
            expx: {
            
            // 营业收入
                srbqdys: 0,
                srhbzz : 0,     // %
                srtbzz : 0,     // %
                srbqljs: 0,
                srtbljzz:0,     // %
            // 利润总额
                lrbqdys :0,
                lrhbzz : 0,     // %
                lrtbzz : 0,     // %
                lrbqljs: 0,
                lrtbljzz:0,     // %
            // 成本费用利润率（%）
                cblbys : 0,
                cblrhbzz:0,     // %
                cblrtbzz:0,     // %
                cblj : 0,
                cblrtbljzz:0    // %
            },
            companyId: "",     // 默认的公司id
            yearId: "",        // 默认的年份
            monthId: "",       // 默认的月份
            conversionId: "",  // 默认的单位
            conversionNid: 1,  // 单位 元 id

            num : -1 ,
            first: [],
            second:[],
            // tab页展示默认第一
            activeName: "first",
            // tab默认高度
            contenStyleObj: {
                height: "500px"
            },
            // tabHeight: "300px",
            // 窗口的原始高度
            offsetHeight: document.body.offsetHeight,
            /**
             * 导航栏高度：64
             * tab页高度：40
             * 表格顶部距离：20+20
             */
        }
    },
    created(){
        // let len = document.getElementById('pane-first') ;
        // if(len){
        //     this.tabHeight = this.offsetHeight - 64 - 40 - 40 ;
        // }
        this.tabHeight = (this.offsetHeight - 64 - 40 - 40) + "px" ;
        // 获得默认的公司、日期、单位
        this.companyId = this.$store.getters.company ;
        this.yearId = this.$store.getters.year ;
        this.monthId = this.$store.getters.month ;
        this.conversionId = this.$store.getters.conversion ;
        // 判断公司是否为集团公司
        if(this.companyId=='1001'){
            this.isShow = false;
        }else{
            this.isShow = true ;
        }
        // 表格的数据请求(唯一请求)
        this.tableDataRequest(this.companyId, this.yearId, this.monthId, this.conversionId) ;  
    },
    mounted(){
        // 设置表格高度（自适应）
        this.setTableScollHeight();
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
        }
    },
    computed: {
        ...mapGetters(["year", "month", "company", "conversion"])
    },
    methods: {
        setTableScollHeight(){
            // document.body.offsetHeight
            // this.contenStyleObj.height = `${document.documentElement.clientHeight - 200}px` ;
            this.contenStyleObj.height = document.documentElement.clientHeight - 40 - 40 + "px" ;
            const me = this ;
            window.onresize = function temp(){
                // me.contenStyleObj.height = `${document.documentElement.clientHeight - 200}px` ;
                me.contenStyleObj.height = document.documentElement.clientHeight - 40 - 40 + "px" ;
            };
        },
            // 导出按钮、刷新按钮功能
        buttonClick(item){
            let me = this ;
            // 1.刷新   2.导出
            if(item.id == "1"){
                me.tableDataRequest(me.companyId, me.yearId, me.monthId, me.conversionId);
            }else{
                // 
                this.downLoadEVA();
            }
        },
        /**
         * 点击导出按钮触发的事件 (后台导出)
         * @author szc 2019年4月3日16:10:44
         */
        downLoadEVA () {
            let me = this,getters = this.$store.getters,year = getters.year,month = getters.month;
            let exportData = {Sheet1:{year:year,month:month,data:[]}};
            let row01Datas = this.exps,expxSort = me.expxSort,expx = me.expx;
            row01Datas.rownum = "1";
            exportData.Sheet1.data.push(row01Datas);
            let rowIndex = "2";
            //第二行数据
            let dataObj = {rownum:rowIndex};
            for(let i = 0; i < expxSort.length;i ++){
                let item = expxSort[i];
                if(i < 10){
                    dataObj[item] = expx[item];
                }
                if(i == 10){
                    exportData.Sheet1.data.push(dataObj);
                    rowIndex = rowIndex + 1 + "";
                    dataObj = {rownum:rowIndex};
                }
                if(i > 9){
                    dataObj[item] = expx[item];
                }
            }
            exportData.Sheet1.data.push(dataObj);
            console.log("导出格式：",exportData)
            let params = {sheetmapString:JSON.stringify(exportData),templateFile:"市管企业经营业绩情况表.xlsx"};
            exportExcle(params).then(res => {
                var blob = res.data;
                var href = window.URL.createObjectURL(blob); // 创建下载的链接
                var downloadElement = document.createElement('a');
                downloadElement.href = href;
                downloadElement.download = '市管企业经营业绩情况表.xlsx'; // 下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); // 点击下载
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href);
            });
        },
        /**
         * 点击导出按钮触发的事件 (前端导出)
         * @author szc 2019年4月1日16:52:11
         */
        downLoadEVA_old () {
            let me = this;
            import('@/excel/SZCExport2Excel').then(excel => {
                excel.export_table_to_excel("cityResults2","市管企业经营业绩情况表");
            })
        },
        // 切换维度时触发
        getData(vax, value){
            let me = this ;
            // 判断公司是否为集团公司
            if(vax=="company"){
                if(value=='1001'){
                me.isShow = false;
                }else{
                    me.isShow = true ;
                }
            }
            me.num = -1 ;
            me.tableData = [],me.tableData2=[],me.first=[],me.second=[] ;
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
        // 数据请求时的变量替换
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
                    sql2 = `WITH T1 AS( SELECT :company AS SCODE, SRBQDYS, SRBQLJS, SRSQDYS, SRSNTQDYS, ROUND(DECODE(SRSQDYS,0,0,(SRBQDYS-SRSQDYS)/SRSQDYS),4) AS SRHBZZ, ROUND(DECODE(SRSNTQDYS,0,0,(SRBQDYS-SRSNTQDYS)/SRSNTQDYS),4) AS SRTBZZ, ROUND(DECODE(SRSNTQLJS,0,0,(SRBQLJS-SRSNTQLJS)/SRSNTQLJS),4) AS SRTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS SRBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS SRBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS SRSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS SRSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS SRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1416001' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY in ( SELECT SCODE FROM DW_DIMCOMPANY WHERE STYPE IN('1', 'R') AND CISDEL='N' START WITH SCODE= :company CONNECT BY PRIOR SCODE=SPCODE) AND SUBJECT='0002' GROUP BY DIM_ITEMPERIOD)) , T2 AS ( SELECT :company AS SCODE, LRBQDYS, LRSQDYS, LRSNTQDYS, LRBQLJS, LRSNTQLJS, ROUND(DECODE(LRSQDYS,0,0,(LRBQDYS-LRSQDYS)/LRSQDYS),4) AS LRHBZZ, ROUND(DECODE(LRSNTQDYS,0,0,(LRBQDYS-LRSNTQDYS)/LRSNTQDYS),4) AS LRTBZZ, ROUND(DECODE(LRSNTQLJS,0,0,(LRBQLJS-LRSNTQLJS)/LRSNTQLJS),4) AS LRTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS LRBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS LRBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS LRSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS LRSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS LRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1403100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY IN ( SELECT SCODE FROM DW_DIMCOMPANY WHERE STYPE IN('1', 'R') AND CISDEL='N' START WITH SCODE= :company CONNECT BY PRIOR SCODE=SPCODE) AND SUBJECT='0002' GROUP BY DIM_ITEMPERIOD ) ) , T3 AS ( SELECT :company AS SCODE, CBBQDYS, CBSQDYS, CBSNTQDYS, CBSNTQLJS, CBBQLJS, ROUND(DECODE(CBSQDYS,0,0,(CBBQDYS-CBSQDYS)/CBSQDYS),4) AS CBHBZZ, ROUND(DECODE(CBSNTQDYS,0,0,(CBBQDYS-CBSNTQDYS)/CBSNTQDYS),4) AS CBTBZZ, ROUND(DECODE(CBSNTQLJS,0,0,(CBBQLJS-CBSNTQLJS)/CBSNTQLJS),4) AS CBTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS CBBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS CBBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS CBSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS CBSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS CBSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1426400' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY IN ( SELECT SCODE FROM DW_DIMCOMPANY WHERE STYPE IN('1', 'R') AND CISDEL='N' START WITH SCODE= :company CONNECT BY PRIOR SCODE=SPCODE) AND SUBJECT='0002' GROUP BY DIM_ITEMPERIOD) ) SELECT '效益状况' AS sname, T1.SRBQDYS, T1.SRHBZZ, T1.SRTBZZ, T1.SRBQLJS, T1.SRTBLJZZ, T2.LRBQDYS, T2.LRHBZZ, T2.LRTBZZ, T2.LRBQLJS, T2.LRTBLJZZ, CBLBYS, CBLRHBZZ, CBLRTBZZ, CBLJ, CBLRTBLJZZ FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE LEFT JOIN ( SELECT SCODE, CBLBYS, CBLRHBZZ, CBLRTBZZ, CBLJ, CBLRTBLJZZ FROM ( SELECT T2.SCODE, ROUND(DECODE(T3.CBBQDYS,0,0,T2.LRBQDYS/T3.CBBQDYS),4) AS CBLBYS, ROUND(DECODE(T3.CBBQDYS,0,0,(T2.LRBQDYS/T3.CBBQDYS)-DECODE(T3.CBSQDYS,0,0,(t2.LRSQDYS/T3.CBSQDYS))),4) AS CBLRHBZZ, ROUND(DECODE(T3.CBBQDYS,0,0,(T2.LRBQDYS/T3.CBBQDYS)-DECODE(T3.CBSNTQDYS,0,0,(t2.LRSNTQDYS/T3.CBSNTQDYS))),4) AS CBLRTBZZ, ROUND(DECODE(T3.CBBQLJS,0,0,T2.LRBQLJS/T3.CBBQLJS),4) AS CBLJ, ROUND(DECODE(T3.CBBQLJS,0,0, (T2.LRBQLJS/T3.CBBQLJS)-DECODE(T3.CBSNTQLJS,0,0,(T2.LRSNTQLJS/T3.CBSNTQLJS))),4) AS CBLRTBLJZZ FROM T2 LEFT JOIN T3 ON T2.SCODE = T3.SCODE ) ) T4 ON T1.SCODE = T4.SCODE`
                    // sql2 = `WITH T1 AS( SELECT :company AS SCODE, SRBQDYS, SRBQLJS, SRSQDYS, SRSNTQDYS, ROUND(DECODE(SRSQDYS,0,0,(SRBQDYS-SRSQDYS)/SRSQDYS),4) AS SRHBZZ, ROUND(DECODE(SRSNTQDYS,0,0,(SRBQDYS-SRSNTQDYS)/SRSNTQDYS),4) AS SRTBZZ, ROUND(DECODE(SRSNTQLJS,0,0,(SRBQLJS-SRSNTQLJS)/SRSNTQLJS),4) AS SRTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS SRBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS SRBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS SRSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS SRSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS SRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1416001' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company)) , T2 AS ( SELECT :company AS SCODE, LRBQDYS, LRSQDYS, LRSNTQDYS, LRBQLJS, LRSNTQLJS, ROUND(DECODE(LRSQDYS,0,0,(LRBQDYS-LRSQDYS)/LRSQDYS),4) AS LRHBZZ, ROUND(DECODE(LRSNTQDYS,0,0,(LRBQDYS-LRSNTQDYS)/LRSNTQDYS),4) AS LRTBZZ, ROUND(DECODE(LRSNTQLJS,0,0,(LRBQLJS-LRSNTQLJS)/LRSNTQLJS),4) AS LRTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS LRBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS LRBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS LRSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS LRSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS LRSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1403100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company ) ) , T3 AS ( SELECT :company AS SCODE, CBBQDYS, CBSQDYS, CBSNTQDYS, CBBQLJS, ROUND(DECODE(CBSQDYS,0,0,(CBBQDYS-CBSQDYS)/CBSQDYS),4) AS CBHBZZ, ROUND(DECODE(CBSNTQDYS,0,0,(CBBQDYS-CBSNTQDYS)/CBSNTQDYS),4) AS CBTBZZ, ROUND(DECODE(CBSNTQLJS,0,0,(CBBQLJS-CBSNTQLJS)/CBSNTQLJS),4) AS CBTBLJZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS CBBQDYS, SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS CBBQLJS, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS CBSQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS CBSNTQDYS, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS CBSNTQLJS FROM DW_FACTFINANCEPERIOD WHERE DIM_ITEMPERIOD ='1426400' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '效益状况' AS sname, T1.SRBQDYS, T1.SRHBZZ, T1.SRTBZZ, T1.SRBQLJS, T1.SRTBLJZZ, T2.LRBQDYS, T2.LRHBZZ, T2.LRTBZZ, T2.LRBQLJS, T2.LRTBLJZZ, CBLBYS, CBLRHBZZ, CBLRTBZZ, CBLJ, CBLRTBLJZZ FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE LEFT JOIN ( SELECT SCODE,CBLBYS,CBLRHBZZ, CBLRTBZZ, CBLJ, CBLRTBLJZZ FROM ( SELECT T2.SCODE,ROUND(DECODE(T3.CBBQDYS,0,0,T2.LRBQDYS/T3.CBBQDYS),4) AS CBLBYS, ROUND(DECODE(T3.CBBQDYS,0,0,(T2.LRBQDYS-t2.LRSQDYS)/T3.CBBQDYS),4) as CBLRHBZZ, ROUND(DECODE(T3.CBBQDYS,0,0,(T2.LRBQDYS-t2.LRSNTQDYS)/T3.CBBQDYS),4) as CBLRTBZZ, ROUND(DECODE(T3.CBBQLJS,0,0,T2.LRBQLJS/T3.CBBQLJS),4) AS CBLJ, ROUND(DECODE(T3.CBBQLJS,0,0,(T2.LRBQLJS-T2.LRSNTQLJS)/T3.CBBQLJS),4) AS CBLRTBLJZZ FROM T2 LEFT JOIN T3 ON T2.SCODE = T3.SCODE ) ) T4 ON T1.SCODE = T4.SCODE`;
                    sql1 = sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+bq+"'").replace(/:comparePeriod/g,"'"+sntq+"'").replace(/:sq/g,"'"+sq+"'") ;  
                    items = {
                        'cubeId': 4,
                        'sql' : sql1
                    }
                    this.cityResults_second(items) ;
                }else{
                    sql2 = `WITH T1 AS( SELECT :company AS SCODE, FACTZB, ZSQTQ, ZSNTQ, ROUND(DECODE(ZSQTQ,0,0,(FACTZB-ZSQTQ)/ZSQTQ),4) AS ZHBZZ, ROUND(DECODE(ZSNTQ,0,0,(FACTZB-ZSNTQ)/ZSNTQ),4) AS ZTBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTZB, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS ZSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS ZSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1100100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company)) , T3 AS ( SELECT :company AS SSCODE, FACTSA, SSQTQ, SSNTQ, ROUND(DECODE(SSQTQ,0,0,(FACTSA-SSQTQ)/SSQTQ),4) AS SHBZZ, ROUND(DECODE(SSNTQ,0,0,(FACTSA-SSNTQ)/SSNTQ),4) AS STBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTSA, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS SSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS SSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1300100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company ) ) , T2 AS ( SELECT :company AS SCODE, FACTFA, FSQTQ, FSNTQ , ROUND(DECODE(FSQTQ,0,0,(FACTFA-FSQTQ)/FSQTQ),4) AS FHBZZ, ROUND(DECODE(FSNTQ,0,0,(FACTFA-FSNTQ)/FSNTQ),4) AS FTBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTFA, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS FSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS FSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1200100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '资产状况' AS sname, T.FACTZB, T.ZHBZZ, T.ZTBZZ, T3.FACTSA, T3.SHBZZ, T3.STBZZ , T4.FACTBA, T4.ZLHBZZ, T4.ZLTBZZ FROM T1 T LEFT JOIN T3 ON T.SCODE = T3.SSCODE LEFT JOIN ( SELECT SCODE, FACTBA, FACTBA-FACTSQA AS ZLHBZZ, FACTBA-FACTSNA AS ZLTBZZ FROM ( SELECT T1.SCODE, ROUND(DECODE(T1.FACTZB,0,0,T2.FACTFA/T1.FACTZB),4) AS FACTBA, ROUND(DECODE(T1.FACTZB,0,0,T2.FSQTQ/T1.ZSQTQ),4) AS FACTSQA, ROUND(DECODE(T1.FACTZB,0,0,T2.FSNTQ/T1.ZSNTQ),4) AS FACTSNA FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE ) ) T4 ON T.SCODE = T4.SCODE`
                    // sql2 = `WITH T1 AS( SELECT :company AS SCODE, FACTZB, ZSQTQ, ZSNTQ, ROUND(DECODE(ZSQTQ,0,0,(FACTZB-ZSQTQ)/ZSQTQ),4) AS ZHBZZ, ROUND(DECODE(ZSNTQ,0,0,(FACTZB-ZSNTQ)/ZSNTQ),4) AS ZTBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTZB, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS ZSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS ZSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1100100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company)) , T3 AS ( SELECT :company AS SSCODE, FACTSA, SSQTQ, SSNTQ, ROUND(DECODE(SSQTQ,0,0,(FACTSA-SSQTQ)/SSQTQ),4) AS SHBZZ, ROUND(DECODE(SSNTQ,0,0,(FACTSA-SSNTQ)/SSNTQ),4) AS STBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTSA, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS SSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS SSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1300100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company) ) , T2 AS ( SELECT :company AS SCODE, FACTFA, FSQTQ, FSNTQ , ROUND(DECODE(FSQTQ,0,0,(FACTFA-FSQTQ)/FSQTQ),4) AS FHBZZ, ROUND(DECODE(FSNTQ,0,0,(FACTFA-FSNTQ)/FSNTQ),4) AS FTBZZ FROM ( SELECT SUM( CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_B,0) ELSE 0 END) AS FACTFA, SUM( CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_B,0) ELSE 0 END) AS FSQTQ, SUM( CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_B,0) ELSE 0 END) AS FSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1200100' AND DIM_PERIOD IN (:period, :sq, :comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '资产状况' AS sname, T.FACTZB, T.ZHBZZ, T.ZTBZZ, T3.FACTSA, T3.SHBZZ, T3.STBZZ , T4.FACTBA, T4.ZLHBZZ, T4.ZLTBZZ FROM T1 T LEFT JOIN T3 ON T.SCODE = T3.SSCODE LEFT JOIN ( SELECT SCODE, FACTBA, FACTBA-FACTSQA AS ZLHBZZ, FACTBA-FACTSNA AS ZLTBZZ FROM ( SELECT T1.SCODE, ROUND(DECODE(T1.FACTZB,0,0,T2.FACTFA/T1.FACTZB),4) AS FACTBA, ROUND(DECODE(T1.FACTZB,0,0,T2.FSQTQ/T1.FACTZB),4) AS FACTSQA, ROUND(DECODE(T1.FACTZB,0,0,T2.FSNTQ/T1.FACTZB),4) AS FACTSNA FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE ) ) T4 ON T.SCODE = T4.SCODE`,
                    sql1 = sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+bq+"'").replace(/:comparePeriod/g,"'"+sntq+"'").replace(/:sq/g,"'"+sq+"'") ;  
                    items = {
                        'cubeId': 4,
                        'sql' : sql1
                    }
                    this.cityResults_first(items) ;
                }
            
            // sql2 = `WITH T1 AS( SELECT :company AS SCODE,factzb,ZSQTQ,ZSNTQ,ROUND(DECODE(ZSQTQ,0,0,(factzb-ZSQTQ)/ZSQTQ),4) AS ZHBZZ, ROUND(DECODE(ZSNTQ,0,0,(factzb-ZSNTQ)/ZSNTQ),4) AS ZTBZZ FROM( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS factzb, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS ZSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS ZSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1100100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company) ), T3 AS( SELECT :company AS SSCODE, FACTSA,SSQTQ,SSNTQ,ROUND(DECODE(SSQTQ,0,0,(FACTSA-SSNTQ)/SSQTQ),4) AS SHBZZ, ROUND(DECODE(SSNTQ,0,0,(FACTSA-SSNTQ)/SSNTQ),4) AS STBZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS FACTSA, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS SSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS SSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1300100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ), T2 AS ( SELECT :company AS SCODE, FACTFA, FSQTQ,FSNTQ , ROUND(DECODE(FSQTQ,0,0,(FACTFA-FSQTQ)/FSQTQ),4) AS FHBZZ, ROUND(DECODE(FSNTQ,0,0,(FACTFA-FSNTQ)/FSNTQ),4) AS FTBZZ FROM ( SELECT SUM(CASE WHEN DIM_PERIOD=:period THEN NVL(FACT_A,0) ELSE 0 END) AS FACTFA, SUM(CASE WHEN DIM_PERIOD=:sq THEN NVL(FACT_A,0) ELSE 0 END) AS FSQTQ, SUM(CASE WHEN DIM_PERIOD=:comparePeriod THEN NVL(FACT_A,0) ELSE 0 END) AS FSNTQ FROM DW_FACTFINANCEPOINT WHERE DIM_ITEMPOINT ='1200100' AND DIM_PERIOD IN (:period,:sq,:comparePeriod) AND DIM_COMPANY=:company ) ) SELECT '资产状况' as sname, T.factzb,T.ZHBZZ,T.ZTBZZ,T3.FACTSA,T3.SHBZZ,T3.STBZZ ,T4.FACTBA,T4.ZLHBZZ,T4.ZLTBZZ FROM T1 T LEFT JOIN T3 ON T.SCODE = T3.SSCODE LEFT JOIN ( SELECT SCODE,FACTBA,FACTBA-FACTSQA AS ZLHBZZ,FACTBA-FACTSNA AS ZLTBZZ FROM( SELECT T1.SCODE,ROUND(DECODE(T1.factzb,0,0,T2.FACTFA/T1.factzb),4) AS FACTBA, ROUND(DECODE(T1.factzb,0,0,T2.FSQTQ/T1.factzb),4) AS FACTSQA, ROUND(DECODE(T1.factzb,0,0,T2.FSNTQ/T1.factzb),4) AS FACTSNA FROM T1 LEFT JOIN T2 ON T1.SCODE = T2.SCODE ) ) T4 ON T.SCODE = T4.SCODE` 
            // 全局替换
                // sql1 = sql2.replace(/:company/g,"'"+companyId+"'").replace(/:period/g,"'"+bq+"'").replace(/:comparePeriod/g,"'"+sntq+"'").replace(/:sq/g,"'"+sq+"'") ;  
                // items = {
                //     'cubeId': 4,
                //     'sql' : sql1
                // }
                // this.cityResults_new(items) ;
            }
            // this.dataProcessing(me.tableData) ; 
        },
        // 数据请求方法1.
        cityResults_first(items){
            let me = this ;
            eva_city_Request(items).then(res => {
                if(res.data.code === 200){
                    // me.num ++ ; 
                    // me.tableData = [] ;
                    // if(me.num){
                        // me.tableData.concat(res.data.data[0]) ;
                        // me.tableData2.push(res.data.data[0]) ;
                        me.tableData = res.data.data[0] ;
                        // this.dataProcessing(me.tableData) ; 
                    // }else{
                    //     me.tableData = res.data.data[0] ;
                    //     // me.tableData.push(res.data.data[0]) ;
                    // }  
                    // me.tableData.push(res.data.data[0]) ;
                    this.dataProcessing_first(me.tableData) ;                                                      
                }
            });
        },
        // 2.0
        cityResults_second(items){
            let me = this ;
            eva_city_Request(items).then(res => {
                if(res.data.code === 200){
                    
                    me.tableData2 = res.data.data[0] ;
                       
                    this.dataProcessing_second(me.tableData2) ;                                                      
                }
            });
        },
        // 单位切换
        dataProcessing_first(tableData){
            let me = this ; 
            let newId = me.conversionId.id ;           
                
            tableData = tableData ;           
            
            // let first = tableData[0] ; // 资产
            // let tableData2= tableData[1] ; // 效益
            if(newId > me.conversionNid){ 
            // 资产总额   
                if(tableData.factzb && tableData.factzb!=0){
                    tableData.factzb = Math.decimalToLocalString((tableData.factzb)/newId) ;
                }else{
                    tableData.factzb = '--' ;
                }
            // 所有者权益    
                if(tableData.factsa && tableData.factsa!=0){
                    tableData.factsa = Math.decimalToLocalString((tableData.factsa)/newId) ;
                }else{
                    tableData.factsa = '--' ;
                }  
                
            }else{
            // 资产总额    
                if(tableData.factzb && tableData.factzb!=0){
                    tableData.factzb = Math.decimalToLocalString(tableData.factzb) ;
                }else{
                    tableData.factzb = '--' ;
                }
                
            // 所有者权益    
                if(tableData.factsa && tableData.factsa!=0){
                    tableData.factsa = Math.decimalToLocalString(tableData.factsa) ;
                }else{
                    tableData.factsa = '--' ;
                }
            }
            // 资产总额 环比增长%--同比增长%
            if(tableData.zhbzz && tableData.zhbzz!=0){
                tableData.zhbzz = Math.decimalToLocalString((tableData.zhbzz)*100) + "%" ;
            }else{
                tableData.zhbzz = '--' ;
            }
            if(tableData.ztbzz && tableData.ztbzz!=0){
                tableData.ztbzz = Math.decimalToLocalString((tableData.ztbzz)*100) + "%" ;
            }else{
                tableData.ztbzz = '--' ;
            }
            // 所有者权益 环比增长%--同比增长%
            if(tableData.shbzz && tableData.shbzz!=0){
                tableData.shbzz = Math.decimalToLocalString((tableData.shbzz)*100) + "%" ;
            }else{
                tableData.shbzz = '--' ;
            }
            if(tableData.stbzz && tableData.stbzz!=0){
                tableData.stbzz = Math.decimalToLocalString((tableData.stbzz)*100) + "%" ;
            }else{
                tableData.stbzz = '--' ;
            } 
            // 资产负债率 %  
            if(tableData.factba && tableData.factba!=0){
                tableData.factba = Math.decimalToLocalString((tableData.factba)*100) + "%" ;
            }else{
                tableData.factba = '--' ;
            }
            if(tableData.zlhbzz && tableData.zlhbzz!=0){
                tableData.zlhbzz = Math.decimalToLocalString((tableData.zlhbzz)*100) + "%" ;
            }else{
                tableData.zlhbzz = '--' ;
            }
            if(tableData.zltbzz && tableData.zltbzz!=0){
                tableData.zltbzz = Math.decimalToLocalString((tableData.zltbzz)*100) + "%" ;
            }else{
                tableData.zltbzz = '--' ;
            }
                              
            me.exps = tableData ;
            console.log("1",me.exps);
            // me.expx = tableData2;
        },
        dataProcessing_second(tableData2){
            let me = this ; 
            let newId = me.conversionId.id ;           
            if(newId > me.conversionNid){
                // 营业收入    
                if(tableData2.srbqdys && tableData2.srbqdys!=0){
                    tableData2.srbqdys = Math.decimalToLocalString((tableData2.srbqdys)/newId) ;
                }else{
                    tableData2.srbqdys = '--' ;
                }
                if(tableData2.srbqljs && tableData2.srbqljs!=0){
                    tableData2.srbqljs = Math.decimalToLocalString((tableData2.srbqljs)/newId) ;
                }else{
                    tableData2.srbqljs = '--' ;
                }
            // 利润总额
                if(tableData2.lrbqdys && tableData2.lrbqdys!=0){
                    tableData2.lrbqdys = Math.decimalToLocalString((tableData2.lrbqdys)/newId) ;
                }else{
                    tableData2.lrbqdys = '--' ;
                }
                if(tableData2.lrbqljs && tableData2.lrbqljs!=0){
                    tableData2.lrbqljs = Math.decimalToLocalString((tableData2.lrbqljs)/newId) ;
                }else{
                    tableData2.lrbqljs = '--' ;
                } 
            }else{
                // 营业收入
                if(tableData2.srbqdys && tableData2.srbqdys!=0){
                    tableData2.srbqdys = Math.decimalToLocalString(tableData2.srbqdys) ;
                }else{
                    tableData2.srbqdys = '--' ;
                }
                if(tableData2.srbqljs && tableData2.srbqljs!=0){
                    tableData2.srbqljs = Math.decimalToLocalString(tableData2.srbqljs) ;
                }else{
                    tableData2.srbqljs = '--' ;
                }
                
                // 利润总额
                if(tableData2.lrbqdys && tableData2.lrbqdys!=0){
                    tableData2.lrbqdys = Math.decimalToLocalString(tableData2.lrbqdys) ;
                }else{
                    tableData2.lrbqdys = '--' ;
                }
                if(tableData2.lrbqljs && tableData2.lrbqljs!=0){
                    tableData2.lrbqljs = Math.decimalToLocalString(tableData2.lrbqljs) ;
                }else{
                    tableData2.lrbqljs = '--' ;
                }
            }
            // 营业收入 环比增长%--同比增长%--同比累计增长%
            if(tableData2.srhbzz && tableData2.srhbzz!=0){
                tableData2.srhbzz = Math.decimalToLocalString((tableData2.srhbzz)*100) + "%" ;
            }else{
                tableData2.srhbzz = '--' ;
            }
            if(tableData2.srtbzz && tableData2.srtbzz!=0){
                tableData2.srtbzz = Math.decimalToLocalString((tableData2.srtbzz)*100) + "%" ;
            }else{
                tableData2.srtbzz = '--' ;
            }
            if(tableData2.srtbljzz && tableData2.srtbljzz!=0){
                tableData2.srtbljzz = Math.decimalToLocalString((tableData2.srtbljzz)*100) + "%" ;
            }else{
                tableData2.srtbljzz = '--' ;
            }
            // 利润总额 环比增长%--同比增长%--同比累计增长%
            if(tableData2.lrhbzz && tableData2.lrhbzz!=0){
                tableData2.lrhbzz = Math.decimalToLocalString((tableData2.lrhbzz)*100) + "%" ;
            }else{
                tableData2.lrhbzz = '--' ;
            }
            if(tableData2.lrtbzz && tableData2.lrtbzz!=0){
                tableData2.lrtbzz = Math.decimalToLocalString((tableData2.lrtbzz)*100) + "%" ;
            }else{
                tableData2.lrtbzz = '--' ;
            }
            if(tableData2.lrtbljzz && tableData2.lrtbljzz!=0){
                tableData2.lrtbljzz = Math.decimalToLocalString((tableData2.lrtbljzz)*100) + "%" ;
            }else{
                tableData2.lrtbljzz = '--' ;
            } 
            // 成本费用利润率 %    
            if(tableData2.cblbys && tableData2.cblbys!=0){
                tableData2.cblbys = Math.decimalToLocalString((tableData2.cblbys)*100) + "%" ;
            }else{
                tableData2.cblbys = '--' ;
            }
            if(tableData2.cblrhbzz && tableData2.cblrhbzz!=0){
                tableData2.cblrhbzz = Math.decimalToLocalString((tableData2.cblrhbzz)*100) + "%" ;
            }else{
                tableData2.cblrhbzz = '--' ;
            }
            if(tableData2.cblrtbzz && tableData2.cblrtbzz!=0){
                tableData2.cblrtbzz = Math.decimalToLocalString((tableData2.cblrtbzz)*100) + "%" ;
            }else{
                tableData2.cblrtbzz = '--' ;
            }
            if(tableData2.cblj && tableData2.cblj!=0){
                tableData2.cblj = Math.decimalToLocalString((tableData2.cblj)*100) + "%" ;
            }else{
                tableData2.cblj = '--' ;
            }
            if(tableData2.cblrtbljzz && tableData2.cblrtbljzz!=0){
                tableData2.cblrtbljzz = Math.decimalToLocalString((tableData2.cblrtbljzz)*100) + "%" ;
            }else{
                tableData2.cblrtbljzz = '--' ;
            }
            me.expx = tableData2 ; 
            console.log("2",me.expx);    
        }
    }
}
</script>
<style scoped>
    /* 导出、刷新按钮样式 */
    .btn {
        width: 91px;
        /* color: #606266; */
    }
    /* 暂无权限样式设置 */
    .isShow{
        height: 80px;
        width:100%;
        background-color: #ddd;
        text-align: center;
        line-height: 80px;
        font-size: 20px;
        font-weight: bold;
        /* color: maroon; */
        color: red;
    }
    /* .table {
        margin-top: 20px;
    } */
    .table tr,td,th {
        border: 1px solid #ccc;
        text-align: center;        
    }
    .tr1 th {
        /* height: 32px;
        line-height: 32px;
        font-size: 14px; */
        /* color: #909399 ; */
        color: #606266;
    }
    .heights {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .heightx {
        /* height: 99px; */
        width: 146px;
        color: #606266;
        font-size: 14px;
        font-weight: bold;
        /* color: black; */
        /* line-height: 99px; */
        /* color: #909399 ; */
    }
    .tr2 th {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #606266;
        /* color: #909399 ; */
    }
    .tr3 td {
        height: 40px;
        line-height: 40px;
        text-align: right;
        padding-right: 10px;
    }
    .tr1,.tr2,.tr0 {
        background-color: rgb(240, 248, 255);
    }
    .tr3 { 
        background-color: white;
        font-size: 14px;
    }
</style>
