<template>
    <div>
        <headerTable :tableData.sync="tableData" :columns.sync="columns"></headerTable>
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
                    text:"公司名称"
                },
                {
                    id:"templatename",
                    text:"报表名称"
                },
                {
                    id:"",
                    text:"进度"
                },
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
            ]
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
        updateData(){
            debugger;
            let me = this,storeParams = me.$store.getters,company = storeParams.company,
                year = storeParams.year,month = storeParams.month,period = "";
            if(month > 9){
                period = year + "" + month;
            }else {
                period = year + "0" + month;
            }
            let params = {
                company:company,
                period:period
            };
            queryTableCensus(params).then(res => {
                if(res.data.code == 200){
                    me.tableData = res.data.data;
                }
            });
        }
    },
    mounted() {
        
    }
}
</script>

