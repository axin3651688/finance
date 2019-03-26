<template>
    <el-dialog
    :title="modalConfig.title||'上报人员'"
    :modalConfig.sync="modalConfig"
    modalConfig.checkbox
    width="30%"
    :visible.sync="modalConfig.dialogVisible"
    >
    <div v-if="modalConfig.type == 'tree'">
        <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"></el-input> -->
        <el-tree
            :data="modalConfig.datas || datas"
            :node-key="modalConfig.id"
            :props="modalConfig.props || props"
            class="filter-tree"
            :show-checkbox="modalConfig.checkbox"
            :filter-node-method="filterNode"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :ref="modalConfig.id||'' + 'tree'"
        ></el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modalConfig.dialogVisible = false">取消</el-button>
        <el-button @click="confirmHandle">确认</el-button>
    </span>
    </el-dialog>
</template>
<script>
export default {
    name: "SRModal",
    props: ['modalConfig'],
    data() {
        return {
            filterText:"",
            // dialogVisible: modalConfig.dialogVisible,
            datas:[],
            props:{
                label:"",
                children:""
            }
        }
    },
    created() {
        this.update();
    },
    mounted() {},
    methods: {
        /**
         * 更新数据。
         */
        update () {
            debugger;
            let me = this;
        },
        /**
         * 搜索节点。
         */
        filterNode () {
            debugger;
            let me = this;
        },
        /**
         * 展开制定的节点。
         */
        expandKeys () {
            debugger;
            let me = this;
        },
        /**
         * 节点点击事件。
         */
        handleNodeClick () {
            debugger;
            let me = this;
        },
        /**
         * modal框的确认点击事件。
         */
        confirmHandle () {
            debugger;
            let me = this;
        }
    }
}
</script>
