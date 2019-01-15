<template>
    <div class="Root">

        <div class="content">

            <div class="rootTitle">
                <l class="titleSpan">填写成员信息</l>
                <img class="titileicon" src="@a/user_icon/tishi_icon .svg">
                <!--<l class="titleSpan_right">添加成员后，需要成员激活才能使用</l>-->
                <l class="titleSpan_right">添加成员后，需要成员激活才能使用</l>
            </div>


            <el-form :model="userdata" label-position='left' label="123" status-icon :rules="rules2" ref="userdata"
                     label-width="10px" class="demo-ruleForm">


                <el-form-item prop="username">

                    <div class="formitem">
                        <img src="@a/user_icon/name_icon.svg">
                        <span class="itemSpan">姓名：</span>
                        <el-input placeholder="请输入姓名..." stripe style="width: 300px" v-model="userdata.username"
                                  autocomplete="off"></el-input>

                        <img v-if="username_po" style="margin-left: 20px" src="@a/user_icon/tishi_icon .svg">
                        <span style="margin-left: 20px">{{username_po}}</span>

                    </div>
                </el-form-item>


                <el-form-item prop="phone">

                    <div class="formitem">
                        <img src="@a/user_icon/tel_icon.svg">
                        <span class="itemSpan">手机号：</span>
                        <el-input placeholder="请输入手机号码..." stripe style="width: 300px" v-model="userdata.phone"
                                  autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item prop="role">

                    <div class="formitem">
                        <img src="@a/user_icon/juese_icon.svg">
                        <span class="itemSpan">所属角色：</span>

                        <el-select stripe style="width: 300px" v-model="value5" filterable multiple
                                   placeholder="请选择所属角色">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--<el-input placeholder="请输入所属角色..." stripe style="width: 300px"  v-model="userdata.role" autocomplete="off"></el-input>-->
                    </div>
                </el-form-item>


                <el-form-item prop="email">

                    <div class="formitem">
                        <img src="@a/user_icon/mail_icon .svg">
                        <span class="itemSpan">Email邮箱：</span>
                        <el-input placeholder="请输入邮箱..." stripe style="width: 300px" v-model="userdata.email"
                                  autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item prop="company">

                    <div class="formitem">
                        <img src="@a/user_icon/conpany_icon.svg">
                        <span class="itemSpan">所属公司：</span>

                        <el-cascader stripe style="width: 300px"
                                     :options="options2"
                                     :show-all-levels="false"
                                     filterable
                        ></el-cascader>

                        <!--<el-input placeholder="请输入所属公司..." stripe style="width: 300px"  v-model="userdata.company" autocomplete="off"></el-input>-->
                    </div>
                </el-form-item>

                <el-form-item prop="department">

                    <div class="formitem">
                        <img src="@a/user_icon/bumen_icon.svg">
                        <span class="itemSpan">所属部门：</span>
                        <el-input placeholder="请输入所属部门..." stripe style="width: 300px" v-model="userdata.department"
                                  autocomplete="off"></el-input>

                    </div>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>

        </div>


    </div>
</template>


<script>
    import BiDiv from "../../components/charts/BiDiv";

    import {isvalidPhone,checkUserName} from "../../views/PXView/validate";

    export default {
        components: {BiDiv},
        data() {


            var username=(rule, value,callback)=>{
                if (!value){

                    this.username_po='请输入用户名';
                    callback(new Error('  '))
                }else  if (!checkUserName(value)){
                    callback(new Error('  '))
                    this.username_po='请输入1-5位';
                }else {
                    callback()
                    this.username_po='';
                }
            };



            var validPhone=(rule, value,callback)=>{
                if (!value){

                    this.username_po='请输入电话号码';
                    callback(new Error('  '))
                }else  if (!isvalidPhone(value)){

                    // { required: true, message: '请输入用户名', trigger: 'blur' },
                    // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }

                    callback(new Error('  '))
                    this.username_po='请输入正确的11位手机号码';
                }else {
                    callback()
                }
                // this.username_po='12312'
            };




            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }

            };


            return {

                username_po:'',

                options2: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],


                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value5: [],
                value11: [],
                userdata: {
                    username: '',
                    phone: '',
                    role: '',
                    email: '',
                    company: '',
                    department: '',
                    bycompany: ''
                },
                rules2: {
                    username: [

                        { required: true, trigger: 'blur', validator: username }
                    ],
                    phone: [
                        { required: true, trigger: 'blur', validator: validPhone }
                    ],

                    role: [
                        {validator: checkAge, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],



                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "@ms/index.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }


    .Root {
        width: 100%;
        min-width: 600px;


        }

        .content{

            margin: 30px;
            padding: 20px;
            background: #ffffff;
            box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.1);
            opacity: 1;
            border-radius: 20px;

            .rootTitle {

                display: flex;
                /*flex-direction: column;*/
                margin-left: 10px;
                margin-bottom: 34px;


                .titleSpan {

                    font-size:22px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:29px;
                    color:rgba(102,102,102,1);
                    opacity:1;
                }

                .titileicon{

                    margin-left: 20px;
                }
                .titleSpan_right {

                    margin-left: 20px;
                    font-size: 4px;
                    line-height:29px;
                    font-family: Microsoft YaHei;
                    color: rgba(24, 144, 255, 1);
                }

        }

        .demo-ruleForm {

            .formitem {

                display: flex;

                .itemSpan {
                    width: 120px;
                    padding-left: 30px;
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    /*line-height:21px;*/
                    color:rgba(102,102,102,1);
                    opacity:1;
                }
            }



        }




    }
</style>