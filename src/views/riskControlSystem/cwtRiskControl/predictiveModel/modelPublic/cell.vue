<template>
    <div class="model-public-cell-single-cell">
        <div class="model-public-cell-single-cell-all">
            <div class="model-public-cell-single-cell-top">{{cellData.name}}</div>

            <div class="model-public-cell-single-cell-bottom">
                <el-input
                        :disabled = true
                        v-model="cellData.value || 0.00"
                        :cellid="cellData.id"
                >
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    import cwtPublicJs from '../../mixin/cwtPublicJS'

    export default {
        name: "cell",
        mixins: [cwtPublicJs],
        components: {},
        props: {
            cellData: Object
        },
        computed: {},
        watch: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style>
    .model-public-cell-single-cell-all {
        width: 170px;
    }

    .model-public-cell-single-cell-top, .model-public-cell-single-cell-bottom {
        padding: 8px;
        text-align: center;
    }

    .model-public-cell-single-cell-top {
        background-color: #098692;
    }

    .model-public-cell-single-cell-bottom {
        background-color: #BCE9F8;
    }

    .model-public-cell-single-cell-bottom .el-input__inner {
        background-color: #BCE9F8 !important;
        height: 22px;
        text-align: center;
        font-size: 20px;
        color: #000c17 !important;
        border: 0;
    }

</style>