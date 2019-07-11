import {mapGetters} from "vuex"


export default {
    computed: {
        ...mapGetters(["device", "user", "showDims"])
    },

    methods: {

        /**
         * 设置数据格式为标准格式
         * @param num
         */
        numberFormatter(num) {
            if (typeof num === 'string') {
                if (num.indexOf(',') !== -1) {
                    num = num.replace(',', '');
                }
            }
            if (num && num !== null) {
                num = Math.round(num * 100) / 100;
                let str = num.toLocaleString();
                let valueArr = str.split(".");
                if (valueArr.length === 1) {
                    str = str + ".00";
                } else {
                    if (valueArr[1].length === 1) {
                        valueArr[1] = valueArr[1] + '0';
                        str = valueArr[0] + '.' + valueArr[1]
                    }
                }
                return str;
            } else if (num === 0) {
                return '0.00';
            } else {
                return "";
            }
        },
        /**
         * 获取期间
         * @returns {string|string}
         */
        getMonth() {
            let _this = this,
                _getter = _this.$store.getters;
            return _getter.month;
        },


        /**
         * 数据计算
         * @param data
         * @param type
         */
        dataCalculate(data, type) {
            let _this = this;
            let needCNid = [];
            for (let key in data) {
                let _a = data[key];
                for (let _key in _a) {
                    let _b = _a[_key];
                    if (type && type === 'lj') {
                        _b.nid = parseInt(_b.nid) - 81 + '';
                    }
                    if (_a[_key].type !== 's') {
                        needCNid.push(_b.nid);
                    }
                }
            }
            let _singleData = _this.getSingleData(data);
            return _this.dataFormatter(data, needCNid, _singleData);
        },


        /**
         * 数据计算
         * @param _a
         * @param _b
         * @param _o
         */
        dataFormatter(_a, _b, _o) {
            let _this = this;
            let i = _a;
            _b.forEach((_c) => {
                for (let key in i) {
                    let _data = i[key];
                    for (let _key in _data) {
                        let __data = _data[_key];
                        if (__data.nid === _c) {
                            let _n = _this.dataFormula(_c, _o);
                            __data.value = _this.numberFormatter(_n);
                        }
                    }
                }
            });
            return i;
        },

        getSingleData(_a) {
            let _o = {};
            for (let x in _a) {
                let i = _a[x];
                for (let y in i) {
                    let z = i[y];
                    if (z.type === 's' || z.type === 'fc') {
                        _o[z.nid] = parseInt(z.value);
                    }
                }
            }
            return _o;
        },

        dataFormula(_c, _o) {
            let _x = 0;
            switch (_c) {
                /**
                 * 第一个
                 */
                case '102':
                    //毛利
                    _x = _o['100'] - _o['101'];
                    break;
                case '110':
                    //营业利润
                    let _cbfy = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    _x = _o['100'] + _o['108'] + _o['109'] - _cbfy - _o['107'];
                    break;
                case '113':
                    //三费率（%）
                    _x = (_o['104'] + _o['105'] + _o['106']) / _o['100'] * 100;
                    break;
                case '114':
                    //营业利润率（%）
                    let _cbfy1 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    let _yylr = _o['100'] + _o['108'] + _o['109'] - _cbfy1 - _o['107'];
                    _x = _yylr / _o['100'] * 100;
                    break;
                case '115':
                    //利润总额
                    let _cbfy2 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    _x = _o['100'] + _o['108'] + _o['109'] + _o['111'] - _o['112'] - _cbfy2 - _o['107'];
                    break;
                case '118':
                    //成本费用总额
                    _x = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    break;
                case '119':
                    //销售净利率（%）
                    let _cbfy4 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    let lrze1 = _o['100'] + _o['108'] + _o['109'] + _o['111'] - _o['112'] - _cbfy4 - _o['116'];
                    let jlr = lrze1 - _o['107'];
                    _x = jlr / _o['100'] * 100;
                    break;
                case '120':
                    //净利润
                    let _cbfy3 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    let lrze = _o['100'] + _o['108'] + _o['109'] + _o['111'] - _o['112'] - _cbfy3 - _o['116'];
                    _x = lrze - _o['107'];
                    break;
                case '121':
                    //归属母公司净利润
                    let _cbfy5 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    let lrze2 = _o['100'] + _o['108'] + _o['109'] + _o['111'] - _o['112'] - _cbfy5 - _o['116'];
                    let jlr1 = lrze2 - _o['107'];
                    _x = jlr1 - _o['117'];
                    break;
                case '122':
                    //成本费用利润率（%）
                    let _cbfy6 = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    let lrze3 = _o['100'] + _o['108'] + _o['109'] + _o['111'] - _o['112'] - _cbfy6 - _o['107'];
                    let cbfy = _o['101'] + _o['103'] + _o['104'] + _o['105'] + _o['106'];
                    _x = lrze3 / cbfy * 100;
                    break;

                /**
                 * 第二个
                 */

                case '25':
                    //资产负债率
                    _x = _o['24'] / _o['23'] * 100;
                    break;
                case '26':
                    //流动资产增长率
                    _x = (_o['20'] - _o['204']) / _o['204'] * 100;
                    break;
                case '27':
                    //营业收入增长率
                    _x = (_o['22'] - _o['205']) / _o['205'] * 100;
                    break;
                case '28':
                    //总资产报酬率
                    _x = (_o['21'] + _o['206']) / ((_o['23'] + _o['207']) / 2) * 100;
                    break;
                case '29':
                    //总资产增长率
                    _x = (_o['23'] - _o['207']) / _o['207'] * 100;
                    break;


                /**
                 * 第三个
                 */
                case '56':
                    //付息负债
                    _x = _o['52'] + _o['53'] + _o['54'];
                    break;
                case '57':
                    //实际借款利率（%）
                    // _/((_+(_+_+_))/2)*100

                    let fxfz = _o['52'] + _o['53'] + _o['54'];
                    _x = _o['51'] / ((fxfz + (_o['208'] + _o['209'] + _o['210'])) / 2) * 100;
                    break;
                case '58':
                    //财务风险系数
                    // (1+_/_)*(1-(_/(_+_)))
                    let fxfz1 = _o['52'] + _o['53'] + _o['54'];
                    _x = (1 + fxfz1 / _o['55']) * (1 - (_o['51'] / (_o['51'] + _o['50'])));
                    break;


                case '66':
                    //现金支付能力
                    _x = (_o['62'] + _o['63'] + _o['64']) - (_o['61'] + _o['65']);
                    break;
                case '67':
                    // 1 + (营业利润 / ((年初流动资产 + 年末流动资产) / 2)) / 流动资产合计
                    // (营业收入/当前月份)/((年初流动资产合计+流动资产合计)/2)
                    // 年初流动资产合计*()^()
                    let _month = this.getMonth();
                    let _aa = 0;
                    let _bb = 0;

                    _aa = 1 + (_o['60'] / ((_o['211'] + _o['212']) / 2)) / _o['212'];
                    _bb = (_o['59'] / _month) / ((_o['211'] + _o['212']) / 2);
                    let _cc = Math.pow(_aa, _bb);
                    //偿还负债支付的现金
                    _x = _o['211'] * _cc;
                    break;


                case '71':
                    //流动比率（%）
                    _x = _o['68'] / _o['69'] * 100;
                    break;
                case '72':
                    //速动比率（%）
                    _x = (_o['68'] - _o['70']) / _o['69'] * 100;
                    break;
                case '251':
                    //速动比率（%）
                    _x = (_o['68'] - _o['70']) / _o['69'] * 100;
                    break;


                case '79':
                    //现金支付能力
                    _x = (_o['73'] + _o['74'] + _o['75']) - (_o['253'] + _o['76']);
                    break;
                case '80':
                    //已获利息倍速（倍）
                    _x = (_o['78'] + _o['77']) / _o['77'];
                    break;
                case '252':
                    //已获利息倍速（倍）
                    _x = (_o['78'] + _o['77']) / _o['77'];
                    break;


                /**
                 * 第四个
                 */
                case '123':
                    //净资产收益率(%)

                    let zchj2 = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'];
                    let zzcjlv = _o['172'] / ((_o['165'] + zchj2) / 2) * 100;
                    let qycs = 1 / (1 - (((_o['261'] + _o['266']) / 2) / ((_o['165'] + zchj2) / 2)));
                    _x = zzcjlv * qycs;
                    break;
                case '124':
                    //总资产净利率(%)

                    let zchj1 = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'];

                    _x = _o['172'] / ((_o['165'] + zchj1) / 2) * 100;
                    break;
                case '125':
                    //权益乘数
                    // 1/(1-(((_+_)/2)/((_+_)/2)))

                    let zchj = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'];
                    _x = 1 / (1 - (((_o['261'] + _o['266']) / 2) / ((_o['165'] + zchj) / 2)));
                    break;
                case '126':
                    //销售净利率(%)
                    _x = (_o['172'] / _o['170']) * 100;
                    break;
                case '127':
                    //总资产周转率(次)
                    let zczj = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'] + _o['165'];
                    _x = _o['132'] / (zczj / 2);
                    break;
                case '128':
                    //税后净利润
                    _x = _o['132'] - _o['146'] - _o['151'] - _o['147'] - _o['148'] - _o['150'] - _o['167'] + _o['168'] + _o['169'] + _o['170'] - _o['171'] - _o['134'];
                    break;
                case '129':
                    //营业收入
                    _x = _o['132'];
                    break;
                case '130':
                    //营业收入
                    _x = _o['132'];
                    break;
                case '131':
                    //资产总计
                    let ldzc = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'];
                    _x = ldzc + _o['149'];
                    break;
                case '133':
                    //成本费用总额
                    _x = _o['146'] + _o['151'] + _o['147'] + _o['148'] + _o['150'];
                    break;
                case '135':
                    //非流动资产
                    _x = _o['149'];
                    break;
                case '136':
                    //流动资产
                    _x = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'];
                    break;
                case '137':
                    //营业成本
                    _x = _o['146'];
                    break;
                case '138':
                    //销售费用
                    _x = _o['147'];
                    break;
                case '139':
                    //管理费用
                    _x = _o['148'];
                    break;
                case '140':
                    //财务费用
                    _x = _o['150'];
                    break;
                case '141':
                    //营业税金及附加
                    _x = _o['151'];
                    break;
                case '142':
                    //货币资金
                    _x = _o['152'];
                    break;
                case '143':
                    //应收账款
                    _x = _o['153'];
                    break;
                case '144':
                    //存货
                    _x = _o['155'];
                    break;
                case '145':
                    //其他应收款
                    _x = _o['154'];
                    break;
                case '156':
                    //净资产收益率(%)
                    let zchj3 = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'];
                    let zzcjlv1 = _o['172'] / ((_o['165'] + zchj3) / 2) * 100;
                    let qycs1 = 1 / (1 - (((_o['261'] + _o['266']) / 2) / ((_o['165'] + zchj3) / 2)));
                    _x = zzcjlv1 * qycs1;
                    break;
                case '157':
                    //总资产周转率(次)
                    let zczj1 = _o['152'] + _o['158'] + _o['159'] + _o['153'] + _o['160'] + _o['161'] + _o['162'] + _o['154'] + _o['155'] + _o['163'] + _o['164'] + _o['149'] + _o['165'];
                    _x = _o['132'] / (zczj1 / 2);
                    break;




                /**
                 * 第五个
                 */
                case '0':
                    //总资产周转率(次)
                    _x = (_o['78'] + _o['77']) / _o['77'];
                    break;

            }

            _x = typeof _x === 'number' ? _x : 0;

            return _x;
        },
    }
}