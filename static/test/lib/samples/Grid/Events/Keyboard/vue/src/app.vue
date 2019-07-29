<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid :allowAddNew="true" :itemsSource="data" :initialized="initializeGrid"></wj-flex-grid>
        <wj-popup class="modal-content" :initialized="initPopup">
            <div class="modal-header">Deleting Row</div>
            <div class="modal-body" tabindex="-1">Do you really want to delete this row?</div>
            <div class="modal-footer">
                <button class="btn btn-primary wj-hide-ok">Yes</button>
                <button class="btn btn-default wj-hide">No</button>
            </div>
        </wj-popup>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import "@grapecity/wijmo.vue2.input";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                popup: null
            };
        },
        methods: {
            initPopup: function(popup) {
                this.popup = popup;
            },
            initializeGrid: function(flex) {
                flex.hostElement.addEventListener(
                    "keydown",
                    e => {
                        let view = flex.collectionView;
                        // looking for ctrl+Delete
                        if (
                            e.ctrlKey &&
                            e.keyCode == wijmo.Key.Delete &&
                            view.currentItem
                        ) {
                            // prevent the grid from getting the key
                            e.preventDefault();
                            // confirm row deletion
                            this.popup.show(true, sender => {
                                // delete the row
                                if (sender.dialogResult == "wj-hide-ok") {
                                    view.remove(view.currentItem);
                                }
                                // return focus to the grid
                                flex.focus();
                            });
                        }
                    },
                    true
                );
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        height: 300px;
        margin: 10px 0;
    }
    body {
        margin-bottom: 24pt;
    }
</style>
