/**
 * 上市企业
 */
export default {
    methods: {
        /**
         * 生成多表头数据。
         */
        createMoreHeader() {
            debugger;
            let me = this,
                year = me.$store.getters.year,
                manyColumns = [],
                yearValue = me.yearValue,
                monthValue = me.monthValue,
                indicatorNames = me.indicatorNames,
                indicatorOptions = me.indicatorOptions;
            let objHead = {
                id: "comsname",
                type: "string",
                text: "公司",
                align: "center"
            };
            manyColumns.push(objHead);
            let objHead02 = {
                id: "year",
                type: "string",
                text: (yearValue ? yearValue : year) + "年",
                align: "center"
            };
            let monthObjs = [{
                    id: "01",
                    text: "一月"
                },
                {
                    id: "02",
                    text: "二月"
                },
                {
                    id: "03",
                    text: "三月"
                },
                {
                    id: "04",
                    text: "四月"
                },
                {
                    id: "05",
                    text: "五月"
                },
                {
                    id: "06",
                    text: "六月"
                },
                {
                    id: "07",
                    text: "七月"
                },
                {
                    id: "08",
                    text: "八月"
                },
                {
                    id: "09",
                    text: "九月"
                },
                {
                    id: "10",
                    text: "十月"
                },
                {
                    id: "11",
                    text: "十一月"
                },
                {
                    id: "12",
                    text: "十二月"
                },
                {
                    id: "Q1",
                    text: "第一季度",
                    type: "q1"
                },
                {
                    id: "Q2",
                    text: "第二季度",
                    type: "q2"
                },
                {
                    id: "Q3",
                    text: "第三季度",
                    type: "q3"
                },
                {
                    id: "Q4",
                    text: "第四季度",
                    type: "q4"
                },
                {
                    id: "N",
                    text: "年度",
                    type: "q1"
                }
            ];
            monthValue.forEach(item => {
                let obj = {
                    id: "",
                    type: "string",
                    text: "",
                    align: "center"
                };
                indicatorNames.forEach(it => {
                    let objTwo = {
                        id: "",
                        type: "string",
                        text: "",
                        align: "right"
                    };
                    for (let j = 0; j < indicatorOptions.length; j++) {
                        let itTwo = indicatorOptions[j];
                        if (it == itTwo.scode) {
                            if (typeof(item - 0) == 'number') {
                                objTwo.id = 'm' + (item - 0) + '_' + it;
                                objTwo.text = itTwo.sname;
                                objTwo.type = 'number';
                            } else {
                                let itemNew = item.replace(item[0], item[0].toLowerCase());
                                objTwo.id = itemNew + '_' + it;
                                objTwo.text = itTwo.sname;
                            }
                            break;
                        }
                    }
                    if (!obj.children) {
                        obj.children = [];
                    }
                    obj.children.push(objTwo);
                });
                //把第一个数据放到最后
                if (obj.children && obj.children.length > 1) {
                    let dele_value = obj.children[obj.children.length - 1];
                    obj.children.splice(obj.children.length - 1, 1);
                    obj.children.unshift(dele_value);
                    // obj.children.push(dele_value);
                }
                for (let i = 0; i < monthObjs.length; i++) {
                    let itemMon = monthObjs[i];
                    if (item == itemMon.id) {
                        obj.id = itemMon.id;
                        obj.text = itemMon.text;
                        break;
                    }
                }
                if (!objHead02.children) {
                    objHead02.children = [];
                }
                objHead02.children.push(obj);
            });
            if (objHead02.children && objHead02.children.length > 1) {
                let dele_value = objHead02.children[objHead02.children.length - 1];
                objHead02.children.splice(objHead02.children.length - 1, 1);
                objHead02.children.unshift(dele_value);
            }
            manyColumns.push(objHead02);
            me.manyColumns = [];
            if (manyColumns && manyColumns.length > 1) {
                let dele_value = manyColumns.shift();
                manyColumns.push(dele_value);
            }
            me.manyColumns = manyColumns;
            console.log(manyColumns);
        }
    },
}