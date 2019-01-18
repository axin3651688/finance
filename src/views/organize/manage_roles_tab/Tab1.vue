<template>
    <div class="main">
        <el-checkbox :indeterminate="isIndeterminate" v-show="rightList.length>0" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
            <div v-for="i in 99">
                <el-checkbox v-for="right in rightList.filter(data=>data.sort===i)" :label="right" :key="right.varName">{{right.name }}</el-checkbox><br>
            </div>

        </el-checkbox-group>


        <div class="row-save">
            <el-button type="primary" @click="updateRight" v-show="rightList.length>0" class="btn-save">保存
            </el-button>
        </div>
    </div>
</template>

<script>
    import {FIND_ROLE_ACCREDIT_ADMIN, SAVE_ROLE_ACCREDIT_ADMIN} from '~api/organize.js';

    export default {
        name: "Tab1",
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        watch: {
            selectRole(val) {
                this.getData()
            }
        },
        data() {

            return {
                time: null,
                checkAll: false,
                checkedList: [],
                rightList: [],
                preList: [],
                isIndeterminate: true
            }
        },
        created() {
            this.getData()
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedList = val ? this.rightList : [];
                this.isIndeterminate = false;
                console.log('handleCheckAllChange', this.checkedList)
            },
            handleCheckedChange(value) {
                console.log('handleCheckedChange', value)
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.rightList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.rightList.length;
            },
            getData() {
                FIND_ROLE_ACCREDIT_ADMIN(this.selectRole.id).then(res => {
                    this.rightList = res.data.data
                    //复制一份元数据
                    this.preList = JSON.parse(JSON.stringify(res.data.data))
                    let temp = []
                    res.data.data.forEach(right => {
                        if (right.accredit !== 0) {
                            temp.push(right)
                        }
                    })
                    this.checkedList = temp
                    console.log('请求FIND_ROLE_ACCREDIT_ADMIN：', res.data.data)
                }).catch(err => {
                    console.log('请求FIND_ROLE_ACCREDIT_ADMIN：', err)
                });
            },

            updateRight() {
                //遍历出一个修改后的列表
                let tempAll = JSON.parse(JSON.stringify(this.preList))
                for (let i = 0; i < tempAll.length; i++) {
                    tempAll[i].accredit = 0
                    for (let j = 0; j < this.checkedList.length; j++) {
                        this.checkedList[j].accredit = 1
                        if (tempAll[i].varName === this.checkedList[j].varName) {
                            tempAll[i].accredit = this.checkedList[j].accredit
                        }
                    }
                }
                console.log('遍历出一个修改后的列表：tempAll', tempAll)
                console.log('员列表列表：tempAll', this.preList)
                //再和原来的列表进行比对，找出修改的项目
                let apiAccredits = []
                for (let i = 0; i < tempAll.length; i++) {
                    for (let j = 0; j < this.preList.length; j++) {
                        if (tempAll[i].varName === this.preList[j].varName && tempAll[i].accredit !== this.preList[j].accredit) {
                            let tempItem = {
                                'accredit': tempAll[i].accredit,
                                'apiId': tempAll[i].varName,
                            }
                            apiAccredits.push(tempItem)
                        }
                    }
                }
                console.log('再和原来的列表进行比对，找出修改的项目：apiAccredits', apiAccredits)
                if (apiAccredits.length > 0) {
                    let params = {
                        'apiAccredits': apiAccredits,
                        'roleId': this.selectRole.id
                    }
                    console.log('params：', params)
                    SAVE_ROLE_ACCREDIT_ADMIN(params).then(res => {
                        if (res.data.code==200){
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                    }).catch(err => {
                        console.log('SAVE_ROLE_ACCREDIT_ADMIN：', err)
                    });
                }else {
                    this.$message({
                        showClose: true,
                        message: '未进行修改',
                        type: 'warning'
                    });
                }

            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .main {
        padding: 30px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
        opacity: 1;
        border-radius:  0 0 20px 20px;

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

        /deep/ .el-checkbox__label {
            font-size: 14px;
            font-family: Microsoft YaHei;
        }
    }

    /deep/ .el-checkbox + .el-checkbox {
        margin-left: 0px;
    }

    /deep/ .el-checkbox {
        margin-top: 20px;
        margin-right: 25px;
    }
</style>