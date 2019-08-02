<template>
    <div>
        <template v-for="(item,index) in columns">
            <template v-if="item.children">
                <el-table-column
                    :key="index"
                    :label="item.text"
                >
                    <table-column :columns="item.children"></table-column>
                </el-table-column>
            </template>
            <template v-else>
                <el-table-column
                    :align="item.align || 'left'"
                    :key="index"
                    :show-overflow-tooltip="true"
                    :prop="item.id"
                    header-align="center"
                    :label="item.text"
                    :min-width="item.minWidth"
                    :width="item.width">
                    <template slot-scope="scope">
                        <span v-if="item.type == 'number'">
                            {{ getCellValues(scope,item) }}
                        </span>
                        <span v-else>
                            {{ scope.row[scope.column.property] }}
                        </span>
                    </template>
                </el-table-column>
            </template>
        </template>
    </div>
</template>
<script>
    import tools from '@/utils/tools.js'
    export default {
        name: "tableColumn",
        // comments:{
        //     TableColumn
        // },
        props: {
            columns: Array
        },
        data() {
            return {}
        },
        /**
         * 组件生成的回调。
         */
        created() {
            let me = this;
        },
        /**
         * 页面渲染之后的回调。
         */
        mounted() {},
        methods: {
            /**
             * 格式化数字内容。
             */
            getCellValues (scope,item) {
                let me = this,value = scope.row[item.id];
                if(value){
                    return tools.currency(value,'',2);
                }else {
                    return tools.currency(0,'',2);
                }
            }
        }
    };
</script>

<style scoped>
    .last_class {
        display: none;
    }
    .risk_table {
        height: 100%;
    }
    .textClass01 {
        background-color: red;
        border-radius: 20px;
        color: #fff;
    }

    .textClass02 {
        background-color: rgb(255, 187, 0);
        border-radius: 20px;
        color: #fff;
    }

    .textClass03 {
        background-color: rgb(48, 172, 48);
        border-radius: 20px;
        color: #fff;
    }

    .textClass04 {
        background-color: red;
        border-radius: 20px;
        color: #fff;
    }
    .textClassAll {
        border-radius: 20px;
        color: #fff;
    }
</style>