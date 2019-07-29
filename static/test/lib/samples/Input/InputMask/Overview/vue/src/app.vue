<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theSSN">Social Security Number</label>
            <wj-input-mask id="theSSN" :mask="'000-00-0000'"></wj-input-mask>
        </div>

        <div class="form-group">
            <label for="theZip">Zip Code</label>
            <wj-input-mask id="theZip" :mask="'00000'"></wj-input-mask>
        </div>

        <div class=" form-group">
            <label for="theZip4">Zip+4 Code</label>
            <wj-input-mask id="theZip4" :mask="'00000-0000'"></wj-input-mask>
        </div>

        <div class="form-group">
            <label for="thePhone">Phone Number</label>
            <wj-input-mask id="thePhone" :mask="'(999) 000-0000'"></wj-input-mask>
        </div>

        <p>
            By default, typing into the <b>InputMask</b> inserts text at the cursort position. In some cases, you may
            want to overwrite the text instead. Click the checkbox below to see the difference:
        </p>


        <label>
            Enable Overwrite
            <input type="checkbox" v-model="overwrite">
        </label>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                overwrite: false
            }
        },
        mounted: function(){
            document.body.addEventListener('keypress', e => {
                if (this.overwrite) { // overwrite enabled
                    let input = e.target;
                    //
                    if (input.tagName == 'INPUT') { // target is input element
                        if (wijmo.closest(input, '.wj-inputmask')) { // contained in an InputMask control
                            let value = input.value,
                                start = input.selectionStart;
                            //
                            input.value = value.substr(0, start) + value.substr(start + 1);
                            input.selectionEnd = start;
                        }
                    }
                }
            })
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 180px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 48px;
    }
</style>
