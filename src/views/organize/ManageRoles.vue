<template>
    <el-container>
        <el-aside>

            <el-scrollbar style="height: 100%">

                <el-input v-model="search"  suffix-icon="el-icon-search" placeholder="请输入内容" clearable class="input-with-select">
                </el-input>

                <ul style="margin-bottom: 100px">
                    <li :class="['item_role', {active: item.id===activeItem}]"
                        v-show="item.text.toLowerCase().includes(search.toLowerCase())" v-for="item in roleList"
                        @click="activeItem=item.id">
                        <!--{{item}}-->
                        <div>
                            <div class="role_text">{{item.text}}</div>

                            <el-popover
                                    placement="bottom">
                                <div>
                                    <el-button size="mini" type="text" @click="handleUpdateRole(item)">修改</el-button>
                                    <el-button type="primary" size="mini" @click="handleDelRole(item)">删除</el-button>
                                </div>
                                <img slot="reference" v-show="activeItem===item.id" class="list-menu"
                                     src="@/assets/green/list_menu_white.svg" alt="">
                            </el-popover>
                        </div>

                    </li>
                </ul>

                <el-button class="aside-btn" @click="createDialogVisible = true" type="primary">添加角色</el-button>

                <el-dialog
                        :visible.sync="createDialogVisible"
                        width="24%"
                        :before-close="handleClose">
                    <el-input v-model="newRoleName" class="dialog-input name" placeholder="角色名称"></el-input>
                    <el-input v-model="newRoleNote" class="dialog-input note" placeholder="角色描述"></el-input>
                    <span slot="title" class="dialog-title">创建角色</span>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="createDialogVisible = false">保存，并返回</el-button>
    <el-button type="primary" @click="createDialogVisible = false">保存，并继续创建</el-button>
  </span>
                </el-dialog>

                <el-dialog
                        :visible.sync="updateDialogVisible"
                        width="24%"
                        :before-close="handleClose">
                    <el-input v-model="selectRole.text" class="dialog-input name" placeholder="角色名称"></el-input>
                    <el-input v-model="selectRole.note" class="dialog-input note" placeholder="角色描述"></el-input>
                    <span slot="title" class="dialog-title">修改角色</span>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">保存，并返回</el-button>
    <el-button type="primary" @click="updateDialogVisible = false">保存，并继续创建</el-button>
  </span>
                </el-dialog>
            </el-scrollbar>


        </el-aside>

        <el-main>
            <div class="tab-main">
                <!--<el-radio-group v-model="activeName" style="margin-bottom: 30px;">-->
                    <!--<el-radio-button label="管理权限" name="1"></el-radio-button>-->
                    <!--<el-radio-button label="应用权限" name="2"></el-radio-button>-->
                    <!--<el-radio-button label="功能权限" name="3"></el-radio-button>-->
                    <!--<el-radio-button label="其他权限" name="4"></el-radio-button>-->
                <!--</el-radio-group>-->

                    <el-button @click="activeBtn =1">管理权限</el-button>
                    <el-button @click="activeBtn =2">应用权限</el-button>
                    <el-button @click="activeBtn =3">功能权限</el-button>
                    <el-button @click="activeBtn =4">其他权限</el-button>
            </div>

            <span>{{activeBtn}}</span>
        </el-main>
    </el-container>
</template>

<script>
    import {ROLE_LIST} from '~api/organize.js';

    export default {
        name: 'ManageRoles',
        data() {
            return {
                activeItem: null,
                activeName: '',
                createDialogVisible: false,
                updateDialogVisible:false,
                roleList: [],
                search: '',
                newRoleName:'',
                newRoleNote:'',
                activeBtn:1,
                selectRole:{},
            }
        },
        mounted() {
            this.getRoleList()
        },
        methods: {
            handleClose(done) {
                this.$confirm('尚未保存，确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            handleUpdateRole(role){
                console.log('role：', role)
                this.updateDialogVisible =true;
                this.selectRole = role;

            },
            handleDelRole(role){
                this.$confirm('确定删除角色:'+role.text+'？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
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

            .item_role {
                position: relative;
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
            }

            .input-with-select {
                width: 260px;
                height: 30px;
                margin: 20px;
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
            .dialog-title{
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(24,144,255,1);
                opacity:1;
            }

            .dialog-input{
                padding: 2px;
                opacity:1;
                border-radius:6px;

                /deep/ .el-input__inner{
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(159,167,174,1);
                    background:rgba(239,242,246,1);
                }
            }
            .dialog-input.name{

            }
            .dialog-input.note{
                margin-top: 20px;
            }
        }

        .el-main {
            width: 70%;
            height: 460px;
            min-width: 600px;
            margin: 20px 20px 20px 20px;
            padding:0px;
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
                .tab-btn{

                }
            }
        }
    }

</style>