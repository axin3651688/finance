<template>
    <!--
        name: sjz
        说明：参数设置-> 行业指标数据维护-> 数据维护
    -->
    <div id="listedSetting">
        <div class="listedSetting_btn">
            <el-button>文件加载</el-button>
            <el-input class="listedSetting_input" placeholder="显示加载文字名称" v-model="input" :readonly="readonly"></el-input>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="公司选择：">
                <el-select class="listedSetting_select" v-model="form.company" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in itemc" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据类型：">
                <el-select class="listedSetting_select" v-model="form.company" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in itemd" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报表类型：">
                <el-select class="listedSetting_select" v-model="form.company" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in items" :key="item.scode" :label="item.sname" :value="item.scode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="listedSetting_btn2"><i class="iconfont icon-daoru"></i>数据导入</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            input: "",
            readonly: true ,
            form: {

            },
            itemc: [],
            itemd: [],
            items: []
        }
    }
}
</script>
<style scoped>
.listedSetting_input {
    width: 300px;
    margin-left: 20px;
    margin-bottom: 10px;
}
.listedSetting_select {
    margin-left: 18px;
    width: 300px;
}
.listedSetting_btn2 {
    margin-left: 193px;
}
.listedSetting_btn2 .icon-daoru {
    padding-right: 10px;
    color: #1790ff;
}
</style>
