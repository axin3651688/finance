<template>
    <div class="container-fluid">
        <div class="owners">
            <div id="first" class="has-ctx-menu" style="background:#f0a0a0">
                I have a Context Menu.
            </div>
            <div id="second" class="has-ctx-menu" style="background:#a0f0a0">
                I have the same Context Menu.
            </div>
        </div>

        <h4>
            The same approach works with all Wijmo controls:
        </h4>

        <p>
            FlexChart with ContextMenu
        </p>
        <wj-flex-chart id="theChart" class="has-ctx-menu"  :itemsSource="data" :bindingX="'country'">
            <wj-flex-chart-series :binding="'sales'" :name="'Sales'"></wj-flex-chart-series>
            <wj-flex-chart-series :binding="'expenses'" :name="'Expenses'"></wj-flex-chart-series>
        </wj-flex-chart>

        <p>
            FlexGrid with ContextMenu
        </p>
        <wj-flex-grid id="theGrid" class="has-ctx-menu"  :itemsSource="data"></wj-flex-grid>

        <!-- Menu -->
        <wj-menu style="display:none" :header="'Context Menu'" :selectedValuePath="'cmd'" :initialized="initMenu"
            :dropDownCssClass="'ctx-menu'" :itemClicked="menuItemClicked" :itemsSource="itemsSource"
            :displayMemberPath="'header'">
        </wj-menu>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                data: getData(),
                itemsSource: [
                    { header: '<span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;New', cmd: 'cmdNew' },
                    { header: '<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Open', cmd: 'cmdOpen' },
                    { header: '<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save', cmd: 'cmdSave' },
                    { header: '<span class="wj-separator"></span>' },
                    { header: '<span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Exit', cmd: 'cmdExit' }
                ],
                menu: {}
            }
        },
        methods: {
            initMenu: function(menu){
                this.menu = menu;
            },
            itemClicked: function(menu) {
                alert('Running ' + menu.selectedValue);
            },
            menuItemClicked: function(menu) {
                alert('Executing **' + menu.selectedValue + '** for element **' + menu.owner.id + '**');
            }
        },
        mounted: function(){
            // use it as a context menu for one or more elements
            let els = document.querySelectorAll('.has-ctx-menu');
            for (let i = 0; i < els.length; i++) {
                els[i].addEventListener('contextmenu', e => {
                    this.menu.owner = wijmo.closest(e.target, '.has-ctx-menu');
                    if (this.menu.owner) {
                        e.preventDefault();
                        this.menu.show(e);
                    }
                }, true);
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .owners:after {
        content: "";
        clear: both;
        display: block;
    }

    .owners > div {
        float: left;
        margin: 20px;
        padding: 20px;
    }

    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    .container-fluid .wj-flexchart {
        max-height: 250px;
    }

    .wj-content.ctx-menu {
        padding: 3px;
        min-width: 120px;
        background: #FFFBDD;
        overflow: hidden;
    }

    .ctx-menu .wj-listbox-item {
        text-align: center;
        margin: 6px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
