<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="data" :allowAddNew="true" :initialized="initGrid"></wj-flex-grid>

        <wj-popup :initialized="initPopup">
            <div class="wj-dialog-header">
                Deleting Row
            </div>
            <div class="wj-dialog-body" tabindex="-1">
                Do you really want to delete this row?
            </div>
            <div class="wj-dialog-footer">
                <button class="btn btn-primary wj-hide-ok">Yes</button>
                <button class="btn btn-default wj-hide">No</button>
            </div>
        </wj-popup>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                thePopup: {},
                data: getData()
            }
        },
        methods: {
            initPopup: function(popup){
                this.thePopup = popup;
            },
            initGrid: function(grid) {
                grid.hostElement.addEventListener('keydown', e => {
                    let view = grid.collectionView;
                    // looking for ctrl+Delete
                    if (e.ctrlKey && e.keyCode == wijmo.Key.Delete && view.currentItem) {
                        // prevent the grid from getting the key
                        e.preventDefault();
                        // confirm row deletion
                        this.thePopup.show(true, (sender) => {
                            // delete the row
                            if (sender.dialogResult == 'wj-hide-ok') {
                                view.remove(view.currentItem);
                            }
                            // return focus to the grid
                            grid.focus();
                        });
                    }
                }, true);
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-flexgrid {
        height: 300px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
