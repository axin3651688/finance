<template>
    <div>


        <div class="parent">
            <div class="title">天津食品集团有限公司风险组织架构图</div>

            <span class="dsh" @click="deptClick(leaderList.dsh)">
                {{leaderList.dsh.value}}
            </span>

            <span class="dshbgs" @click="deptClick(leaderList.dshbgs)">
                {{leaderList.dshbgs.value}}
            </span>

            <span class="fxglwyh" @click="deptClick(leaderList.fxglwyh)">
                {{leaderList.fxglwyh.value}}
            </span>

            <span class="jyc" @click="deptClick(leaderList.jyc)">
                {{leaderList.jyc.value}}
            </span>

            <span class="fxglldxz" @click="deptClick(leaderList.fxglldxz)">
                {{leaderList.fxglldxz.value}}
            </span>


            <div class="first-svg">
                <svg width="121px" height="160px">
                    <polyline points="1,80 60,80 60,1 60,160 60,110 120,110" fill="none" stroke="black"
                              stroke-width="2"/>

                </svg>
            </div>

            <div class="second-svg">
                <svg width="1001px" height="120px">
                    <polyline points="20,120 20,100 500,100 500,1 500,50 560,50 500,50 500,100 985,100 985,120"
                              fill="none" stroke="black" stroke-width="2"/>
                </svg>
            </div>

            <div class="single-dept">
                <div
                        v-for="(item, key) in deptList"
                        :key="key"
                        class="dept"
                        @click="deptClick(item)"
                >
                    {{item.value}}
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "organization",
        components: {},
        props: {},
        data() {
            return {
                leaderList: {
                    dsh: {
                        id: '001',
                        value: '董事会'
                    },
                    dshbgs: {
                        id: '001',
                        value: '董事会办公室'
                    },
                    fxglwyh: {
                        id: '001',
                        value: '风险管理委员会'
                    },
                    jyc: {
                        id: '001',
                        value: '经营层'
                    },
                    fxglldxz: {
                        id: '001',
                        value: '风险管理领导小组'
                    },
                },
                deptList: {
                    dwbgs: {
                        id: '001',
                        value: '党委办公室'
                    },
                    zzb: {
                        id: '001',
                        value: '组织部'
                    },
                    xcb: {
                        id: '001',
                        value: '宣传部（企业文化部）'
                    },
                    jjjcs: {
                        id: '001',
                        value: '纪检监察室'
                    },
                    gh: {
                        id: '001',
                        value: '工会'
                    },
                    tzb: {
                        id: '001',
                        value: '统战部'
                    },
                    tw: {
                        id: '001',
                        value: '团委'
                    },
                    lgbfwb: {
                        id: '001',
                        value: '老干部服务部'
                    },
                    xzbgs: {
                        id: '001',
                        value: '行政办公室'
                    },
                    fwb: {
                        id: '001',
                        value: '法务部'
                    },
                    cwb: {
                        id: '001',
                        value: '财务部（财务风控办公室）'
                    },
                    ghytzb: {
                        id: '001',
                        value: '规划与投资部'
                    },
                    zcglb: {
                        id: '001',
                        value: '资产管理部'
                    },
                    tdfcb: {
                        id: '001',
                        value: '土地房产部'
                    },
                    qyyyb: {
                        id: '001',
                        value: '企业运营部'
                    },
                    nksyb: {
                        id: '001',
                        value: '农垦事业部'
                    },
                    rlzyb: {
                        id: '001',
                        value: '人力资源部'
                    },
                    ajb: {
                        id: '001',
                        value: '安技部'
                    },
                    bwbxfb: {
                        id: '001',
                        value: '保安部、信访办'
                    },
                    sjb: {
                        id: '001',
                        value: '审计部'
                    },
                    zgcsbgs: {
                        id: '001',
                        value: '总工程师办公室'
                    },
                    fxgkb: {
                        id: '001',
                        value: '风险管控部'
                    }
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * 部门点击事件
             * @param params
             */
            deptClick(params) {
                // debugger;
            }
        }
    }
</script>

<style scoped>
    .parent {
        position: relative;
        width: 1000px;
        height: 800px;
        margin-left: 200px;
        margin-top: 50px;
    }

    .title {
        font-size: 30px;
        text-align: center;
    }

    .dsh, .dshbgs, .fxglwyh, .jyc, .fxglldxz {
        position: absolute;
        padding: 8px 36px;
        border: 1px solid darkgray;
        border-radius: 3px;
        cursor: pointer;
    }

    .dsh {
        left: 440px;
        top: 50px;
    }

    .dshbgs {
        top: 142px;
        left: 271px;
    }

    .fxglwyh {
        top: 174px;
        left: 560px;
    }

    .jyc {
        top: 242px;
        left: 440px;
    }

    .fxglldxz {
        top: 300px;
        left: 560px;
    }

    .first-svg, .second-svg, .single-dept {
        position: absolute;
    }

    .first-svg {
        top: 82px;
        left: 440px;
    }

    .second-svg {
        top: 274px;
    }

    .single-dept {
        display: flex;
        top: 394px;
    }

    .dept {
        width: 38px;
        word-wrap: break-word;
        padding: 10px;
        margin-right: 8px;
        border: 1px solid darkgray;
        border-radius: 3px;
        cursor: pointer;
    }
</style>