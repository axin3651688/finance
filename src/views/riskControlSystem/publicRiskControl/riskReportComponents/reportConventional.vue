<template>
    <div>
        <div class="conventional-container">
            <div v-for="(rptItem,rptIndex) in middleData" :key="rptIndex">
                <div class="container-title">
                    {{ rptItem.text }}
                </div>
                <template v-if="rptItem.responsibility">
                    <div class="container-top">
                        <div class="container-top-left">
                            <span class="left_1">
                                {{ rptItem.responsibility.text }}
                            </span>
                            <span class="left_2">
                                {{ rptItem.responsibility.level }}
                            </span>
                        </div>
                        <div class="container-top-right">
                            <span class="left_1">
                                {{ rptItem.responsibility.company }}
                            </span>
                            <span class="left_2">
                                识别人：{{ rptItem.responsibility.identificationUser }}
                            </span>
                        </div>
                    </div>
                </template>
                <div>
                    <template v-if="rptItem.contentUp && rptItem.contentUp.type == 'text'">
                        <div v-for="(item,index) in rptItem.contentUp.content" :key="index">
                            <div :key="index" class="container-center">
                                <div>
                                    {{ item.title }}
                                </div>
                                <template v-if="item.content && item.content.length > 0">
                                    <p v-for="(cntItem,cntIndex) in item.content" :key="cntIndex">
                                        {{ cntItem }}
                                    </p>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-if="rptItem.contentDown && rptItem.contentDown.type == 'text'">
                        <div v-for="(item,index) in rptItem.contentDown.content" :key="index">
                            <div :key="index" class="container-center">
                                <div>
                                    {{ item.title }}
                                </div>
                                <template v-if="item.content && item.content.length > 0">
                                    <p v-for="(cntItem,cntIndex) in item.content" :key="cntIndex">
                                        {{ cntItem }}
                                    </p>
                                </template>
                            </div>
                        </div>
                    </template>
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
            reportCompanyNameShow: String,
            middleData:Array
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
            let me = this;
            this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/reportText.json").then(res => {
                debugger;
                if(res.data.code == 200) {
                    debugger;
                    me.middleData = res.data.reportDataContent.riskFeedData;
                }
            });
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