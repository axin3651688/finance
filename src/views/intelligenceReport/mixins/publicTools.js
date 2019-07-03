export default {
    methods: {
        /**
         * 转换公司的树形结构。
         * @param {} data 
         */
        transformationTreeData(data) {
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
            if (rootItemData.sstate) {
                me.setOperations(rootItemData);
            }
            me.recursionData(data, rootItemData);
            return rootItemData;
        },
        /**
         * 递归转换数据。
         * @author szc 2019年5月27日09:20:29
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
         * 设置操作按钮。
         * @author szc 2019年5月27日16:02:58
         */
        setOperations(item) {
            let me = this,
                ops01 = [{
                        "id": "1",
                        "btnShow": true,
                        "text": "查看"
                    },
                    {
                        "id": "2",
                        "btnShow": true,
                        "text": "退回"
                    }
                ],
                ops02 = [{
                        "id": "0",
                        "btnShow": true,
                        "text": "批示"
                    },
                    {
                        "id": "3",
                        "btnShow": true,
                        "text": "提醒"
                    }
                ];
            if (item.sstate == "已批示") {
                item.operation = ops01;
            } else if (item.sstate == "未批示") {
                item.operation = ops02;
            }

        }
    },
}