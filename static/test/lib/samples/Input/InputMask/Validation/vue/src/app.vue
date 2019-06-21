<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="clearIncomplete" class="form-check-label">Clear Incomplete:</label>
            <input id="clearIncomplete" class="form-check-input" type="checkbox" v-model="clearIncomplete">
        </div>

        <wj-input-mask :mask="'000-00-0000'" :placeholder="'SSN'" :isRequired="false" :value="''"
            :valueChanged="validateMask" :lostFocus="lostFocus"></wj-input-mask>

        <wj-input-mask :mask="'00000'" :placeholder="'Zip Code'" :isRequired="false" :value="''"
            :valueChanged="validateMask" :lostFocus="lostFocus"></wj-input-mask>

        <wj-input-mask :mask="'00000-0000'" :placeholder="'Zip Code + 4'" :isRequired="false" :value="''"
            :valueChanged="validateMask" :lostFocus="lostFocus"></wj-input-mask>

        <wj-input-mask :mask="'(999) 000-0000'" :placeholder="'Phone Number'" :isRequired="false" :value="''"
            :valueChanged="validateMask" :lostFocus="lostFocus"></wj-input-mask>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                clearIncomplete: true
            }
        },
        methods:{
            validateMask: function(ctrl) {
                wijmo.toggleClass(ctrl.hostElement, 'state-invalid', !ctrl.maskFull);
            },
            lostFocus: function(ctrl) {
                if (!ctrl.maskFull && !ctrl.isRequired && this.clearIncomplete) {
                    ctrl.value = '';
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .state-invalid {
        color: red;
    }

    label {
        width: 180px;
        text-align: right;
    }

    .container-fluid .wj-inputmask {
        margin-right: 3px;
    }

    body {
        margin-bottom: 24px;
    }
</style>
