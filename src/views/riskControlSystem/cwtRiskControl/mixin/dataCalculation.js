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
         * 数据计算
         * @param data
         */
        dataCalculate(data) {
            let _this = this;
            let needCNid = [];
            for (let key in data) {
                let _a = data[key];
                for (let _key in _a) {
                    let _b = _a[_key];
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
                    if (z.type === 's') {
                        _o[z.nid] = parseInt(z.value);
                    }
                }
            }
            return _o;
        },

        dataFormula(_c, _o) {
            let _x = 0;
            switch (_c) {
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
            }
            return _x;
        },
    }
}