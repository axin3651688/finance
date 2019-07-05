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
        </div>
    </div>
</template>

<script>
    import cell from './modelPublic/cell'
    import ccell from './modelPublic/ccell'
    import cwtPublicJs from '../mixin/cwtPublicJS'

    export default {
        name: "assetStructurePrediction",
        mixins: [cwtPublicJs],
        components: {
            cell,
            ccell
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
                }
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
        left: 250px;
    }

    .part2 {
        left: 550px;
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
        left: 450px;
        top: 30px
    }

</style>