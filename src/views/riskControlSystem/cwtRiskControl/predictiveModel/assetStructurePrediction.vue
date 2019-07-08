<template>
    <div>
        <div class="content-all">

            <div class="content-cell">
                <div v-for="(part, key, index) of allData" :class="key">
                    <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                        <div class="cell">
                            <cell :cellData="item" @cellDatachange="cellDatachange"></cell>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-svg">
                <div class="svg-first">
                    <svg width="150px" height="720px">
                        <polyline points="1,1 71,1 36,1 36,91 1,91 36,91 36,181 1,181, 36,181 36,271,
                        1,271 36,271 36,361 1,361 36,361 36,451 1,451 "
                                  fill="none" stroke="black"
                                  stroke-width="2"></polyline>
                    </svg>
                </div>

            </div>

            <div class="content-chart">

                <div class="gauge_1">
                    <mchart
                            :echartData="echartData"
                            :dataType="'gauge'">
                    </mchart>
                </div>

                <div class="gauge_2">
                    <mchart
                            :echartData="echartData"
                            :dataType="'gauge'">
                    </mchart>
                </div>

                <div class="pie">
                    <mchart
                            :echartData="echartData"
                            :dataType="'pie'">
                    </mchart>
                </div>

            </div>

            <div class="content-text">
                <div class="title">
                    <span>资产结构状况</span>
                </div>

                <div class="content">
                    <p>
                        总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'
    import mchart from './modelPublic/mchart'

    export default {
        name: "assetStructurePrediction",
        mixins: [cwtPublicJs],
        components: {
            cell,
            ccell,
            mchart
        },
        props: {},
        computed: {},
        watch: {},
        data() {
            return {
                allData: {
                    part1: {
                        cellData1: {
                            id: '001',
                            name: '营业收入',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '利润总额',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '财务费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '流动资产',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData5: {
                            id: '001',
                            name: '资产总计',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData6: {
                            id: '001',
                            name: '负债合计',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part2: {
                        cellData1: {
                            id: '001',
                            name: '资产负债率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '流动资产增长率（%）',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '营业收入增长率（%）',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                },
                echartData: {},
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {

            cellDatachange() {

            }
        }
    }
</script>

<style scoped>

    .content-all {
        margin-top: 50px;
        position: relative;
    }

    .content-cell {
        display: flex;

    }

    .part1, .part2, .svg-first {
        position: absolute;
    }

    .part1 {
        left: 150px;
    }

    .part2 {
        left: 450px;
    }

    .part1cell {
        margin-bottom: 20px;
    }

    .part2cell {
        margin-bottom: 20px;
    }

    .cell {

    }

    .svg-first {
        left: 350px;
        top: 30px
    }

    .content-chart .pie {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 300px;
        left: 1000px;
    }

    .content-chart .gauge_1 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 700px;
    }

    .content-chart .gauge_2 {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 1000px;
    }
    .content-text{
        position: absolute;
        width: 300px;
        height: 250px;
        top: 284px;
        left: 700px;
        border: 2px solid #303133;
        padding-top: 20px;
    }

    .content-text .title{
        font-size: 22px;
        text-align: left;
        padding-left: 16px;
    }
    .content-text .content{
        font-size: 18px;
        padding: 16px;
        text-indent:36px;
        line-height:30px;
        color: #bd2c00;
    }

</style>