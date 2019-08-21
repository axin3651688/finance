<template>
    <div class="model-public-cell-single-cell">
        <div class="model-public-cell-single-cell-all-ccell">
            <div class="model-public-cell-single-cell-top-ccell">{{cellData.name}}</div>

            <div class="model-public-ccell-single-cell-bottom">
                <input
                        :disabled=false
                        v-model="bottom"
                        :style="{color: cellData.value.replace(/,/g, '') * 1 >= 0 ? 'black' : '#e1251b'}"
                        :cellid="cellData.nid"
                        @blur="inputBlurEvent"
                        @keyup.enter="inputBlurEvent"
                >
            </div>
        </div>
    </div>
</template>

<script>
    import cwtPublicJs from '../../mixin/cwtPublicJS'
    export default {
        name: "ccell",
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
            inputBlurEvent() {
                let _this = this;
                let _value = _this.bottom;
                let _cellid = _this.cellData.nid;
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
    .model-public-cell-single-cell-all-ccell {
        width: 170px;
    }

    .model-public-cell-single-cell-top-ccell, .model-public-ccell-single-cell-bottom {
        padding: 8px;
        text-align: center;
    }

    .model-public-cell-single-cell-top-ccell {
        background-color: #61BFEC;
    }

    .model-public-ccell-single-cell-bottom {
        background-color: #BCE9F8;
    }

    /*.model-public-ccell-single-cell-bottom .el-input__inner {
        background-color: #BCE9F8 ;
        height: 22px;
        text-align: center;
        font-size: 19px;
        color: #000c17 ;
        border: 0;
        padding: 0;
    }*/


    .model-public-ccell-single-cell-bottom input {
        background-color: #BCE9F8 ;
        height: 22px;
        text-align: center;
        font-size: 16px;
        color: #000c17 ;
        border: 0;
        padding: 0;
        width: 100%;
    }

</style>



<!--<style>
    .model-public-cell-single-cell-all-ccell {
        width: 170px;
        border-radius: 5px;
        border-left: 4px solid #2DB060;
        background-color: #ffffff ;
    }

    .model-public-cell-single-cell-top-ccell, .model-public-ccell-single-cell-bottom {

    }

    .model-public-cell-single-cell-top-ccell {
        padding: 8px;
        text-align: left;
        font-weight: 700;
        /*background-color: #61BFEC;*/
    }

    .model-public-ccell-single-cell-bottom {
        padding: 4px 4px;
        text-align: left;
        border-radius: 10px;
        margin-left: 2px;
        border: 0;
        /*border: 2px solid #2DB060;*/
    }



    .model-public-ccell-single-cell-bottom input {
        background-color: #ffffff ;
        height: 22px;
        text-align: left;
        font-size: 19px;
        margin-left: 2px;
        color: #000c17 ;
        border: 0;
        padding: 0;
        width: 100%;
    }

</style>-->

