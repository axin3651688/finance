<template>
    <div class="container-fluid">
        <wj-combo-box :itemsSource="data" :displayMemberPath="'header'" :selectedIndex="1"
            :format-item="formatItem"></wj-combo-box>
        <p>
            The same technique applies to the <b>AutoComplete</b>
            control:
        </p>
        <wj-auto-complete :itemsSource="data" :displayMemberPath="'header'" :selectedIndex="1"
            :format-item="formatItem"></wj-auto-complete>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getOptions } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getOptions(),
            }
        },
        methods: {
            formatItem(sender, e) {
                let dataItem = e.data;
                if (dataItem.category) {
                    e.item.classList.add('category');
                    e.item.classList.add('wj-state-disabled');
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-listbox-item.category {
        padding-top: 4px;
        padding-left: 5px;
        font-size: 120%;
        font-weight: bold;
        background: #f0f0f0;
        color: #808080;
        position: sticky;
        top: 0;
        opacity: 1;
    }

    .container-fluid .wj-combobox {
        margin-bottom: 12px;
    }

    body {
        margin-bottom: 24px;
    }
</style>
