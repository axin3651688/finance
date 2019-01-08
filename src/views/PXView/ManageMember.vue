<template>
    <div class="Message">
        <div class="container">
            <div class="left">

                <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->

                <div class="panel-left">
                    <el-scrollbar v-if="companyList">
                        <el-collapse accordion>
                            <el-collapse-item v-for="comp in companyList" :key="comp.id">
                                <template slot="title">
                                    <div class="item-wrap">
                                        <h3 class="item-title">
                                            {{comp.text}}
                                            <span>（{{comp.userCount}}人）</span>
                                        </h3>
                                        <p class="item-info">
                                            公司介绍{{comp.text}}
                                        </p>
                                    </div>
                                </template>
                                <ul class="sub-item">
                                    <li :class="{active: activeUser === user.id}" v-for="user in comp.children"
                                        @click="getUserInfo(user.id)"
                                        :key="user.id">
                                        <figure>
                                            <div class="img-box">
                                                <img :src="user.avatar" v-avatar="user.trueName"/>
                                            </div>
                                            <div class="info">
                                                <h3>{{user.trueName}}</h3>
                                                <p>{{user.deptName}}{{user.position}}</p>
                                            </div>
                                        </figure>
                                        <i class="arrow el-icon-arrow-right"></i>
                                    </li>
                                </ul>
                            </el-collapse-item>
                        </el-collapse>
                    </el-scrollbar>
                </div>

            </div>
            <div class="right">


                <el-table :data="tableData" stripe style="width: 100%" class="right_table"
                          :header-cell-style="getRowClass">
                    <el-table-column prop="name" label="姓名" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="电话" width="180" align="center" >
                    </el-table-column>
                    <el-table-column prop="aboutCompany" label="公司" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="role" label="角色" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--右边区域左内阴影效果-->
                <div class="inset-shadow"></div>
            </div>

            <!--container区域上边贴导航栏内阴影效果-->
            <div class="inset-shadow"></div>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        ALL_COMPANY_CONTACT_LIST,
        CONTACT_INFO
    } from '~api/message.js'

    export default {
        data() {
            return {

                companyList: null, // [] 接收一个数组
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
                    name: '赵小虎',
                    aboutCompany: '合肥经邦集团',
                    role: '后端研发工程师',
                }]
            }
        },

        computed: {
            ...mapGetters(['user', 'messageStore']), // vuex中保存的登陆用户数据
            loginUserId() { // 当前登录用户的Id
                return this.user.user.id
            }
        },
        methods: {


//设置表格第一行的颜色
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:rgba(221,235,246,1)';


                    // return 'background:#EFEFEF'
                } else {
                    return ''
                }
            },


            ...mapActions(['ActionSetMessageStore']),

            // 和某某单聊, 要切换到单聊窗口
            chatWithSingle(receiverId) {
                this.ActionSetMessageStore({
                    targetId: receiverId,
                    miniType: 1100, // 1100 单聊
                    receiverData: this.rightUserInfo
                });
                this.$router.push('/message_page/msg')
            },

            // 获取公司列表, 并把公司列表存vuex
            getCompanyList() {
                // debugger;
                ALL_COMPANY_CONTACT_LIST(this.loginUserId).then(res => {
                    console.log('我公司列表：', res.data);
                    if (res.data.code === 200) {
                        this.companyList = res.data.data;
                        this.ActionSetMessageStore({
                            companyList: this.companyList
                        });

                        // 当获得公司列表后，默认请求第一个公司第一个员工的信息
                        if (this.companyList.length) {
                            if (this.companyList[0].children.length) {
                                this.getUserInfo(this.companyList[0].children[0].id);
                            }
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '你还没有加入任团队',
                                showClose: true
                            })
                        }

                    }
                })
            },

            // 检查这个用户是不是已将请求过一次了,如果请求过了则直接返回该用户的信息
            checkUserInfo(userId) {
                if (this.requestedUser.hasOwnProperty(userId)) {
                    console.log(`已经请求过用户的信息了:${userId}`);
                    return this.requestedUser[userId];
                } else return null
            },

            // 查看个人资料,如果这个用户已经请求过一次了就不在发送请求
            getUserInfo(userId) {
                this.activeUser = userId;
                let userInfo = this.checkUserInfo(userId);
                if (userInfo) {
                    this.rightUserInfo = userInfo;
                } else {
                    CONTACT_INFO(this.loginUserId, userId).then(res => {
                        console.log('查询个人资料', res.data.data);
                        if (res.data.code === 200) {
                            let userInfo = res.data.data;
                            this.rightUserInfo = userInfo;
                            this.requestedUser[userId] = userInfo;
                        }
                    }).catch(err => {
                        console.log('查询个人资料', err)
                    })
                }
            }

        },
        created() {
            this.getCompanyList();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "@ms/index.scss";

    .containerMain {
        display: flex;
        padding-left: 0 !important;
        height: 100vh;
    }

    .Message {
        font-family: $fontFamilyMain;
        position: relative;
        height: 100vh !important;

        .container {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;

            .left {
                width: $sizeNavBarWidth;
                height: 100%;
                background: rgba(255, 255, 255, 1);

                .panel-left {
                    box-sizing: border-box;
                    width: $sizeNavBarWidth;
                    height: 100%;
                    border-right: 1px solid $colorBorder2;

                    /deep/ .el-collapse {
                        .el-collapse-item__header.is-active {
                            border-bottom-color: #ebeef5;
                        }

                        .el-collapse-item__header {
                            $itemHeaderHeight: 80px;
                            height: $itemHeaderHeight;

                            .item-wrap {
                                height: 100%;
                                box-sizing: border-box;
                                padding: 15px 30px;

                                h3 {
                                    line-height: 21px;
                                    color: $colorText1;
                                    font-size: 16px;
                                    font-weight: bold;
                                }

                                p {
                                    margin-top: 10px;
                                    line-height: 20px;
                                    color: $colorText3;
                                }
                            }

                            .el-collapse-item__arrow {
                                line-height: $itemHeaderHeight;
                                height: $itemHeaderHeight;
                                margin-right: 22px;
                            }
                        }

                        /deep/ .el-collapse-item__content {
                            padding-bottom: 0;

                            ul.sub-item {
                                li {
                                    position: relative;
                                    height: 60px;
                                    padding: 0 30px 0 30px;
                                    cursor: pointer;
                                    transition: all .3s;

                                    &:hover {
                                        box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
                                    }

                                    .arrow {
                                        position: absolute;
                                        right: 24px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                    }
                                }

                                li.active {
                                    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
                                }

                                figure {
                                    display: flex;
                                    align-items: center;
                                    height: 100%;
                                    border-top: 1px solid $colorBorder2;
                                    margin-top: -1px;

                                    .img-box {
                                        width: 40px;
                                        height: 40px;
                                        overflow: hidden;
                                        margin-right: 20px;
                                        border-radius: 8px;
                                        background: $colorTheme;

                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }

                                    .info {
                                        font-family: $fontFamilyMain;
                                        font-weight: 400;
                                        line-height: 20px;

                                        h3 {
                                            height: 19px;
                                            font-size: 14px;
                                            color: $colorText1;
                                        }

                                        p {
                                            height: 16px;
                                            font-size: 12px;
                                            color: $colorText5;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }


            .right {
                flex: 1;
                position: relative;
                overflow: hidden;
                height: 100%;
                padding: 20px;

                /*min-width: 800px;*/
                background: $colorBgPageGray;

                .right_table {
                    border-radius: 20px 20px 0px 0px;
                    box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
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
    }
</style>