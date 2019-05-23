<template>
    <div>
        <span class="select-name">部门选择:</span>
        <el-select
                v-model="selectedValue"
                placeholder="请选择"
                @change="selectDepartment"
        >
            <el-option
                    v-for="item in options"
                    :key="item.scode"
                    :label="item.sname"
                    :value="item.scode"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import {getDepartments} from '~api/cwtRiskControl/riskControlRequest'
    export default {
        name: "publicRiskSelect",
        components: {},
        props: {
            // options: Array
        },
        data() {
            return {
                options: [],
                selectedValue: '董事会',
            }
        },
        created() {
            this.setSelectOptions();
        },
        mounted() {
        },
        methods: {
            /**
             * 选择不同部门的时候的查询
             * @param item
             */
            selectDepartment(item){
                debugger;
                this.$emit("selectChanged",item);
            },

            /**
             * 获取风险反馈界面部门选择的options
             */
            setSelectOptions() {
                let _this = this,
                    _getters = _this.$store.getters,
                    company = _getters.company;
                let requestParams = {};
                requestParams['company'] = company;

                getDepartments(requestParams).then(res => {
                    if (res.data.code === 200) {
                        _this.options = res.data.data;
                    }
                });
            },

        }
    }
</script>

<style scoped>
    .select-name {
        margin-right: 10px;
    }
</style>