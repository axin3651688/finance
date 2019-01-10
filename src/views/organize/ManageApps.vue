<template>
    <div>
        <multipane class="custom-resizer" layout="vertical" style="height: 100%">
            <div class="pane" style="height: 100%">
                <div class="left-con" style="height: 100%">
                    <el-input v-model="search" @change="filterChange" suffix-icon="el-icon-search" placeholder="请输入内容"
                              clearable class="input-with-select">
                    </el-input>

                    <el-scrollbar
                            style="height: 90%;min-height: 600px;border-top-width: 1px;border-top-style: solid;border-top-color: rgba(159,167,174,0.6);  ">
                        <el-tree
                                :data="compList"
                                node-key="id"
                                :default-checked-keys="[1]"
                                @node-click="handleNodeClick"
                                :filter-node-method="filterNode"
                                ref="tree"
                                :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="['node-text', {active: data.id===selectComp.id}]">{{ node.label }}</span>
            <el-dropdown>

            <span style="margin-right: 20px" v-show="selectComp.id===data.id"
                  class="el-dropdown-link">
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
                </div>
            </div>
            <multipane-resizer></multipane-resizer>
            <div class="pane" :style="{ flexGrow: 1 }">
                <div class="right-col">
                    <div class="edit-tab">
                        <div class="edit-title">已授权应用</div>
                        <el-button type="primary" icon="el-icon-circle-plus" style="margin-right: 40px">添加应用</el-button>
                    </div>
                    <div class="edit-container">
                        <div class="item-row" v-for="item in appData" :key="item.id">
                            <div class="left-item">
                                <img :src="item.avatar" class="left-img"/>
                                <div class="left-text">{{selectComp.label}}{{item.name}}</div>
                            </div>
                            <el-switch
                                    v-model="item.action"
                                    @change="changeStatus($event,item)"
                                    active-color="#ff4949"
                                    inactive-color="#3BB75E">
                            </el-switch>
                        </div>
                    </div>
                </div>
            </div>
        </multipane>
    </div>

</template>

<script>
    import {Multipane, MultipaneResizer} from 'vue-multipane';

    export default {
        name: 'ManageApps',
        components: {
            Multipane,
            MultipaneResizer
        },
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
                value1: true,
                search: '',
                selectComp: {},
                compList: JSON.parse(JSON.stringify(data)),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                appData: [{
                    id: 1,
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手1',
                    action: false,
                }, {
                    id: 2,
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手2',
                    action: false,
                }, {
                    id: 3,
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手3',
                    action: false,
                }, {
                    id: 4,
                    avatar: 'https://avatars0.githubusercontent.com/u/33865977?s=400&v=4',
                    name: '分析助手4',
                    action: true,
                },
                ]
            }
        },
        mounted() {

        },
        methods: {
            changeStatus: function ($event, item) {
                console.log($event);
                console.log(this.appData);
            },

            handleNodeClick(data) {
                console.log('handleNodeClick', data);
                this.selectComp = data
                console.log('selectComp', this.selectComp);
            },
            filterChange() {
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

    /deep/ .el-tree-node__expand-icon {
        font-size: 16px;
    }

    /deep/ .el-tree-node__content {
        height: 60px;
        background: rgba(255, 255, 255, 1);

        .is-current {
            background: rgba(24, 144, 255, 1);
        }

        &:hover {
            background: rgba(24, 144, 255, 0.2);
        }
    }

    /deep/ .el-tree-node.is-current.is-focusable {
        > .el-tree-node__content {
            background: rgba(24, 144, 255, 1);
        }
    }


    .custom-resizer {
        width: 100%;
    }

    .custom-resizer > .pane {
        background: rgba(255, 255, 255, 1);

        .left-con {
            height: 100vh;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;

            /deep/ .el-input__inner {
                height: 30px;
                line-height: 30px;
                background: rgba(218, 217, 216, 0.6);
                border: 0px;
                color: rgba(102, 102, 102, 0.80);
            }

            /deep/ .el-input__icon {
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
                margin: 25px 20px 25px 20px;
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

                .node-text {
                    width: 360px;
                    overflow: hidden;
                    margin-left: 20px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .node-text.active {
                color: rgba(255, 255, 255, 1);
            }

            .el-icon-more {
                color: white;
            }
        }

        .right-col {
            background: rgba(240, 242, 245, 1);
            height: 100%;
            .edit-tab {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 20px 0px 20px;

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

                .item-row {
                    padding: 6px;
                    display: flex;
                    align-items: center;
                    border-bottom-color: rgba(165, 171, 177, 0.4);
                    border-bottom-width: 1px;
                    border-bottom-style: solid;
                    padding: 10px 0px 10px 0px;
                    justify-content: space-between;


                    .left-item {
                        display: flex;
                        align-items: center;
                        justify-content: start;

                        .left-img {
                            margin-left: 20px;
                            height: 40px;
                            border-radius: 50%;
                            width: 40px;
                            margin-right: 20px;
                        }

                        .left-text {
                            font-size: 14px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

    .custom-resizer > .pane ~ .pane {
    }

    .custom-resizer > .multipane-resizer {
        margin: 0;
        left: 0;
        position: relative;

        &:before {
            display: block;
            content: "";
            width: 3px;
            height: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -20px;
            margin-left: -1.5px;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
        }

        &:hover {
            &:before {
                border-color: #999;
            }
        }
    }

</style>
