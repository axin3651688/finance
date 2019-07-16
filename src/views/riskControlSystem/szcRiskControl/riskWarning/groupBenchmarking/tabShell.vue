<template>
    <div v-if="rootRender">
        <el-tabs v-model="activeName" @tab-click="tabClick" @tab-remove="removeTab">
            <el-tab-pane :label="tabTitle" name="first">
                <component :is="currentComponent" v-on:drillHandler="drillHandler" ref="currentTab" 
                v-on:removeTabOfUselessHandler="removeTabOfUselessHandler"></component>
            </el-tab-pane>
            <template v-if="editableTabs && editableTabs.length > 0">
                <el-tab-pane 
                    v-for="(item, index) in editableTabs"
                    :key="index"
                    :label="item.title"
                    :name="item.name"
                    closable
                >
                    <component :is="item.content" :pComponentData.sync="item.params" v-on:drillHandler="drillHandler" :ref="item.name"></component>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>
<script>
    import comprehensiveRating from "./comprehensiveRating"
    import profitability from "./profitability"
    import developmentAbility from "./developmentAbility"
    import operationQuality from "./operationQuality"
    import debtRisk from "./debtRisk"
    import detailedIndicator from "./detailedIndicators"

    import { mapGetters,mapActions } from "vuex";

    export default {
        name: "tabShell",
        components: {
            comprehensiveRating,
            profitability,
            developmentAbility,
            operationQuality,
            debtRisk,
            detailedIndicator
        },
        /**
         * 计算属性。
         */
        computed: {
            ...mapGetters(["showDims"])
        },
        data() {
            return {
                // editableTabsValue: '2',
                activeName:"first",
                editableTabs: [],
                tabIndex: 2,
                currentComponent:"",
                tabTitle:"",
                rootRender:true
            }
        },
        created() {
            let me = this,url = me.$router.currentRoute.name;
            let showDims = this.showDims;
            if(showDims){
                this.ShowDims({
                    company:true,
                    year:true,
                    month:true,
                    day:false,
                    conversion:false
                });
            }
            let tabItem = me.createTabName(url);
            me.currentComponent = url;
            me.tabTitle = tabItem.text;
            
        },
        watch: {
            $route(to, form) {
                let me = this,url = me.$router.currentRoute.name;
                let tabItem = me.createTabName(url);
                // me.rootRender = false;
                // me.$nextTick(() => {
                //     me.rootRender = true;
                // });
                // me.removeOtherTab();
                me.editableTabs = [];
                me.activeName = "first";
                me.currentComponent = url;
                me.tabTitle = tabItem.text;
                let showDims = this.showDims;
                if(showDims){
                    this.ShowDims({
                        company:true,
                        year:true,
                        month:true,
                        day:false,
                        conversion:false
                    });
                    // showDims.company = true,
                    // showDims.year = true,
                    // showDims.month = true,
                    // showDims.conversion = false;
                }
            }
        },
        methods: {
            ...mapActions(["ShowDims"]),
            /**
             * 
             */
            removeTabOfUselessHandler () {
                let me = this;
                me.editableTabs = [];
                me.activeName = "first";
            },
            /**
             * tab页的切换。
             */
            tabClick (tab, event) {
                let me = this,url = me.$router.currentRoute.name;
                let tabItem = me.createTabName(url);
                if(tabItem.text == tab.label){
                    this.ShowDims({
                        company:true,
                        year:true,
                        month:true,
                        day:false,
                        conversion:false
                    });
                    me.$refs["currentTab"].updateData();
                }else {
                    this.ShowDims({
                        company:false,
                        year:false,
                        month:false,
                        day:false,
                        conversion:false
                    });
                    me.$refs[tab.name][0].updateData();
                }
            },
            /**
             * 下钻。
             */
            drillHandler (params) {
                let me = this,editableTabs = me.editableTabs;
                let obj = {
                    title: params.row[params.tabSname],
                    name: params.row[params.field],
                    content: params.url,
                    params:params.outData
                };
                //不能重复下钻一样的。
                if(me.editableTabs && me.editableTabs.length > 0){
                    let editableTabs = me.editableTabs;
                    for(let i =0; i< editableTabs.length;i ++){
                        let item = editableTabs[i];
                        if(item.name == params.row[params.field]){
                            me.activeName = item.name;
                            return;
                        }
                    }
                }
                me.activeName = params.row[params.field];
                editableTabs.push(obj);
                me.editableTabs = editableTabs;
            },
            /**
             * tab的名称。
             */
            createTabName(tabId){
                let me = this,tabItem;
                let tabNames = [{
                    id:"debtRisk",
                    text:"债务风险"
                },
                {
                    id:"developmentAbility",
                    text:"发展能力"
                },
                {
                    id:"profitability",
                    text:"盈利能力"
                },
                {
                    id:"operationQuality",
                    text:"运营质量"
                },
                {
                    id:"comprehensiveRating",
                    text:"综合评级"
                }];
                tabNames.forEach(item => {
                    if(item.id == tabId){
                        tabItem = item;
                    }
                });
                return tabItem;
            },
            /**
             * 移除没用的tab
             */
            removeOtherTab () {

            },
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.activeName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                if(this.editableTabs && this.editableTabs.length == 0){
                    activeName = "first";
                    this.ShowDims({
                        company:true,
                        year:true,
                        month:true,
                        day:false,
                        conversion:false
                    });
                    // this.showDims.company = true;
                    // this.showDims.year = true;
                    // this.showDims.month = true;
                }
                this.activeName = activeName;
                this.rootRender = false;
                this.$nextTick(() => {
                    this.rootRender = true;
                });
            },
            /**
             * 暂时没用。
             */
            beforeLeave (activeName, oldActiveName) {
                let me = this;
            }
        }
    }
</script>