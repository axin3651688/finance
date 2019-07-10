import {findThirdPartData} from "~api/interface";
import {mapGetters} from "vuex"
export default {

    computed: {
        ...mapGetters(["device", "user","showDims"])
    },

    methods: {

        /**
         * 页面上的维度展示是否
         */
        doNotShowDim(isShow){
            let _this = this;
            let _showDims = _this.showDims;
            _showDims.company= isShow;
            _showDims.month= isShow;
            _showDims.year= isShow;
        },


        /**
         * 获取当前日期
         */
        publicGetPeriodMethod() {
            let me = this,
                storeParams = me.$store.getters,
                year = storeParams.year,
                month = storeParams.month,
                period = "";
            if (month > 9) {
                period = year + "" + month;
            } else {
                period = year + "0" + month;
            }
            return period;
        },
        /**
         * 下面是树表的数据的处理方法。
         *
         * 此方法是转换树表的数据。当前切换公司的所有下级。
         */
        TreeDataFormat(data) {
            let me = this,
                storeParams = me.$store.getters,
                company = storeParams.company;
            //findroot
            let root = company,
                treeData = [],
                rootItem = {};
            rootItem = data.filter(item => {
                return item.scode === root;
            });
            data = data.filter(item => {
                return item.scode !== company;
            });
            let rootItemData = rootItem[0];
            me.recursionData(data, rootItemData);
            return rootItemData;
        },
        /**
         * 递归转换数据。
         */
        recursionData(data, rootItem) {
            let me = this,
                arr = [];
            rootItem.children = [];
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (rootItem.scode == item.spcode) {
                    if (item.sstate) {
                        me.setOperations(item);
                    }
                    rootItem.children.push(item);
                } else {
                    arr.push(item);
                }
            }

            if (rootItem.children && rootItem.children.length > 0) {
                for (let j = 0; j < rootItem.children.length; j++) {
                    let childItme = rootItem.children[j];
                    me.recursionData(arr, childItme);
                }
            }
        },


        /**
         * 获取当前时间   年月日时分秒
         * @returns {string}
         */
        getDateNowYMDHMS(data) {
            let date = data || new Date();
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },

        /**
         * 获取当前时间   年月日
         * @returns {string}
         */
        getDateNowYMD(data) {

            if(data === ''){
                return '';
            }

            if (typeof data === 'string') {
                data = data.replace(/-/g, '/');
                data = new Date(data);
            }



            let date = data || new Date();
            // if(needDataNow){
            //
            // }
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            return Y + M + D;
        },


        /**
         * 获取期间
         * @returns {string|string}
         */
        getPeriod() {
            let _this = this,
                _getter = _this.$store.getters,
                year = _getter.year,
                month = _getter.month,
                period = "";
            if (month > 9) {
                period = year + "" + month;
            } else {
                period = year + "0" + month;
            }
            return period;
        },
        /**
         * 获取期间
         * @returns {string|string}
         */
        getYear() {
            let _this = this,
                _getter = _this.$store.getters;
            return _getter.year;
        },
        /**
         * 获取期间
         * @returns {string|string}
         */
        getMonth() {
            let _this = this,
                _getter = _this.$store.getters,
                month = _getter.month;
            if (month > 9) {
                month = "" + month;
            } else {
                month = "0" + month;
            }
            return month;
        },


        /**
         * 将阿拉伯数字转成中文数字
         * @param num
         */
        numberToChineseString(num) {
            let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
            let unit = ["", "十", "百", "千", "万"];
            num = parseInt(num);
            let getWan = (temp) => {
                let strArr = temp.toString().split("").reverse();
                let newNum = "";
                for (let i = 0; i < strArr.length; i++) {
                    newNum = (i === 0 && strArr[i] === 0 ? "" : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? "" : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
                }
                return newNum;
            };
            let overWan = Math.floor(num / 10000);
            let noWan = num % 10000;
            if (noWan.toString().length < 4) noWan = "0" + noWan;
            return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
        },


        /**
         * 设置数据格式为标准格式
         * @param num
         * @param isNotNumber
         */
        setNumberToStander(num, isNotNumber) {
            if (!isNotNumber) {

                if(typeof num === 'string'){
                    if(num.indexOf(',') !== -1){
                        num = num.replace(',', '');
                    }
                }
                if (num && num !== null) {
                    num = Math.round(num * 100) / 100;
                    let str = num.toLocaleString();
                    let valueArr = str.split(".");
                    if (valueArr.length === 1) {
                        str = str + ".00";
                    }else{
                        if(valueArr[1].length === 1){
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
            } else {
                return num;
            }
        },


    },
}