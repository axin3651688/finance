<template>
    <div>
        <div>
            <el-form :model="formConfig" label-width="100px">
                <template v-for="(item,index) in formConfig.groups">
                    <el-row :key="index">
                        <template v-for="(it,itIndex) in item.content">
                            <el-col v-if="it.type == 'input'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :label="it.label || '没有配置'" :label-width="it.labelWidth" :prop="it.text" :key="itIndex">
                                    <el-input v-model="it[it.text]" :disabled="it.disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'text'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :label="it.label || '没有配置'" :prop="it.text" :key="itIndex">
                                    <div :class="modalTextClass(it)">
                                        <span>
                                            {{ it[it.text] }}
                                        </span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'textarea'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :label="it.label || '没有配置'" :prop="it.text" :key="itIndex">
                                    <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                                    <el-input type="textarea" v-model="it[it.text]" :disabled="it.disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'labelSelect'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :label="it.label || '没有配置'" :key="itIndex">
                                    <template v-for="(selItem,selIndex) in it.selectConfig">
                                        <label :key="selIndex">{{ selItem.label }}</label>
                                        <el-select v-model="it[it.text]" placeholder="请选择" :key="selIndex+10">
                                            <el-option
                                            v-for="sltItem in selItem.options"
                                            :key="sltItem.nid"
                                            :label="sltItem.sname"
                                            :value="sltItem.nid">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <div v-if="it.button" style="display:inline-block">
                                        <el-button v-if="it.button.show">{{ it.button.text }}</el-button>
                                    </div>
                                    <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                                    <div class="selectTextarea">
                                        <el-input v-if="it.textarea && it.textarea.show" type="textarea" v-model="instructions" :disabled="it.disabled"></el-input>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'div'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :key="itIndex">
                                    <div style="display:inline-block;">
                                        <el-button @click="upMessage">上一条</el-button>
                                        <el-button @click="nextMessage">下一条</el-button>
                                    </div>
                                    <div class="checkClass">
                                        <person :dptUserConfig="dptUserConfig"></person>
                                        <el-checkbox v-model="releasePeople" @change="checkboxChange">指定下达人员</el-checkbox>
                                        <div class="footDiv">批示下达</div>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                </template>
            </el-form>
        </div>
    </div>
</template>
<script>
import person from "./showPersonnelList"
import { findThirdPartData } from "~api/interface"
import {
    paramsOfSql
} from "@/utils/riskPublic"
export default {
    name:"basicsModal",
    props:{
        formConfig:Object
    },
    components:{
        person
    },
    data() {
        return {
            releasePeople:"",
            instructions:"",
            dptUserConfig:""
        }
    },
    /**
     * 组件渲染前的回调。
     */
    created() {
        let me = this;
        // this.axios.get("/cnbi/json/source/tjsp/szcJson/risk/basicsModalConfig.json").then(res => {
        //     if(res.data.code == 200) {
        //         me.formConfig = res.data.formConfig;
        //     }
        // });
    },
    /**
     * 页面加载完成后的回调。
     */
    mounted() {
        
    },
    /**
     * 方法
     */
    methods: {
        /**
         * 弹出框的文本添加样式。
         * @author szc 2019年5月16日19:14:07
         */
        modalTextClass (it) {
            debugger;
            let me = this;
            if (it.nlevel) {
                if (it.nlevel == "1") {
                    return "textClass01";
                } else if (it.nlevel == "2") {
                    return "textClass02";
                } else if (it.nlevel == "3") {
                    return "textClass03";
                }
            } else {
                return "";
            }
        },
        /**
         * 上一条。
         * @author szc 2019年5月16日19:57:50
         */
        upMessage () {
            let me = this,sign = "up";
            this.$emit("changMessage",sign);
        },
        /**
         * 下一条。
         * @author szc 2019年5月16日19:57:50
         */
        nextMessage () {
            let me = this,sign = "down";
            this.$emit("changMessage",sign);
        },
        /**
         * 下拉框出现隐藏的回调。
         */
        visibleChange (item,params) {
            debugger;
            let me = this;
            if(item){

            }
        },
        /**
         * checkBox改变的回调。
         * @author szc 2019年5月22日11:45:56
         */
        checkboxChange (item,params) {
            debugger;
            let me = this,storeParams = me.$store.getters,
                company = storeParams.company;
            if(item){
                let params = {
                    company:company
                };
                me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                    if(res.data.code == 200){
                        params = me.paramsOfSql(params,res.data.data,"102");
                        findThirdPartData(params).then(res => {
                            if(res.data.code == 200) {
                                me.parseTreeData(me.dptUserConfig,res.data.data);
                            }
                        });
                    }
                });
                
                // me.dptUserConfig = {
                //     id:"dptUser",
                //     show:true,
                //     userDatas:[]
                // };
            }else {
                me.dptUserConfig = {
                    id:"dptUser",
                    show:false,
                    userDatas:[]
                };
            }
        },
        /**
         * 指定下达人员是树表。
         * @author szc 2019年5月22日14:30:25
         */
        parseTreeData (dptUserConfig,data) {
            let me = this,objRes = {};
        if(data && data.length > 0) {
                data.forEach(item => {
                    if(!objRes[item.scode]){
                        objRes[item.scode] = item.scode;
                    }
                });
            }
            let dptUser = [];
            for(let key in objRes){
                let objDptUser = {};
                for(let i = 0;i < data.length;i ++){

                }
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .selectTextarea {
        margin-top: 5px;
    }
    .checkClass {
        display: inline-block;
        float: right;
    }
    .footDiv {
        // background-color: dodgerblue;
        display: inline-block;
        margin: 5px;
        width: 100px;
        text-align: center;
    }
    .textClass01 {
        background-color: red;
        border-radius: 20px;
        color: #fff;
        width: 50%;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .textClass02 {
        background-color: rgb(255, 187, 0);
        border-radius: 20px;
        color: #fff;
        width: 50%;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .textClass03 {
        background-color: rgb(48, 172, 48);
        border-radius: 20px;
        color: #fff;
        width: 50%;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
</style>

