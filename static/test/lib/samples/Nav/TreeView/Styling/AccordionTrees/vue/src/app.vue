<template>
    <div class="container-fluid">
        <div>
            <label>
                Use Custom CSS
                <input id="customCSS" type="checkbox" checked="true" v-on:click="onCustomCSSClick($event)">
            </label>
            <div id="msg" class="msg" v-html="msg"></div>
        </div>
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :is-content-html=true :initialized="initTreeView" class="accordion"></wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
 
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: getData(),
                msg: 'Ready'
            }
        },
        methods:{
            initTreeView: function(ctl){
                this.wjTreeViewControl = ctl;
            },
            onCustomCSSClick(e) {
                wjCore.toggleClass(this.wjTreeViewControl.hostElement, 'accordion', (e.target).checked);
            }
        },
        mounted: function(e) {
            var self = this;
            this.wjTreeViewControl.hostElement.addEventListener("click", function(e) {
                if ((e.target).tagName == 'A') {
                    self.msg = wjCore.format('Navigating to <b>** {href} **</b>', e.target);
                    e.preventDefault();
                }
            });
        }
    })
</script>

<style>
    /* style for messages */
    .msg {
        float: right;
        text-align: right;
        color: orange;
    }

    /* accordion tree styles */
    .accordion.wj-treeview {
        background: transparent;
        box-shadow: none;
    }

    /* hide collapse/expand glyphs */
    .accordion.wj-treeview .wj-nodelist .wj-node:before { 
        display: none;
    }

    /* level 0 nodes (headers) */
    .accordion.wj-treeview .wj-nodelist > .wj-node {
        font-size: 120%;
        font-weight: bold;
        padding: 6px 10px;
        color: white;
        background: #106cc8;
        margin-bottom: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    /* level 1 nodes (navigation items) */
    .accordion.wj-treeview .wj-nodelist > .wj-nodelist > .wj-node {
        font-size: inherit;
        font-weight: normal;
        padding: 4px 1em;
        color: inherit;
        background: inherit;
        box-shadow: none;
    }

    .accordion.wj-treeview .wj-nodelist {
        padding-bottom: 6px;
    }

    /* default trees on this sample */
    .container-fluid .wj-treeview {
        display:block;
        height: 350px;
        font-size: 120%;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    
    body {
        margin-bottom: 24pt;
    }
</style>
