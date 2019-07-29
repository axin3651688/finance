<template>
    <div class="container-fluid">
        <label>
            <input type="radio" name="sort" value="" checked="true" />
            No Sort
        </label>
        <label>
            <input type="radio" name="sort" value="country" />
            Sort by Country
        </label>
        <label>
            <input type="radio" name="sort" value="country,sales" />
            Sort by Country and Sales
        </label>
        <label>
            <input type="radio" name="sort" value="country,sales,downloads" />
            Sort by Country, Sales, and Downloads
        </label>

        <p>
            Result:
        </p>
        <wj-flex-grid :items-source="view" :show-sort=true :allow-sorting=false :show-alternating-rows=false
            headers-visibility="Column">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    
    new Vue({
        el: '#app',
        data: function(){
            return {
                view: new wijmo.CollectionView(getData())
            }
        },
        mounted: function(){
            document.addEventListener('change', e => {
                // remove the old sort
                this.view.sortDescriptions.clear();
                //
                // add the new sorts
                (e.target).value.split(',').forEach(prop => {
                    // Sort country in ascending order, other in descending order
                    this.view.sortDescriptions.push(new wijmo.SortDescription(prop, prop === 'country'));
                });
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
