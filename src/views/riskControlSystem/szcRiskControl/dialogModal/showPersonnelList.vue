<template>
    <div>
        <div class="personnel-list" v-if="dptUserConfig.show">
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                    class="filter-tree"
                    :data="dptUserConfig.userDatas || personnelList"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree"
                    :props="defaultProps">
            </el-tree>
            <div class="btn-sure">
                <el-button type="primary" @click="checkedSure">确定</el-button>
                <el-button @click="resetChecked">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    updateInstruction
} from "~api/szcRiskControl/riskControl"
    export default {
        name: "showPersonnelList",
        components: {},
        props: {
            dptUserConfig: Object
        },
        data() {
            return {
                personnelList: [
                    {
                        id: 1,
                        label: '部门A',
                        children: [
                            {
                                id: 3,
                                label: '人员A-1'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                filterText: ''
            }
        },
        created() {
            debugger
            let cc = this.dptUserConfig ;
        },
        mounted() {
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {

            /**
             * 指定人员搜索
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            /**
             * 确定按钮。
             */
            checkedSure() {
                let me = this;
                let nodes = this.$refs.tree.getCheckedNodes();
                if(nodes && nodes.length > 0){
                    me.$emit("instructionHandler",nodes);
                }
            },
            checkedSure_old() {
                let me = this,storeParams = me.$store.getters,
                company = storeParams.company;
                let nodes = this.$refs.tree.getCheckedNodes();
                if(nodes && nodes.length > 0){
                    let arrUser = [],userStr = "";
                    nodes.forEach(item => {
                        arrUser.push(item.id);
                    });
                    userStr = arrUser.join(',');
                    let params = [
                        {
                            company:company,
                            departId:dptUserConfig.departId,
                            riskYDCL:"",
                            riskContent:"",
                            userStr:userStr
                        }
                    ];
                    updateInstruction();
                }
            },
            /**
             * 转换日期。
             * @author szc 2019年5月22日19:04:24
             */
            parsePeriod(){
                let me = this,storeParams = me.$store.getters,
                year = storeParams.company,month = storeParams.month,period = "";
                if(month > 9) {
                    period = year + "" + month;
                }else {
                    period = year + "0" + month;
                }
                return period;
            }
        }
    }
</script>

<style scoped>
    .personnel-list {
        background: white;
        width: 200px;
        margin-top: 10px;
        border: 1px solid #606266;;
        padding: 5px;
        position: absolute;
        bottom: 45px;
        right: 20px;
        max-height: 354px;
        overflow: auto;
    }

    .btn-sure {
        text-align: right;
        margin-top: 10px;
    }

    .btn-sure button {
        border-radius: 16px;
        padding: 8px 16px;
    }
    .filter-tree {
        max-height: 250px;
        overflow: auto;
    }
</style>