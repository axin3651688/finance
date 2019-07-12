<template>
    <div>
        <div class="basics_modal">
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
                                    <div :class="modalTextClass(it)" :style="styleHandler(formConfig.rowData)">
                                        <span>
                                            {{ it[it.text] }}
                                        </span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'textarea'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :label="it.label || '没有配置'" :prop="it.text" :key="itIndex">
                                    <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                                    <el-input type="textarea" v-model="it[it.text]" :disabled="it.disabled" class="basics_textarea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col v-else-if="it.type == 'labelSelect'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :key="itIndex" class="label_select_content">
                                    <label slot="label" class="custom_label">{{ it.label }}</label>
                                    <template v-for="(selItem,selIndex) in it.selectConfig">
                                        <label :key="selIndex">{{ selItem.label }}</label>
                                        <el-select v-model="selectValues" placeholder="请选择" multiple :key="selIndex+10" :disabled="it.disabled || selectDsiabled">
                                            <el-option
                                            v-for="sltItem in selItem.options"
                                            :key="sltItem.scode"
                                            :label="sltItem.sname"
                                            :value="sltItem.scode">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <div v-if="it.button" style="display:inline-block">
                                        <el-button v-if="it.button.show" 
                                            :disabled="it.disabled || publicDisabled" 
                                            @click="reference">{{ it.button.text }}</el-button>
                                    </div>
                                    <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
                                    <!-- <div class="selectTextarea">
                                        <el-input v-if="it.textarea && it.textarea.show" type="textarea" v-model="instructions" :disabled="it.disabled"></el-input>
                                    </div> -->
                                </el-form-item>
                                <div class="selectTextarea">
                                    <el-input v-if="it.textarea && it.textarea.show" type="textarea" v-model="instructions" :disabled="it.disabled || publicDisabled"></el-input>
                                </div>
                            </el-col>
                            <el-col v-else-if="it.type == 'div'" :span="it.span || 12" :key="itIndex">
                                <el-form-item :key="itIndex" class="foot_operation">
                                    <div style="display:inline-block;">
                                        <el-button @click="upMessage">上一条</el-button>
                                        <el-button @click="nextMessage">下一条</el-button>
                                    </div>
                                    <div class="checkClass">
                                        <person :dptUserConfig.sync="dptUserConfig" v-on:instructionHandler="instructionHandler"></person>
                                        <span>
                                            <input type="checkbox" :checked="checked" @click="customCheckbox" :disabled="it.checkbox.disabled || publicDisabled">
                                            <span>指定下达人员</span>
                                        </span>
                                        <!-- <el-checkbox v-model="releasePeople" @change="checkboxChange" :checked="checked" ref="peopleCheckbox">指定下达人员</el-checkbox> -->
                                        <!-- <div class="footDiv">批示下达</div> -->
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
            publicDisabled:undefined,
            selectDsiabled:undefined,//选择框不可编辑。
            releasePeople:"",
            instructions:"",
            dptUserConfig:{},
            selectValue:"",
            selectValues:[],
            checked:false//是否选中
        }
    },
    watch: {
        formConfig:{
            handler(newValue,oldValue){
                let me = this,rowData = newValue.rowData;
                me.publicDisabled = undefined;
                me.selectDsiabled = undefined;
                if(rowData){
                    me.copingStrategies(rowData);
                }
            },
            deep:true
        }
    },
    /**
     * 组件渲染前的回调。
     */
    created() {
        let me = this,rowData = me.formConfig.rowData;
        if(rowData){
            me.copingStrategies(rowData);
        }
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
         * 查询出来的样式
         */
        styleHandler (row) {
            let me = this;
            if(row && row.fxlxcolor){
                return "background-color:" + row.fxlxcolor;
            }
        },
        /**
         * 弹出框的文本添加样式。
         * @author szc 2019年5月16日19:14:07
         */
        modalTextClass (it) {
            let me = this;
            if (it.nlevel) {
                if (it.nlevel == "1") {
                    return "textClass01";
                } else if (it.nlevel == "2") {
                    return "textClass02";
                } else if (it.nlevel == "3") {
                    return "textClass03";
                } else {
                    return "textClass01";
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
            let me = this;
            // me.selectValues = [];
            me.dptUserConfig = {
                id:"dptUser",
                show:false,
                userDatas:[]
            };
            me.checked = false;
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
            // me.$refs.peopleCheckbox[0].$el.childNodes[0].childNodes[1].checked = true;
        },
        /**
         * 下拉框出现隐藏的回调。
         */
        visibleChange (item,params) {
            let me = this;
            if(item){

            }
        },
        /**
         * 自定义的复选框事件。
         * @author szc 2019年5月23日10:14:14
         */
        customCheckbox (event) {
            let me = this,storeParams = me.$store.getters,
                company = storeParams.company;
            //判断是不是选择了应对策略。
            if(me.selectValues && me.selectValues.length == 0){
                me.checked = false;
                event.currentTarget.checked = me.checked;
                me.$message({
                    message:"请选择风险应对策略",
                    type:"warning"
                });
                return;
            }
            if(event.currentTarget.checked){
                let params = {
                    company:company
                };
                me.checked = event.currentTarget.checked;
                me.axios.get("/cnbi/json/source/tjsp/riskSql/riskControl/sql.json").then(res => {
                    if(res.data.code == 200){
                        params = riskPublic.paramsOfSql(params,res.data.sqlList,"102");
                        findThirdPartData(params).then(res => {
                            if(res.data.code == 200) {
                                me.parseTreeData(me.dptUserConfig,res.data.data);
                            }
                        });
                    }
                });
            }else {
                me.checked = event.currentTarget.checked;
                me.dptUserConfig = {
                    id:"dptUser",
                    show:false,
                    userDatas:[]
                };
            }
        },
        /**
         * checkBox改变的回调。
         * @author szc 2019年5月22日11:45:56
         */
        checkboxChange (item,paramsEvent) {
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
                    disabled:true,
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
            let me = this,storeParams = me.$store.getters,
            company = storeParams.company,user = storeParams.user.user.userName;
            if(nodes && nodes.length > 0){
                let arrUser = [],userStr = "";
                nodes.forEach(item => {
                    arrUser.push(item.id);
                });
                // let selectStr = me.selectValues.join(',');
                let selectStr = me.selectValues.toString();
                userStr = arrUser.join(',');
                let params = {
                    riskReportStateDtos:[
                        {
                            id: 0,
                            company:company,
                            nrelateid: me.formConfig.rowData.id,
                            sinstructionsuser:user,
                            cstrategy:selectStr,
                            period: me.parsePeriod(),
                            sinstructscontent:me.instructions,
                            sisinstructions:"1"
                        }
                    ],
                    users:[
                        userStr
                    ]
                };
                
                updateInstruction(params).then(res => {
                    if(res.data.code == 200) {
                        me.checked = false;
                        me.selectDsiabled = "disabled";
                        me.publicDisabled = "disabled";
                        me.dptUserConfig.show = false;
                        let params = {
                            id:"10401",
                            text:"批示之后"
                        };
                        me.$emit("eventHandler",params);
                        me.$message({
                            message:"批示成功！",
                            type:"success"
                        });
                    }else {
                        me.$message.error(res.data.msg || "批示出错！");
                    }
                });
            }
            // let params = {
            //     id:"instruction",
            //     data:nodes
            // };
            // me.$emit("eventHandler",params);
        },
        /**
         * 转换日期。
         * @author szc 2019年5月22日19:04:24
         */
        parsePeriod(){
            let me = this,storeParams = me.$store.getters,
            year = storeParams.year,month = storeParams.month,period = "";
            if(month > 9) {
                period = year + "" + month;
            }else {
                period = year + "0" + month;
            }
            return period;
        },
        /**
         * 恢复默认值。
         * @author szc 2019年5月23日14:07:30
         */
        recoveryDefault(){
            let me = this;
            me.checked = false;
            me.dptUserConfig.show = false;
            // me.dptUserConfig = {
            //     id:"dptUser",
            //     show:false,
            //     userDatas:[]
            // };
        },
        /**
         * 应对策略选择，附上去
         * @author szc 2019年5月23日21:02:00
         */
        copingStrategies (rowData) {
            let me = this,fxydcl = (rowData.fxydcl || "") + "";
            if(rowData.psztid != 1){
                me.instructions = "";
                me.selectValues = [];
            }else {
                let arr = fxydcl.split(',');
                me.instructions = rowData.fxydclnr;
                me.selectValues = arr;
            }
            
        },
        /**
         * 参照按钮
         * @author szc 2019年6月13日19:54:59
         */
        reference () {
            let params = {
               id:"reference",
               text:"参照按钮事件" 
            };
            this.$emit("eventHandler",params);
        }
    },
}
</script>
<style lang="scss">
.basics_modal {
    .selectTextarea {
        margin-top: -15px;
        margin-left: 100px;
    }
    // 选择框的内容flex样式
    .label_select_content {
        display: flex;
        // 自定义label的样式
        .el-form-item__label {
            align-self: center !important;
        }
        .el-form-item__content {
            margin-left: 0px !important;
        }
    }
    
    .foot_operation {
        margin-top: 20px;
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
    .basics_textarea {
        textarea {
            height: 80px;
            max-height: 80px;
        }
    }
}
    
</style>

