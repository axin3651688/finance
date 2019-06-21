<template>
    <div class="container-fluid">
        <wj-combo-box :displayMemberPath="'name'" :headerPath="'name'" :itemsSource="data"
            :format-item="formatItem">
        </wj-combo-box>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getData(),
                comboTableItemTemplate: '<div class="item">' +
                    '<h1>{name}</h1>' +
                    '<b>{city}</b> ({state})<br/>' +
                    '{address}<br/>' +
                    'Phone: <b>{phone}</b><br/>' +
                    'Fax: <b>{fax}</b><br/>' +
                    'Website: <a href="{site}" target="_blank">{site}</a><br/>' +
                    '</div>'
            }
        },
        methods: {
            formatItem: function(sender, e){
                let html = wijmo.format(this.comboTableItemTemplate, e.data, (data, name, fmt, val) => {
                    return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
                });
                e.item.innerHTML = html;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }

    .item {
        margin: 8px;
        font-size: 80%;
    }

    .wj-listbox-item h1 {
        font-size: 12pt;
        font-weight: bold;
        margin: 4px -8px;
    }
</style>