<template>

    <div v-if="selectCompId">
        <div class="edit-tab">
            <div class="edit-title">{{compInfo.text}}</div>
        </div>
        <div class="edit-container" style="height: 100%">
            <div class="comp-form">

                <img style="width:400px;height:140px;border-radius:15px;" v-if="compInfo.avatar" :src="compInfo.avatar">
                <div class="item-upload" v-else>
                    <i class="el-icon-upload" style="height: 50px;width: 60px;margin-top: 10px"></i>
                    <div class="el-upload__text">请上传公司LOGO</div>
                </div>

                <div class="item-form">
                    <div class="item-img">
                        <img class="img-margin" src="@a/green/name_icon.svg">
                    </div>

                    <span class="input-form">{{compInfo.text}}</span>
                </div>

                <div class="item-form">
                    <div class="item-img">
                        <img class="img-margin" src="@a/green/hangye_icon.svg">
                    </div>

                    <span class="input-form">{{compInfo.industryText}}</span>
                </div>

                <div class="item-form">
                    <div class="item-img">
                        <img class="img-margin" src="@a/green/guimo_icon.svg">
                    </div>
                    <span class="input-form">{{compInfo.rangeText}}</span>
                </div>

                <!--<div class="item-form">-->
                    <!--<div class="item-img">-->
                        <!--<img class="img-margin" src="@a/green/guimo_icon.svg">-->
                    <!--</div>-->

                    <!--<span class="input-form">{{compInfo.typeText}}</span>-->
                <!--</div>-->

                <div class="item-form">
                    <div class="item-img">
                        <img class="img-margin" src="@a/green/dizhi_icon.svg">
                    </div>

                    <span class="input-form">{{compInfo.regionText}}</span>
                </div>

                <div class="text-note">{{compInfo.note}}</div>

            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {
        FIND_COMPANY_BASE_INFO
    } from '~api/organize.js'

    export default {
        name: 'TabShowComp',
        components: {},
        props: {
            selectCompId: {
                type: Number,
            }
        },
        watch: {
            selectCompId(val) {
                this.getBaseInfo()
            }
        },
        data() {
            return {
                compInfo: {},
            }
        },
        computed: {
            ...mapGetters(['user', 'messageStore']),
            loginUserId() {
                return this.user.user.id;
            },
        },
        created() {

        },
        mounted() {
            this.getBaseInfo()
        },
        methods: {
            getBaseInfo() {
                console.log('getBaseInfo')
                FIND_COMPANY_BASE_INFO(this.selectCompId).then(res => {
                    console.log('FIND_COMPANY_BASE_INFO：', res.data.data)
                    if (res.data.code == 200) {
                        this.compInfo = res.data.data
                    }

                }).catch(err => {
                    console.log('请求compList：', err)
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

    /deep/ .el-tree-node__expand-icon {
        font-size: 16px;
    }

    /deep/ .el-tree-node__content {
        padding: 30px 0 30px 0;
        background: rgba(255, 255, 255, 1);

        .is-current {
            background: rgba(24, 144, 255, 1);
        }

        &:hover {
            background: rgba(24, 144, 255, 0.2);
        }
    }

    /deep/ .el-tree-node.is-current.is-focusable {
        > .el-tree-node__content {
            background: rgba(24, 144, 255, 1);
        }
    }

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
        margin: 20px;
        padding: 20px;
        box-shadow: 0px 20px 30px rgba(8, 69, 81, 0.1);
        opacity: 1;
        border-radius: 12px;
        background: rgba(255, 255, 255, 1);
        min-width: 500px;

        .comp-form {
            margin-top: 20px;

            .item-upload {
                width: 400px;
                height: 140px;
                border-radius: 15px;
                background: rgba(232, 232, 232, 0.4);
                border: 1px solid rgba(180, 180, 180, 1);
                opacity: 1;


                display: flex;
                align-items: center;
            }

            .item-form {
                display: flex;
                align-items: center;
                justify-content: start;

                .item-img {
                    width: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .img-margin {

                    }
                }

                .input-form {
                    margin: 14px;
                    width: 260px;
                    height: 40px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    opacity: 1;
                    border-radius: 6px;
                    padding-left: 10px;

                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    line-height: 40px;
                    text-align: left;
                    color: rgba(102, 102, 102, 1);
                }
            }

            .text-note {
                margin: 16px 0 0 20px;
                width: 400px;
                padding: 20px;
                height:140px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(0, 0, 0, 0.2);
                opacity: 1;
                border-radius: 12px;

                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                line-height: 19px;
                color: rgba(102, 102, 102, 1);
            }
        }

        .btn-confirm {
            width: 160px;
            height: 50px;
            background: rgba(24, 144, 255, 1);
            opacity: 1;
            margin-left: 240px;
            border-radius: 20px;


        }
    }

    /deep/ .el-upload-dragger {
        width: 400px;
        height: 140px;
        background: rgba(232, 232, 232, 0.4);

        .el-upload__text {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(64, 64, 64, 0.20);
        }
    }

</style>
