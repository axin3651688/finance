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
        <div class="right" :splitpanes-default="rightWidth" splitpanes-min="40" >

            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable
                      class="input-with-select">
            </el-input>

            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable
                      class="input-with-select">
            </el-input>

            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="名称/动作" clearable
                      class="input-with-select1">
            </el-input>


            <!--max-height="650"-->
            <el-table :data="tableData" stripe style="width: 100%"  height="80vh" max-height="80vh"  class="right_table"
                      :header-cell-style="getRowClass">
                <el-table-column prop="name" label="姓名" min-width="20%" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="电话" min-width="20%" align="center">
                </el-table-column>
                <el-table-column prop="aboutCompany" label="公司" min-width="40%" align="center">
                </el-table-column>
                <el-table-column prop="role" min-width="20%" label="角色" align="center">
                </el-table-column>
                <el-table-column label="操作" min-width="20%" align="center">
                    <div slot-scope="scope" class="template_edit">

                        <div class="leftIcon_title">
                            <img src="@a/user_icon/xiugai_icon.svg">
                            <span class="itemSpan">编辑</span>
                        </div>

                        <div class="leftIcon_title1">
                            <img src="@a/user_icon/jinyong_icon.svg">
                            <span class="itemSpan1">删除</span>
                        </div>

                    </div>
                </el-table-column>
            </el-table>


        </div>

    </splitpanes>


</template>


<script>

    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'

    import {
        mapGetters,
        mapActions
    } from 'vuex'

    import {
        FIND_COMPANY_TYPE,
        FIND_SUB_COMPANY_LIST,
    } from '~api/organize.js'


    export default {

        components: {Splitpanes},
        data() {


            return {
                search:null,
                selectComp: {},
                leftWidth: 20,
                rightWidth: 80,
                compList: [],
                expandedKey:1,
                search: '',
                compProps: {
                    children: 'children',
                    label: 'text'
                },

                tableData: [{
                    phone: '2016-05-02',
                    name: '王小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    phone: '2016-05-02',
                    name: '张小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    phone: '2016-05-02',
                    name: '张小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }, {
                    phone: '2016-05-02',
                    name: '赵小虎1123123123',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }]
            }
        },
        created() {

            console.log('请求FIND_SUB_COMPANY_LIST')
            this.getCompList(-1)
        },

        computed: {
            ...mapGetters(['user', 'messageStore']), // vuex中保存的登陆用户数据
            loginUserId() { // 当前登录用户的Id
                return this.user.user.id
            }
        },
        methods: {

            getCompList(key) {

                FIND_SUB_COMPANY_LIST(this.loginUserId).then(res => {
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


            handleNodeClick(data) {
                console.log('handleNodeClick', data);
                this.selectComp = data
                console.log('selectComp', this.selectComp);
            },

            filterChange() {
                this.$refs.tree.filter(this.search);
            },

//设置表格第一行的颜色
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:rgba(221,235,246,1);color: rgba(19,84,143,1);font-weight:bold;font-size:16px;';


                    // return 'background:#EFEFEF'
                } else {
                    return ''
                }
            },


            ...mapActions(['ActionSetMessageStore']),


        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "@ms/index.scss";

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
                    color: rgba(102, 102, 102, 0.80);
                    line-height: 30px;
                    white-space: nowrap;
                }

                .node-text.active {
                    color: rgba(255, 255, 255, 1);
                }
            }


            .el-icon-more {
                color: white;
            }
        }


    .right {

        /*display: flex;*/
        /*flex-direction: column;*/

        padding: 20px;
        height: 100%;
        background: $colorBgPageGray;

        /*height: 200px;*/

        .input-with-select {
            width: 220px;
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
            opacity: 1;
            margin: 20px 0 20px 20px;
            border-radius: 8px;
        }

        .input-with-select1 {

            position: absolute;
            right: 20px;
            width: 220px;
            height: 30px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
            opacity: 1;
            margin: 20px 0 20px 20px;
            border-radius: 8px;
        }


        .right_table {

            /*.el-table {*/

                /*height: 100%;*/
            /*}*/
            /*.el-table__body-wrapper {*/

                /*height: calc(100% - 42px);*/
            /*}*/


            border-radius: 20px 20px 0px 0px;
            box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);


            .template_edit {

                display: flex;
                flex-direction: row;
                text-align: center;
                justify-content: space-around;

                .leftIcon_title {

                    display: flex;
                    flex-direction: row;

                    .itemSpan {
                        /*width: 120px;*/
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(28, 141, 10, 1);
                        opacity: 1;
                        opacity: 1;
                        padding-left: 10px;
                    }
                }

                .leftIcon_title1 {

                    display: flex;
                    flex-direction: row;

                    .itemSpan1 {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        line-height: 19px;
                        color: rgba(229, 51, 51, 1);
                        opacity: 1;
                        padding-left: 10px;
                    }
                }

            }
        }

        .inset-shadow {
            $insetShadowWidth: 20px;
            position: absolute;
            left: -$insetShadowWidth;
            top: 0;
            bottom: 0;
            width: $insetShadowWidth;
            height: 100%;
            box-shadow: 3px 0 $insetShadowWidth rgba(0, 0, 0, 0.1);
        }
    }

    .inset-shadow {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: #ffffff;
        box-shadow: 0 3px 60px rgba(0, 0, 0, 0.16);
    }

}









</style>