<template>
    <div class="GroupHelper vue-module">
        <div class="btn-group">
            <div class="btn active">未读 <span class="count">(10)</span></div>
            <div class="btn">已读</div>
        </div>
        <section>
            <div class="list-item" v-for="i in 2" :key="i">
                <div class="item-left">
                    <div>
                        <div class="img-box"><img src="" alt=""></div>
                    </div>
                    <h3 class="title">张某申请加入：公司群</h3>
                    <span class="datetime">2018-12-16&nbsp;&nbsp;08:26</span>
                    <div class="text">
                        <span>理由：</span>
                        没有写理由
                    </div>
                </div>
                <div class="item-right">
                    <div class="btns">
                        <el-button type="primary" size="small" class="my-btn my-btn-primary">同意</el-button>
                        <el-button type="primary" size="small" class="my-btn my-btn-default">拒绝</el-button>
                    </div>
                </div>
            </div>
            <div class="list-item">
                <div class="item-left">
                    <div>
                        <div class="img-box"><img src="" alt=""></div>
                    </div>
                    <h3 class="title">李某申请加入：公司群</h3>
                    <span class="datetime">2018-12-16&nbsp;&nbsp;08:26</span>
                    <div class="text">
                        <span>理由：</span>
                        李某申请添加你为好友
                    </div>
                </div>
                <div class="item-right">
                    <span>已同意</span>
                </div>
            </div>
            <div class="list-item">
                <div class="item-left">
                    <div>
                        <div class="img-box"><img src="" alt=""></div>
                    </div>
                    <h3 class="title">赵某退出：公司群</h3>
                    <span class="datetime">2018-12-16&nbsp;&nbsp;08:26</span>
                    <div class="text">
                        <!--<span>理由：</span>-->
                    </div>
                </div>
                <div class="item-right">
                    <span></span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "GroupHelper"
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .vue-module {
        margin: 40px 40px 0 40px;
        height: 100%;
    }

    .btn-group {
        display: inline-block;
        margin-bottom: 32px;
        $btnHeight: 24px;
        border-radius: $btnHeight / 2;
        overflow: hidden;

        .btn {
            display: inline-block;
            line-height: $btnHeight;
            padding: 0 36px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.20);
            background: rgba(0, 0, 0, .1);
            cursor: pointer;
        }

        .btn.active {
            background: $colorTheme;
            color: #ffffff;
        }
    }

    .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 16px 30px;
        border-radius: 12px;
        background: #ffffff;
        .item-left {
            display: flex;
            align-items: center;
            font-weight:400;
            .img-box{
                width: 48px;
                height: 48px;
                background: $colorTheme;
                margin-right: 20px;
                border-radius: 50%;
                img {
                    width: 48px;
                    height: 48px;
                }
            }
            .title {
                margin-right: 30px;
                font-size:16px;
                color:$colorText1;
            }
            .datetime {
                margin-right: 30px;
                font-size: 14px;
                color: $colorText3;
            }
            .text {
                overflow: hidden;
                width: 342px;
                height: 41px;
                line-height: 20px;
                font-size: 16px;
            }
        }
        .item-right {
            text-align: center;
            min-width: 128px;
        }
    }

    .my-btn {
        border-radius: 8px;
        border: none;
    }
    .my-btn+.my-btn {
        margin-left: 20px;
    }
    .my-btn-primary {
        background: $colorTheme;
    }
    .my-btn-default {
        background:rgba(196,196,196,1);
    }
</style>