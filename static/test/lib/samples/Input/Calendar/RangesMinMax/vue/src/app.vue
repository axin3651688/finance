<template>
    <div class="container-fluid">
        <wj-calendar :showHeader="false" :min="firstDay" :max="lastDay">
        </wj-calendar>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            let curr = new Date();
            return {
                firstDay: new Date(curr.setDate(curr.getDate() - curr.getDay())),
                lastDay: new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-calendar {
        max-width: 21em;
    }

    body {
        margin-bottom: 24px;
    }
</style>
