<template>

    <splitpanes watch-slots   @resized="resized($event)" class="default-theme" style="height:100vh">


        <div class="left-col" :splitpanes-default="leftWidth" splitpanes-min="18">
            <el-input v-model="search" suffix-icon="el-icon-search" placeholder="请输入内容" clearable
                      class="input-with-select">
            </el-input>


            <el-scrollbar class="left-scrollbar">

                <ul style="margin-bottom:40px;height: 100%;  ">
                    <li :class="['item_role', {active: item.id===selectRole.id}]"
                        v-show="item.text.toLowerCase().includes(search.toLowerCase())" v-for="item in roleList"
                        @click="selectRole=item">
                        <!--{{item}}-->

                        <div class="role_text">{{item.text}}</div>

                        <el-dropdown @command="handleCommand">

                                <span v-on:click.stop="" style="margin-right: 20px" v-show="selectRole.id===item.id"
                                      class="el-dropdown-link">
                                    <i class="el-icon-more el-icon--right" style="transform: rotate(90deg);"></i>
                                </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="update">修改</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>


                <el-dialog
                        :visible.sync="updateDialogVisible"
                        width="24%"
                        center>
                    <el-form :model="formUpdate">
                        <el-form-item>
                            <el-input placeholder="角色名称" maxlength="10" v-model="formUpdate.name" clearable
                                      class="dialog-input name"></el-input>
                        </el-form-item>
                        <el-form-item prop="desc">
                            <el-input placeholder="角色描述" maxlength="100" clearable type="textarea"
                                      :autosize="{ minRows: 2, maxRows: 4}" v-model="formUpdate.note"
                                      class="dialog-input note"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="title" class="dialog-title">修改角色</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="updateDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="updateDialogVisible = false">保存</el-button>
                        </span>
                </el-dialog>
            </el-scrollbar>

            <el-button class="aside-btn" @click="createDialogVisible = true" type="primary">添加角色</el-button>

            <el-dialog
                    :visible.sync="createDialogVisible"
                    width="24%"
                    center>
                <el-form :model="formCreate">
                    <el-form-item>
                        <el-input placeholder="角色名称" maxlength="10" v-model="formCreate.name" clearable
                                  class="dialog-input name"></el-input>
                    </el-form-item>
                    <el-form-item prop="desc">
                        <el-input placeholder="角色描述" maxlength="100" clearable type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}" v-model="formCreate.note"
                                  class="dialog-input note"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="title" class="dialog-title">创建角色</span>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="createDialogVisible = false">保存，并返回</el-button>
                        <el-button type="primary" @click="createDialogVisible = false">保存，并继续创建</el-button>
                      </span>
            </el-dialog>
        </div>
        <div class="right-col" :splitpanes-default="rightWidth" splitpanes-min="60">
            <div class="el-main" v-if="roleList.length>0">
                <div class="tab-main">
                    <el-button @click="activeBtn =1" :class="['tab-btn', {active: activeBtn ===1}]">
                        <i class="el-bi-icon-guanli"></i>
                        管理权限
                    </el-button>
                    <el-button @click="activeBtn =2" :class="['tab-btn', {active: activeBtn ===2}]">
                        <i class="el-bi-icon-yingyong_icon"></i>
                        应用权限
                    </el-button>
                    <el-button @click="activeBtn =3" :class="['tab-btn', {active: activeBtn ===3}]">
                        <i class="el-bi-icon-gongneng"></i>
                        功能权限
                    </el-button>
                    <el-button @click="activeBtn =4" :class="['tab-btn', {active: activeBtn ===4}]">
                        <i class="el-bi-icon-qita"></i>
                        其他权限
                    </el-button>
                </div>

                <div>
                    <tab1 v-if="activeBtn === 1" :selectRole="selectRole"></tab1>
                    <tab2 v-else-if="activeBtn === 2"></tab2>
                    <tab3 v-else-if="activeBtn === 3"></tab3>
                    <tab4 v-else-if="activeBtn === 4"></tab4>
                </div>
            </div>
            <div v-else class="right-none">
                <img class="none-img" src="@a/green/bg_no_role.svg">
                <div class="none-text">暂无角色</div>
            </div>
        </div>
    </splitpanes>
</template>

<script>
    import {ROLE_LIST} from '~api/organize.js';
    import Splitpanes from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'

    export default {
        name: 'ManageRoles',
        components: {
            Tab1: () => import('./manage_roles_tab/Tab1'),
            Tab2: () => import('./manage_roles_tab/Tab2'),
            Tab3: () => import('./manage_roles_tab/Tab3'),
            Tab4: () => import('./manage_roles_tab/Tab4'),
            Splitpanes,
        },
        data() {
            return {
                leftWidth:20,
                rightWidth:80,
                createDialogVisible: false,
                updateDialogVisible: false,
                roleList: [],
                search: '',
                newRoleName: '',
                newRoleNote: '',
                activeBtn: 1,
                selectRole: {},
                formCreate: {
                    name: '',
                    note: '',
                },
                formUpdate: {
                    name: '',
                    note: '',
                },
                formLabelWidth: '120px',
            }
        },
        mounted() {
            this.getRoleList()
        },
        methods: {
            resized(val){
                console.log('resized',val)
                this.leftWidth = val[0].width
                this.rightWidth = val[1].width
            },
            handleCommand(command) {
                if (command === 'update') {
                    console.log('updateRole：', this.selectRole)
                    this.updateDialogVisible = true;
                    this.formUpdate.name = this.selectRole.text;
                    this.formUpdate.note = this.selectRole.note;
                } else if (command === 'delete') {
                    this.$confirm('确定删除角色:' + this.selectRole.text + '？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {
                        });
                }
            },
            getRoleList() {
                ROLE_LIST(225, 1).then(res => {
                    this.roleList = res.data.data
                    console.log('请求roleList：', res.data.data)
                }).catch(err => {
                    console.log('请求message：', err)
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }

    .el-icon-more {
        color: rgba(255, 255, 255, 1);
    }


    .default-theme {
        font-family: $fontFamilyMain;
        position: relative;
        height: 100vh !important;

        &:after {
            $afterHeight: 20px;
            position: absolute;
            display: block;
            content: '';
            height: $afterHeight;
            width: 100%;
            background: $colorTheme;
            top: -$afterHeight;
            box-shadow: 0px 3px 60px rgba(0, 0, 0, 0.16);

        }

        .left-col {
            position: relative;
            min-width: 300px;
            height: 100%;
            min-height: 620px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 3px 10px 0px 0px rgba(0, 0, 0, 0.1), 3px 20px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;

            .left-scrollbar {
                height: 90%;
                border-top-width: 1px;
                padding: 0 0 50px 0 ;
                border-top-style: solid;
                border-top-color: rgba(159, 167, 174, 0.6);
            }

            .item_role {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                opacity: 1;

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

            .item_role.active {
                background: rgba(24, 144, 255, 1);

                .role_text {
                    color: rgba(255, 255, 255, 1);
                }
            }

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

            .item-list-wrap {
                flex: 1;
            }

            .aside-btn {
                position: absolute;
                bottom: 30px;
                left: 50%;
                width: 180px;
                height: 50px;
                background: rgba(24, 144, 255, 1);
                box-shadow: 0px 3px 6px rgba(64, 65, 65, 0.4);
                opacity: 1;
                border-radius: 12px;
                transform: translateX(-50%);

                .aside-btn-text {
                    width: fit-content;
                    height: 24px;
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 50px;
                    color: rgba(255, 255, 255, 1);
                    opacity: 1;
                }
            }

            .dialog-title {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(24, 144, 255, 1);
                opacity: 1;
            }

            .dialog-footer {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
            }

            .dialog-input {
                padding: 2px;
                opacity: 1;
                border-radius: 6px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);

                /deep/ .el-input__inner {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(159, 167, 174, 1);
                    background: rgba(239, 242, 246, 1);
                }

                /deep/ .el-textarea__inner {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(159, 167, 174, 1);
                    background: rgba(239, 242, 246, 1);
                }
            }

            .dialog-input.name {
                /deep/ .el-input__inner {
                    height: 40px;
                }

                border-radius: 6px;
            }

            .dialog-input.note {
                /deep/ .el-textarea__inner {
                    height: 60px;
                    max-height: 120px;
                }

                border-radius: 6px;
                margin-top: 10px;
            }
        }

        .right-col {
            .el-main {
                min-width: 600px;
                height: 600px;
                margin: 20px 20px 20px 20px;
                padding: 0px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
                opacity: 1;
                border-radius: 20px;

                .tab-main {
                    width: 100%;
                    height: 60px;
                    background: rgba(255, 255, 255, 1);
                    opacity: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    padding-right: 40px;
                    align-items: center;
                    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);

                    .tab-btn {
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        opacity: 1;
                        border-radius: 6px;

                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 0.60);
                        opacity: 1;

                        i {
                            font-size: 14px;
                        }
                    }

                    .tab-btn.active {
                        background: rgba(24, 144, 255, 1);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                        opacity: 1;
                        border-radius: 6px;

                        color: rgba(255, 255, 255, 1);
                    }
                }
            }

            .right-none {
                width: 100%;
                height: 100%;
                background: rgba(240, 242, 245, 1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                /*padding-left: 200px;*/
                align-items: center;

                .none-img {

                }

                .none-text {
                    margin-top: 10px;
                    font-size: 34px;
                    font-weight: normal;
                    color: rgba(51, 51, 51, 1);
                    opacity: 1;
                }
            }

        }
    }

</style>