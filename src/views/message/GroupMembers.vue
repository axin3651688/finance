<template>
    <div class="GroupMembers">
        <div id="right-bar" class="right-bar">
            <div class="top">
                <div class="bar-header">
                    <h3 class="title">所有成员</h3>
                    <div class="icon icon__close" @click="handleCloseGroupMembers"></div>
                </div>
                <div class="addbar">
                    <input type="text" placeholder="添加成员">
                    <div class="icon icon__add">+</div>
                </div>
            </div>
            <el-scrollbar>
                <ul class="member-list">
                    <li class="list-item" v-for="i in 35" :key="i">
                        <figure>
                            <div>
                                <div class="img-box">
                                    <img src="" alt="">
                                </div>
                            </div>
                            <h4 class="text">成员名</h4>
                        </figure>
                        <el-dropdown trigger="click" @command="handleCommand">
                          <span class="el-dropdown-link">
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="`removeMember_${i}`"
                                style="color: #1890FF"
                                >移除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </el-scrollbar>
            <!--移除群成员弹窗-->
            <el-dialog
                    title="移除成员"
                    :visible.sync="showRemoveMember"
                    width="30%"
                    :show-close="false"
                    center>
                <div class="dialog-content" style="font-size: 16px;line-height: 30px;">
                    <p>是否移除成员</p>
                    <p>“{{removeMemberName}}”?</p>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="showRemoveMember = false">确 认</el-button>
                <el-button type="primary" size="small" @click="showRemoveMember = false">取 消</el-button>
              </span>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    export default {
        name: "GroupMembers",
        data () {
            return {
                showRemoveMember: false,        // 是否显示移除群成员弹窗
                removeMemberName: '',           // 需要移除的群组成员id
            }
        },
        methods: {
            // 关闭侧边群组成员栏
            handleCloseGroupMembers() {
                this.$emit('closeGroupMembers')
            },

            handleCommand(command) {
                this.removeMemberName = command;
                this.showRemoveMember = true;
                console.log('需要移除的对象：', command)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .GroupMembers {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 30;
    }

    .right-bar {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 300px;
        background: #ffffff;
        box-shadow: -3px 0px 20px rgba(0, 0, 0, 0.16);
        transition: all .3s;

        .bar-header {
            position: relative;
            height: 60px;
            line-height: 60px;
            padding: 0 20px;
            box-shadow: -3px 0px 20px rgba(0, 0, 0, 0.16);

            .icon__close {
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .addbar {
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            margin: 20px 20px 10px 20px;
            padding: 0 15px;
            border-radius: 8px;
            border: 1px solid $colorTheme;

            input {
                flex: 1;
                height: 100%;
                line-height: 100%;
                border: none;
                outline: none;

                &::placeholder {
                    color: $colorTheme;
                }
            }

            .icon__add {
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 50%;
                color: #ffffff;
                text-align: center;
                font-size: 16px;
                background: $colorTheme;
            }
        }

        /deep/ .el-scrollbar {
            flex: 1;

            .el-scrollbar__wrap {
                overflow-x: hidden;
            }
        }

        .member-list {
            .list-item {
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all .3s;

                &:first-child {
                    margin-top: 20px;
                }

                &:hover {
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
                }

                figure {
                    display: flex;
                    align-items: center;

                    .img-box {
                        overflow: hidden;
                        width: 50px;
                        height: 50px;
                        margin-right: 20px;
                        border-radius: 50%;
                        background: $colorTheme;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .text {
                        overflow: hidden;
                        width: 80px;
                        height: 21px;
                        font-size: 16px;
                        line-height: 20px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: $colorText2;
                    }
                }

                .el-dropdown-link {
                    display: block;
                    width: 20px;
                    height: 20px;
                    background: url("../../assets/green/list_menu.svg") no-repeat;
                    background-size: 20px 20px;
                    cursor: pointer;
                }
            }
        }
    }

    .icon {
        width: 18px;
        height: 18px;
        cursor: pointer;
        background-size: 18px 18px;
    }

    .icon__close {
        background-image: url('../../assets/green/close.svg');
    }
</style>