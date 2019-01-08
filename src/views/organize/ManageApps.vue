<template>

    <splitpanes class="default-theme">
        <span splitpanes-default="20" splitpanes-min="16" splitpanes-max="40" class="left-con">
            <el-tree
                    :data="compList"
                    node-key="id"
                    accordion
                    @node-click="handleNodeClick"
                    :render-content="renderContent"
                    :expand-on-click-node="true">

            </el-tree>
        </span>

        <div>main</div>
    </splitpanes>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'
    export default {
        name: 'ManageApps',
        components: { Splitpanes },
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
                activeItem: null,
                compList: JSON.parse(JSON.stringify(data)),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        mounted() {

        },
        methods: {

            renderContent(h, { node, data, store }) {
                if (this.activeItem ===data.id){
                    return (
                        <el-tooltip class="item" effect="dark" content="123" placement="top-start">
                        <span class="custom-tree-node">

                        <span>{node.label}</span>


                        <span style="position: absolute;right: 20px;">
                        <i  class="el-icon-more"></i>
                        </span>
                        </span>
                        </el-tooltip>);
                }else {
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        </span>);
                }

            },
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


    .left-con{
        height: 100vh;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
        opacity: 1;
        .custom-tree-node {
            flex: 1;
            width: 300px;
            display: flex;
            align-items: center;
            position: absolute;
            right: 20px;
            justify-content: space-between;
            padding-right: 8px;
            .list-menu {
                position: absolute;
                right: 20px;
                top: 50%;
                margin-left: 20px;
                height: 20px !important;
                width: 20px !important;
                cursor: pointer;
                transform: translateY(-50%);
            }
        }
        /deep/ .el-tree-node__content {
            height: 60px;
        }
    }


    .el-container {
        font-family: $fontFamilyMain;
        position: relative;
        height: 100vh !important;

        .el-aside {
            position: relative;
            width: 30%;
            min-width: 100px;
            height: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;
            .custom-tree-node {
                flex: 1;
                width: 300px;
                display: flex;
                align-items: center;
                position: absolute;
                right: 20px;
                justify-content: space-between;
                padding-right: 8px;
                .list-menu {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    margin-left: 20px;
                    height: 20px !important;
                    width: 20px !important;
                    cursor: pointer;
                    transform: translateY(-50%);
                }
            }
            /deep/ .el-tree-node__content {
                height: 60px;
            }

            .item_role {
                width: fit-content;
                position: relative;
                height: 60px;
                opacity: 1;

                .role_text {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 60px;
                    margin-left: 6px;
                    color: rgba(102, 102, 102, 0.80);
                    opacity: 1;
                }

                .list-menu {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    height: 20px !important;
                    width: 20px !important;
                    cursor: pointer;
                    transform: translateY(-50%);
                }
            }

            .item_role.active {
                background: rgba(24, 144, 255, 1);

                .role_text {
                    color: rgba(255, 255, 255, 1);
                }
            }
        }

        .el-main {
            width: 70%;
            height: 460px;
            min-width: 600px;
            margin: 20px 20px 20px 20px;
            padding: 0px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
            opacity: 1;
            border-radius: 20px;
        }
    }

    .item_role {
        position: relative;
        opacity: 1;
        height: 60px;

        .role_text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 60px;
            margin-left: 56px;
            color: rgba(102, 102, 102, 0.80);
            opacity: 1;
        }

        .list-menu {
            position: absolute;
            right: 20px;
            top: 50%;
            height: 20px !important;
            width: 20px !important;
            cursor: pointer;
            transform: translateY(-50%);
        }
    }
</style>
