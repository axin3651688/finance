<template>
    <div class="main">
        <el-scrollbar class="left-col">
            <el-tree v-show="nodeList.length>0" class="left-tree"
                     :data="nodeList"
                     show-checkbox
                     node-key="id"
                     ref="tree"
                     check-on-click-node
                     check-strictly
                     highlight-current
                     default-expand-all
                     :props="leftProps">
            </el-tree>

            <div class="row-save">
                <el-button type="primary" v-show="nodeList.length>0" @click="clickSave" class="btn-save">保存
                </el-button>
            </div>
        </el-scrollbar>


    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {FIND_ROLE_ACCREDIT_OTHER, SAVE_ROLE_ACCREDIT_OTHER} from '~api/organize.js';

    export default {
        name: "Tab4",
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
                nodeList: [],
                preNodeList: [],
                leftProps: {
                    children: 'children',
                    label: 'text'
                },
            }
        },
        created() {
            this.getFunctionData()
        },
        methods: {
            resetData() {
                this.nodeList = []
                this.preNodeList = []
                this.actionList = []
            },
            convert_tree_data(result, nodeList) {
                for (let i = 0; i < nodeList.length; i++) {
                    let node = nodeList[i]
                    if (node.children && node.children.length > 0) {
                        this.convert_tree_data(result, node.children)
                        node.children = null
                    } else {
                        node.children = null
                    }
                    result.push(node)
                }
            },
            getFunctionData() {
                FIND_ROLE_ACCREDIT_OTHER(this.selectRole.id).then(res => {
                    console.log('FIND_ROLE_ACCREDIT_OTHER：', res.data.data)
                    this.nodeList = [res.data.data]
                    this.preNodeList = JSON.parse(JSON.stringify([res.data.data]))

                    this.setCheckedKeys(this.nodeList)
                }).catch(err => {
                    console.log('FIND_ROLE_ACCREDIT_OTHER：', err)
                });
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
                        if (item.children && item.children.length > 0) {
                            this.findTargetChecked(temp, item.children);
                        }
                    }
                }
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
                                'companyId': tempAll[i].id,
                            }
                            nodeList.push(tempItem)
                        }
                    }
                }
                console.log('比对，找出修改的项目：nodeList', nodeList)
                return nodeList
            },
            clickSave(){
                let companyList = this.getChangedNodes()
                if (companyList.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '未进行修改',
                        type: 'warning'
                    });
                    return
                }
                let params = {}
                params.roleId = this.selectRole.id
                // if (nodeList.length > 0)
                params.companyList = companyList
                console.log('clickSave：params', params)

                SAVE_ROLE_ACCREDIT_OTHER(params).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getFunctionData()
                    }
                }).catch(err => {
                    console.log('SAVE_ROLE_ACCREDIT_OTHER：', err)
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .main{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px;
        position: absolute;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
        opacity: 1;
        border-radius:  0 0 20px 20px;
        .left-col {
            height: 100%;
            .left-tree{

            }
        }

        .row-save {
            margin: 20px;
            display: flex;
            flex: 1;
            position: relative;
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