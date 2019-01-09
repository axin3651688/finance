<template>
    <div class="main">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    const cityOptions = ['上海2', '北京2', '广州2', '深圳2'];
    export default {
        name: "Tab2",
        // props: ['selectRole'],
        props: {
            selectRole: {
                type: Object,
                default: {}
            }
        },
        data() {

            return {
                time: null,
                checkAll: false,
                checkedCities: ['上海2', '北京2'],
                cities: cityOptions,
                isIndeterminate: true
            }
        },
        created() {
            this.time = new Date()
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .main {
        padding: 30px;

        /deep/.el-checkbox__label {
            font-size: 14px;
            font-family: Microsoft YaHei;
        }
    }
</style>