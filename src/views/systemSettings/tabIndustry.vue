<template>
    <div :style="styles">
        <!-- 维度管理——>行业板块管理 -->
        <!-- 
            name : sjz
            time : 2019/3/21 
         -->
        <!-- 
         
            响应式布局：
            gutter:10 指定分栏间隔
            offset="23" 指定分栏偏移的栏数
            1. xs <768px 响应式栅格数或者栅格属性对象
            2. sm ≥768px 响应式栅格数或者栅格属性对象
            3. md ≥992   响应式栅格数或者栅格属性对象
            4. lg ≥1200  响应式栅格数或者栅格属性对象
            注：全局最大为24
            
        -->
        <!-- <el-row type="flex" justify="end">
            <el-col :xs="12" :sm="24" :lg="24" :offset="23">
                <div class="icon">
                    <el-button icon="el-icon-menu"></el-button>
                </div>
            </el-col>
        </el-row> -->
        <el-row type="flex" justify="end">
            <el-col :span="0.1">
                <div class="icon">                   
                    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="false">
                        <el-button icon="el-icon-menu"></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item 
                            v-for="(item,index) in items" 
                            :key="index" 
                            :command="item.command" 
                            divided
                            >
                                <!-- <el-checkbox v-model="item.checked" @change="checkbox">{{ item.text }}</el-checkbox> -->
                                <el-checkbox @change="checkbox(item.command)" >{{ item.text }}</el-checkbox>
                                <!-- {{ item.text }} -->
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :xs="12" :sm="24" :lg="24">
                <el-table
                :data="tableData"
                stripe
                height="300"
                style="width: 100%"
                border
                >
                    <el-table-column 
                    v-for="element in elements"
                    v-if="element.determine"
                    :key="element.index" 
                    :prop="element.prop" 
                    :label="element.text"
                    :width="element.width" 
                    >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import VueECharts from '@c/charts/ECharts';
export default {
    data(){
        return {
            input3: "",
            elements: [
                { determine: true, prop: 'data',  text : '等级' },
                { determine: true, prop: "name",  text : '姓名' },
                { determine: true, prop: "sage",  text : '年龄' },
                { determine: true, prop:"address",text : '地址' }
            ],
            items: [
                { command: "data",  text : '日期' },
                { command: "name",  text : '姓名' },
                { command: "sage",  text : '年龄' },
                { command:"address",text : '地址' }
            ],
            determine: true,
            tableData: [
                { data: 10, name: ''  }
            ],
            styles: {
                height: "0px",
                backgroundColor: "#fff"
            } 
        }
    },
    created(){
        this.styles.height = document.body.offsetHeight - 40 - 64 - 32 - 0 + "px" ;
    },
    mounted(){
        // （1）自适应高度
        this.setTableScollHeight() ;
        // （2）todolist
        // this.todoList() ;
    },
    methods: {
        // （1）自适应高度方法
        setTableScollHeight(res){
            this.styles.height = document.body.offsetHeight - 40 - 64 - 32 - 0  + "px" ;
            const me = this ;
            window.onresize = function temp(){
                me.styles.height = document.body.offsetHeight - 40 - 64 - 32 - 0  + "px" ;
            }
        },
        // 
        handClick(aa){
            debugger
            // if((!aa == '' || !aa == 0) && aa){
                this.tableData.forEach(res => {
                    if((res.data!='' || res.data!=0) && res.data && (!aa == '' || !aa == 0) && aa){
                        if(res.data>=aa)res.name = '安全';
                        if(res.data<=aa)res.name = '提示';
                    }else{
                        res.name = '';
                    }
                })
            // }else{
            //     return false ;
            // }
        },
        handleCommand(command){
            // debugger
            // let me = this ;
            // me.elements.forEach(res => {
            //     debugger
            //     if(res.prop === command){
            //         res.determine = !res.determine;
            //     }
            // })
        },
        checkbox(command){
            // debugger
            let me = this ;
            me.elements.forEach(res => {
                // debugger
                if(res.prop === command){
                    res.determine = !res.determine;
                }
            })
        }
    }
}
</script>
<style scoped>
    .icon {
        /* height: 66px; */
        width: 100%;
        margin-bottom: 10px;
    }
    .icon button {
        font-size: 24px;
        border: 1;
        margin-top: -5px;
    }
</style>
<style>
.el-table td, .el-table th{
    text-align: center; 
}
.has-gutter tr th {
    background-color: rgb(240, 248, 255);
}
</style>


