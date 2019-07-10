<template>
    <div>
        <div class="top-button">
            <el-button
                    class="bq"
                    :type="this.buttonType === 'fzjyknx' ? 'primary' : ''"
                    @click="topButtonClick('fzjyknx')"
            >负债经营可能性
            </el-button>
            <el-button
                    class="lj"
                    :type="this.buttonType === 'zfnl' ? 'primary' : ''"
                    @click="topButtonClick('zfnl')"
            >支付能力
            </el-button>
            <el-button
                    class="lj"
                    :type="this.buttonType === 'ldfzbl' ? 'primary' : ''"
                    @click="topButtonClick('ldfzbl')"
            >流动/负债比率
            </el-button>
            <el-button
                    class="lj"
                    :type="this.buttonType === 'cdqlxnl' ? 'primary' : ''"
                    @click="topButtonClick('cdqlxnl')"
            >长/短期利息能力
            </el-button>
        </div>

        <div class="fzjyknx" v-if="this.buttonType === 'fzjyknx'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData1" :class="key + 'data1'">
                        <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                            <div class="cell">
                                <template v-if="item.type === 's'">
                                    <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                                </template>

                                <template v-else-if="item.type === 'c'">
                                    <cell :cellData="item"></cell>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-svg">
                    <div class="svg-first-data1">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,135 71,135 36,135 36,181 1,181, 36,181 36,271 1,271 "
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>

                    <div class="svg-second-data1">
                        <svg width="150px" height="180px">
                            <polyline points="1,1 36,1 36,46 71,46 36,46 36,91 1,91"
                                      fill="none" stroke="black"
                                      stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_1">
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

        <div class="zfnl" v-if="this.buttonType === 'zfnl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData2" :class="key + 'data2'">
                        <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                            <div class="cell">
                                <template v-if="item.type === 's'">
                                    <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                                </template>

                                <template v-else-if="item.type === 'c'">
                                    <cell :cellData="item"></cell>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-svg">
                    <div class="svg-first-data2">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,135 71,135 36,135 36,181 1,181, 36,181 36,271 1,271 "
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>

                    <div class="svg-second-data2">
                        <svg width="150px" height="200px">
                            <polyline points="1,1 36,1  36,91 1,91 71,91 36,91 36,181 1,181 "
                                      fill="none" stroke="black"
                                      stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_1">
                    <div class="title">
                        <span>资产结构状况</span>
                    </div>

                    <div class="content">
                        <div class="content-title">
                            <span>资产结构状况</span>
                        </div>
                        <p>
                            总体来看，流动资产增长快
                        </p>
                        <div class="content-title">
                            <span>资产结构状况</span>
                        </div>
                        <p>
                            总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="ldfzbl" v-if="this.buttonType === 'ldfzbl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData3" :class="key + 'data3'">
                        <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                            <div class="cell">
                                <template v-if="item.type === 's'">
                                    <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                                </template>

                                <template v-else-if="item.type === 'c'">
                                    <cell :cellData="item"></cell>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-svg">
                    <div class="svg-first-data3">
                        <svg width="150px" height="360px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 71,91 36,91  36,181 1,181"
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="content-text_2_1 content-text_2">
                    <div class="title">
                        <span>速动比率</span>
                    </div>

                    <div class="content" style="color: green">
                        <p>
                            总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                        </p>
                    </div>
                </div>
                <div class="content-text_2_2 content-text_2">
                    <div class="title">
                        <span>流动比率</span>
                    </div>

                    <div class="content" style="color: green">
                        <p>
                            总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                        </p>
                    </div>
                </div>

                <div class="content-chart content-chart-1">
                    <div class="gauge">
                        <mchart
                                :echartData="gauge_1EchartData"
                                :dataFresh="dataFresh"
                                :dataType="'gauge'">
                        </mchart>
                    </div>
                </div>

            </div>
        </div>

        <div class="cdqlxnl" v-if="this.buttonType === 'cdqlxnl'">
            <div class="content-all">
                <div class="content-cell">
                    <div v-for="(part, key, index) of allData.allData4" :class="key + 'data4'">
                        <div v-for="(item, _key, index) of part" :class="key + 'cell'">
                            <div class="cell">
                                <template v-if="item.type === 's'">
                                    <ccell :cellData="item" @cellDatachange="cellDatachange"></ccell>
                                </template>

                                <template v-else-if="item.type === 'c'">
                                    <cell :cellData="item"></cell>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-svg">
                    <div class="svg-first-data4">
                        <svg width="150px" height="540px">
                            <polyline
                                    points="1,1 36,1 36,91 1,91 36,91 36,181 1,181, 36,181 36,226 71,226 36,226 36,271,
                                            1,271 36,271 36,361 1,361 36,361 36,451 1,451"
                                    fill="none" stroke="black"
                                    stroke-width="2"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="content-text_2_1 content-text_2 content-text_3">
                    <div class="title">
                        <span>短期付息能力状况</span>
                    </div>

                    <div class="content" style="color: green">
                        <p>
                            总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                        </p>
                    </div>
                </div>
                <div class="content-text_2_2 content-text_2 content-text_4">
                    <div class="title">
                        <span>长期付息能力状况</span>
                    </div>

                    <div class="content" style="color: green">
                        <p>
                            总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高。资产结构还有改善空间
                        </p>
                    </div>
                </div>

                <div class="content-chart content-chart-2">
                    <div class="gauge">
                        <mchart
                                :echartData="gauge_2EchartData"
                                :dataFresh="dataFresh"
                                :dataType="'gauge'">
                        </mchart>
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
    import dataCalculation from '../mixin/dataCalculation'
    import mchart from './modelPublic/mchart'
    import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'

    export default {
        name: "forecastOfSolvency",
        mixins: [cwtPublicJs, dataCalculation],
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
                buttonType: 'fzjyknx',
                allData: {
                    allData1: {
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
                            }
                        }
                    },
                    allData3: {
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
                            }
                        }
                    },
                    allData4: {
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
                            },
                            cellData5: {
                                id: '001',
                                name: '财务费用',
                                value: this.setNumberToStander(1555.36)
                            },
                            cellData6: {
                                id: '001',
                                name: '资产减值损失',
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
                            }
                        }
                    },
                },

                echartData: {},
                dataFresh: false,
                gauge_1EchartData: {
                    name: '速动比率行业对标预警',
                    data: []
                },
                gauge_2EchartData: {
                    name: '已获利息倍数（倍）',
                    data: []
                },
            }
        },
        created() {
        },
        mounted() {
            this.getRealData();
        },
        methods: {
            /**
             * 单元格数据发生改变
             * @param type
             */
            topButtonClick(type) {
                this.buttonType = type;
            },
            /**
             * 获取真实数据
             */
            getRealData() {
                let _this = this;

                let _getters = _this.$store.getters,
                    company = _getters.company;

                let params = {
                    company: company,
                    period: _this.getPeriod(),
                    spcode: '3'
                };

                predictiveModel(params).then((res) => {
                    if (res.data.code === 200) {
                        _this.resDataFormatter(res.data.data);
                    }
                })
            },

            /**
             * 请求回来的数据进行格式化处理
             * @param data
             */
            resDataFormatter(data) {
                let _this = this;
                let _allData = {
                    allData1: {
                        part1: {},
                        part2: {},
                        part3: {},
                        partx: {},
                        party: {}
                    },
                    allData2: {
                        part1: {},
                        part2: {},
                        part3: {},
                        partx: {},
                        party: {}
                    },
                    allData3: {
                        part1: {},
                        part2: {},
                        partx: {},
                        party: {}
                    },
                    allData4: {
                        part1: {},
                        part2: {},
                        partx: {},
                        party: {}
                    }
                };
                let _data = {
                    data1: [],
                    data2: [],
                    data3: [],
                    data4: []
                };
                data.forEach((item) => {
                    let _sort = item['SORT'];
                    if (_sort < 2000) {
                        _data.data1.push(item);
                    } else if (_sort > 2000 && _sort < 3000) {
                        _data.data2.push(item);
                    } else if (_sort > 3000 && _sort < 4000) {
                        _data.data3.push(item);
                    } else if (_sort > 4000) {
                        _data.data4.push(item);
                    }
                });

                _data.data1.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 4) {
                            _allData.allData1.part1['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 6) {
                            _allData.allData1.part2['cellData' + _index] = item;
                        } else if (_index > 6) {
                            _allData.allData1.part3['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData1.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData1.party['cellData' + _index] = item;
                    }
                });

                _data.data2.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 4) {
                            _allData.allData2.part1['cellData' + _index] = item;
                        } else if (_index > 4 && _index <= 7) {
                            _allData.allData2.part2['cellData' + _index] = item;
                        } else if (_index > 7) {
                            _allData.allData2.part3['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData2.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData2.party['cellData' + _index] = item;
                    }
                });

                _data.data3.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 3) {
                            _allData.allData3.part1['cellData' + _index] = item;
                        } else if (_index > 3) {
                            _allData.allData3.part2['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData3.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData3.party['cellData' + _index] = item;
                    }
                });

                _data.data4.forEach((item, index) => {
                    let _index = index + 1;
                    if (item.type === 'c' || item.type === 's') {
                        if (_index <= 6) {
                            _allData.allData4.part1['cellData' + _index] = item;
                        } else if (_index > 6) {
                            _allData.allData4.part2['cellData' + _index] = item;
                        }
                    } else if (item.type === 'l') {
                        _allData.allData4.partx['cellData' + _index] = item;
                    } else if (item.type === 'fc') {
                        _allData.allData4.party['cellData' + _index] = item;
                    }
                });

                _this.allData = _allData;
                _this.initData();
            },

            /**
             * 初始化数据
             */
            initData() {
                let _this = this;
                let _data = _this.allData;
                // _this.allData = _this.dataCalculate(_data);
                for (let key in _data) {
                    _data[key] = _this.dataCalculate(_data[key]);
                }
                _this.initEchartData(_this.allData);
                _this.dataFresh = !_this.dataFresh;
            },

            /**
             * 初始化饼状图
             * @param data
             */
            initEchartData(data) {
                let _this = this;
                _this.gauge_1EchartData.data = data.allData3.partx.cellData5;
                _this.gauge_1EchartData.data = data.allData4.partx.cellData8;
            },

            /**
             * 单元格数据发生改变
             * @param params
             */
            cellDatachange(params) {
                this.dataComputed(params);
            },

            /**
             * 数据格式化
             * @param params
             */
            dataComputed(params) {
                let _this = this;
                let _nid = params.id;
                let _value = params.value;
                let _data = _this.allData;

                let _changeData = {};
                let _buttonType = _this.buttonType;

                if(_buttonType === 'fzjyknx'){
                    _changeData = _data.allData1;
                }else if(_buttonType === 'zfnl'){
                    _changeData = _data.allData2;
                }else if(_buttonType === 'ldfzbl'){
                    _changeData = _data.allData3;
                }else if(_buttonType === 'cdqlxnl'){
                    _changeData = _data.allData4;
                }

                for (let x in _changeData) {
                    let i = _changeData[x];
                    for (let y in i) {
                        let z = i[y];
                        if (z.nid === _nid) {
                            z.value = _value;
                        }
                    }
                }

                // _this.allData = _this.dataCalculate(_data);
                // for (let key in _data) {
                //     _data[key] = _this.dataCalculate(_data[key]);
                // }

                _changeData = _this.dataCalculate(_changeData);

                _this.initEchartData(_this.allData);
                _this.dataFresh = !_this.dataFresh;
            },
        }
    }
</script>

<style scoped>
    .top-button {
        margin-bottom: 20px;
    }

    .content-all {
        position: relative;
    }

    .content-cell {
        display: flex;

    }

    .part1data1, .part2data1, .part3data1, .part4data1, .part5data1, .svg-first-data1, .svg-second-data1 {
        position: absolute;
    }

    .part1data1 {
        left: 0;
    }

    .part2data1 {
        left: 300px;
        top: 90px;
    }

    .part3data1 {
        left: 600px;
        top: 50px;
    }

    .part4data1 {
        left: 900px;
    }

    .part5data1 {
        left: 1200px;
    }

    .part1data2, .part2data2, .part3data2, .part4data2, .part5data2, .svg-first-data2, .svg-second-data2 {
        position: absolute;
    }

    .part1data2 {
        left: 0;
    }

    .part2data2 {
        left: 300px;
        top: 44px;
    }

    .part3data2 {
        left: 600px;
        top: 90px;
    }

    .part4data2 {
        left: 900px;
    }

    .part5data2 {
        left: 1200px;
    }

    .part1data3, .part2data3, .svg-first-data3 {
        position: absolute;
    }

    .part1data3 {
        left: 0;
    }

    .part2data3 {
        left: 300px;
        top: 44px;
    }

    .part1data4, .part2data4, .svg-first-data4 {
        position: absolute;
    }

    .part1data4 {
        left: 0;
    }

    .part2data4 {
        left: 300px;
        top: 180px;
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

    .part5cell {
        margin-bottom: 110px;
    }

    .cell {

    }

    .svg-first-data1 {
        left: 200px;
        top: 30px
    }

    .svg-second-data1 {
        left: 500px;
        top: 120px
    }

    .svg-first-data2 {
        left: 200px;
        top: 30px
    }

    .svg-second-data2 {
        left: 500px;
        top: 76px
    }

    .svg-first-data3 {
        left: 200px;
        top: 30px
    }

    .svg-first-data4 {
        left: 200px;
        top: 30px
    }

    .content-text_1 {
        position: absolute;
        width: 300px;
        height: 250px;
        top: 50px;
        left: 900px;
        border: 2px solid #303133;
        border-radius: 10px;
        padding-top: 20px;
    }

    .content-text_1 .title {
        font-size: 22px;
        text-align: left;
        padding-left: 16px;
    }

    .content-text_1 .content {
        font-size: 18px;
        padding: 16px;
        text-indent: 36px;
        line-height: 30px;
        color: #bd2c00;
    }

    .content-text_1 .content .title {
        font-size: 18px;
        text-indent: 36px;
        line-height: 30px;
        color: #bd2c00;
    }

    .content-text_1 .content p {
        font-size: 16px;
        text-indent: 36px;
        line-height: 30px;
        color: #bd2c00;
    }

    .content-title {
        padding: 0;
        text-indent: 0;
        color: black;
    }

    .content-chart .gauge {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 0;
        left: 550px;
    }

    .content-text_2 {
        position: absolute;
        width: 300px;
        height: 70px;
        top: 44px;
        left: 500px;
        border: 1px solid #303133;
        border-radius: 10px;
        padding: 2px 8px;
    }

    .content-text_2 p {
        text-indent: 36px;
    }

    .content-text_2_1 {
        top: 134px;
    }

    .content-text_3 {
        top: 180px;
    }

    .content-text_4 {
        top: 270px;
    }

    .content-chart-1 .gauge {
        left: 830px;
        top: 0;
    }

    .content-chart-2 .gauge {
        left: 830px;
        top: 136px;
    }
</style>