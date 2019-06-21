<template>
    <div class="container-fluid">
    <label>
        <input type="radio" name="filter" value="" checked="true" />
        No Filter
    </label>
    <label>
        <input type="radio" name="filter" value="country" />
        US only
    </label>
    <label>
        <input type="radio" name="filter" value="sales" />
        Sales > 9,000
    </label>
    <label>
        <input type="radio" name="filter" value="downloads" />
        Downloads > 19,000
    </label>
    <p>
        Result ({{ view.items.length }} items):
    </p>
    <wj-flex-grid :items-source="view" :show-alternating-rows=false headers-visibility="Column">
    </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import { WjGridFilterModule } from '@grapecity/wijmo.vue2.grid.filter';

    new Vue({
        el: '#app',
        data:{
            view: new wjCore.CollectionView(getData())
        },
        mounted: function(){
            document.addEventListener('change', e => {
            let filterType = (e.target).value;
            //
            this.view.filter = (item) => {
                switch (filterType) {
                    case 'country':
                        return item.country == 'US';
                    case 'sales':
                        return item.sales > 9000;
                    case 'downloads':
                        return item.downloads > 19000;
                    default:
                        return true;
                }
            }
        });
        }
    })
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    label {
        width: 100%
    }
</style>