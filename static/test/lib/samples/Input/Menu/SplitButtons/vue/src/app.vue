<template>
    <div class="container-fluid">
        <wj-menu :isButton="true" :displayMemberPath="'header'" :selectedValuePath="'value'"
            :header="'Run: <b>' + selectedItem.header + '</b>'" :itemsSource="source"
            :itemClicked="itemClicked" :selectedItem="selectedItem" :selectedIndexChanged="selectedIndexChanged">
        </wj-menu>
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
        data: function() {
            let source = [
                { header: 'Internet Explorer', value: 'IE' },
                { header: 'Chrome', value: 'CHR' },
                { header: 'Firefox', value: 'FFX' },
                { header: 'Safari', value: 'IOS' },
                { header: 'Opera', value: 'OPR' }
            ];
            let selectedItem = source[2];
            return { source, selectedItem };

        },
        methods: {
            itemClicked: function(menu) {
                alert('Running ' + menu.selectedValue);
            },
            selectedIndexChanged: function(sender) {
                if (sender.selectedItem) {
                    this.selectedItem = sender.selectedItem;
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>
