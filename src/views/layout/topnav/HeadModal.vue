<template>
    <div>
        <el-dialog
        :title="modalConfig.title||'弹出层'"
        :modalConfig.sync="modalConfig"
        :width="modalConfig.width || '30%'"
        :modal-append-to-body="false"
        :visible.sync="modalConfig.dialogVisible"
        >
        <el-form
          :model="editPasswordForm"
          status-icon
          :rules="rulepwd"
          ref="editPasswordForm"
          label-width="100px"
          class="demo-ruleForm"
        >
            <el-form-item label="密码" prop="spassword">
                <el-input
                type="password"
                v-model="editPasswordForm.spassword"
                autocomplete="off"
                style="width:280px"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="spassword2">
                <el-input
                type="password"
                v-model="editPasswordForm.spassword2"
                autocomplete="off"
                style="width:280px"
                ></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;margin-top:20px">
                <el-button type="primary" @click="submitEditPasswordForm('editPasswordForm')">提交</el-button>
                <el-button @click="resetForm('editPasswordForm')">重置</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import request from "utils/http";
import {
  isValiatePw
} from "utils/validate";
export default {
    props:['modalConfig'],
    data(){
        var _this = this;
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!isValiatePw(value) || value.length > 18) {
                callback(new Error("1到12位（字母，数字，下划线，减号）"));
            } else {
                if (_this.editPasswordForm.spassword2 !== "") {
                _this.$refs.editPasswordForm.validateField("spassword2");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            }else if (value !== _this.editPasswordForm.spassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            rulepwd: {
                spassword: [{ validator: validatePass, trigger: "blur" }],
                spassword2: [{ validator: validatePass2, trigger: "blur" }]
            },
            editPasswordForm: {
                spassword: "",
                spassword2: ""
            }
        }
    },
    // watch: {
    //     modalConfig:{
    //         hendler(newValue,oldValue){
    //             debugger;
    //         },
    //         deep:true
    //     }
    // },
    created() {
        
    },
    mounted() {
        let me = this,user = this.$store.getters.user.user;
        // me.editPasswordForm.spassword = user.spassword;
        // me.editPasswordForm.spassword2 = user.spassword;
        me.editPasswordForm.spassword = "123456";
        me.editPasswordForm.spassword2 = "123456";
    },
    methods: {
        submitEditPasswordForm (formName) {
            let _this = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const _this = this,suser = this.$store.getters.user.user.userName;
                    let editPasswordForm = _this.editPasswordForm;
                    request({
                        url: "/zjb/sys/user/update_pwd",
                        method: "post",
                        params: {
                            suser: suser,
                            password: editPasswordForm.spassword
                        }
                    }).then(result => {
                        if (result.status == 200) {
                            if (result.data.code == 0) {
                                _this.$message.error(result.data.msg);
                            } else {
                                _this.$message({
                                type: "success",
                                message: result.data.msg
                                });
                                //重新加载
                                _this.modalConfig.dialogVisible = false;
                                // _this.fetchRemoteData(_this.currentPage, _this.pagesize);
                            }
                        } else {
                            _this.modalConfig.dialogVisible = false;
                            _this.$message.error(result.statusText);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(editPasswordForm) {
            this.$refs[editPasswordForm].resetFields();
        }
     },

}
</script>