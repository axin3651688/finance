<template>
    <splitpanes watch-slots @resized="resized($event)" class="default-theme" style="height:100vh">
        <div class="left-col" :splitpanes-default="leftWidth" splitpanes-min="18">
            <el-input v-model="search" @change="filterChange" suffix-icon="el-icon-search"
                      placeholder="请输入内容"
                      clearable class="input-with-select">
            </el-input>

            <el-scrollbar
                    style="height:90%;min-height: 600px;border-top-width: 1px;border-top-style: solid;border-top-color: rgba(159,167,174,0.6);  ">
                <el-tree
                        :data="compList"
                        node-key="id"
                        :props="compProps"
                        :default-expanded-keys="[expandedKey]"
                        :current-node-key="expandedKey"
                        @node-click="handleNodeClick"
                        highlight-current
                        :filter-node-method="filterNode"
                        ref="tree"
                        :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="['node-text', {active: data.id===selectComp.id}]">{{ node.label }}</span>
            <el-dropdown  @command="handleCommand">

            <span style="margin-right: 20px" v-show="selectComp.id===data.id"
                  class="el-dropdown-link">
            <i class="el-icon-more el-icon--right" style="transform: rotate(90deg);"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2">创建子公司</el-dropdown-item>
            <el-dropdown-item command="3">编辑公司</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </span>
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="right-col"  :splitpanes-default="rightWidth" splitpanes-min="40">
            <div class="edit-container">
                <tab-show-comp v-if="tab==1" :selectCompId="selectComp.id" ></tab-show-comp>
                <tab-create-comp v-else-if="tab==2" :selectComp="selectComp"  @compCreated="handleCreate"></tab-create-comp>
                <tab-edit-comp v-else="tab==3" :selectComp="selectComp"  @compUpdated="handleUpdate"></tab-edit-comp>
            </div>

        </div>
    </splitpanes>
</template>

<script>
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'
    import {
        FIND_COMPANY_TYPE,
        FIND_SUB_COMPANY_LIST,
        SELECT_AREA,
        SELECT_INDUSTRY,SAVE_SUB_COMPANY,
        SELECT_SCALE
    } from '~api/organize.js'
    import {UPLOAD_FILE} from '~api/message.js';
    import {mapGetters} from 'vuex'

    export default {
        name: 'ManageApps',
        components: {
            Splitpanes,
            TabShowComp: () => import('./manage_comps_tab/TabShowComp'),
            TabCreateComp: () => import('./manage_comps_tab/TabCreateComp'),
            TabEditComp: () => import('./manage_comps_tab/TabEditComp'),
        },
        data() {
            return {
                tab:1,
                search: '',
                selectComp: {},
                compList: [],
                expandedKey:1,
                compProps: {
                    children: 'children',
                    label: 'text'
                },
                leftWidth: 20,
                rightWidth: 80,
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {
            this.getCompList(-1)
        },
        mounted() {

        },
        methods: {
            resized(val) {
                console.log('resized', val)
                this.leftWidth = val[0].width
                this.rightWidth = val[1].width
            },
            changeStatus: function ($event, item) {
                console.log($event);
                console.log(this.appData);
            },

            handleNodeClick(data) {
                console.log('handleNodeClick', data);
                this.selectComp = data
                this.tab = 1
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
            },
            getCompList(key) {

                FIND_SUB_COMPANY_LIST(225).then(res => {
                    console.log('请求FIND_SUB_COMPANY_LIST：', res.data.data)
                    if (res.data.code === 200) {
                        if (key!==-1){
                            this.expandedKey = key
                        }else {
                            this.expandedKey = res.data.data.id
                            this.selectComp = {
                                id:res.data.data.id
                            }
                        }
                        let temp = []
                        temp.push(res.data.data)
                        this.compList = temp
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
                });
            },
            handleCommand(command) {
                console.log('handleCommand', command)
                this.tab =command
            },
            handleCreate(data){
                //创建成功刷新列表，显示新的
                console.log('handleCreate', data)
                this.selectComp = {
                    id:data
                }
                this.getCompList(data)
                this.tab = 1
            },
            handleUpdate(data){
                console.log('handleUpdate', data)
                this.selectComp = {
                    id:data
                }
                this.expandedKey = data
                this.getCompList()
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
        padding: 30px 0 30px 0;

    }
    /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: rgba(24, 144, 255, 1);
    }
    .default-theme {
        font-family: $fontFamilyMain;
        height: 100%;
        width: 100%;

        &:after {
            $afterHeight: 20px;
            position: absolute;
            display: block;
            content: '';
            height: $afterHeight;
            width: 100%;
            background: $colorTheme;
            top: -$afterHeight;
            z-index: 1;
            box-shadow: 0px 3px 60px rgba(0, 0, 0, 0.16);

        }

        .left-col {
            height: 100%;
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
                display: flex;
                align-items: center;
                position: relative;
                right: 20px;
                justify-content: space-between;
                padding-right: 8px;

                .node-text {
                    overflow: hidden;
                    margin-left: 20px;
                    text-overflow: ellipsis;
                    color: rgba(102, 102, 102, 0.80);
                    line-height: 60px;
                    white-space: nowrap;
                }

                .node-text.active {
                    /*color: rgba(255, 255, 255, 1);*/
                }
            }


            .el-icon-more {
                color: white;
            }
        }

        .right-col {
            width: 100%;
            background: rgba(240, 242, 245, 1);
            height: 100%;
            display: flex;
            flex-direction: column;

            .edit-container {
                flex: 1;
            }
        }
    }

    /deep/ .el-upload-dragger {
        width: 400px;
        height: 140px;
        background: rgba(232, 232, 232, 0.4);

        .el-upload__text {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(64, 64, 64, 0.20);
        }
    }

</style>
