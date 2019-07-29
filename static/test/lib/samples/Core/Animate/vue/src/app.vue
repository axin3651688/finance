<template>
    <div class="container-fluid">
        <button class="btn btn-default" @click="animate">
            Flip the Grid
        </button>

        <wj-flex-grid ref="flexGrid" :itemsSource="data" :initialized='initialized'>
        </wj-flex-grid>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as grid from '@grapecity/wijmo.grid';
    import '@grapecity/wijmo.vue2.grid';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
    name: "app",
    data: function() {
        return {
        data : getData()
        };
    },
    methods:{
        animate:function() {
            wijmo.animate((pct) => {
                //
                // calculate transform for given percent (zero to one)
                let xform = '';
                if (pct < 1) {
                    if (pct > 0.5) pct = pct - 1;
                    xform = 'rotateY( ' + (pct * 180) + 'deg)';
                }
                //
                // apply the transform to the grid element
                this.control.hostElement.style.transform = xform;
            }, 2000); // animate for two seconds
        },
        initialized:function(control){
            this.control = control;
        }
    }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 2in;
    }

    .container-fluid {
        perspective: 1000px;
    }
</style>