<template>
    <div>
        <headerTable :tableData.sync="tableData" :columns.sync="columns"></headerTable>
    </div>
</template>

<script>
import headerTable from "./../riskControlSystem/szcRiskControl/riskWarning/riskTable/threeHeaderTable"
import { mapGetters,mapActions } from "vuex";
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
                            id:"",
                            text:"操作人"
                        },
                        {
                            id:"",
                            text:"状态"
                        }
                    ]
                },
                {
                    id:"",
                    text:"公司名称"
                },
                {
                    id:"",
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
                            id:"",
                            text:"操作人"
                        },
                        {
                            id:"",
                            text:"状态"
                        }
                    ]
                },
                {
                    id:"",
                    text:"填报",
                    children:[
                        {
                            id:"",
                            text:"操作人"
                        },
                        {
                            id:"",
                            text:"状态"
                        }
                    ]
                },
                {
                    id:"",
                    text:"上报",
                    children:[
                        {
                            id:"",
                            text:"操作人"
                        },
                        {
                            id:"",
                            text:"状态"
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
        },
        year(newValue, oldValue) {
            let me = this;
        },
        month(newValue, oldValue) {
            let me = this;
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
    },
    methods: {
        ...mapActions(["ShowDims"]),
    },
    mounted() {
        
    }
}
</script>

