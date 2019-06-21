<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: this._getData()
            }
        },
        methods: {
            _getData: function() {
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                    country: countries[i],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                    });
                }
                return data;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
  margin:10px;
}
body {
  margin-bottom: 12px;
}

/* de-emphasize selected cells when the grid doesn't contain the focus */
.wj-flexgrid:not(.wj-state-focused) .wj-state-selected,
.wj-flexgrid:not(.wj-state-focused) .wj-state-multi-selected {
  background: #ddd;
	color: black;
}

.wj-flexgrid.wj-state-focused .wj-cell.wj-state-selected {
	border: 2px solid orange;
  transition: all 100ms;
}

</style>
