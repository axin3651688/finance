<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="currentTax">Current Tax</label>
            <wj-input-number id="currentTax" :format="'p2'" :min="0" :max="1" :step="0.025" :value="tax">
            </wj-input-number>
        </div>
        <div class="form-group">
            <label for="changeTax">Change Tax</label>
            <wj-menu id="changeTax" :header="'Tax Commands'" :displayMemberPath="'header'" :commandParameterPath="'cmdParam'" :itemsSource="itemSource" :initialized="initMenu">
            </wj-menu>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                tax: 0.0825,
                theMenu: null,
                itemSource: [
                    {header: '<div cmd-param=".50">Increment by 50%</div>', cmdParam: ".50"},
                    {header: '<div cmd-param=".25">Increment by 25%</div>', cmdParam: ".25"},
                    {header: '<div cmd-param=".05">Increment by 5%</div>', cmdParam: ".05"},
                    {header: '<div class="wj-separator"></div>', cmdParam: null},
                    {header: '<div cmd-param="-.05">Decrement by 5%</div>', cmdParam: "-.05"},
                    {header: '<div cmd-param="-.25">Decrement by 25%</div>', cmdParam: "-.25"},
                    {header: '<div cmd-param="-.50">Decrement by 50%</div>', cmdParam: "-.50"}
                ],
                command: {
                    // execute the command
                    executeCommand: (arg) => {
                        arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                        if (wijmo.isNumber(arg)) {
                            this.tax += arg;
                        }
                    },
                    // check if a command can be executed
                    canExecuteCommand: (arg) => {
                        arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                        if (wijmo.isNumber(arg)) {
                            let val = this.tax + arg;
                            return val >= 0 && val <= 1;
                        }
                        return false;
                    }
                }
            }
        },
        methods: {
            initMenu: function(menu){
                this.theMenu = menu;
            }
        },
        mounted: function(){
            // set command object for the tax menu
            this.theMenu.command = this.command;
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 120px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
