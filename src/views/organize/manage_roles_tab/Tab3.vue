<template>
    <div class="root">
        <div class="main">

            <el-scrollbar class="left-col">
                <el-tree class="left-tree"
                         :data="nodeList"
                         show-checkbox
                         node-key="id"
                         ref="tree"
                         default-expand-all
                         check-on-click-node
                         check-strictly
                         highlight-current
                         :props="leftProps">
                </el-tree>
            </el-scrollbar>

            <div class="mid-divider"></div>
            <div class="right-col">
                <el-checkbox :indeterminate="isActionIndeterminate" v-model="checkActionAll"
                             @change="handleActionCheckAllChange">全选
                </el-checkbox>

                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="actionCheckedList" @change="handleCheckedChange">
                    <div v-for="i in 99">
                        <el-checkbox v-for="right in actionList.filter(data=>data.sort===i)" :label="right"
                                     :key="right.varName">{{right.name }}
                        </el-checkbox>
                        <br>
                    </div>

                </el-checkbox-group>
            </div>
        </div>

        <div class="row-save">
            <el-button type="primary" @click="clickSave" class="btn-save">保存
            </el-button>
        </div>
    </div>

</template>

<script>

    import {FIND_ROLE_ACCREDIT_FUNCTION, SAVE_ROLE_ACCREDIT_FUNCTION} from '~api/organize.js';

    export default {
        name: "Tab3",
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        watch: {
            selectRole(val) {
                this.resetData()
                this.getFunctionData()
            }
        },
        data() {
            return {
                nodeListPre: [],
                nodeList: [],
                preNodeList: [],
                nodeListLater: [],
                leftProps: {
                    children: 'child',
                    label: 'text'
                },
                isActionIndeterminate: false,
                checkActionAll: [],
                actionList: [],
                preActionList: [],
                actionCheckedList: [],
            }
        },
        created() {
            this.getFunctionData()
        },

        methods: {
            resetData() {
                    this.nodeListPre = [],
                    this.nodeList = [],
                    this.preNodeList = [],
                    this.nodeListLater = [],
                    this.isActionIndeterminate = false,
                    this.checkActionAll = [],
                    this.actionList = [],
                    this.preActionList = [],
                    this.actionCheckedList = []
            },
            convert_tree_data(result, nodeList) {
                for (let i = 0; i < nodeList.length; i++) {
                    let node = nodeList[i]
                    if (node.child && node.child.length > 0) {
                        this.convert_tree_data(result, node.child)
                        node.child = null
                    } else {
                        node.child = null
                    }
                    result.push(node)
                }
            },
            handleActionCheckAllChange(val) {
                this.actionCheckedList = val ? this.actionList : [];
                this.isActionIndeterminate = false;
                console.log('handleCheckAllChange', this.actionCheckedList)
            },
            handleCheckedChange(value) {
                console.log('handleCheckedChange', value)
                let checkedCount = value.length;
                this.checkActionAll = checkedCount === this.actionList.length;
                this.isActionIndeterminate = checkedCount > 0 && checkedCount < this.actionList.length;
            },
            getFunctionData() {
                FIND_ROLE_ACCREDIT_FUNCTION(this.selectRole.id).then(res => {
                    console.log('FIND_ROLE_ACCREDIT_FUNCTION：', res.data.data)
                    this.nodeList = res.data.data.nodeList
                    this.preNodeList = JSON.parse(JSON.stringify(res.data.data.nodeList))
                    this.actionList = res.data.data.actionList
                    this.preActionList = JSON.parse(JSON.stringify(res.data.data.actionList))
                    let temp = []
                    res.data.data.actionList.forEach(action => {
                        if (action.accredit !== 0) {
                            temp.push(action)
                        }
                    })
                    this.actionCheckedList = temp
                    console.log('actionCheckedList：', temp)

                    this.setCheckedKeys(this.nodeList)
                }).catch(err => {
                    console.log('FIND_ROLE_ACCREDIT_FUNCTION：', err)
                });
            },

            getChangedNodes() {

                let checkedNodeList = JSON.parse(JSON.stringify(this.$refs.tree.getCheckedNodes()))
                console.log('this.convert_tree_data checkedNodeList', checkedNodeList)
                let tempAll = []
                this.convert_tree_data(tempAll, JSON.parse(JSON.stringify(this.preNodeList)))
                console.log('this.convert_tree_data tempAll', tempAll)
                for (let i = 0; i < tempAll.length; i++) {
                    tempAll[i].accredit = 0
                    for (let j = 0; j < checkedNodeList.length; j++) {
                        checkedNodeList[j].accredit = 1
                        if (tempAll[i].id === checkedNodeList[j].id) {
                            tempAll[i].accredit = checkedNodeList[j].accredit
                        }
                    }
                }
                console.log('遍历出修改后的列表：tempAll', tempAll)
                let perList = []
                this.convert_tree_data(perList, JSON.parse(JSON.stringify(this.preNodeList)))
                console.log('原来列表：preNodeList', perList)
                let nodeList = []
                for (let i = 0; i < tempAll.length; i++) {
                    for (let j = 0; j < perList.length; j++) {
                        if (tempAll[i].id === perList[j].id && tempAll[i].accredit !== perList[j].accredit) {
                            let tempItem = {
                                'accredit': tempAll[i].accredit,
                                'moduleId': tempAll[i].id,
                            }
                            nodeList.push(tempItem)
                        }
                    }
                }
                console.log('比对，找出修改的项目：nodeList', nodeList)
                return nodeList
            },
            getChangedAction() {
                //遍历出一个修改后的列表
                let tempAll = JSON.parse(JSON.stringify(this.preActionList))
                for (let i = 0; i < tempAll.length; i++) {
                    tempAll[i].accredit = 0
                    for (let j = 0; j < this.actionCheckedList.length; j++) {
                        this.actionCheckedList[j].accredit = 1
                        if (tempAll[i].varName === this.actionCheckedList[j].varName) {
                            tempAll[i].accredit = this.actionCheckedList[j].accredit
                        }
                    }
                }
                console.log('遍历出一个修改后的列表：tempAll', tempAll)
                console.log('员列表列表：tempAll', this.preActionList)
                //再和原来的列表进行比对，找出修改的项目
                let actionList = []
                for (let i = 0; i < tempAll.length; i++) {
                    for (let j = 0; j < this.preActionList.length; j++) {
                        if (tempAll[i].varName === this.preActionList[j].varName && tempAll[i].accredit !== this.preActionList[j].accredit) {
                            let tempItem = {
                                'accredit': tempAll[i].accredit,
                                'apiId': tempAll[i].varName,
                            }
                            actionList.push(tempItem)
                        }
                    }
                }
                console.log('再和原来的列表进行比对，找出修改的项目：actionList', actionList)
                return actionList
            },
            setCheckedKeys(nodeList) {
                let temp = []
                this.findTargetChecked(temp, nodeList)
                console.log('setCheckedNodes：temp', temp)
                this.$refs.tree.setCheckedKeys(temp);
            },
            findTargetChecked(temp, source) {
                if (source && source.length) {
                    for (let item of source) {
                        if (item.accredit !== 0) {
                            temp.push(item.id)
                        }
                        if (item.child && item.child.length > 0) {
                            this.findTargetChecked(temp, item.child);
                        }
                    }
                }
            },
            clickSave() {
                let actionList = this.getChangedAction()
                let nodeList = this.getChangedNodes()
                if (actionList.length === 0 && nodeList.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '未进行修改',
                        type: 'warning'
                    });
                    return
                }
                let params = {}
                params.roleId = this.selectRole.id
                // if (actionList.length > 0)
                    params.actionList = actionList
                // if (nodeList.length > 0)
                    params.nodeList = nodeList
                console.log('clickSave：params', params)
                SAVE_ROLE_ACCREDIT_FUNCTION(params).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getFunctionData()
                    }
                }).catch(err => {
                    console.log('SAVE_ROLE_ACCREDIT_FUNCTION：', err)
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .root {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px;
        position: absolute;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
        opacity: 1;
        border-radius:  0 0 20px 20px;

        .main {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            /*margin: 10px 0 0 0 ;*/
            background: rgba(255, 255, 255, 1);

            /deep/ .el-checkbox__label {
                font-size: 14px;
                font-family: Microsoft YaHei;
            }

            .left-col {
                height: 100%;
                width: 100%;
                .left-tree{

                }
            }

            .mid-divider {
                width: 2px;
                height: 100%;
                background: rgba(0, 0, 0, 0.2);
                opacity: 1;
            }

            .right-col {
                margin-left: 20px;
                width: 100%;

            }
        }

        .row-save {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            .btn-save {
                width: 140px;
                height: 50px;
                background: rgba(24, 144, 255, 1);
                box-shadow: 0px 3px 6px rgba(64, 65, 65, 0.4);
                opacity: 1;
                border-radius: 12px;
            }
        }
    }

</style>