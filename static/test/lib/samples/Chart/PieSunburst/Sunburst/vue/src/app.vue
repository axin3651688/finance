<template>
    <div class="container-fluid">
        <wj-sunburst binding="value" bindingName="year, quarter, month" childItemsPath="items"
            :itemsSource="data" :isAnimated=true selectionMode="Point" selectedItemPosition="Top"
            :selectedItemOffset=0.3
            :palette="['rgba(92,184,92,1)', 'rgba(240,173,78,1)', 'rgba(91,192,222,1)', 'rgba(217,83,79,1)', 'rgba(159,91,222,1)', 'rgba(70,219,140,1)', 'rgba(182,184,110,1)', 'rgba(78,93,108,1)', 'rgba(43,62,75,1)']">

            <wj-flex-pie-data-label position="Center" content="{name}"></wj-flex-pie-data-label>
        </wj-sunburst>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.hierarchical';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-flexchart {
        height: 500px;
    }
</style>
