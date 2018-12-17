<template>
    <div class="Todo vue-module">
        <div class="btn-group">
            <div class="btn active">未读 <span class="count">(12)</span></div>
            <div class="btn">已读</div>
        </div>
        <section>
            <div class="todo-item item-leave">
                <div class="item-top">
                    <div class="img-box">
                        <img src="" alt="">
                    </div>
                    <h3 class="title">张某的请假申请</h3>
                    <p class="datetime">
                        <span class="date">2018-12-01</span>
                        <span class="time">9:50:30</span>
                    </p>
                    <i class="status"></i>
                </div>
                <div class="content">
                    <div class="content-item first-item">
                        <div class="item-group">
                            <div class="content-item-label">请假类型：</div>
                            <div class="content-item-text">年假</div>
                        </div>
                        <div class="item-group">
                            <div class="content-item-label">请假时长：</div>
                            <div class="content-item-text">5天2.5小时</div>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="content-item-label">请假时间：</div>
                        <div class="content-item-text">
                            <span class="start-time">2018-12-01&nbsp;&nbsp;08:30</span>
                            <span class="end-time">2018-12-06&nbsp;&nbsp;10:30</span>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="content-item-label">请假理由：</div>
                        <div class="content-item-text">
                            这个人很懒没有写任何理由
                        </div>
                    </div>
                    <el-button type="primary" size="medium" class="my-btn">去审批</el-button>
                </div>
            </div>
            <div class="todo-item item-report">
                <div class="item-top">
                    <div class="img-box">
                        <img src="" alt="">
                    </div>
                    <h3 class="title">张某的请假申请</h3>
                    <p class="datetime">
                        <span class="date">2018-12-01</span>
                        <span class="time">9:50:30</span>
                    </p>
                    <i class="status"></i>
                </div>
                <div class="content">
                    <div class="content-item">
                        <div class="info">这里是详细的内容</div>
                    </div>
                    <div class="content-item">
                        <div class="content-item-label">发送人：</div>
                        <div class="content-item-text">李某某</div>
                    </div>
                    <el-button type="primary" size="medium" class="my-btn">去上报</el-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Todo"
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

    .todo-item {
        position: relative;
        padding: 10px 30px;
        margin-bottom: 20px;
        border-radius: 12px;
        background: #ffffff;
        line-height: 20px;
        font-weight: 400;

        .item-top {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .img-box {
                margin-right: 20px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: $colorTheme;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .title {
                overflow: hidden;
                margin-right: 40px;
                max-width: 300px;
                height: 21px;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
                color: $colorText1;
            }

            .datetime {
                font-size: 14px;
                color: $colorText3;
            }

            .status {
                margin-left: 20px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #EF3C3C;
            }
        }
        .content {
            .content-item.first-item {
                display: flex;
                .item-group {
                    min-width: 160px;
                }
            }
            .content-item {
                font-size:14px;
                color:$colorText2;
                line-height: 20px;
                .content-item-label {
                    float: left;
                    margin-right: 5px;
                }
                .content-item-test {

                }
            }
        }
        .my-btn {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            background: $colorTheme;
        }
    }

    .my-btn {
        float: right;
        border: none;
        background: $colorTheme;
    }
</style>