<template>
    <div class="ContactsTeams">
        <div class="panel-left">
            <el-collapse accordion>
                <el-collapse-item v-for="i in 5" :key="i">
                    <template slot="title">
                        <div class="item-wrap">
                            <h3 class="item-title">
                                团队名字
                                <span>（15人）</span>
                            </h3>
                            <p class="item-info">
                                这是一个简单的公司介绍
                            </p>
                        </div>
                    </template>
                    <ul class="sub-item">
                        <li v-for="i in 3" :key="i">
                            <figure>
                                <div class="img-box">
                                    <img src=""/>
                                </div>
                                <div class="info">
                                    <h3>名字</h3>
                                    <p>简单的介绍</p>
                                </div>
                            </figure>
                            <i class="arrow el-icon-arrow-right"></i>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="panel-right">
            <div class="panel-right-top">
                <div class="avatar-box">
                    <img src="" alt="" class="avatar-img">
                </div>
                <div class="text">
                    <h3 class="text-title">老张</h3>
                    <p class="text-info">研发部 - 前段工程师</p>
                </div>
            </div>
            <div class="panel-right-content">
                <ul>
                    <li>
                        <div class="icon icon-phone"></div>
                        <p class="info">12365478954</p>
                    </li>
                    <li>
                        <div class="icon icon-email"></div>
                        <p class="info">12365478954@qq.com</p>
                    </li>
                    <li>
                        <div class="icon icon-gender"></div>
                        <p class="info">男</p>
                    </li>
                    <li>
                        <div class="icon icon-slogen"></div>
                        <p class="info">slogen</p>
                    </li>
                </ul>
            </div>
            <el-button type="primary" size="medium" class="my-btn">发送信息</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContactsTeams"
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .ContactsTeams {
        display: flex;
        height: 100%;
        li {
            list-style: none;
        }
    }

    .panel-left {
        flex: .5;
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
                        padding: 0 30px;
                        border-right: 6px solid transparent;
                        cursor: pointer;
                        transition: all .3s;

                        &:hover {
                            box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);
                            border-right-color: $colorTheme;
                        }

                        .arrow {
                            position: absolute;
                            right: 24px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
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

    .panel-right {
        flex: .5;
        padding: 60px 30px 0 30px;

        .panel-right-top {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 58px;

            .avatar-box {
                margin-right: 40px;
                width: 100px;
                height: 100px;
                overflow: hidden;
                border-radius: 14px;
                background: $colorTheme;
            }

            .text {
                font-weight: 400;
                line-height: 20px;

                .text-title {
                    height: 40px;
                    font-size: 30px;
                    color: $colorText1;
                }

                .text-info {
                    height: 24px;
                    font-size: 18px;
                    color: $colorText3;
                }
            }
        }

        .panel-right-content {
            li {
                position: relative;
                padding-left: 56px;
                min-height: 36px;
                margin-bottom: 30px;
                color: $colorText2;
                font-size:16px;
                font-weight:400;
                line-height:36px;
                .icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 36px;
                    height: 36px;
                    border-radius: 12px;
                    background: $colorTheme;
                    margin-right: 20px;
                }
            }
        }

        .my-btn {
            float: right;
            background: $colorTheme;
        }
    }
</style>