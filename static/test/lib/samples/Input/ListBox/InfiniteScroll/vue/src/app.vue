<template>
    <div class="container-fluid">
        <wj-list-box :itemsSource="data" :initialized="setupScrolling"></wj-list-box>
        <p id="count">
        </p>
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
                data: getData()
            }
        },
        methods: {
            setupScrolling: function(ctrl){
                // add elements when the user scrolls to the bottom of the list
                ctrl.hostElement.addEventListener('scroll', e => {
                    let el = e.target;
                    //
                    // near the bottom?
                    if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
                        //
                        // add five elements to the list
                        let arr = ctrl.itemsSource;
                        for (let i = 0; i < 5; i++) {
                            arr.push('item ' + arr.length)
                        }
                        //
                        // refresh the list and keep the scroll top
                        let top = el.scrollTop;
                        ctrl.collectionView.refresh();
                        el.scrollTop = top;
                        //
                        // show how many items we have
                        let cnt = document.querySelector('#count');
                        cnt.textContent = `The list now has ${arr.length} items.`;
                    }
                });
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-listbox {
        height: 200px;
        width: 200px;
        margin-left: 2em;
    }

    .container-fluid .wj-listbox-item {
        line-height: 2.5em;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
