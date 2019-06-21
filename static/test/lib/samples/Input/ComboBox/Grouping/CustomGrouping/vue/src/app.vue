<template>
    <div class="container-fluid">
        <label>
            Show Groups
            <input type="checkbox" checked="checked" @change="onValueChanged">
        </label>

        <div class="row">
            <div class="col-xs-6">
                <h4>
                    ComboBox
                </h4>
                <wj-combo-box :showGroups="showGroups" :itemsSource="data" :selectedIndex=1>
                </wj-combo-box>
            </div>
            <div class="col-xs-6">
                <h4>
                    ListBox
                </h4>
                <wj-list-box :showGroups="showGroups" :itemsSource="data" :selectedIndex=1>
                </wj-list-box>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                showGroups: true,
                data: null
            }
        },
        methods: {
            onValueChanged: function(e){
                this.showGroups = e.target.checked;
            }
        },
        mounted: function(){
            // create GroupDescription to group by initial
            let gdInitial = new wijmo.GroupDescription();
            gdInitial.groupNameFromItem = (item) => item[0];
            // get grouped CollectionView
            this.data = new wijmo.CollectionView(getData(), {
                sortDescriptions: [''],
                groupDescriptions: [gdInitial],
                currentItem: null
            })
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
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
        margin: 0 24px;
    }

    body {
        margin-bottom: 40pt;
    }
</style>
