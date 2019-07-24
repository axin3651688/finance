import {predictiveModel} from '~api/cwtRiskControl/riskControlRequest'
import dataCalculation from '../mixin/dataCalculation'

const CONCLUSION = {
    assetStructurePrediction: {
        clu1: {
            color: 'black',
            //流动资产增长率>营业收入增长率,总资产报酬率>总资产报酬率的比较期
            content: '总体来看，虽流动资产增长快于主营业务收入增长，但资产的盈利能力有所提高,资产结构趋于改善。'
        },
        clu2: {
            color: 'black',
            //流动资产增长率>营业收入增长率,总资产报酬率<总资产报酬率的比较期
            content: '总体来看，流动资产增长快于主营业务收入增长，且资产的盈利能力也没有提高,资产结构趋于恶化。'
        },
        clu3: {
            color: 'black',
            //流动资产增长率<营业收入增长率,总资产报酬率>总资产报酬率的比较期
            content: '总体来看，流动资产增长慢于主营业务收入增长，并且资产的盈利能力有所提高,资产结构趋于改善。'
        },
        clu4: {
            color: 'black',
            //流动资产增长率<营业收入增长率,总资产报酬率<总资产报酬率的比较期
            content: '总体来看，虽流动资产增长慢于主营业务收入增长，但资产的盈利能力没有提高,资产结构趋于恶化。'
        },
        clu5: {
            color: 'black',
            //流动资产增长率=营业收入增长率,总资产报酬率>总资产报酬率的比较期
            content: '总体来看，流动资产与主营业务收入同比变化。但资产的盈利能力有所提高,资产结构趋于改善。'
        },
        clu6: {
            color: 'black',
            //流动资产增长率=营业收入增长率,总资产报酬率<总资产报酬率的比较期
            content: '总体来看，流动资产与主营业务收入同比变化。但资产的盈利能力没有提高,资产结构趋于恶化。'
        }

    },
    forecastOfSolvency: {
        f1: {
            s1: {
                clu1: {
                    color: 'black',
                    //付息负债的期末数=0
                    content: '本公司无付息负债，不存在负债经营风险。'
                },
                clu2: {
                    color: 'black',
                    //净利润的累计数<=0
                    content: '公司净利润为负，负债经营是否可行，取决于能否扭亏为盈。'
                },
                clu3: {
                    color: 'black',
                    //净利润的累计数>0,财务风险系数<1
                    content: '从公司当期资本结构、借款利率和盈利水平三者的关系来看，公司增加负债不会增加公司的盈利水平，相反会降低公司现在的盈利水平。'
                },
                clu4: {
                    color: 'black',
                    //净利润的累计数>0,财务风险系数>=1
                    content: '从公司当期资本结构、借款利率和盈利水平三者的关系来看，公司增加负债能够给企业带来利润的增加，负债经营可行。'
                }
            }
        },
        f2: {
            s1: {
                clu1: {
                    color: 'black',
                    //现金支付能力<=0,短期借款的期末余额>应付票据的期末余额
                    content: '从支付能力来看，日常现金支付资金比较紧张，主要依靠短期借款。'
                },
                clu2: {
                    color: 'black',
                    //现金支付能力<=0, 短期借款的期末余额<应付票据的期末余额
                    content: '从支付能力来看，日常现金支付资金比较紧张，主要依靠应付票据。'
                },
                clu3: {
                    color: 'black',
                    //else
                    content: '有现金支付能力的。'
                }
            },
            s2: {
                clu1: {
                    color: 'black',
                    //偿还流动负债的资金<(1/2*流动负债合计的期末余额
                    content: '从发展角度来看，按照当前资产的周转速度和盈利水平，公司短期债务的偿还没有充足的资金保证，需要依靠借新债还旧债。'
                },
                clu2: {
                    color: 'black',
                    //else
                    content: '从发展角度来看，按照当前资产的周转速度和盈利水平，公司有能力偿还短期借款。'
                }
            }
        },
        f3: {
            s1: {
                clu1: {
                    color: 'black',
                    //流动比率<=0.8
                    content: '当期流动比率过低，如果经营形势没有大的变化，偿还流动负债比较困难。'
                },
                clu2: {
                    color: 'black',
                    //0.8<流动比率<1.2
                    content: '流动资产处于相对较低水平，流动比率不太合理。'
                },
                clu3: {
                    color: 'black',
                    //else
                    content: '用当期流动资产偿还流动负债，没有困难，流动比率比较合理。'
                }
            },
            s2: {
                clu1: {
                    color: 'black',
                    //速动比率<=0.6
                    content: '速动资产过低，速动比率不太合理。'
                },
                clu2: {
                    color: 'black',
                    //0.6<速动比率<1
                    content: '速动资产处于相对较低水平。'
                },
                clu3: {
                    color: 'black',
                    //else
                    content: '速动资产充足，速动比率合理。'
                }
            }
        },
        f4: {
            s1: {
                clu1: {
                    color: 'black',
                    //现金支付能力<=0,短期借款期末数>应付票据期末数
                    content: '从短期来看，公司经营活动的资金主要依靠短期借款。全部偿还短期债务本息会有一定困难。'
                },
                clu2: {
                    color: 'black',
                    //现金支付能力<=0, 短期借款期末数<应付票据期末数
                    content: '从短期来看，公司经营活动的资金主要依靠应付票据。全部偿还短期债务本息会有一定困难。'
                },
                clu3: {
                    color: 'black',
                    //else
                    content: '从短期来看，公司拥有支付利息的能力。'
                }
            },
            s2: {
                clu1: {
                    color: 'black',
                    //财务费用累计数<=0
                    content: '本期财务费用为负，无法进行长期付息能力判断。'
                },
                clu2: {
                    color: 'black',
                    //财务费用累计数>0,利润总额累计数<0
                    content: '本期亏损，利息支出没有保障。'
                },
                clu3: {
                    color: 'black',
                    //财务费用累计数>0,利润总额累计数=0
                    content: '本期没有实现盈利，利息支出没有保障。'
                },
                clu4: {
                    color: 'black',
                    //财务费用累计数>0,利润总额累计数>0,利息保障倍数>=4
                    content: '从盈利情况来看，公司盈利对利息的保障倍数为"&ROUNDDOWN(利息保障倍数,1)&"倍。从实现利润和利息的关系来看，公司盈利能力较强，利息支付有保证。'
                },
                clu5: {
                    color: 'black',
                    //财务费用累计数>0,利润总额累计数>0,1<=利息保障倍数<4
                    content: '从盈利情况来看，公司盈利对利息的保障倍数为"&利息保障倍数&"倍。公司盈利能力对利息的保障程度偏低。'
                },
                clu6: {
                    color: 'black',
                    //财务费用累计数>0,利润总额累计数>0,利息保障倍数<=1
                    content: '从盈利情况来看，公司盈利对利息的保障倍数为"&利息保障倍数&"倍。公司盈利能力对利息的保障程度比较差。'
                }
            }
        },
    },
    capitalChainAndFinancingForecast: {
        f1: {
            clu1: {
                color: 'black',
                //营运资本>0
                content: '投融资活动是协调的'
            },
            clu2: {
                color: 'black',
                //else
                content: '投融资活动存在资金缺口，并需要占用流动资金为："&ROUND(ABS(营运资本),2)'
            }
        },
        f2: {
            clu1: {
                color: 'black',
                //营运资金需求<0
                content: '经营活动是协调的'
            },
            clu2: {
                color: 'black',
                //else
                content: '经营活动存在资金缺口为:"&ROUND(营运资金需求,2)'
            }
        },
        f3: {
            clu1: {
                color: 'black',
                //现金支付能力>0, 营运资金需求>0, 营运资本>0, 营运资本>营运资金需求
                content: '协调且有支付能力'
            },
            clu2: {
                color: 'black',
                //AND(现金支付能力>0,营运资金需求<0, 营运资本>0
                content: '资金大量富裕'
            },
            clu3: {
                color: 'black',
                //现金支付能力>0,营运资金需求<0, 营运资本<0, ABS(营运资本)<ABS(营运资金需求)
                content: '不协调但能够维持'
            },
            clu4: {
                color: 'black',
                //现金支付能力<0, 营运资金需求<0, 营运资本<0,ABS(营运资本)>ABS(营运资金需求)
                content: '不协调'
            },
            clu5: {
                color: 'black',
                //现金支付能力<0,营运资金需求>0,营运资本>0,营运资本<营运资金需求
                content: '协调但有支付困难'
            },
            clu6: {
                color: 'black',
                //else
                content: '严重不协调'
            }
        }
    }
};

export default {
    mixins: [dataCalculation],
    data() {
        return {
            lastYearData: ''
        }
    },
    methods: {
        getConclusion(data, type, _conclusionData) {
            let _this = this;
            let newData = _this.setDataToList(data);
            if (type === 'assetStructurePrediction') {
                //流动资产增长率=营业收入增长率,总资产报酬率<总资产报酬率的比较期
                let _a_calculateNum = {
                    ldzczcl: '',
                    yysrzzl: '',
                    zzcbcl: '',
                    snzzcbcl: ''
                };

                return _this._get_a_conclusion(data, '', type, f, s, _a_calculateNum);
            } else if (type === 'forecastOfSolvency') {
                let _f_calculateNum = {
                    f1: {
                        s1: {
                            fxfz: '56',
                            jlr: '281',
                            fxxs: '58'
                        }
                    },
                    f2: {
                        s1: {
                            xjzfnl: '66',
                            dqjd: '253',
                            yfpj: '65'
                        },
                        s2: {
                            chzj: '67',
                            fzhj: '69'
                        }
                    },
                    f3: {
                        s1: {
                            ldbl: '71'
                        },
                        s2: {
                            sdbl: '72'
                        }
                    },
                    f4: {
                        s1: {
                            xjzfnl: '66',
                            dqjd: '253',
                            yfpj: '65'
                        },
                        s2: {
                            cwfy: '51',
                            lrze: '78',
                            lxbz: '80'
                        }
                    },
                };
                _this._get_f_conclusion(newData, _f_calculateNum, _conclusionData, type);



            } else if (type === 'capitalChainAndFinancingForecast') {
                let _c_calculateNum = {
                    f1: {
                        yyzb: ''
                    },
                    f2: {
                        yyzjxq: ''
                    },
                    f3: {
                        xjzfnl: '',
                        yyzb: '',
                        yyzjxq: ''
                    }
                }

            }

        },

        _get_a_conclusion(data, lastData, type, f, s, _a_calculateNum) {
            return {
                color: 'green',
                content: '总体来看，流动资产与主营业务收入同比变化。但资产的盈利能力没有提高,资产结构趋于恶化。'
            };
        },

        _get_f_conclusion(data, _f_calculateNum, _conclusionData, type) {
            let _this = this;
            let _data = {};
            for (let k1 in _f_calculateNum) {
                let _a = _f_calculateNum[k1];
                for (let k2 in _a) {
                    let _b = _a[k2];
                    for (let k3 in _b) {
                        let _c = _b[k3];
                        let _va = data.filter((i) => {
                            return i.nid === _c;
                        });
                        _b[k3] = _va[0].value;
                    }
                }
            }
            _this._get_conclusion(_f_calculateNum, _conclusionData, type);
            debugger;
        },

        /**
         * 将数据转换成数据形式
         * @param data
         */
        setDataToList(data) {
            let arr = [];
            for (let x in data) {
                let _a = data[x];
                for (let x1 in _a) {
                    let _b = _a[x1];
                    for (let x2 in _b) {
                        arr.push(_b[x2]);
                    }
                }
            }
            return arr;
        },

        /**
         * 文字描述设置
         * @param _f_calculateNum
         * @param _conclusionData
         * @param type
         * @private
         */
        _get_conclusion(_f_calculateNum, _conclusionData, type) {
            for (let x in _f_calculateNum) {
                let _a = _f_calculateNum[x];
                for (let x1 in _a) {
                    let _b = _a[x1];
                    let __data = CONCLUSION[type][x][x1];
                    if (_b.fxfz * 1 === '0') {
                        _conclusionData[x][x1].color = __data.clu1.color;
                        _conclusionData[x][x1].content = __data.clu1.content;
                    } else if (_b.jlr * 1 <= 0) {
                        _conclusionData[x][x1].color = __data.clu2.color;
                        _conclusionData[x][x1].content = __data.clu2.content;
                    } else if (_b.jlr * 1 > 0 && _b.fxxs < 1) {
                        _conclusionData[x][x1].color = __data.clu3.color;
                        _conclusionData[x][x1].content = __data.clu3.content;
                    } else if (_b.jlr * 1 > 0 && _b.fxxs >= 1) {
                        _conclusionData[x][x1].color = __data.clu4.color;
                        _conclusionData[x][x1].content = __data.clu4.content;
                    }

                }
            }
        }


    }
}