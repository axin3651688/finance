<template>
    <div class="container-fluid">
        <wj-menu displayMemberPath="header" selectedValuePath="value" :itemsSource="source" :selectedItem="selectedItem"
            :header="'Tax: <b>' + selectedItem.header + '</b>'" :selectedIndexChanged="selectedIndexChanged">
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
                { header: 'Exempt', value: 0 },
                { header: '1%', value: 0.01 },
                { header: '5%', value: 0.05 },
                { header: '8.5%', value: 0.085 },
                { header: '10%', value: 0.10 },
                { header: '20%', value: 0.20 }
            ];
            let selectedItem = source[3];
            //
            return { source, selectedItem };
        },
        methods: {
            selectedIndexChanged: function(sender){
                if (sender.selectedIndex >= 0) {
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
