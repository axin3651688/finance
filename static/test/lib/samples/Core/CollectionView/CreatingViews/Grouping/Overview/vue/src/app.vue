<template>
    <div class="container-fluid">
        <label>
            <input type="radio" name="filter" value="" checked="true" />
            No Grouping
        </label>
        <label>
            <input type="radio" name="filter" value="country" />
            By Country
        </label>
        <label>
            <input type="radio" name="filter" value="country,product" />
            By Country and by Product
        </label>
        <label>
            <input type="radio" name="filter" value="country,product,sales" />
            By Country, Product, and Sales
        </label>

        <p>
            <button class="btn btn-default" v-on:click="dumpData">
                Show Result on Console
            </button>
        </p>
        <wj-flex-grid :items-source="view" :show-alternating-rows=false headers-visibility="Column">
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
        data:{
            view: new wijmo.CollectionView(getData(), {
                currentItem: null,
                sortDescriptions: [new wijmo.SortDescription('sales', false)]
            })
        },
        methods:{
            dumpData() {
                if (!this.view.groups) {
                    console.log('*** no groups');
                } else {
                    console.log('*** ' + this.view.groups.length + ' groups:');
                    this.view.groups.forEach(group => this.dumpGroup(group, ''));
                }
            },
            dumpGroup(group, level) {
                // show information for this group
                let propName = group.groupDescription['propertyName'],
                    groupName = group.name,
                    groupInfo = propName + ' > ' + groupName; // group summary
                //
                groupInfo += ' (' + group.items.length + ' items)'; // item count
                groupInfo += ' total sales: ' + wijmo.Globalize.format(group.getAggregate(wijmo.Aggregate.Sum, 'sales'), 'c2');
                console.log(level + groupInfo);
                //
                // show subgroups
                if (group.groups) {
                    group.groups.forEach(child => this.dumpGroup(child, level + '  '));
                }
            }
        },
        mounted: function(){
            // change the grouping
            document.addEventListener('change', e => {
                // remove the old groups
                this.view.groupDescriptions.clear();
                //
                // add the new groups
                let filter = e.target;
                if (filter.value) {
                    filter.value.split(',').forEach((prop) => {
                        // group sales by value ranges
                        let pgd;
                        if (prop == 'sales') {
                            pgd = new wijmo.PropertyGroupDescription(prop, (item) => {
                                if (item.sales > 8000) return 'High';
                                if (item.sales > 4000) return 'Medium';
                                return 'Low';
                            });
                        } else { // group others by value
                            pgd = new wijmo.PropertyGroupDescription(prop);
                        }
                        this.view.groupDescriptions.push(pgd);
                    });
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