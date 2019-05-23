<template>
    <div>
        <div class="personnel-list" v-if="personnelListShow">
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                    class="filter-tree"
                    :data="personnelList"
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
    export default {
        name: "showPersonnelList",
        components: {},
        props: {
            personnelListShow: Boolean
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
                            },
                            {
                                id: 4,
                                label: '人员A-2'
                            },
                            {
                                id: 5,
                                label: '人员A-3'
                            },
                            {
                                id: 6,
                                label: '人员A-4'
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '部门B',
                        children: [
                            {
                                id: 7,
                                label: '人员B-1'
                            },
                            {
                                id: 8,
                                label: '人员B-2'
                            },
                            {
                                id: 9,
                                label: '人员B-3'
                            },
                            {
                                id: 10,
                                label: '人员B-4'
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
            checkedSure() {
                alert("反馈成功");
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
        bottom: 100px;
        right: 20px;
        height: 354px;
    }

    .btn-sure {
        text-align: right;
        margin-top: 10px;
    }

    .btn-sure button {
        border-radius: 16px;
        padding: 8px 16px;
    }
</style>