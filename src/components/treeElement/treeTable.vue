<template>
    <div class="stree-grid">
        <tree-columns :tree-structure="true" :item.sync="item" :treeStructure="treeStructure" :columns="columns" :data-source="dataSource"></tree-columns>
    </div>
</template>
<script>
import treeColumns from '@c/treeElement/treeColumns.vue' ;
import treeToArray from "../treegrid/eval";
import tools from "utils/tools";
export default {
    props: ["item"],
    components: {
        treeColumns
    },
    data(){
        return{
            columns: [],
            dataSource: [],
            treeStructure: true
        }
    },
    created(){
        // debugger
        this.columns = this.item.config.columns ;
        let datas = this.item.datas ;
        this.array(datas) ;
        console.log("ABC",this.item.rows);
        this.assignMent(this.item.rows) ;
    },
    mounted(){

    },
    computed: {
        
    },
    methods: {
        /**
         * 赋值，填充行信息
         * @author sjz 2019年4月2日18:46:58
         */
        assignMent(rows){ 
            if (!rows.length>0) {
                this.dataSource.push(rows);
            } else {
                this.dataSource = rows ;
            }
        },
        // 及时更新
        upData(item) {
            this.$set(this, "dataSource", "");
            this.$set(this, "dataSource", null);
            this.item = item;
            // sjz 调用一下递归生成树表类型
            this.array(this.item.datas)
            this.convertData();
        },
        /**格式化数据源 */
        convertData() {
            // debugger
            let tmp;
            if (this.item.datas.length == 0) {
                tmp = [] ;
            } else {
                if (!Array.isArray(this.item.datas)) {
                    tmp = [this.item.datas];
                } else {
                    if (!this.item.rows.length>0) {
                        tmp = [this.item.rows];
                    } else {
                        tmp = this.item.rows ;
                    }
                    // tmp = this.item.rows;
                }
            } 
            // const func = this.evalFunc || treeToArray;
            // const args = this.evalArgs
            //     ? Array.concat([tmp, this.expandAll], this.evalArgs)
            //     : [tmp, this.expandAll];
            // let formatData = func.apply(null, args);
            this.$set(this, "dataSource", tmp);
            if(this.item.tableBefore)this.tableBefore();
            
        },
        /**
         * 找到父节点。这个是想遍历找到的。但是有点耗性能，就废弃了。2019年7月26日10:03:35
         */
        findNodeOfParent_old (datas,rootItem,demoItem) {
            let filterData = [];
            for(let i = 0;i < datas.length;i++){

            }
        },
        /**
         * 这个只是针对于公司来的。
         */
        findNodeOfParent (datas,rootItem) {
            let me = this,company = me.$store.getters.company,length = datas.length;
            for(let i = 0;i < length;i ++){
                let item = datas[i];
                if(item.gsbm == company){
                    rootItem = item;
                    break;
                }
            }
            return rootItem;
        },
        /**
         * @event 2.1树表的类型处理
         */
        array(data){
            // debugger;
            const setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "scode",
                        pIdKey: "spcode"
                    },
                        key: {
                        name: "scode",
                        children: "children"
                    }
                }
            };
            debugger;
            if (Array.isArray(data) && data.length > 0) {
                data = tools.sortByKey(data, "scode");
                data = data.filter(function(item) {
                    item.id = item.scode;
                    item.label = "(" + item.scode + ") " + item.sname;
                    return item;
                });
                this.item.rows = tools.transformToeTreeNodes(setting, data);
            }
        }
        
    }
}
</script>
<style scoped>
    
</style>
