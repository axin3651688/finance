<template>
    <div>
        <div>
            <el-row>
                <el-col :span="6">
                    <div>
                        <label for="">公司选择：</label>
                        <el-select v-model="value" placeholder="请选择" class="select_all">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>
                        <label for="">公司选择：</label>
                        <el-select v-model="value" placeholder="请选择" class="select_all">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="24">
                            <div>
                                <label for="">公司选择：</label>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div>
                                <label for="">公司选择：</label>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <threeHeaderTable :tableData.sync="ManyTableData" :columns.sync="manyColumns" :allData.sync="resData"></threeHeaderTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    // import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import threeHeaderTable from "./../riskTable/threeHeaderTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    export default {
        name: "treeTableDemo",
        components: {
            groupGauge,
            // singleTable,
            groupRadar,
            threeHeaderTable
        },
        data() {
            return {
                options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                }],
                value: '',
                gaugeTop:[8,8,8],
                gaugeMiddleLeft:[8,8],
                gaugeMiddleRight:[8,8],
                tableData:[],
                columns:[],
                ManyTableData:[],//多表头数据
                manyColumns:[],//多表头列配置
                resData:{}
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/listingBenchmarking.json";
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    debugger;
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns;
                    me.manyColumns = res.data.manyColumns;
                    me.ManyTableData = res.data.manyRows;
                    me.resData = res.data;
                    // me.updateData();
                }
            });
            // let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            // this.axios.get(url).then(res => {
            //     if(res.data.code == 200) {
            //         me.tableData = res.data.rows;
            //         me.columns = res.data.columns
            //     }
            // });
        },
        mounted() {},
        methods: {}
    };
</script>
<style scoped>
    .select_all {
        width: 55%;
    }
    .select_company {
        width: 55%;
    }
</style>
<style lang="scss" scoped>
  .el-table thead.is-group th {
    background: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type {
    border-bottom: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-53deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
  .el-table thead.is-group tr:nth-child(2) th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-54deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
    // background:red;
  }
</style>
