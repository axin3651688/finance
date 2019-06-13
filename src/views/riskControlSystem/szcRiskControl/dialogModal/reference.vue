<template>
    <div>
        <div class="modalTable">
            <el-table v-if="tableData && tableData.length > 0"
            :data="tableData"
            border
            style="width: 100%;height:100%;"
            >
            <template v-for="(item,index) in columns">
                <el-table-column
                :prop="item.id"
                :label="item.text"
                :key="index"
                :show-overflow-tooltip="true"
                :align="item.type == 'decimal'? 'right':''"
                >
                <!-- <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row[scope.column.property]" placement="top-start">
                        <span>{{ scope.row[scope.column.property] }}</span>
                    </el-tooltip>
                </template> -->
                </el-table-column>
            </template>
            </el-table>
        </div>
    </div>
</template>
<script>
import {
    queryReference
} from "~api/szcRiskControl/riskControl"
export default {
    name: "reference",
    props: [],
    data() {
        return {
            columns:[
                {
                   id:"sname",
                   text:"策略名称" 
                },
                {
                   id:"sdesc",
                   text:"风险事项说明" 
                }
            ],
            tableData:[]
        }
    },
    created() {
        debugger;
        let me = this;
        queryReference().then(res => {
            if(res.data.code == 200) {
                me.tableData = res.data.data;
            }
        });
    },
    mounted() {},
    watch : {},
    methods: {}
}
</script>
<style lang="scss" scoped>
</style>

