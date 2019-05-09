<template>
    <div>
        <div class="conventional-container">
            <div class="container-title">
                一、战略风险
            </div>

            <div class="container-top">
                <div class="container-top-left">
                    <span class="left_1">
                        社会责任风险
                    </span>
                    <span class="left_2">
                        重要
                    </span>
                </div>
                <div class="container-top-right">
                    <span class="left_1">
                        {{this.reportCompanyNameShow}}
                    </span>
                    <span class="left_2">
                        识别人：{{this.discernPeople}}
                    </span>
                </div>
            </div>

            <div>
                <div class="container-center">
                    <div>
                        风险评估
                    </div>
                    <p v-for="item in this.riskContainer['risk_pg']">
                        {{item}}
                    </p>
                </div>
                <div class="container-center">
                    <div>
                        风险概述
                    </div>
                    <p v-for="item in this.riskContainer['risk_gs']">
                        {{item}}
                    </p>
                </div>
                <div class="container-center">
                    <div>
                        采取措施
                    </div>
                    <p v-for="item in this.riskContainer['risk_cs']">
                        {{item}}
                    </p>
                </div>
                <div class="container-center">
                    <div>
                        应对建议
                    </div>
                    <p v-for="item in this.riskContainer['risk_jy']">
                        {{item}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportConventional",
        components: {},
        props: {
            reportCompanyNameShow: String
        },
        data() {
            return {
                discernPeople: '***',
                riskContainer: {
                    risk_pg: [
                        '1、风险可能性为高(50-75%)，对业务和目标的影响额为500万元以下',
                        '2、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                    ],
                    risk_gs: [
                        ' 1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                    ],
                    risk_cs: [
                        ' 1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                    ],
                    risk_jy: [
                        ' 1、此风险对声誉的影响：负面消息或在行业范围内流传，被地方媒体报道、关注，对声誉造成一定损失'
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped>
    .container-title {
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        text-align: left;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        background-color: rgba(228, 228, 228, 1);
    }

    .container-top {
        display: flex;
        margin-bottom: 30px;
    }

    .container-top-left {
        margin-right: 20px;
    }

    .container-top-left .left_2 {
        background-color: rgba(255, 0, 153, 1);
    }

    .container-top-right .left_2 {
        background-color: rgba(153, 153, 153, 1);
    }

    .left_1 {
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-size: 16px;
        color: #333333;
    }

    .left_2 {
        margin-left: 20px;
        font-size: 14px;
        padding: 2px 10px;
        font-family: 'Arial Normal', 'Arial';
        border-radius: 10px;
        color: white;
    }

    .container-center div {
        font-size: 16px;
        font-family: '微软雅黑 Bold', '微软雅黑';
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .container-center p {
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-size: 16px;
        color: #333;
        padding: 5px;
    }
</style>