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
import {
    mapActions
} from "vuex";

export default {
    mounted() {
        debugger
        let me = this;
        if (me.item && me.item.listeners) {
            this.eventHandler(me.item.listeners);
        }
    },
    methods: {
        ...mapActions(["ShowDialog"]),
        eventHandler(listeners, params, bb) {
            listeners.forEach(listener => {
                this.eventFire(listener, params, bb);
            });
        },

        eventFire(listener, params, bb) {
            debugger
            let xtype = this.item.xtype;
            if (listener.type) {
                if (xtype === "chart" || xtype === "bi-chart") {
                    this.chartEventHandler(listener);
                } else if (xtype === "JtreeGrid" || xtype === "table" || xtype === "bi-table") {
                    this.commonHandler();
                } else if (xtype === "text" || xtype === "bi-text") {
                    this.commonHandler(listener);
                } else if (xtype === "form" || xtype === "tree-grid") {
                    this.tableEventHandler(listener)
                }
            } else {
                console.error("没有为事件对象配制type属性，" + me.item.text);
            }
        },

        /**
         * 事件通用处理
         */
        commonHandler(listener, params, bb) {
            debugger
            let me = this;
            if (listener.handler) {
                listener.handler(me, params);
            } else {
                console.log("没有设置回调函数，你真的不想干点什么了吗：", listener);
            }

            if (listener.way && me[listener.way]) {
                me[listener.way](params, listener, bb);
            }

        },

        /**
         * 图形事件处理
         */
        chartEventHandler(listener) {
            debugger
            let me = this;
            this.$children[0].chart.on(listener.type, function(params) {
                if (listener.clickBefore && typeof listener.clickBefore == "function") {
                    listener = listener.clickBefore(listener, me, params);
                }
                // if(!listener){
                //   return;
                // }
                /**
                 * 暂时干掉， 回头再调   zdk说的 2018-12-28 21:01:58
                 */
                me.commonHandler(listener, params);

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
        // api: listener.sourceApi,1
        openDialog(params, listener, bb) {
            debugger
            if (listener.sourceApi !== "cnbi/json/source/jsnk/zbfx/zjl.json") {
                this.ShowDialog({
                    params: params,
                    button: '',
                    api: listener.sourceApi,
                    isShow: true,
                    tittle: bb.label,
                    width: listener.config.width + "px",
                    height: listener.config.height + "px",
                });
            } else {
                debugger;
                this.ShowDialog({
                    params: params,
                    api: listener.sourceApi,
                    button: '语音播报',
                    isShow: true,
                    tittle: `${bb.row.text}2016年1月营业收入与上年同期相比，较大幅度增长的主要原因是：`,
                    width: listener.config.width + "px",
                    height: listener.config.height + "px",
                });
            }

        },
        /**
         * 增加到tab的动作 openDialog openWindow
         * unshift()方法是向数组的开头添加一个或多个元素
         */
        addTab(params, listener, bb) {
            debugger;
            //let module = this.$parent.$parent.$parent.$parent.items ? this.$parent.$parent.$parent.$parent : this.$parent.$parent.$parent.$parent.$parent.$parent;
            //判断指标分析的穿透
            // if (!module.items) {
            //   module = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent;
            // }
            let module = this.$root.$children[0].$children[0].$children[0].$children[0]; //.$children[0].$children[0];
            // let module = tab.$parent.$parent;
            if (!module) {
                alert("未能获取module对象！");
                return;
            }
            if (!bb) {
                bb = this.item;
            }
            if (!module.items) {
                module = this.$root.$children[0].$children[0].$children[4].$children[0];
                console.log(module.items);
            }
            debugger;
            let text = bb.text;


            let arrs = module.items.filter(bean => bean.text == text);
            if (arrs.length > 0) {
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
                    if (!resData.children && resData.items) {
                        resData.children = resData.items;
                        delete resData.items;
                    }

                    resData.id = bb.id;
                    resData.text = text;
                    resData.tabIndex = text;
                    resData.closable = true;
                    resData.show = true;
                    //加一个属性，表示是钻取的，方便刷新的时候过滤掉
                    resData.from = "isDrill";
                    module.items[action](resData);
                    module.activeTabName = resData.text;
                    //钻取穿透过来的也要有show属性判断，可以封装成上面的格式传进来，此时采用最后一个传法。
                    if (resData) {
                        let moduleItem = module.items[module.items.length - 1];
                        module.showSet([moduleItem]);
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