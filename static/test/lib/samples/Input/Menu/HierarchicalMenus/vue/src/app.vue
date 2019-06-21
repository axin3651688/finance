<template>
    <div class="container-fluid">
        <div class="menubar">
            <wj-menu id="fileMenu" :header="'File'" :displayMemberPath="'header'" :subItemsPath="'items'" :showDropDownButton="false"
                :openOnHover="openOnHover" :isAnimated="isAnimated" :itemsSource="menuTree.fileMenu"
                :itemClicked="menuItemClicked" :initialized="initMenu"></wj-menu>

            <wj-menu id="editMenu" :header="'Edit'" :displayMemberPath="'header'" :subItemsPath="'items'" :showDropDownButton="false"
                :openOnHover="openOnHover" :isAnimated="isAnimated" :itemsSource="menuTree.editMenu"
                :itemClicked="menuItemClicked" :initialized="initMenu"></wj-menu>

            <wj-menu id="formatMenu" :header="'Format'" :displayMemberPath="'header'" :subItemsPath="'items'" :showDropDownButton="false"
                :openOnHover="openOnHover" :isAnimated="isAnimated" :itemsSource="menuTree.formatMenu" :initialized="initMenu">
            </wj-menu>
        </div>

        <p id="menuTarget" ref="menuTarget">
            Wijmo Menus are great!
        </p>

        <label>
            openOnHover
            <input type="checkbox" v-model="openOnHover">
        </label>
        <label>
            isAnimated
            <input type="checkbox" v-model="isAnimated">
        </label>
        <label>
            Right-to-Left
            <input type="checkbox" @change="rtlChanged">
        </label>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.grid';
    import { getMenuTree } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                menuTree: getMenuTree(),
                isAnimated: true,
                openOnHover: true,
                fileMenu: {},
                editMenu: {},
                formatMenu: {},
                menuTarget: {}
            };
        },
        methods: {
            initMenu(menu) {
                this[menu.hostElement.id] = menu;
            },
            menuItemClicked(menu) {
                this.menuTarget.innerHTML = `Thank you for clicking <b><i>${menu.text}</i></b>!`;
            },
            formatMenuCommand(param) {
                let that = this;
                return {
                    executeCommand: function(param){
                        let ts = that.menuTarget.style;
                        let cssStyle = window.getComputedStyle(that.menuTarget, null);

                        switch (param.prop) {
                            case 'face':
                                ts.fontFamily = param.header;
                                break;
                            case 'font':
                                switch (param.header) {
                                    case 'Bold':
                                        ts.fontWeight = ts.fontWeight ? '' : 'bold';
                                        break;
                                    case 'Italic':
                                        ts.fontStyle = ts.fontStyle ? '' : 'italic';
                                        break;
                                    case 'Underline':
                                        ts.textDecoration = ts.textDecoration ? '' : 'underline';
                                        break;
                                    case 'Larger':
                                        ts.fontSize = (parseFloat(cssStyle.fontSize) * 1.2) + 'px';
                                        break;
                                    case 'Smaller':
                                        ts.fontSize = (parseFloat(cssStyle.fontSize) * .8) + 'px';
                                        break;
                                }
                                break;
                            case 'color':
                                ts.color = param.header.toLowerCase();
                                break;
                            case 'background':
                                ts.background = param.header.toLowerCase();
                                break;
                        }
                    },
                    canExecuteCommand: function(param){
                        let ts = that.menuTarget.style;
                        let cssStyle = window.getComputedStyle(that.menuTarget, null);

                        switch (param.prop) {
                            case 'face':
                                return ts.fontFamily != param.header;
                            case 'font':
                                switch (param.header) {
                                    case 'Larger':
                                        return parseFloat(cssStyle.fontSize) < 24;
                                    case 'Smaller':
                                        return parseFloat(cssStyle.fontSize) > 8;
                                }
                                break;
                            case 'color':
                            case 'background':
                                let color = param.header.toLowerCase();
                                return ts.color != color && ts.background != color;
                        }
                        return true;
                    }
                }
            },
            rtlChanged(e) {
                let menubar = document.querySelector('.menubar');
                menubar.setAttribute('dir', e.target.checked ? 'rtl' : 'ltr');
                wijmo.Control.refreshAll(menubar);
            }
        },
        mounted() {
            this.formatMenu.command = this.formatMenuCommand();
            this.menuTarget = this.$refs.menuTarget;
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        margin-bottom: 15px;
        margin-right: 25px;
    }

    /* element affected by the menu commands */
    #menuTarget {
        font-size: 18pt;
        text-align: center;
        padding: 16px;
        margin: 6px 0;
        background: #00c1d5;
        color: black;
        border: 1px solid rgba(0, 0, 0, .25);
    }

    /* bar containing the menus */
    .menubar {
        position: sticky;
        display: flex;
        background: #fddfa7;
        padding: 12px;
        top: 0;
    }

    /* customize wijmo default styles */
    .wj-state-selected {
        color: black;
        background: orange;
    }

    .container-fluid .wj-menu {
        padding: 6px 14px;
        border: none;
        background: transparent;
    }

    .container-fluid .wj-menu:hover,
    .container-fluid .wj-menu.wj-state-focused {
        background: rgba(0, 0, 0, .05);
    }

    .container-fluid .wj-menu .wj-input-group .wj-input-group-btn {
        /* hide the menu's drop-down buttons */
        display: none;
    }

    .wj-listbox.wj-menu-items {
        min-width: 8em;
        border: none;
        background: #fddfa7;
    }

    .wj-listbox.wj-menu-items .wj-listbox-item:not(.wj-separator) {
        padding: 6px 12px;
    }
</style>
