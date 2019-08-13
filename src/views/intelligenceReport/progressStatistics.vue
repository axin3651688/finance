<template>
    <div>
        <!-- <div class="fuzzy_query_div">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="公司名称">
                    <el-input v-model="formInline.companyname" placeholder="请输入公司名称..."></el-input>
                </el-form-item>
                <el-form-item label="报表名称">
                    <el-input v-model="formInline.templatename" placeholder="请输入报表名称..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div> -->
        <headerTable :tableData.sync="tableData" :columns.sync="columns" :allData.sync="allData"></headerTable>
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                @prev-click="prevClick"
                @next-click="nextClick"
                @current-change="currentChange"
                :page-count="totalValue">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import headerTable from "./../riskControlSystem/szcRiskControl/riskWarning/riskTable/threeHeaderTable"
import { mapGetters,mapActions } from "vuex";
import { queryTableCensus } from "~api/fill"
export default {
    name:"progressStatistics",
    components:{
        headerTable
    },
    data() {
        return {
            totalValue:0,
            tableData:[],
            columns:[
                {
                    id:"",
                    text:"审阅",
                    children:[
                        {
                            id:"sreviewuser",
                            text:"操作人",
                            align:"center"
                        },
                        {
                            id:"sreview",
                            text:"状态",
                            align:"center"
                        }
                    ]
                },
                {
                    id:"companyname",
                    text:"公司名称",
                    width:320
                },
                {
                    id:"templatename",
                    text:"报表名称",
                    width:180
                },
                // {
                //     id:"",
                //     text:"进度"
                // },
                {
                    id:"",
                    text:"抽取",
                    children:[
                        {
                            id:"sextractuser",
                            text:"操作人",
                            align:"center"
                        },
                        {
                            id:"sextract",
                            text:"状态",
                            align:"center"
                        }
                    ]
                },
                {
                    id:"tb",
                    text:"填报",
                    children:[
                        {
                            id:"sfilluser",
                            text:"操作人",
                            align:"center"
                        },
                        {
                            id:"sfill",
                            text:"状态",
                            align:"center"
                        }
                    ]
                },
                {
                    id:"sb",
                    text:"上报",
                    children:[
                        {
                            id:"sreportuser",
                            text:"操作人",
                            align:"center"
                        },
                        {
                            id:"sreport",
                            text:"状态",
                            align:"center"
                        }
                    ]
                }
            ],
            formInline:{
                companyname:"",
                templatename:""
            },
            allData:{
                fixedHeader:true
            }
        }
    },
    computed: {
        ...mapGetters(["year", "month", "company","showDims"])
    },
    watch: {
        /**
         * 监听公司
         */
        company(newValue, oldValue) {
            let me = this;
            this.updateData();
        },
        year(newValue, oldValue) {
            let me = this;
            this.updateData();
        },
        month(newValue, oldValue) {
            let me = this;
            this.updateData();
        }
    },
    created() {
        this.ShowDims({
            company:true,
            year:true,
            month:true,
            day:false,
            conversion:false
        });
        this.updateData();
    },
    methods: {
        ...mapActions(["ShowDims"]),
        updateData(pageParams){
            let me = this,storeParams = me.$store.getters,company = storeParams.company,
                year = storeParams.year,month = storeParams.month,period = "";
            if(month > 9){
                period = year + "" + month;
            }else {
                period = year + "0" + month;
            }
            let params = {
                pageNum:pageParams? pageParams.page:1,
                pageSize:20,
                company:company,
                period:period,
                companyLike:pageParams? pageParams.companyname:"",
                templateLike:pageParams? pageParams.templatename:""
            };
            queryTableCensus(params).then(res => {
                if(res.data.code == 200){
                    // me.tableData = res.data.data;
                    //按照公司排个序。
                    debugger;
                    res.data.data.datas.sort(function(a,b){
                        if(a.company > b.company){
                            return 1;
                        }else if(a.company < b.company) {
                            return -1;
                        }else {
                            return 0;
                        }
                    });
                    me.subSpanNumber(res.data.data.datas);
                    me.tableData = res.data.data.datas;
                    me.totalValue = parseInt(res.data.data.total/20) + (res.data.data.total%20 > 0? 1:0);
                }else if (res.data.code == 1001) {
                    me.tableData = [];
                    me.totalValue = 0;
                }
            });
        },
        /**
         * 计算span的合并数据。
         */
        subSpanNumber (datas){
            let me = this;
            let obj = {},arr = [],arrDemo = [];
            datas.forEach(item => {
                if(!obj[item.company]){
                    obj[item.company] = 1;
                }else {
                    obj[item.company]++;
                }
            });
            for(let key in obj){
                arr.push(obj[key]);
            }
            for(let i = 0;i < arr.length;i++){
                if(i == 0){
                    arrDemo[i] = arr[i];
                }else {
                    arrDemo[i] = arr[i];
                    for(let j = 0;j < i;j++){
                        arrDemo[i] += arr[j];
                    }
                }
            }
            me.allData.spanObj = arrDemo;
        },
        /**
         * 上一页
         */
        prevClick (page) {
            let me = this,formInline = me.formInline,parmas = {
                page:page,
                companyname:formInline.companyname,
                templatename:formInline.templatename,
                sign:"pre"
            };
            me.updateData(parmas);
            // this.$emit("publicHandler",parmas);
        },
        /**
         * 下一页
         */
        nextClick (page) {
            let me = this,formInline = me.formInline,parmas = {
                page:page,
                companyname:formInline.companyname,
                templatename:formInline.templatename,
                sign:"next"
            };
            me.updateData(parmas);
            // this.$emit("publicHandler",parmas);
        },
        /**
         * 当前页改变
         */
        currentChange (page) {
            let me = this,formInline = me.formInline,parmas = {
                page:page,
                companyname:formInline.companyname,
                templatename:formInline.templatename,
                sign:"current"
            };
            me.updateData(parmas);
            // this.$emit("publicHandler",parmas);
        },
        /**
         * 模糊查询请求。
         */
        onSubmit () {
            let me = this,formInline = me.formInline,companyname = formInline.companyname,templatename = formInline.templatename;
            let params = {
                page:1,
                companyname:companyname,
                templatename:templatename
            };
            me.updateData(params);
            // fuzzyQuery(params).then(res => {
            //     if(res.data.code == 200){
            //         me.tableData = res.data.data.datas;
            //         me.totalValue = parseInt(res.data.data.total/20) + (res.data.data.total%20 > 0? 1:0);
            //     }
            // });
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="scss">
    .fuzzy_query_div {
        margin-top: 10px;
    }
</style>
