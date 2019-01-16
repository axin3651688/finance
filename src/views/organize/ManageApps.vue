<template>
    <div  class="right-col">
        <div class="edit-tab">
            <div class="edit-title">已授权应用</div>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addApp" style="margin-right: 20px">添加应用
            </el-button>
        </div>
        <div class="edit-container">
            <div class="item-row" v-for="item in appData" :key="item.id">
                <div class="left-item">
                    <img :src="item.avatar" class="left-img"/>
                    <div class="left-text">{{item.text}}</div>
                </div>
                <el-switch
                        v-model="item.enable"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeStatus($event,item)"
                        active-color="#3BB75E"
                        inactive-color="#F5222D">
                </el-switch>
            </div>

            <div class="row-save">
                <el-button v-show="appData.length>0" type="primary" @click="updateAppData" class="btn-save">保存
                </el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {
        FIND_SUB_COMPANY_LIST,
        FIND_COMPANY_MODULE,
        ENABLE_COMPANY_APPS
    } from '~api/organize.js'

    export default {
        name: 'ManageApps',
        data() {
            return {
                preData:[],
                appData: [],
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created(){
            // this.getCompList()
            this.getAppData(this.user.company.id)
        },
        mounted() {

        },
        methods: {
            getAppData(compId){
                FIND_COMPANY_MODULE(compId).then(res => {
                    console.log('请求FIND_COMPANY_MODULE：', res.data.data)
                    if (res.data.code === 200) {
                        this.preData = res.data.data
                        this.appData =  JSON.parse(JSON.stringify(this.preData)).slice(0)
                        this.appData.forEach(item=>{
                            console.log('item.enable'+item.id, item.enable)
                        })
                    }

                }).catch(err => {
                    console.log('请求FIND_COMPANY_MODULE：', err)
                });
            },
            changeStatus: function ($event, item) {
                console.log($event);
                console.log(this.appData);
                console.log(this.preData);
            },
            updateAppData(){
                let moduleList=[]
                console.log('appData：', this.appData)
                console.log('preData：', this.preData)
                for (let i=0;i<this.appData.length;i++){
                    for (let j=0;j<this.preData.length;j++){
                        if (this.appData[i].id==this.preData[j].id){
                            if (this.appData[i].enable!=this.preData[i].enable){
                                let temp = {
                                    'enable':this.appData[i].enable,
                                    'moduleId':this.appData[i].id
                                }
                                moduleList.push(temp)
                            }
                        }
                    }
                }
                if (moduleList.length>0){
                    let params={
                        "companyId": this.user.company.id,
                        "moduleList": moduleList,
                        "userId": this.loginUserId
                    }
                    console.log('请求ENABLE_COMPANY_APPS：params',params)
                    ENABLE_COMPANY_APPS(params).then(res => {
                        console.log('请求ENABLE_COMPANY_APPS：', res.data)
                        if (res.data.code === 200) {
                            this.getAppData(this.user.company.id)
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                    }).catch(err => {
                        console.log('请求FIND_COMPANY_MODULE：', err)
                    });
                }else {
                    this.$message({
                        showClose: true,
                        message: '未进行修改',
                        type: 'warning'
                    });
                }



            },
            addApp(){
                this.$message({
                    showClose: true,
                    message: '暂未开放',
                    type: 'info'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .containerMain {
        padding-left: 0 !important;
        height: 100vh;
    }
    .right-col {
        width: 100%;
        background: rgba(240, 242, 245, 1);
        height: 100%;

        .edit-tab {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 20px 0px 20px;

            .edit-title {
                font-size: 22px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                opacity: 1;
            }
        }

        .edit-container {
            margin: 20px 40px 0px 20px;
            padding: 20px;
            min-width: 600px;
            min-height: 400px;
            background: rgba(255, 255, 255, 1);
            opacity: 1;
            border-radius: 20px;

            .table-title {
                background: rgba(221, 235, 246, 1);
                box-shadow: 0px 10px 20px rgba(8, 69, 81, 0.1);
                opacity: 1;
                border-radius: 20px 20px 0px 0px;
            }

            .item-row {
                padding: 6px;
                display: flex;
                align-items: center;
                border-bottom-color: rgba(165, 171, 177, 0.4);
                border-bottom-width: 1px;
                border-bottom-style: solid;
                padding: 10px 0px 10px 0px;
                justify-content: space-between;


                .left-item {
                    display: flex;
                    align-items: center;
                    justify-content: start;

                    .left-img {
                        margin-left: 20px;
                        height: 40px;
                        border-radius: 50%;
                        width: 40px;
                        margin-right: 20px;
                    }

                    .left-text {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                        opacity: 1;
                    }
                }
            }
            .row-save{
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                .btn-save{
                    width:140px;
                    height:50px;
                    background:rgba(24,144,255,1);
                    box-shadow:0px 3px 6px rgba(64,65,65,0.4);
                    opacity:1;
                    border-radius:12px;
                }
            }

        }
    }
</style>
