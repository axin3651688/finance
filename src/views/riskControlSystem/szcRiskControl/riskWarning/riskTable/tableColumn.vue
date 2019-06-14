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
                    :width="item.width">
                </el-table-column>
            </template>
        </template>
    </div>
</template>
<script>

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
            debugger;
            let me = this;
        },
        /**
         * 页面渲染之后的回调。
         */
        mounted() {},
        methods: {}
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