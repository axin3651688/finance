<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-4">
                <wj-list-box :displayMemberPath="'country'" :itemsSource="data" :initialized="initListBox"></wj-list-box>
            </div>
            <div class="col-xs-8">
                <p v-if="theListBox.selectedItem">
                    <b>Selection:</b><br/>
                    Index: <b>{{ theListBox.selectedIndex }}</b><br/>
                    Country: <b>{{ theListBox.selectedItem.country }}</b><br/>
                    GDP (US$M): <b>{{ theListBox.selectedItem.gdpm | formatNumber }}</b><br/>
                    Population: <b>{{ theListBox.selectedItem.popk * 1000 | formatNumber }}</b>
                </p>
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
                data: getData(),
                theListBox: {}
            }
        },
        methods: {
            initListBox: function(listBox){
                this.theListBox = listBox;
            }
        },
        filters: {
            formatNumber: function(value){
                return wijmo.Globalize.format(value, 'n0');
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-listbox {
        max-height: 150px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
