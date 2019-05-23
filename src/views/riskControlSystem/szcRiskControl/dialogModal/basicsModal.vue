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
                                        <el-select v-model="selectValue" placeholder="请选择" :key="selIndex+10">
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
                                        <person :dptUserConfig.sync="dptUserConfig" v-on:instructionHandler="instructionHandler"></person>
                                        <el-checkbox v-model="releasePeople" @change="checkboxChange" :checked="checked" ref="peopleCheckbox">指定下达人员</el-checkbox>
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
import riskPublic from "@/utils/riskPublic"
import {
    updateInstruction
} from "~api/szcRiskControl/riskControl"
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
            dptUserConfig:{},
            selectValue:"",
            checked:false//是否选中
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
            me.setDefaultValue();
            this.$emit("changMessage",sign);
        },
        /**
         * 下一条。
         * @author szc 2019年5月16日19:57:50
         */
        nextMessage () {
            let me = this,sign = "down";
            me.setDefaultValue();
            this.$emit("changMessage",sign);
        },
        /**
         * 设置一些默认的值。
         * @author szc 2019年5月22日20:27:54
         */
        setDefaultValue(){
            debugger;
            let me = this;
            me.selectValue = "";
            me.dptUserConfig = {
                id:"dptUser",
                show:false,
                userDatas:[]
            };
            // me.$refs.peopleCheckbox[0].isChecked = false;
            // let classValue = me.$refs.peopleCheckbox[0].$el.getAttribute("class");
            // let spanClassValue = me.$refs.peopleCheckbox[0].$el.childNodes[0].getAttribute("class");
            // classValue = classValue.replace("is-checked","");
            // spanClassValue = spanClassValue.replace("is-checked","")
            // me.$refs.peopleCheckbox[0].$el.setAttribute("class",classValue);
            // me.$refs.peopleCheckbox[0].$el.childNodes[0].setAttribute("class",spanClassValue);
            // me.$refs.peopleCheckbox[0].$el.removeAttribute("is-checked");
            // let myEvent = new Event('click');
            // me.$refs.peopleCheckbox[0].$el.dispatchEvent(myEvent);
            // me.$refs.peopleCheckbox[0].$el.removeAttribute("is-checked");
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
        checkboxChange (item,paramsEvent) {
            debugger;
            let me = this,storeParams = me.$store.getters,
                company = storeParams.company;
            if(item){
                let params = {
                    company:company
                };
                me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                    if(res.data.code == 200){
                        params = riskPublic.paramsOfSql(params,res.data.sqlList,"102");
                        findThirdPartData(params).then(res => {
                            debugger;
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
                let objDptUser = {
                    id:"",
                    label:"",
                    children:[]
                };
                for(let i = 0;i < data.length;i ++){
                    let item = data[i];
                    if(item.scode == key){
                        if(item.usernid){
                            let objItem = {
                                id:item.suser,
                                label:item.username
                            };
                            objDptUser.id = item.scode;
                            objDptUser.label = item.sname;
                            objDptUser.children.push(objItem);
                        }else {
                            objDptUser.id = item.scode;
                            objDptUser.label = item.sname;
                        }
                    }
                }
                dptUser.push(objDptUser);
            }
            // me.dptUserConfig.userDatas = dptUser;
            me.dptUserConfig = {
                id:"dptUser",
                show:true,
                userDatas:dptUser
            };
        },
        /**
         * 选中人员下达的确定按钮的事件。
         * @author szc 2019年5月22日19:32:54
         */
        instructionHandler (nodes) {
            debugger;
            let me = this,storeParams = me.$store.getters,
            company = storeParams.company;
            if(nodes && nodes.length > 0){
                let arrUser = [],userStr = "";
                nodes.forEach(item => {
                    arrUser.push(item.id);
                });
                userStr = arrUser.join(',');
                let params = [
                    {
                        company:company,
                        departId:me.formConfig.departId,
                        riskYDCL:me.selectValue,
                        riskContent:me.instructions,
                        userStr:userStr
                    }
                ];
                updateInstruction(params).then(res => {
                    debugger;
                    if(res.data.code = 200) {

                    }
                });
            }
            // let params = {
            //     id:"instruction",
            //     data:nodes
            // };
            // me.$emit("eventHandler",params);
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

