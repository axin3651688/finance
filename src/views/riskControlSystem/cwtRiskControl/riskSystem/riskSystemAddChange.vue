<template>
    <div>
        <el-form ref="form" :model="form" label-width="90px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="制度标题：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发文字号：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="成文日期：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发布日期：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col >
                    <el-form-item label="发文字号：">
                        <input class="file-input" type="file" >
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="foot-button">
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </div>


        </el-form>





    </div>
</template>

<script>
    export default {
        name: "riskSystemAddChange",
        components: {},
        props: {
            riskSystemData: Object
        },
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
.file-input{
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    color: #606266;
    padding: 6px 15px;
    width: 100%;
}
.foot-button{
    text-align: right;
}
</style>