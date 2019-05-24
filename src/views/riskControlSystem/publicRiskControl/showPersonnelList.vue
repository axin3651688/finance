<template>
    <div>
        <div class="personnel-list" v-if="personnelListShow">
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                class="filter-tree"
                :data="dptUserConfig.userDatas"
                show-checkbox
                node-key="id"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
                :props="defaultProps">
            </el-tree>
            <div class="btn-sure">
                <el-button type="primary" @click="checkedSure">确定</el-button>
                <el-button @click="resetChecked">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import riskPublic from "@/utils/riskPublic"
    import { findThirdPartData } from "~api/interface"
    export default {
        name: "showPersonnelList",
        components: {},
        props: {
            personnelListShow: Boolean
        },
        data() {
            return {
                dptUserConfig:{},
                personnelList: [
                    {
                        id: 1,
                        label: '部门A',
                        children: [
                            {
                                id: 3,
                                label: '人员A-1'
                            },
                            {
                                id: 4,
                                label: '人员A-2'
                            },
                            {
                                id: 5,
                                label: '人员A-3'
                            },
                            {
                                id: 6,
                                label: '人员A-4'
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '部门B',
                        children: [
                            {
                                id: 7,
                                label: '人员B-1'
                            },
                            {
                                id: 8,
                                label: '人员B-2'
                            },
                            {
                                id: 9,
                                label: '人员B-3'
                            },
                            {
                                id: 10,
                                label: '人员B-4'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                filterText: ''
            }
        },
        created() {
            this.checkboxChange(true)
        },
        mounted() {
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {

            /**
             * 指定人员搜索
             * @param value
             * @param data
             * @returns {boolean}
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            checkedSure() {
                alert("反馈成功");
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
        }
    }
</script>

<style scoped>
    .personnel-list {
        background: white;
        width: 200px;
        margin-top: 10px;
        border: 1px solid #606266;;
        padding: 5px;
        position: absolute;
        bottom: 100px;
        right: 20px;
        max-height: 354px;
        overflow: auto;
    }

    .btn-sure {
        text-align: right;
        margin-top: 10px;
    }

    .btn-sure button {
        border-radius: 16px;
        padding: 8px 16px;
    }
    .filter-tree {
        max-height: 250px;
        overflow: auto;
    }
</style>