<template>
    <div class="main">

        <div class="item-row" v-for="item in appData">
            <div class="left-item">
                <img :src="item.avatar" class="left-img"/>
                <div class="left-text">{{item.text}}</div>
            </div>
            <el-switch
                    v-model="item.accredit"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#3BB75E"
                    inactive-color="#F5222D">
            </el-switch>
        </div>

        <div class="row-save">
            <el-button type="primary" @click="clickSave" class="btn-save">保存
            </el-button>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {FIND_ROLE_ACCREDIT_APPS, SAVE_ROLE_ACCREDIT_APPS} from '~api/organize.js';

    export default {
        name: "Tab2",
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        data() {

            return {
                preData: [],
                appData: []
            }
        },
        created() {
            this.getAppData()
        },
        methods: {
            getAppData() {
                FIND_ROLE_ACCREDIT_APPS(this.selectRole.id).then(res => {
                    console.log('FIND_ROLE_ACCREDIT_APPS：', res.data.data)
                    if (res.data.code === 200) {
                        this.preData = res.data.data
                        this.appData = JSON.parse(JSON.stringify(this.preData))
                    }

                }).catch(err => {
                    console.log('FIND_ROLE_ACCREDIT_APPS：', err)
                });
            },
            clickSave() {
                let updateList = []
                for (let i = 0; i < this.appData.length; i++) {
                    for (let j = 0; j < this.preData.length; j++) {
                        if (this.appData[i].id == this.preData[j].id) {
                            if (this.appData[i].accredit != this.preData[i].accredit) {
                                let temp = {
                                    'accredit': this.appData[i].accredit,
                                    'moduleId': this.appData[i].id
                                }
                                updateList.push(temp)
                            }
                        }
                    }
                }
                console.log('updateList：', updateList)
                if (updateList.length === 0) {
                    this.$message({
                        showClose: true,
                        message: '未进行修改',
                        type: 'warning'
                    });
                    return
                }


                let params = {
                    "updateList": updateList,
                    "roleId": this.selectRole.id
                }
                SAVE_ROLE_ACCREDIT_APPS(params).then(res => {
                    console.log('请求SAVE_ROLE_ACCREDIT_APPS：', res.data)
                    if (res.data.code === 200) {
                        this.getAppData(this.selectRole.id)
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log('请求SAVE_ROLE_ACCREDIT_APPS：', err)
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .main {
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
        opacity: 1;
        padding: 20px;
        border-radius: 0 0 20px 20px;

        .item-row {
            padding: 14px 40px 14px 40px;
            background: rgba(230, 166, 166, 0);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px;
            border-bottom-style: solid;
            border-bottom-color: rgba(165, 171, 177, 0.4);

            .left-item {
                display: flex;
                align-items: center;
                justify-content: start;

                .left-img {
                    margin-left: 20px;
                    height: 46px;
                    border-radius: 50%;
                    width: 46px;
                }

                .left-text {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    margin-left: 30px;
                    color: rgba(102, 102, 102, 0.80);
                    opacity: 1;
                }
            }

        }

        .row-save {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            .btn-save {
                width: 140px;
                height: 50px;
                background: rgba(24, 144, 255, 1);
                box-shadow: 0px 3px 6px rgba(64, 65, 65, 0.4);
                opacity: 1;
                border-radius: 12px;
            }
        }
    }


</style>