<template>
    <div class="model-public-cell-single-cell">
        <div class="model-public-cell-single-cell-all-cell">
            <div class="model-public-cell-single-cell-top">{{cellData.name}}</div>

            <div class="model-public-cell-single-cell-bottom">
                <input
                        :disabled = true
                        :style="{color: cellData.value.replace(/,/g, '') * 1 >= 0 ? 'black' : '#e1251b'}"
                        v-model="cellData.value || 0.00"
                        :cellid="cellData.id"
                >
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
    .model-public-cell-single-cell-all-cell {
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

    /*.model-public-cell-single-cell-bottom .el-input__inner {
        background-color: #BCE9F8 !important;
        height: 22px;
        text-align: center;
        font-size: 20px;
        color: #000c17 !important;
        border: 0;
    }*/
    .model-public-cell-single-cell-bottom input {
        background-color: #BCE9F8 ;
        height: 22px;
        text-align: center;
        font-size: 16px;
        color: #000c17 ;
        border: 0;
        padding: 0;
        width: 100%;
        cursor: pointer;
    }

</style>




<!--<style>
    .model-public-cell-single-cell-all-cell {
        width: 170px;
        border-radius: 5px;
        border-left: 4px solid #000c17 ;
        background-color: #ffffff;
    }

    .model-public-cell-single-cell-top, .model-public-cell-single-cell-bottom {
        padding: 4px 4px;
        text-align: left;
    }

    .model-public-cell-single-cell-top {
        font-weight: 700;
        /*background-color: #098692;*/
    }

    .model-public-cell-single-cell-bottom {
        border-radius: 10px;
        /*border: 2px solid #2DB060;*/
        background-color: #ffffff;
        margin-left: 2px;
    }

    .model-public-cell-single-cell-bottom input {
        background-color: #ffffff ;
        height: 22px;
        text-align: left;
        font-size: 19px;
        color: #000c17 ;
        border: 0;
        padding: 0;
        width: 100%;
        cursor: pointer;
    }

</style>-->
