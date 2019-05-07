<template>
    <el-dialog
    width="80%"
    :title="modalConfig.title||'上报人员'"
    :modal-append-to-body="false"
    :visible.sync="modalConfig.dialogVisible"
    >
        <div>
            <div>
                <template v-for="(itemSel,index) in selectOps">
                    <label :key="index" style="margin:0 10px;">{{ itemSel.label }}</label>
                    <el-select v-model="value" placeholder="请选择" :key="index">
                        <el-option
                        v-for="item in itemSel.content"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </div>
        </div>
    </el-dialog>
</template>
<script>

export default {
    name: "FillModal",
    props: ['modalConfig'],
    data() {
        return {
            filterText:"",
            // dialogVisible: modalConfig.dialogVisible,
            datas:[],
            options: [],
            selectOps:[],
            props:{
                label:"",
                children:""
            }
        }
    },
    created() {
        debugger;
        let me = this;
        this.axios.get("/cnbi/json/source/tjsp/szcJson/fillModal/selectOps.json").then(res => {
            console.log(res);
            me.selectOps = res.data;
        });
        this.update();
    },
    mounted() {
        let me = this;
    },
    methods: {
        /**
         * 更新数据。
         */
        update () {
            let me = this;
        },
    }
}
</script>
