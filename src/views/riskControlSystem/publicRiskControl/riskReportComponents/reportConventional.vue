<template>
    <div v-if="renderFlag">
        <div class="conventional-container">
            <template v-for="(firstItem,firstIndex) in middleData">
                <div :key="firstIndex" :id="firstItem.id">
                    <div class="container-title">
                        {{ firstItem.text }}
                    </div>
                    <template v-if="firstItem.contentUp && firstItem.contentUp.content.length > 0">
                        <template v-for="(item,indexCnt) in firstItem.contentUp.content">
                            <div class="container-top" :key="indexCnt">
                                <div class="container-top-left">
                                    <span class="left_1">
                                        {{ item.responsibility.text }}
                                    </span>
                                    <span class="left_2">
                                        {{ item.responsibility.level }}
                                    </span>
                                </div>
                                <div class="container-top-right">
                                    <span class="left_1">
                                        {{ item.responsibility.company }}
                                    </span>
                                    <span class="left_2">
                                        识别人：{{ item.responsibility.identificationUser }}
                                    </span>
                                </div>
                            </div>
                            <div :key="indexCnt + 10">
                                <template v-if="item.content && item.content.length > 0">
                                    <div v-for="(itemLast,index) in item.content" :key="index">
                                        <div :key="index" class="container-center">
                                            <div>
                                                {{ itemLast.title }}
                                            </div>
                                            <template v-if="itemLast.content && itemLast.content.length > 0">
                                                <p v-for="(cntItem,cntIndex) in itemLast.content" :key="cntIndex">
                                                    {{ cntItem }}
                                                </p>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <reportControlInstruction v-if="showComponent && 
                                showComponent == 'riskControl' 
                                && firstIndex == middleData.length-1 && 
                                indexCnt == firstItem.contentUp.content.length-1" :key="indexCnt + 20" :contentDown="item.contentDown">
                            </reportControlInstruction>
                        </template>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import reportControlInstruction from './reportControlInstruction'
    export default {
        name: "reportConventional",
        components: {
            reportControlInstruction
        },
        props: {
            middleData:Array,
            showComponent:String
        },
        data() {
            return {
                renderFlag:true,
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
        watch: {
            middleData :{
                handler(newValue,oldValue){
                    // debugger;
                    let me = this;

                    // me.renderFlag = false;
                    // this.$nextTick(()=>{
                    
                    //     this.reFresh = true
                    // })
                    // this.getChange();
                },
                deep:true
            }
        },
        created() {
            let me = this;
            // debugger;
            // this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/reportText.json").then(res => {
            //     debugger;
            //     if(res.data.code == 200) {
            //         debugger;
            //         me.middleData = res.data.reportData.reportDataContent.riskFeedData[0];
            //     }
            // });
        },
        mounted() {
            let me = this;
        },
        methods: {}
    }
</script>

<style scoped>
    /* .conventional-container {

    } */
    .container-title {
        /* font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        text-align: left;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        background-color: rgba(228, 228, 228, 1); */
        width: 100%;
        background: #ddd;
        margin: 20px 0px 20px 0;
        padding: 10px 0 10px 0;
        font-size: 20px;
        font-weight: 200;
        color: #606266 ;
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
        /* font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-size: 16px;
        color: #333333; */
        font-weight: 550;
        font-size: 18px;
        color: #303133;
        font-family: '黑体';
    }

    .left_2 {
        /* margin-left: 20px;
        font-size: 14px;
        padding: 2px 10px;
        font-family: 'Arial Normal', 'Arial';
        border-radius: 10px;
        color: white; */
        font-family: '宋体';
        color: #fff;
        font-size: 14px;
        padding: 5px 30px 5px 30px;
        margin: 0 10px 0px 10px;
        border-radius: 12px;
        cursor: pointer;
    }

    .left_2:hover {
        background-color: rgba(0, 218, 236, 1);
    }

    .container-center div {
        /* font-size: 16px;
        font-family: '微软雅黑 Bold', '微软雅黑';
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px; */
        margin-bottom: 20px;
        font-weight: 550;
        font-size: 18px;
        color: #303133;
        font-family: '黑体'
    }

    .container-center p {
        /* font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-size: 16px;
        color: #333;
        padding: 5px;
        line-height: 30px; */
        color: #606266;
        margin-bottom: 20px;
        text-indent: 2em;
        line-height: 25px;
    }
</style>