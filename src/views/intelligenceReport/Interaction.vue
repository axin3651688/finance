<template>
    <div>
        <div>
            <el-table :data="tableData"
                border
                stripe
                :header-cell-style="headerRowStyle"
                style="width: 100%"
            >
                <el-table-column 
                v-for="(item,index) in columns" 
                :prop="item.prop" 
                :label="item.label" 
                header-align="center"
                :show-overflow-tooltip="true"
                v-bind:key="index"
                v-bind:index="index"
                >
                    <template  slot-scope="scope">
                        <span v-if="item.prop == 'operation' && scope.row['nopratebuttonname']">
                            <el-button @click="queryHandler(scope)">
                                {{ scope.row['nopratebuttonname'] }}
                            </el-button>
                        </span>
                        <span v-else> {{ scope.row[scope.column.property] }} </span>
                    </template>
                </el-table-column>
            </el-table>
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
        <div>
            <reviewModal :modalConfig.sync="modalConfig" ref="reviewModal" v-on:publicEvent="publicEvent"></reviewModal>
        </div>
    </div>
</template>
<script>
    import singleTable from './../riskControlSystem/publicRiskControl/table/singleTable'
    import reviewModal from './szcModal/reviewModal'
    import { mapGetters } from "vuex"
    import {
        queryInteraction
    } from "~api/fill"
    export default {
        name: "interaction",
        components: {
            singleTable,
            reviewModal
        },
        data() {
            return {
                tableData:[],
                totalValue:0,
                modalConfig:{},
                columns:[
                    {
                       prop:"companyname",
                       label:'公司' 
                    },
                    {
                       prop:"stablename",
                       label:'报表' 
                    },
                    {
                       prop:"statemunname",
                       label:'类型' 
                    },
                    {
                       prop:"sfromusername",
                       label:'发送人' 
                    },
                    {
                       prop:"status",
                       label:'状态' 
                    },
                    {
                       prop:"operation",
                       label:'操作' 
                    }
                ]
            }
        },
        created() {
            
            this.updateData();
        },
        mounted() {},
        computed: {
            ...mapGetters(["user", "year", "month", "company","showDims"])
        },
        watch: {
            company(newValue,oldValue){
                this.updateData();
            },
            year(newValue,oldValue){
                this.updateData();
            },
            month(newValue,oldValue) {
                this.updateData();
            }
        },
        
        methods: {
            /**
             * 更新数据
             * @author szc 2019年6月11日14:01:23
             */
            updateData() {
                let me = this,storeParams = me.$store.getters,
                    company = storeParams.company,year = storeParams.year,month = storeParams.month,
                    susercompany = storeParams.user.user.companyId,period = "";
                if(month > 9){
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                let currentSider = me.getCurrentSider();
                let params = {
                    pageNum:1,
                    pageSize:20,
                    company:company,
                    susercompany:susercompany,
                    period:period,
                    nrep:currentSider[0].nrep,
                    nreview:currentSider[0].nreview
                };
                queryInteraction(params).then(res => {
                    if(res.data.code == 200){
                        me.tableData = res.data.data.datas;
                        me.totalValue = parseInt(res.data.data.total/20) + (res.data.data.total%20 > 0? 1:0);
                    }else if (res.data.code == 1001) {
                        me.tableData = [];
                        me.totalValue = 0;
                    }
                });
            },
            getCurrentSider(){
                let me = this,itemmenu;
                let storeParams = me.$store.getters,
                    menupermisson = storeParams.user.menupermisson;
                let siderState = JSON.parse(localStorage.siderState);
                if(siderState && siderState.code) {
                    itemmenu = menupermisson.filter(item => {
                        return item.scode == siderState.code;
                    });
                    me.currentSider = itemmenu;
                }
                return itemmenu;
            },
            /**
             * 表头样式。
             */
            headerRowStyle(row) {
                let me = this;
                if (row.rowIndex === 0) {
                    return 'background:rgb(240, 248, 255)';
                } else {
                    return "";
                }
            },
            /**
             * 按钮的事件
             * @author szc 2019年6月11日09:21:28
             */
            queryHandler (scope) {
                let me = this;
                me.axios.get("/cnbi/json/source/tjsp/template.json").then(res => {
                    let list = res.data.data;
                    let itemTmp = list.filter(item => {
                        return item.templateId == scope.row.templateid;
                    });
                    let params = {
                        company: scope.row.company,
                        fixed: itemTmp[0].fixed,
                        period: scope.row.period,
                        subject: itemTmp[0].subject,
                        templateId: scope.row.templateid
                    };
                    me.modalConfig = {
                        title:scope.row.nopratebuttonname,
                        dialogVisible:true,
                        templateParams:itemTmp[0],
                        requestParams:params,
                        row:scope.row
                    };
                    me.$refs.reviewModal.queryDataOfTable(params);
                    // me.queryDataOfTable(params);
                });
            },

            /**
             * 查询table的数据。
             * @author szc 2019年5月8日16:50:13
             */
            queryDataOfTable (params) {
                let me = this;
                inquire(params).then(res => {
                    if(res.data.code == 200){
                        let columns = res.data.data.columns,arr = ['id','id_','item'];
                        columns = columns.filter(item => {
                            return arr.indexOf(item.id) == -1;
                        });
                        me.columns = columns;
                        res.data.data.rows = me.queryDataAfter(res.data.data.rows,params);
                        let parseItems = ['4','5','6'];
                        //加个融资情况表的判断。
                        if(params.templateId && params.templateId == "7"){
                            let itemNames = [//guarantee repaysource
                                {"text":"cismenu","type":"single"},
                                {"text":"cisguarantee","type":"single"},
                                {"text":"guarantee","type":"MSeries","root":"financing"},
                                {"text":"repaysource","type":"MSeries","root":"financing"},
                                {"text":"finance","type":"MSeries","root":"financingOptions"}
                            ];
                            me.parseNumberToString(itemNames,res.data.data.rows);
                            me.tableData = me.handleFinancingCompany(res.data.data.rows);
                        }else if(params.templateId && parseItems.indexOf(params.templateId) != -1) {
                            let itemNames = [//guarantee repaysource isnormal
                                {"text":"isinside","type":"single"},
                                {"text":"isnormal","type":"single"},
                                {"text":"isnature","type":"MSeries","root":"dataDict"}
                            ];
                            this.parseNumberToString(itemNames,res.data.data.rows);
                            me.tableData = res.data.data.rows;
                        } else{
                            me.tableData = res.data.data.rows;
                        }
                    }
                });
            },
            /**
             * 上一页
             */
            prevClick (page) {
                let me = this,parmas = {
                    page:page,
                    sign:"pre"
                };
                me.publicHandler(page);
                // this.$emit("publicHandler",parmas);
            },
            /**
             * 下一页
             */
            nextClick (page) {
                let me = this,parmas = {
                    page:page,
                    sign:"next"
                };
                me.publicHandler(page);
                // this.$emit("publicHandler",parmas);
            },
            /**
             * 当前页改变
             */
            currentChange (page) {
                let me = this,parmas = {
                    page:page,
                    sign:"current"
                };
                me.publicHandler(page);
                // this.$emit("publicHandler",parmas);
            },
            publicHandler (pageParams) {
                let me = this,storeParams = me.$store.getters,
                    company = storeParams.company,year = storeParams.year,month = storeParams.month,
                    susercompany = storeParams.user.user.companyId,period = "";
                if(month > 9){
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                let currentSider = me.getCurrentSider();
                let params = {
                    pageNum:pageParams.page,
                    pageSize:20,
                    company:company,
                    susercompany:susercompany,
                    period:period,
                    nrep:currentSider[0].nrep,
                    nreview:currentSider[0].nreview
                };
                queryInteraction(params).then(res => {
                    if(res.data.code == 200){
                        me.tableData = res.data.data.datas;
                        me.totalValue = parseInt(res.data.data.total/20) + (res.data.data.total%20 > 0? 1:0);
                    }else if (res.data.code == 1001) {
                        me.tableData = [];
                        me.totalValue = 0;
                    }
                });
            },
            /**
             * 子组件传过来的事件。
             * @author szc 2019年6月13日16:50:41
             */
            publicEvent (params) {
                this.updateData();
            }
        }
    };
</script>
<style>

</style>