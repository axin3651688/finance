<template>
    <!--
        name: sjz
        说明：全局控制
    -->
    <div id="globalControl">
        <el-form label-width="300px" :model="formLabelAlign">
            <el-form-item class="globalControl_title" label="系统全局参数控制"></el-form-item>
            <el-form-item label="1、风险公司名称控制：">
                <el-radio class="globalControl_radioA" v-model="formLabelAlign.scompanytype" :label="0">公司全称</el-radio>
                <el-radio class="globalControl_radioB" v-model="formLabelAlign.scompanytype" :label="1">公司简称</el-radio>
            </el-form-item>
            <el-form-item label="2、风险报告催报控制：">
                <el-radio class="globalControl_radioA" v-model="formLabelAlign.urgetoreporttype" :label="0">手动催报</el-radio>
                <el-radio class="globalControl_radioB" v-model="formLabelAlign.urgetoreporttype" :label="1">自动催报</el-radio>
            </el-form-item>
            <el-form-item label="3、风险报告类型控制：">
                <el-radio class="globalControl_radioA" v-model="formLabelAlign.reporttype" :label="0">启用</el-radio>
                <el-radio class="globalControl_radioB" v-model="formLabelAlign.reporttype" :label="1">不启用</el-radio>
            </el-form-item>
            <el-form-item label="4、风险识别期间选择：">
                <el-radio class="globalControl_radioA" v-model="formLabelAlign.periodtype" :label="0">≤ 当前期间</el-radio>
                <el-radio class="globalControl_radioB" v-model="formLabelAlign.periodtype" :label="1">＝当前期间</el-radio>
            </el-form-item>
            <el-form-item label="5、风险识别删除控制：">
                <el-radio class="globalControl_radioA" v-model="formLabelAlign.submitdeletetype" :label="0">提交不能删除</el-radio>
                <el-radio class="globalControl_radioB" v-model="formLabelAlign.submitdeletetype" :label="1">提交可以删除</el-radio>
            </el-form-item>
            <el-form-item class="globalControl_btn">
                <el-button type="primary" @click="confirmClick">确认</el-button>
                <el-button @click="cancelClick">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
// 引用系统全局参数控制接口
import { 
    // 查询全部记录
    globalparam_all,
    // 修改添加记录
    globalparam_add 
} from "~api/cube.js" ;
export default {
    data(){
        return {
            formLabelAlign: {
                scompanytype: 0,
                urgetoreporttype: 0,
                reporttype: 0,
                periodtype: 0,
                submitdeletetype: 0
            },
            formLabelAlign_clo: {},         // 克隆数据
        }
    },
    created(){
        // 查询记录
        this.globalRequest("0") ;
    },
    methods: {
        /**
         * @event 查询记录
         */
        globalRequest(vax){
            let me = this ;
            // let mm = me.$store.getters.user.globalparam[0] ;
            globalparam_all().then(res => { 
                if(res.data.code === 200){
                    if(vax == "0")me.$message({ message: res.data.msg , type: "success" }) ;
                    let data = res.data.data[0] ; // 数据
                    for(let key in data){
                        me.formLabelAlign[key] = data[key] ;
                        me.formLabelAlign_clo[key] = data[key] ;
                        // mm[key] = data[key] ;
                    }
                } else {
                    me.$message.error(res.data.msg);
                }
            });
        },
        /**
         * @description 确认按钮
         */
        confirmClick(){
            let me = this ;
            if(me.isChange()){
                me.$message({ message: '暂无更改！' }) ;
            } else {
                me.$confirm('此操作将更改配置, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    me.$message({ type: 'success', message: '配置成功!' });
                    me.globalparam_add_request() ;
                }).catch(() => {
                    me.$message({ type: 'info', message: '已取消更改' });
                    me.cancelClick() ;          
                });
            }
        },
        /**
         * @description 取消按钮
         */
        cancelClick(){
            let me = this ;
            for(let key in me.formLabelAlign_clo){
                me.formLabelAlign[key] = me.formLabelAlign_clo[key] ;
            }
        },
        /**
         * @description 是否变化参数，没有就提示‘暂无变动！’，有就可以修改
         */
        isChange(){
            let me = this ;
            let isTrue = true ;
            for(let key in me.formLabelAlign_clo){
                if(me.formLabelAlign[key] == me.formLabelAlign_clo[key]){
                    isTrue = true ;
                } else {
                    return !isTrue ;
                }
            }
            return isTrue ;
        },
        /**
         * @description 修改配置请求
         */
        globalparam_add_request(){
            let me = this ;
            let params = me.formLabelAlign ;
            globalparam_add(params).then(res => {
                if(res.data.code === 200) {
                    me.$message({ message: res.data.msg , type: "success" }) ;
                    me.globalRequest("1") ;
                } else {
                    me.$message.error(res.data.msg);                    
                }
            });
        }
    }
}
</script>
<style >
.globalControl_title {
    letter-spacing: 5px;
    font-weight: 500;
    margin: 2em 0 2em 0em ;
    list-style: none;
}
.globalControl_title .el-form-item__label { font-size: 20px; }
.globalControl_radioA { 
    width: 120px; 
    margin-left: 50px;
}
.globalControl_radioB { 
    width: 120px; 
    margin-left: 50px !important;
}
#globalControl .el-form {
    width: 800px;
    margin: 0 auto;
    margin-top: 5em;
    border: 1px solid #000;
}
#globalControl .globalControl_btn {
    text-align: right;
    padding-right: 20px;
}
</style>
