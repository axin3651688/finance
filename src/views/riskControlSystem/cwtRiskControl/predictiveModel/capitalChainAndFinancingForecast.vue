<template>
    <div>
        <div class="content-all">


            <div class="content-cell">

                <div v-for="(part, key, index) of allData1" :class="key + 'text'">
                    <div v-for="(item, _key, index) of part" :class="key + 'textinner'">
                        <span>{{item.name}}</span>
                    </div>
                </div>


                <div v-for="(part, key, index) of allData2" :class="key">
                    <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                        <div class="cell">
                            <cell :cellData="item" @cellDatachange="cellDatachange"></cell>
                        </div>
                    </div>
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
        name: "capitalChainAndFinancingForecast",
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
                allData1: {
                    part1: {
                        cellData1: {
                            name: '结构性资产项',
                        },
                        cellData2: {
                            name: '结构性负债项',
                        },
                        cellData3: {
                            name: '经营性资产项',
                        },
                        cellData4: {
                            name: '经营性负债项',
                        }
                    }
                },
                allData2: {
                    part1: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '管理费用',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part2: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '管理费用',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part3: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '管理费用',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part4: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData3: {
                            id: '001',
                            name: '销售费用',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData4: {
                            id: '001',
                            name: '管理费用',
                            value: this.setNumberToStander(1555.36)
                        }
                    },
                    part5: {
                        cellData1: {
                            id: '001',
                            name: '毛利',
                            value: this.setNumberToStander(1555.36)
                        },
                        cellData2: {
                            id: '001',
                            name: '营业税金及附加',
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
            /**
             * 单元格数据发生改变
             * @param params
             */
            cellDatachange(params) {
                this.cellData.value = params.value;
                this.dataComputed(params.value);
            },
        }
    }
</script>

<style scoped>

    .content-all {
        position: relative;
        margin-top: 50px;
    }

    .content-cell {
        display: flex;

    }

    .part1, .part2, .part3, .part4, .part5 {
        position: absolute;
    }

    .part1text {

    }

    .part1textinner {
        height: 70px;
        width: 170px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .part1textinner span {
        display: block;
        font-size: 20px;
        color: green;
    }

    .part1 {
        left: 160px;
    }

    .part2 {
        left: 370px;
    }

    .part3 {
        left: 580px;
    }

    .part4 {
        left: 790px;
    }
    .part5 {
        left: 1000px;
    }

    .part1cell {
        margin-bottom: 20px;
    }

    .part2cell {
        margin-bottom: 20px;
    }

    .part3cell {
        margin-bottom: 20px;
    }

    .part4cell {
        margin-bottom: 20px;
    }

    .cell {

    }

</style>