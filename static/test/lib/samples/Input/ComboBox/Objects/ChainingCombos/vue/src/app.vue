<template>
    <div class="container-fluid">
        <wj-combo-box :displayMemberPath="'name'" :itemsSource="countries">
        </wj-combo-box>
        <wj-combo-box :displayMemberPath="'name'" :itemsSource="cities">
        </wj-combo-box>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getCities, getCountries } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {

            // create chained collection views
            let cities = new wijmo.CollectionView(getCities());
            let countries =new wijmo.CollectionView(getCountries(), {
                currentChanged: () => {
                    cities.refresh() // refresh filter
                }
            });
            cities.filter = city => { // define filter
                return city.country === (countries.currentItem).id;
            };

            // expose collection views
            return {
                cities: cities,
                countries: countries
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>
