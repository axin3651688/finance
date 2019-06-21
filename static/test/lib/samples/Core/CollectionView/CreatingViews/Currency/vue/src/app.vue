<template>
    <div class="container-fluid">
        <table class="table table-condensed">
            <tr>
                <td>Country</td>
                <td>
                    <wj-combo-box :items-source="view" display-member-path="country">
                    </wj-combo-box>
                </td>
            </tr>
            <tr>
                <td>Downloads</td>
                <td>{{ formatData(view.currentItem.downloads, 'n0') }}</td>
            </tr>
            <tr>
                <td>Sales</td>
                <td>{{ formatData(view.currentItem.sales, 'c') }}</td>
            </tr>
            <tr>
                <td>Expenses</td>
                <td>{{ formatData(view.currentItem.expenses, 'c') }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.input';

    new Vue({
        el: '#app',
        data: function () {
            return { 
                view: new wjCore.CollectionView(getData(), {sortDescriptions: ['country']})
            }
        },
        methods:{
            formatData(value, fmt) {
                return wjCore.Globalize.format(value, fmt);
            }
        }
    })
</script>

<style>
    .table>tbody>tr>td {
        border: none;
    }
</style>