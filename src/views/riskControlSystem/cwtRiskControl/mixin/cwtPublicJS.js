import { findThirdPartData } from "~api/interface";

export default {
    methods: {
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
                return item.scode == root;
            });
            data = data.filter(item => {
                return item.scode != company;
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
    },
}