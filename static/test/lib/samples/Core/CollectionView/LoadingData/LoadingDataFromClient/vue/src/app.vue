<template>
    <div class="container-fluid">
        <ul>
            <li v-for="item in data.items" :key="item.id">
                <b>{{ item.country }}</b> sales: {{ formatData(item.sales, 'n*')}} (id: {{ item.id }})
            </li>
        </ul>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';
    
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ['country'] // sort by country
                })
            }
        },
        methods:{
            formatData(value, fmt) {
                return wijmo.Globalize.format(value, fmt);
            }
        }
    })
</script>
