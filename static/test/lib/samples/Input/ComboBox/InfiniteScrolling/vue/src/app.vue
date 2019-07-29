<template>
    <div class="container-fluid">
        <wj-combo-box :itemsSource="theList" :initialized="initialized">
        </wj-combo-box>
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
                theList: this._loadItems([], 10)
            }
        },
        methods: {
            initialized: function(combo,e) {
                combo.dropDown.addEventListener('scroll', e => {
                    // stop adding items when the list reaches 2,000 items
                    if (this.theList.length < 2000) {
                        let list = e.target;
                        // if the user scrolled near the bottom of the list
                        if (list.scrollTop + list.clientHeight + 100 > list.scrollHeight) {
                            // save scroll top, add items, refresh list, restore scroll top
                            let top = list.scrollTop;
                            this._loadItems(this.theList, 5);
                            combo.collectionView.refresh();
                            list.scrollTop = top;
                        }
                    }
                });
            },
            _loadItems: function(arr, cnt) {
                for (let i = 0; i < cnt; i++) {
                    arr.push('item ' + (arr.length + 1));
                }
                return arr;
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
