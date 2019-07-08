<template>
    <el-dialog
    :title="modalConfig.title||'上报人员'"
    :modalConfig.sync="modalConfig"
    :width="modalConfig.width || '30%'"
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
    <div v-else-if="modalConfig.type == 'checkbox'">
        <el-checkbox
            v-if="renderFlag"
            v-for="item of modalConfig.datas"
            :key="item.id"
            :checked="item.checked? false:false"
            :disabled="(item.statemun == '1' || item.statemun == '2' || item.statemun == '3')? 'disabled':undefined"
            class="checkbox"
            @change="changeHandler($event, item)"
        >{{ item.templatename }}</el-checkbox>
    </div>
    <div v-else-if="modalConfig.type == 's-table'">
        <el-table :data="modalConfig.datas.datas || datas">
            <el-table-column 
            v-for="(item,index) in modalConfig.datas.tHeader" 
            :prop="item.prop" :label="item.label" 
            v-bind:key="index"
            v-bind:index="index"
            >
                <template  slot-scope="scope">
                    <span v-if="item.prop == 'operation'">
                        <template v-if="scope.row['ninfostate'] == 2 && scope.row['sislook'] == 'N'"> 
                            <el-button @click="handleClick(scope,'agree')" type="" size="small">同意</el-button>
                            <el-button @click="handleClick(scope,'noAgree')" type="" size="small">不同意</el-button>
                        </template>
                        <el-button v-else-if="scope.row['sislook'] == 'N' && scope.row['statemun'] != 4" @click="handleClick(scope,'unread')" type="text" size="small">标为已读</el-button>
                        <el-button v-else disabled type="text" size="small">已读</el-button>
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
    <span v-if="modalConfig.footConfig && modalConfig.footConfig.footBtn" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmHandle">确认</el-button>
        <el-button @click="modalConfig.dialogVisible = false">取消</el-button>
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
            footBtn: true,
            // dialogVisible: modalConfig.dialogVisible,
            datas:[],
            props:{
                label:"",
                children:""
            },
            totalValue:"3",
            checkboxValues:[],
            renderFlag:true
        }
    },
    created() {
        this.update();
    },
    mounted() {
        let me = this;
    },
    watch: {
        modalConfig:{
            handler(newValue,oldValue){
                this.updateData(newValue);
            },
            deep:true
        }
    },
    methods: {
        updateData(newValue) {
            if(newValue.type == "checkbox"){
                this.renderFlag = false;
                this.$nextTick(() => {
                    this.renderFlag = true;
                });
            }else {
                this.totalValue = this.modalConfig.datas.dataCount;
            }
        },
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
            let parmas = {},nodes;
            if(this.modalConfig.type == "tree"){
                nodes = this.$refs[me.modalConfig.id].getCheckedNodes();
                if(eventListener){
                    this.$emit(eventListener,nodes);
                }
                return;
            }else if (this.modalConfig.type == "checkbox"){
                if(me.checkboxValues && me.checkboxValues.length == 0){
                    me.$message({
                        message:"请选择要批示的报表！",
                        type:"warning"
                    });
                    return;
                }
                parmas = {
                    id:"checkbox",
                    tableTemplates:me.checkboxValues
                };
            }
            if(eventListener){
                this.$emit(eventListener,parmas);
                this.afterHandler(parmas);
            }
        },
        /**
         * 上报的报表的查看点击事件。(此时运用传导出去，到父组件上)
         * @author szc 2019年4月3日14:28:17
         */
        handleClick (row,sign) {
            let me = this,eventListener = this.modalConfig.rowListener;
            if(eventListener){
                this.$emit(eventListener,row.row,sign);
            }
        },
        /**
         * 上一页
         */
        prevClick (page) {
            let me = this,parmas = {
                page:page,
                sign:"pre"
            };
            this.$emit("publicHandler",parmas);
        },
        /**
         * 下一页
         */
        nextClick (page) {
            let me = this,parmas = {
                page:page,
                sign:"next"
            };
            this.$emit("publicHandler",parmas);
        },
        /**
         * 当前页改变
         */
        currentChange (page) {
            let me = this,parmas = {
                page:page,
                sign:"current"
            };
            this.$emit("publicHandler",parmas);
        },
        /**
         * 选中的结果
         */
        changeHandler (flag,item) {
            let me = this;
            if(flag){
                me.checkboxValues.push(item);
            }else {
                me.checkboxValues = me.checkboxValues.filter(itemIt => {
                    return itemIt.templateId != item.templateId;
                });
            }
        },
        /**
         * 关闭
         */
        handleClose (done) {
            let me = this;
            me.checkboxValues = [];
            done();
        },
        /**
         * 请求之后的操作。
         */
        afterHandler (parmas) {
            if(parmas.id == "checkbox"){
                this.checkboxValues = [];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.checkbox {
    display: block;
    color: #606266;
    font-size: 24px;
}
</style>

