<template>
    <div class="Root">




            <el-form :model="ruleForm2" label-position='left' label="123" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">




                <el-form-item  prop="name_item">

                    <div class="itemUserName">
                        <img src="@a/user_icon/name_icon.svg" >
                       <span class="itemSpan" >姓名：</span>
                        <el-input placeholder="请输入姓名..." stripe style="width: 300px"  v-model="userdata.username" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/tel_icon.svg" >
                        <span  class="itemSpan" >手机号：</span>
                        <el-input  placeholder="请输入手机号码..." stripe style="width: 300px"  v-model="userdata.phone" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/juese_icon.svg" >
                        <span class="itemSpan">所属角色：</span>

                        <el-select  stripe style="width: 300px"  v-model="value5" filterable multiple placeholder="请选择所属角色">
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


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/mail_icon .svg" >
                        <span class="itemSpan">Email邮箱：</span>
                        <el-input  placeholder="请输入邮箱..." stripe style="width: 300px"  v-model="userdata.email" autocomplete="off"></el-input>
                    </div>
                </el-form-item>


                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/conpany_icon.svg" >
                        <span class="itemSpan">所属公司：</span>

                        <el-cascader stripe style="width: 300px"
                                :options="options2"
                                :show-all-levels="false"
                                     filterable
                        ></el-cascader>

                        <!--<el-input placeholder="请输入所属公司..." stripe style="width: 300px"  v-model="userdata.company" autocomplete="off"></el-input>-->
                    </div>
                </el-form-item>

                <el-form-item  prop="pass">

                    <div class="itemUserName">
                        <img src="@a/user_icon/bumen_icon.svg" >
                        <span class="itemSpan">所属部门：</span>
                        <el-input  placeholder="请输入所属部门..." stripe style="width: 300px"  v-model="userdata.department" autocomplete="off"></el-input>
                    </div>
                </el-form-item>




                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>


<script>
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };


            return {




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
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    role: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
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

    

    .Root{
        width:100% ;
        min-width: 600px;


        .demo-ruleForm{

            margin: 30px;
            padding: 20px;
            background:#ffffff;
            box-shadow:3px 0px 20px rgba(0,0,0,0.1);
            opacity:1;
            border-radius:20px;
        }

        .itemUserName{

            display: flex;

            .itemSpan{
                width: 120px;
                padding-left: 30px;
            }
        }


    }
</style>