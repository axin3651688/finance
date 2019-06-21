<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="showGroups" class="form-check-label">Show Groups</label>
            <input id="showGroups" class="form-check-input" type="checkbox" v-model="showGroups">
        </div>

        <div class="row">
            <div class="col-xs-6">
                <h4>
                    ComboBox:
                </h4>
                <wj-combo-box :items-source="view" :show-groups="showGroups"></wj-combo-box>
            </div>
            <div class="col-xs-6">
                <h4>
                    ListBox:
                </h4>
                <wj-list-box :items-source="view" :show-groups="showGroups"></wj-list-box>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';
    import { WjInputModule } from '@grapecity/wijmo.vue2.input';

    new Vue({
        el: '#app',
        data: {
            showGroups: true
        },
        computed:{
            view: function(){
                // create GroupDescription to group by initial
                let gdInitial = new wijmo.GroupDescription();
                gdInitial.groupNameFromItem = item => item[0];
                //
                // get grouped CollectionView
                return new wijmo.CollectionView(getData(), {
                    sortDescriptions: [''],
                    groupDescriptions: [gdInitial],
                    currentItem: null
                });
            }
        }
    })
</script>

<style>
    .container-fluid .wj-listbox {
        height: 200px;
        display: block;
    }

    .container-fluid .wj-listbox .wj-listbox-item {
        line-height: 2em;
    }

    .container-fluid .wj-listbox .wj-listbox-item.wj-header {
        opacity: 1;
        position: sticky;
        top: 0;
        font-size: 125%;
    }

    label {
        margin-right: 3px;
    }

    body {
        margin-bottom: 40pt;
    }
</style>