<template>
    <div class="container-fluid">
        <wj-calendar :initialized="initCalendar">
        </wj-calendar>
        <div>
            The current date is <b>{{ theCalendar.value | formatDate }}</b>.
        </div>
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
            return {
                theCalendar: {}
            }
        },
        methods: {
            initCalendar: function(calendar){
                this.theCalendar = calendar;
            }
        },
        filters: {
            formatDate: function(time){
                return wijmo.Globalize.format(time, 'D');
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
        margin-bottom: 36px;
    }
</style>
