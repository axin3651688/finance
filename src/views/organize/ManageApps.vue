<template>

    <splitpanes class="default-theme">
        <span splitpanes-default="20" splitpanes-min="16" splitpanes-max="30" class="left-con">
            <el-scrollbar style="height: 100%;background: rgba(255, 255, 255, 1);">
                 <el-input v-model="search" @change="filterChange" suffix-icon="el-icon-search" placeholder="请输入内容" clearable class="input-with-select">
                </el-input>
                <el-tree
                        :data="compList"
                        node-key="id"
                        @node-click="handleNodeClick"
                        :filter-node-method="filterNode"
                        ref="tree"
                        :expand-on-click-node="true">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span :class="['node-text', {active: data.id===activeItem}]">{{ node.label }}</span>
                            <el-dropdown>

                                <span style="margin-right: 20px" v-show="activeItem===data.id" class="el-dropdown-link">
                                    <i class="el-icon-more el-icon--right" style="transform: rotate(90deg);"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>修改</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
      </span>
            </el-tree>
            </el-scrollbar>


        </span>

        <span splitpanes-default="80" splitpanes-min="70" splitpanes-max="84">
                <div class="edit-tab">
                    <div class="edit-title">已授权应用</div>
                        <el-button type="primary" icon="el-icon-circle-plus">添加应用</el-button>
                </div>
            <div class="edit-container">
                <div class="tab-title">

                </div>
                    <div class="tab-container">

                    </div>
            </div>
        </span>
    </splitpanes>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'

    export default {
        name: 'ManageApps',
        components: {Splitpanes},
        data() {
            const data = [{
                id: 1,
                label: '一级啊啊三级啊啊三级啊啊三级啊啊 1',
                children: [{
                    id: 4,
                    label: '二级啊啊三级啊啊三级啊啊三级啊啊 1-1',
                    children: [{
                        id: 9,
                        label: '三级啊啊三级啊啊三级啊啊三级啊啊 1-1-1',
                        children: [{
                            id: 11,
                            label: '三级啊啊三级啊啊三级啊啊三级啊啊 1-1-1'
                        }, {
                            id: 12,
                            label: '三级啊啊三级啊啊三级啊啊三级啊啊 1-1-2'
                        }]
                    }, {
                        id: 10,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 13,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 14,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 15,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 16,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 17,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 18,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 19,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 20,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 21,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 22,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 23,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }, {
                        id: 24,
                        label: '三级啊啊三级啊啊三级啊啊 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];
            return {
                search: '',
                activeItem: null,
                compList: JSON.parse(JSON.stringify(data)),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [{
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手1',
                    action: 0,
                }, {
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手2',
                    action: 0,
                }, {
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手3',
                    action: 0,
                },

                ]
            }
        },
        mounted() {

        },
        methods: {
            append(data) {
                const newChild = {id: id++, label: 'test1', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleNodeClick(data) {
                console.log('handleNodeClick', data);
                this.activeItem = data.id
                console.log('activeItem', data.id);
            },
            filterChange(){
                this.$refs.tree.filter(this.search);
            },
            filterNode(value, data) {
                if (!value) return true;
                console.log('search', this.search);
                console.log('filterNode', value);
                return data.label.indexOf(value) !== -1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }


    .left-con {
        height: 100vh;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
        opacity: 1;
        /deep/ .el-input__inner {
            height: 30px;
            line-height: 30px;
        }
        /deep/.el-input__icon {
            height: 100%;
            width: 25px;
            text-align: center;
            -webkit-transition: all .3s;
            transition: all .3s;
            line-height: 0px;
        }
        .input-with-select {
            width: 260px;
            height: 30px;
            margin: 20px;
            background: rgba(218, 217, 216, 0.6);
            opacity: 1;
            border-radius: 6px;
        }
        .custom-tree-node {
            flex: 1;
            width: 300px;
            display: flex;
            align-items: center;
            position: relative;
            right: 20px;
            justify-content: space-between;
            padding-right: 8px;

            .node-text{
                width:360px;
                overflow:hidden;
                margin-left: 20px;
                text-overflow:ellipsis;
                white-space:nowrap;
}
            }
        .node-text.active{
            color:rgba(255,255,255,1);
        }
            .el-icon-more{
                color: white;
            }
        }

    .edit-tab {
        opacity: 1;
        display: flex;
        padding: 20px 40px 0px 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .edit-title {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            opacity: 1;
        }
    }

    .edit-container {
        width: 96%;
        margin: 20px 40px 0px 20px;
        padding: 20px;
        min-width: 600px;
        min-height: 400px;

        background: rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius: 20px;

        .table-title {
            background: rgba(221, 235, 246, 1);
            box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
            opacity: 1;
            border-radius: 20px 20px 0px 0px;
        }
    }

    /deep/ .el-tree-node__expand-icon{
        font-size: 16px;
    }
    /deep/ .el-tree-node__content {
        height: 60px;
        background:rgba(255,255,255,1);

        .is-current{
            background:rgba(24,144,255,1);
        }
        &:hover {
            background:rgba(24,144,255,0.2);
        }
    }
    /deep/ .el-tree-node.is-current.is-focusable {
        >.el-tree-node__content{
            background:rgba(24,144,255,1);
        }
    }
</style>
