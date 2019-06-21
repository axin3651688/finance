<template>
    <div class="container-fluid">
        <p>
            Selected item: <b><span id="selected"></span></b>
        </p>
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="detail" :formatItem="onFormatItem"
            :selected-item-changed="onSelectedItemChanged" :initialized="initTreeView"></wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    
    var wjTreeViewControl = null;
    var itemTemplate = '<div class="item">' +
    '<b>{city}</b> ({state})<br/>' +
    '{address}<br/>' +
    'Phone: <b>{phone}</b><br/>' +
    'Fax: <b>{fax}</b><br/>' +
    'Website: <a href="{site}">{site}</a><br/>' +
    '</div>';

    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: _getTreeData(getData()),
                msg: 'Ready'
            }
        },
        methods:{
            initTreeView: function(ctl){
                wjTreeViewControl = ctl;
            },
            onFormatItem: function(s, e) {
                switch (e.level) {
                //
                // level 0: wrap header in an H1 tag
                case 0:
                    e.element.innerHTML = '<h1>' + e.dataItem.header + '<h1>';
                    break;
                //
                // level 1: use template to create details
                case 1:
                    var html = wjCore.format(itemTemplate, e.dataItem, function (data, name, fmt, val ) {
                        if (wjCore.isString(data[name])) {
                            val = wjCore.escapeHtml(data[name]);
                        }
                        return val;
                    });
                    e.element.innerHTML = html;
                    break;
                }

            },
            onSelectedItemChanged: function() {
                var node = wjTreeViewControl.selectedNode;
                if (node && node.parentNode) {
                    node = wjTreeViewControl.selectedNode = node.parentNode;
                }
                node.isCollapsed = false;
                document.getElementById('selected').textContent = node.dataItem.header;
            }
        },
        mounted: function(e) {
            wjTreeViewControl.selectedItem = wjTreeViewControl.itemsSource[0];
            document.getElementById('selected').textContent = wjTreeViewControl.selectedNode.dataItem.header;
            wjTreeViewControl.hostElement.addEventListener("keydown", function(e) {
                var node = null;
                switch (e.keyCode) {
                    case wjCore.Key.Up:
                        node = wjTreeViewControl.selectedNode.previousSibling();
                        break;
                    case wjCore.Key.Down:
                        node = wjTreeViewControl.selectedNode.nextSibling();
                        break;
                }
                if (node) {
                    wjTreeViewControl.selectedNode = node;
                    document.getElementById('selected').textContent = node.dataItem.header;
                    e.preventDefault();
                }
            });
        }
    })

    function _getSelectedNode(){
        var node = wjTreeViewControl.selectedNode;
        if (node && node.parentNode) {
            node = wjTreeViewControl.selectedNode = node.parentNode;
        }
        node.isCollapsed = false;
        document.getElementById('selected').textContent = node.dataItem.header;
    }

    function  _getTreeData(data) {
    var treeData = [];
    for (var i = 0; i < data.length; i++) {
      treeData.push({
        header: data[i].name,
        detail: [data[i]]
      });
    }
    return treeData;
  }
</script>

<style>
    body {
        font-family: 'Segoe UI';
        font-size: 14px;
    }

    .item p {
        margin: 0;
    }

    .item h1 {
        margin-bottom: 0;
        font-size: 20px;
        font-weight: 200;
    }
    
    .container-fluid .wj-treeview {
        margin: 12px;
        padding: 0 12px 12px 12px;
        background: #fafafa;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    /* customize TreeView content */
    .container-fluid .wj-treeview h1 {
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: 200;
    }

    /* hide collapse/expand icons */
    .container-fluid .wj-treeview .wj-nodelist .wj-node:before {
        display: none;
    }

    /* remove selected style */
    .container-fluid .wj-treeview .wj-node.wj-state-selected {
        color: inherit;
        background: transparent;
    }
</style>
