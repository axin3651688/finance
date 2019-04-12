<template>
    <div class="stree-grid">
        <tree-columns :tree-structure="true" :item.sync="item" :treeStructure="treeStructure" :columns="columns" :data-source="dataSource"></tree-columns>
    </div>
</template>
<script>
import treeColumns from '@c/treeElement/treeColumns.vue' ;
import treeToArray from "../treegrid/eval";
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
            const func = this.evalFunc || treeToArray;
            const args = this.evalArgs
                ? Array.concat([tmp, this.expandAll], this.evalArgs)
                : [tmp, this.expandAll];
            let formatData = func.apply(null, args);
            this.$set(this, "dataSource", tmp);
            if(this.item.tableBefore)this.tableBefore();
            
        },
        /**
         * @event 2.1树表的类型处理
         */
        array(datas){
            let data = datas;
            let arr = [];
            let index = 0;
            let flag = false;
            //找到父亲,可能存在好多个父节点，但是一般是一个，暂时只做一个处理。
            let root, rootItem, demoItem;
            let rootArr = [];
            if (data && data.length > 0) {
                demoItem = data[0];
                if (demoItem.pid) {
                    for (let i = 1; i < data.length - 1; i++) {
                        let eveItem = data[i];
                        //公司gsbm，数据sql查出来是这样的字段，所以暂时用这个，后面在改
                        if (eveItem.gsbm == demoItem.pid) {
                            demoItem = eveItem;
                        }
                    }
                    rootItem = demoItem;
                } else {
                    rootItem = demoItem;
                }
            }
            //找到多个父节点
            for (let i = 0; i < data.length; i++) {
                // if(i == data.length)return rows ;
                if (!data[i].pid) {
                    rootArr.push(data[i]);
                }
            }
            if (rootArr && rootArr.length > 1) {
                for (let i = 0; i < rootArr.length; i++) {
                    let it = rootArr[i];
                    this.tranformData(data, it);
                }
                this.item.rows = rootArr;
            } else {
                if (rootItem) {
                    this.tranformData(data, rootItem);
                }
                this.item.rows = rootItem;
            }
        },
        /**
         * @event 2.2树表的类型处理
         */
        tranformData(data, rootItem){
            let me = this;
            let children = [];
            let dataArr = [];
            rootItem.children = children;
            for (let i = 0; i < data.length; i++) {
                let it = data[i];
                if (it.gsbm === rootItem.gsbm) {
                    continue;
                }
                //满足条件的就塞进去，不满足的塞到另一个新数组中
                if (rootItem.gsbm == it.pid) {
                    rootItem.children.push(it);
                } else {
                    dataArr.push(it);
                }
            }
            if (rootItem.children && rootItem.children.length > 0) {
                for (let i = 0; i < rootItem.children.length; i++) {
                    let tt = rootItem.children[i];
                    me.tranformData(dataArr, tt);
                }
            }
        }
    }
}
</script>
<style scoped>
    
</style>
