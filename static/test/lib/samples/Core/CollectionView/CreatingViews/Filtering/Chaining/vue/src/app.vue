<template>
    <div class="container-fluid">
        <div class="form-group row">
            <div class="col-xs-2">
                <input class="form-control" placeholder="country filter"
                    v-on:input="updateFilter($event)" />
            </div>
        </div>

        <p>
            Result ({{ view2.items.length }} items):
        </p>

        <wj-flex-grid :items-source="view2" :show-alternating-rows=false headers-visibility="Column">
            <wj-flex-grid-filter></wj-flex-grid-filter>
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
        computed:{
            view2: function(){
                return new wjCore.CollectionView(this.view.items);
            }
        },
        methods:{
            updateFilter(e) {
                // update first CollectionView's filter
                this.view.filter = (item) => {
                    return e.srcElement.value
                        ? item.country.toLowerCase().indexOf(e.srcElement.value.toLowerCase()) > -1
                        : true;
                }
                //
                // update second collection view's sourceCollection
                this.view2.sourceCollection = this.view.items;
            }
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