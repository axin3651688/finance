/**
 * event事件公共处理
 * type[
 *    click,dbclick,rowclick,cellclick,menucontextclick
 * ]
*    listeners:[{
        "type":"click",
        "way":"addTab",
        "handler":($vue,params)=>{
            console.info(params);
                 
        }
  }]
 */
import {
    findDesignSource
} from "~api/interface";
export default {
    mounted() {
        let me = this;
        let xtype = me.item && me.item.xtype;
        if (me.item && me.item.listeners) {
            // debugger;
            me.item.listeners.forEach(listener => {
                if (listener.type) {
                    if (xtype === "chart" || xtype === "bi-chart") {
                        this.chartEventHandler(listener);
                    } else if (xtype === "table" || xtype === "bi-table") {

                    } else if (xtype === "text" || xtype === "bi-text") {

                    } else if (xtype === "form" || xtype === "tree-grid") {
                        this.tableEventHandler(listener)
                    } else if (xtype === "column" || xtype === "HandsonTable") {
                        this.tableEventHandler(listener)
                    }
                } else {
                    console.error("没有为事件对象配制type属性，" + me.item.text);
                }

            });
        }
    },
    methods: {
        /**
         * 事件通用处理
         */
        commonHandler(listener, params, bb) {
            let me = this;
            //添加tab之前的回调，在之前你想干啥，写在这里。
            let flag = false;
            if (listener[listener.way + "Before"]) {
                // if (bb == "") {
                //     bb = {};
                // }
                flag = listener[listener.way + "Before"](me, params, listener, bb);
                if (flag) {
                    this.plateSelect = { showDialog: true };
                    this.$store.modalParams = {
                        listener: listener,
                        params: params,
                        bb: bb
                    }
                    return;
                }
            }
            if (listener.way && me[listener.way]) {
                me[listener.way](params, listener, bb);
            }
            if (listener.handler) {
                listener.handler(me, params);
            } else {
                console.log("没有设置回调函数，你真的不想干点什么了吗：", listener);
            }
        },

        /**
         * 图形事件处理
         */
        chartEventHandler(listener) {
            // debugger;
            let me = this,
                tabTitleObj = "";
            this.$children[0].chart.on(listener.type, function(params) {
                if (listener.clickBefore && typeof listener.clickBefore == "function") {
                    listener = listener.clickBefore(listener, me, params);
                };
                //处理tab的标题。
                if (listener && listener.textObj) {
                    tabTitleObj = listener.textObj;
                    delete listener.textObj;
                };
                //标记chart图的某一个不能钻取。
                if (listener.drillChartNo) {
                    return;
                };
                /**
                 * 暂时干掉， 回头再调   zdk说的 2018-12-28 21:01:58
                 */
                me.commonHandler(listener, params, tabTitleObj);

            });

        },
        /**
         * 表格事件处理
         */
        tableEventHandler(listener) {
            // let me = this;
            // this.$children[0].chart.on(listener.type,function(params){
            //    
            //    me.commonHandler(listener,params);
            // })
        },

        /**
         * 文字事件处理
         */
        textEventHandler() {

        },
        /**
         * tab页的自定义名字。
         */
        parseNameOfTab(text, customs) {
            let me = this;
            if (customs.position == "before") {
                text = customs.text + text;

            } else if (customs.position == "after") {
                text = text + customs.text;
            } else {
                console.log("名称有可能已重复了，程序有可能已经报错！");
                text = text;
            }
            return text;
        },
        /**
         * 增加到tab的动作  openDilog  openWindow
         * unshift()方法是向数组的开头添加一个或多个元素
         */
        addTab(params, listener, bb) {
            // debugger;
            let module = this.$parent.$parent.$parent.$parent.items ? this.$parent.$parent.$parent.$parent : this.$parent.$parent.$parent.$parent.$parent.$parent;
            //判断指标分析的穿透
            if (!module.items) {
                module = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent;
            }
            if(!module.items){
                module = this.$parent.$parent.$parent.$parent.$parent;
            }
            //let tab = this.$root.$children[0].$children[0].$children[1].$children[0].$children[0].$children[0];
            // let module = tab.$parent.$parent;
            if (!bb) {
                bb = this.item;
            }
            // let text = "";
            //公司的钻取tab页名称自定义。
            // if (bb && bb.way == "joint" && text) {

            // }
            // debugger;
            let text = bb.text;
            if (bb && bb.way == "joint" && text) {
                text = this.item.text;
            }
            if (text) {
                let index = text.indexOf("（%");
                let index2 = text.indexOf("（万");
                if (index != -1) {
                    text = text.substring(0, index)
                } else if (index2 != -1) {
                    text = text.substring(0, index2)
                }
            }
            //是不是要拼接的字段名，自定义的tab名称。
            if (bb && bb.way == "joint" && text) {
                text = this.parseNameOfTab(text, bb);
            }
            // debugger;
            module.items = module.items.filter(tab => tab.text != text);
            let arrs = module.items.filter(bean => bean.text == text);
            if (arrs.length > 0) {
                // module.items = module.items.filter(tab => tab.text !=text);
                // if ($vue.items && $vue.items.length > 1) {
                //   $vue.activeTabName = $vue.items[0].text;
                // } else {
                //   $vue.activeTabName = "0";
                // }
                module.items.forEach((item, index) => {
                    if (item.tabIndex && item.tabIndex === text) {
                        module.activeTabName = item.tabIndex;
                    }
                });
                return;
            }
            let action = "push";
            if (listener.location && listener.location == "before") {
                action = "unshift";
            }

            if (listener.sourceApi) {
                //配制加载url的情况
                findDesignSource(listener.sourceApi).then(res => {
                    let resData = res.data;
                    if (resData.data && resData.data.source) {
                        resData = resData.data.source;
                    }
                    if (!resData.id) {
                        resData = eval("(" + resData + ")");
                    }
                    //钻取的数据的转换
                    if (resData && resData.layout && resData.layout.xtype != "column") {
                        resData = this.transformDrillJsonData(resData);
                    }
                    if (!resData.children && resData.items) {
                        resData.children = resData.items;
                        delete resData.items;
                    }
                    // debugger;
                    // let 
                    resData.id = bb.id;
                    if (text) {
                        let index = text.indexOf("（%");
                        let index2 = text.indexOf("（万");
                        if (index != -1) {
                            text = text.substring(0, index)
                        } else if (index2 != -1) {
                            text = text.substring(0, index2)
                        }
                        // index !== -1? text = text.substring(0,index):"";

                    }
                    resData.text = text;
                    resData.tabIndex = text;
                    resData.closable = true;
                    resData.show = true;
                    //加一个属性，表示是钻取的，方便刷新的时候过滤掉
                    resData.from = "isDrill";
                    //绑定选择的日期。
                    if (this.$store.selectPeriod) {
                        resData.curTabPeriod = this.$store.selectPeriod;
                    }
                    module.items[action](resData);
                    module.activeTabName = resData.text;
                    //钻取穿透过来的也要有show属性判断，可以封装成上面的格式传进来，此时采用最后一个传法。
                    if (resData) {
                        let moduleItem = module.items[module.items.length - 1];
                        module.showSet([moduleItem]);
                    }
                    //把添加的tab页，放在$vue的对象中。以便切换的时候来用。
                    if (this.$store.public) {
                        this.$store.public.tabModule = module;
                    } else {
                        this.$store.public = { tabModule: module };
                    }
                });
                return;
            }
            //
            module.items[action]({
                text: text,
                id: bb.id,
                closable: true,
                xtype: 'bi-text',
                tabIndex: text,
            });
            module.activeTabName = text;
        },
        /**
         * @author szc
         * 兼容穿透到表的处理，不用再重新配置一个相似的表。
         * (此方法只处理了是tab页形式的表,并且穿透的表还具有穿透功能)
         */
        transformDrillJsonData(resData) {
            // debugger
            let me = this;
            if (resData.items && resData.items.length > 0) {
                //判断是不是不要toolbar
                resData.items.forEach(ele => {
                    if (ele.children && ele.children.length > 0) {
                        ele.children.forEach(tt => {
                            if (tt.toolbar) {
                                delete tt.toolbar;
                            }
                        });
                    }
                });
                resData = resData.items[0];
            }
            return resData;

        }
    },
    /**
     * 表格的单元格事件
     */
    onCellClick(row, column, cell, event) {
        console.info(row);

        if (row._drill || row.drill) {
            if (cell.cellIndex === 0) {

            }
        }
    }



}