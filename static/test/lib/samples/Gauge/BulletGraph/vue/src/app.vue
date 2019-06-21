<template>
    <div class="container-fluid">
        <div id="dashboard">
            <table>
                <tr v-for="item in dashboard" :key="item.heading">
                    <td>
                        <div class="heading">{{item.heading}}</div>
                        <div class="sub">{{item.sub}}</div>
                    </td>
                    <td>
                        <span v-if="item.actual < item.target" class="glyphicon glyphicon-thumbs-down warning"></span>
                    </td>
                    <td>
                        <wj-bullet-graph :value="item.actual" :target="item.target" :max="item.max" :bad="item.bad"
                            :good="item.good"></wj-bullet-graph>
                    </td>
                    <td>
                        <div class="max">{{item.max | number:'1.0-0'}}</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.gauge';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                dashboard: [
                    { heading: 'Revenue', sub: 'US$, thousands', max: 400, actual: 345, target: 340, bad: 210, good: 300 },
                    { heading: 'Profit', sub: '%', max: 50, actual: 37, target: 32, bad: 20, good: 30 },
                    { heading: 'Order Size', sub: 'US$, average', max: 600, actual: 320, target: 520, bad: 400, good: 500 },
                    { heading: 'New Customers', sub: 'count', max: 1500, actual: 1100, target: 1000, bad: 600, good: 900 },
                    { heading: 'Satisfaction', sub: '0 to 5', max: 5, actual: 4, target: 4.5, bad: 2.5, good: 4.5 },
                ]
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    #dashboard {
        padding: 12px;
        background: rgba(0, 0, 0, .02);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .heading {
        font-weight: bold;
        text-align: right;
    }

    .sub {
        font-size: 70%;
        text-align: right;
    }

    .max {
        font-size: 70%;
    }

    .warning {
        color: darkred;
        padding-left: 12px;
    }

    .container-fluid .wj-gauge {
        margin-left: 1em;
        margin-right: 1em;
        margin-bottom: 6px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
