<template>
    <div class="container-fluid">
        <p>
            Here's an example: note how the "Date" column contains strings:
        </p>
        <wj-flex-grid :items-source="dataBad"></wj-flex-grid>

        <p>
            Here is a grid showing the same data, this time parsed with a date reviver function:
        </p>
        <wj-flex-grid :items-source="dataGood"></wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';
    
    new Vue({
        el: '#app',
        data: function () {
            var json = getData();
            return { 
                dataBad: JSON.parse(json),
                dataGood : JSON.parse(json, (key, value) => {
                    if (typeof value === 'string') {
                        // Parse dates saved as JSON-strings
                        let m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/);
                        if (m) {
                            return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
                        }
                        //
                        // Parse dates saved as OData-style strings
                        m = value.match(/^\/Date\((\d+)\)$/);
                        if (m) {
                            return new Date(parseInt(m[1]));
                        }
                    }
                    return value;
                })
            }
        }
    })
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    body {
        margin-bottom: 36pt;
    }
</style>
