<template>
    <div class="container-fluid">
        <label>
            <input id="allowDragging" type="checkbox" checked="checked" @click="onAllowDraggingClick">
            allow dragging
        </label>
        <br>
        <label>
            <input id="allowDraggingParentNodes" type="checkbox" checked="checked">
            allow dragging parent nodes
        </label>
        <br>
        <label>
            <input id="allowDroppingIntoEmpty" type="checkbox" checked="checked">
            allow dropping into empty nodes
        </label>

        <wj-tree-view
            :itemsSource="data"
            displayMemberPath="header"
            childItemsPath="items"
            imageMemberPath="img"
            :showCheckboxes=true
            :allowDragging=true
            :drag-start="onDragStart"
            :drag-over="onDragOver"
            :initialized="initialized">
        </wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    import * as WjNav from '@grapecity/wijmo.nav';

    new Vue({
        el: "#app",
        data: function() {
            return {
                data: getData()
            };
        },
        methods: {
            onDragStart(s, e) {
                if (e && e.node && e.node.hasChildren) {
                    if (!document.getElementById('allowDraggingParentNodes').checked) {
                        e.cancel = true; // prevent dragging parent nodes
                    } else {
                        e.node.isCollapsed = true; // collapse parent nodes when dragging
                    }
                }
            },

            onDragOver(s, e) {
                if (!document.getElementById('allowDroppingIntoEmpty').checked &&
                    !e.dropTarget.hasChildren && e.position == WjNav.DropPosition.Into)
                {
                    e.position = WjNav.DropPosition.Before;
                }
            },

            onAllowDraggingClick(e) {
                this.control.allowDragging = e.target.checked;
            },

            initialized(s) {
                this.control = s;
            }
        }
    });
</script>

<style>
    .container-fluid .wj-treeview {
        display: block;
        height: 350px;
        font-size: 120%;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    body {
        margin-bottom: 24pt;
    }
</style>
