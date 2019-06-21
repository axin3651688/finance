<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <wj-multi-auto-complete placeholder="'Select some countries'" :initialized="initMultiAutoComplete"
                    :displayMemberPath="'country'" :itemsSource="data" :selectedIndex="-1">
                </wj-multi-auto-complete>
            </div>
            <div class="col-xs-6">
                <p>
                    <b>Selected Items:</b>
                </p>
                <ul>
                    <li v-for="(item,index) of theMultiAutoComplete.selectedItems" :key="index">
                        {{ item.country }}
                    </li>
                </ul>
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
                theMultiAutoComplete: {}
            }
        },
        methods: {
            initMultiAutoComplete: function(complete){
                this.theMultiAutoComplete = complete;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>
