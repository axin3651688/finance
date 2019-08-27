/**
 * 上市企业
 */
export default {
    methods: {
        /**
         * 根据一个属性排序。
         */
        sortByProp(datas, prop, num) {
            datas.sort(function(a, b) {
                if (a[prop] > b[prop]) {
                    return num;
                } else if (a[prop] < b[prop]) {
                    return -num;
                } else {
                    return 0;
                }
            });
        },
        /**
         * 生成多表头数据。
         */
        createMoreHeader() {
            let me = this,
                year = me.$store.getters.year,
                manyColumns = [],
                yearValue = me.yearValue,
                monthValue = me.monthValue.sort(),
                indicatorNames = me.indicatorNames,
                indicatorOptions = me.allIndicatorOptions;
            let objHead = {
                id: "comsname",
                type: "string",
                minWidth: "300",
                text: "公司"
            };
            manyColumns.push(objHead);
            let objHead02 = {
                id: "year",
                type: "string",
                text: yearValue ? yearValue + "年" : "",
                align: "center"
            };
            let monthObjs = [{
                    id: "01",
                    text: "1月"
                },
                {
                    id: "02",
                    text: "2月"
                },
                {
                    id: "03",
                    text: "3月"
                },
                {
                    id: "04",
                    text: "4月"
                },
                {
                    id: "05",
                    text: "5月"
                },
                {
                    id: "06",
                    text: "6月"
                },
                {
                    id: "07",
                    text: "7月"
                },
                {
                    id: "08",
                    text: "8月"
                },
                {
                    id: "09",
                    text: "9月"
                },
                {
                    id: "10",
                    text: "10月"
                },
                {
                    id: "11",
                    text: "11月"
                },
                {
                    id: "12",
                    text: "12月"
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
                        minWidth: "200",
                        align: "right"
                    };
                    for (let j = 0; j < indicatorOptions.length; j++) {
                        let itTwo = indicatorOptions[j];
                        if (it == itTwo.scode) {
                            if (typeof(item - 0) == 'number') {
                                objTwo.id = 'm' + (item - 0) + '_' + it;
                                objTwo.text = itTwo.sname;
                                objTwo.type = 'number';
                                //添加一个表头的宽度。
                                // if (objTwo.text) {
                                //     objTwo.width = (objTwo.text.length * 30) + 4;
                                // }
                            } else {
                                let itemNew = item.replace(item[0], item[0].toLowerCase());
                                objTwo.id = itemNew + '_' + it;
                                objTwo.text = itTwo.sname;
                                //添加一个表头的宽度。
                                // if (objTwo.text) {
                                //     objTwo.width = (objTwo.text.length * 30) + 4;
                                // }
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
        },
        /**
         * 三点的模态框弹出事件。
         */
        pointsEventHandler(sign) {
            let me = this;
            me.dialogTableVisible = true;
            me.submitSign = sign;
            if (sign == 'list') {
                me.tableData = me.afterCompanyipo;
                me.titleName = "公司选择";
            } else if (sign == 'indicator') {
                me.tableData = me.afterIndicators;
                me.titleName = "指标选择";
            }
        },
        /**
         * 选择的改变
         * @param {*} val 
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.multipleSelection = val;
        },
        /**
         * 弹出框的提交事件。
         */
        submitClick() {
            let me = this,
                submitSign = me.submitSign;
            if (submitSign == 'list') {
                me.listedCompany = me.deepCopy(me.listedCompanyList);
                me.multipleSelection.forEach(item => {
                    me.listedCompany.push(item.scode);
                });
            } else if (submitSign == 'indicator') {
                me.indicatorNames = me.deepCopy(me.indicatorNamesLeft);
                me.multipleSelection.forEach(item => {
                    // let flag = true;
                    // for (let i = 0; i < me.indicatorNames.length; i++) {
                    //     let it = me.indicatorNames[i];
                    //     if (it == item) {
                    //         flag = false;
                    //         break;
                    //     }
                    //     // me.indicatorNames.push(item.scode);
                    // }
                    // if (flag) {
                    //     me.indicatorNames.push(item.scode);
                    // }
                    me.indicatorNames.push(item.scode);
                });
            }
            me.dialogTableVisible = false;
        },
        /**
         * 选择框的改变事件。
         */
        changeSelect(sign) {
            let me = this;
            if (sign == 'list') {
                me.listedCompany = me.deepCopy(me.listedCompanyList);
                me.multipleSelection.forEach(item => {
                    me.listedCompany.push(item.scode);
                });
            } else if (sign == 'indicator') {
                me.indicatorNames = me.deepCopy(me.indicatorNamesLeft);
                me.multipleSelection.forEach(item => {
                    me.indicatorNames.push(item.scode);
                });
            }
        },
        /**
         * 重置按钮事件。2019年8月20日15:45:05
         */
        resetBtnHandler() {
            this.listedCompany = [];
            this.listedCompanyList = [];
            this.indicatorNames = [];
            this.indicatorNamesLeft = [];
            this.multipleSelection = [];
            this.monthValue = [];
            //消除弹出层的选中的数据
            this.$refs.multipleTable.clearSelection();
            //如果年份存在，就消除样式。
            if (this.yearValue) {
                this.removeYearClass(this.yearValue);
            }
            this.yearValue = "";
        },
        /**
         * 移除年的样式。
         */
        removeYearClass(yearValue) {
            let me = this;
            let classNameSelect = me.$refs['select_' + yearValue][0].$el.className;
            if (classNameSelect.indexOf('select_class') != -1) {
                classNameSelect = classNameSelect.replace('select_class', '');
                me.$refs['select_' + yearValue][0].$el.className = classNameSelect;
            }
        },
        /**
         * 深拷贝。
         * @param {*} obj 
         */
        deepCopy(obj) { //深拷贝
            let result = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] == null) {
                        result[key] = null;
                    } else if (obj[key] == undefined) {
                        result[key] = undefined;
                    } else if (typeof obj[key] === 'object') {
                        result[key] = this.deepCopy(obj[key]); //递归复制
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
    },
}