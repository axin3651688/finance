<template>
    <div>

        <el-table
            :span-method="arraySpanMethod" 
            :data="list"
             border
        style="width: 100%">
            <el-table-column prop="xm_1" label="项目" width='150'></el-table-column>
            <el-table-column prop='xm_2' label="" ></el-table-column> 
            <el-table-column prop='hs' label="户数"></el-table-column>
            <el-table-column prop='ye' label="余额" ></el-table-column>  
            <el-table-column prop='oneyear' label='1年以内' ></el-table-column>
            <el-table-column prop='twoyear' label='1-2年' ></el-table-column>
            <el-table-column prop='threeyear' label='2-3年' ></el-table-column>
            <el-table-column prop='fouryear' label='3年以上' ></el-table-column>
            <el-table-column prop='www1' label='可收回金额' ></el-table-column>
            <el-table-column prop='www2' label='其中：当年可收回金额*' ></el-table-column>
            <el-table-column prop='www3' label='逾期账款' ></el-table-column>
            <el-table-column prop='www4' label='已形成实质性损失金额' ></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   props:{
             item:{
                data: [],
                list:[]
             }
           },
    data(){
        return{
            // tableData:[],
          
        }
    },
    name:"BiFlhz",
    created(){debugger
       // console.log("a",this.item);
        this.list = this.item.datas ;
       // this.dis();
    },
    computed: {
        ...mapGetters(["year", "month", "companyId", "mid"])
    },
    // watch:{
    //     mid(){
    //         this.dis();
    //     },
    //     year(newYear){
    //         this.diss("year");
    //     },
    //     month(newMonth){
    //         this.diss("month");
    //     },
    //     companyId(newConpanyId){
    //         this.diss("companyId");
    //     }
    // },
    mounted(){
        //this.dis();
    },
    methods:{

 
     arraySpanMethod({ row, column, rowIndex, columnIndex }) {debugger
        if (rowIndex=== 0 || rowIndex=== 1 ||rowIndex=== 2||rowIndex=== 15) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
        if (columnIndex === 0) {
          if (rowIndex  === 3) {
            return {
              rowspan: 5,
              colspan: 1
            };
          }else if(rowIndex  === 8){
            return {
              rowspan: 7,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
        // dis(){
        //     debugger
        //     let  item = {
        //     // let ret = {    
        //         cubeId:4,
        //         sql:`WITH TT AS( SELECT DIM_COMPANY,DIM_CUSUPPLIER,ISINSIDE,ISNORMAL,SCONTENTA,SCONTENTB,NVL(SUM(FACT_BALANCE),0) AS YE, (NVL(SUM(FACT_A),0)) AS ONEYEAR,(NVL(SUM(FACT_B),0)) AS TWOYEAR, (NVL(SUM(FACT_C),0)) AS THREEYEAR,(NVL(SUM(FACT_D),0)) AS FOURYEAR, (NVL(SUM(FACT_E),0)) AS WWW1,(NVL(SUM(FACT_F),0)) AS WWW2, (NVL(SUM(FACT_G),0)) AS WWW3,(NVL(SUM(FACT_H),0)) AS WWW4 FROM DW_FACTAGEANALYSIS WHERE DIM_PERIOD='201812' AND DIM_COMPANY IN (SELECT SCODE FROM DW_DIMCOMPANY WHERE (SCODE = '100101' OR SPCODE LIKE '100101%') AND CISDEL='N' AND CISLEAF = '1') AND DIM_ITEM='1002' AND ISINSIDE IS NOT NULL GROUP BY DIM_COMPANY,DIM_CUSUPPLIER,ISINSIDE,ISNORMAL,SCONTENTA,SCONTENTB), TT2 AS( SELECT '1' AS FLAG,SCONTENTB,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT SCONTENTB,COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4 FROM TT WHERE ISINSIDE='0' AND ISNORMAL='0' GROUP BY SCONTENTB) ), TT3 AS( SELECT '1' AS FLAG,SCONTENTA,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT SCONTENTA,COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4 FROM TT WHERE ISINSIDE='0' AND ISNORMAL='0' GROUP BY SCONTENTA) ) SELECT A.XM_1 AS XM_1, A.XM_2 AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT G.SCODE,G.SNAME AS XM_1,H.SNAME AS XM_2 FROM (SELECT SCODE,(CASE WHEN SCODE LIKE '1104%' THEN '按债务人状况分类' WHEN SCODE LIKE '1105%' THEN '按非正常类型分类' ELSE SNAME END) AS SNAME FROM DW_DIMITEM WHERE DIM_ITEMREPORT='1001' AND SPCODE LIKE '11%' AND SCODE NOT IN('11','1104','1105')) G INNER JOIN (SELECT SCODE,SNAME FROM DW_DIMITEM WHERE DIM_ITEMREPORT='1001' AND SPCODE LIKE '11%' AND SCODE NOT IN('11','1104','1105')) H ON G.SCODE=H.SCODE ) A LEFT JOIN (SELECT '1101' AS XM_1,'1101' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4,'1' AS FLAG FROM TT WHERE ISINSIDE='1') UNION ALL SELECT '1102' AS XM_1,'1102'AS XM2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4,'1' AS FLAG FROM TT WHERE ISINSIDE='0' AND ISNORMAL='1' ) UNION ALL SELECT '1103' AS XM_1,'1103'AS XM2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4,'1' AS FLAG FROM TT WHERE ISINSIDE='0' AND ISNORMAL='0' ) UNION ALL SELECT '110401' AS XM_1,'110401' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT2 WHERE SCONTENTB='1201') UNION ALL SELECT '110402' AS XM_1,'110402' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT2 WHERE SCONTENTB='1202') UNION ALL SELECT '110403' AS XM_1,'110403' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT2 WHERE SCONTENTB='1203') UNION ALL SELECT '110404' AS XM_1,'110404' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT2 WHERE SCONTENTB='1204') UNION ALL SELECT '110405' AS XM_1,'110405' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT2 WHERE SCONTENTB='1205') UNION ALL SELECT '110501' AS XM_1,'110501' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1101') UNION ALL SELECT '110502' AS XM_1,'110502' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1102') UNION ALL SELECT '110503' AS XM_1,'110503' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1103') UNION ALL SELECT '110504' AS XM_1,'110504' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1104') UNION ALL SELECT '110505' AS XM_1,'110505' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1105') UNION ALL SELECT '110506' AS XM_1,'110506' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1106') UNION ALL SELECT '110507' AS XM_1,'110507' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT * FROM TT3 WHERE SCONTENTA='1107') UNION ALL SELECT '1106' AS XM,'1106' AS XM_2,HS,YE,ONEYEAR,TWOYEAR,THREEYEAR,FOURYEAR,WWW1,WWW2,WWW3,WWW4 FROM (SELECT COUNT(DIM_CUSUPPLIER) AS HS,SUM(YE) AS YE,SUM(ONEYEAR) AS ONEYEAR ,SUM(TWOYEAR) AS TWOYEAR,SUM(THREEYEAR) AS THREEYEAR,SUM(FOURYEAR) AS FOURYEAR, SUM(WWW1) AS WWW1,SUM(WWW2) AS WWW2,SUM(WWW3) AS WWW3,SUM(WWW4) AS WWW4,'1' AS FLAG FROM TT )) B ON A.SCODE=B.XM_1 ORDER BY A.SCODE`
        //     }
        //     report(item).then((res)=>{
        //     // showData(ret).then((res)=>{
        //         debugger
        //         console.log(res)             
        //         this.list = res.data.data ;
        //     })
        // },
        getParams(me,change){
            let params = this.$store.state.prame;
        }
        // ,
        // diss(change){
        //     debugger
        //     let me = this;
        //     let param = this.getParams(me,change) ;
        //     console.log(param);
        // }
    }
}
</script>
<style>

</style>
