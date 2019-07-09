<template>
    <div class="model-public-cell-single-cell">
        <div class="model-public-cell-single-cell-all">
            <div class="model-public-cell-single-cell-top-ccell">{{cellData.name}}</div>

            <div class="model-public-cell-single-cell-bottom">
                <el-input
                        :disabled=false
                        v-model="bottom"
                        :cellid="cellData.nid"
                        @blur="inputBlurEvent"
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
        watch: {
            'cellData.value'(a, b) {
                this.initData(a);
            }
        },
        data() {
            return {
                bottom: 0
            }
        },
        created() {
            this.initData();
        },
        mounted() {
        },
        methods: {
            initData(a) {
                a = a || this.cellData['value'];
                this.bottom = this.setNumberToStander(a);
            },
            inputBlurEvent(params) {
                let _this = this;
                let _value = params.currentTarget.value;
                let _cellid = params.currentTarget.attributes[2].value;
                let _data = {
                    id: _cellid,
                    value: _value
                };
                _this.$emit('cellDatachange', _data)
            }
        }
    }
</script>

<style>
    .model-public-cell-single-cell-all {
        width: 170px;
    }

    .model-public-cell-single-cell-top-ccell, .model-public-cell-single-cell-bottom {
        padding: 8px;
        text-align: center;
    }

    .model-public-cell-single-cell-top-ccell {
        background-color: #61BFEC;
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