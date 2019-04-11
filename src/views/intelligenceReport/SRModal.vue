<template>
    <el-dialog
    :title="modalConfig.title||'上报人员'"
    :modalConfig.sync="modalConfig"
    width="30%"
    :modal-append-to-body="false"
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
    <div v-else-if="modalConfig.type == 's-table'">
        <el-table :data="modalConfig.datas.datas || datas">
            <el-table-column 
            v-for="(item,index) in modalConfig.datas.tHeader" 
            :prop="item.prop" :label="item.label" 
            v-bind:key="index"
            v-bind:index="index"
            width="150"
            >
                <template  slot-scope="scope">
                    <span v-if="item.prop == 'operation'">
                        <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
                    </span>
                    <span v-else> {{ scope.row[scope.column.property] }} </span>
                </template>
            </el-table-column>
        </el-table>
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
    mounted() {
        let me = this;
    },
    methods: {
        /**
         * 更新数据。
         */
        update () {
            let me = this;
        },
        /**
         * 搜索节点。
         */
        filterNode () {
            let me = this;
        },
        /**
         * 展开制定的节点。
         */
        expandKeys () {
            let me = this;
        },
        /**
         * 节点点击事件。
         */
        handleNodeClick () {
            let me = this;
        },
        /**
         * modal框的确认点击事件。
         * @author szc 2019年4月3日14:26:49
         */
        confirmHandle () {
            let me = this,eventListener = this.modalConfig.eventListener;
            let nodes = this.$refs[me.modalConfig.id].getCheckedNodes();
            if(eventListener){
                this.$emit(eventListener,nodes);
            }
        },
        /**
         * 上报的报表的查看点击事件。(此时运用传导出去，到父组件上)
         * @author szc 2019年4月3日14:28:17
         */
        handleClick (row) {
            let me = this,eventListener = this.modalConfig.rowListener;
            if(eventListener){
                this.$emit(eventListener,row.row);
            }
        }
    }
}
</script>
