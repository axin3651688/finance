<template>
    <div>
        <div>
            <el-row>
                <el-col :span="6">
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
                <el-col :span="6">
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
                        <el-col :span="14">
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
                        <el-col :span="10">
                            <div>
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
                        <singleTable :tableData.sync="tableData" :columns.sync="columns"></singleTable>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import groupGauge from "./../echarts/groupGauge.vue"
    import singleTable from "@v/riskControlSystem/publicRiskControl/table/singleTable.vue"
    import groupRadar from "./../echarts/groupRadar.vue"
    export default {
        name: "treeTableDemo",
        components: {
            groupGauge,
            singleTable,
            groupRadar
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
                columns:[]
            }
        },
        created() {
            let me = this,url = "/cnbi/json/source/tjsp/szcJson/risk/riskTable.json";
            this.axios.get(url).then(res => {
                if(res.data.code == 200) {
                    me.tableData = res.data.rows;
                    me.columns = res.data.columns
                }
            });
        },
        mounted() {},
        methods: {}
    };
</script>
<style>

</style>