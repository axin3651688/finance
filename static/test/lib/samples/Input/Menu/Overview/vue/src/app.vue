<template>
    <div class="container-fluid">
        <wj-menu :header="'File'" :itemClicked="menuItemClicked" :itemsSource="itemSourceFile">
        </wj-menu>

        <wj-menu :header="'Edit'" :itemClicked="menuItemClicked" :itemsSource="itemSourceEdit">
        </wj-menu>
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
        data:function() {
            return {
                itemSourceFile: [
                    '<div><span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;<b>New</b><br><small><i>create a new file</i></small></div>',
                    '<div><span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;<b>Open</b><br><small><i>open an existing file or folder</i></small></div>',
                    '<div><span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;<b>Save</b><br><small><i>save the current file</i></small></div>',
                    '<div class="wj-separator"></div>',
                    '<div><span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;<b>Exit</b><br><small><i>exit the application</i></small></div>'
                ],
                itemSourceEdit: [
                    '<div><span class="glyphicon glyphicon-scissors"></span>&nbsp;&nbsp;<b>Cut</b><br><small><i>move the current selection to the clipboard</i></small></div>',
                    '<div><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;<b>Copy</b><br><small><i>copy the current selection to the clipboard</i></small></div>',
                    '<div><span class="glyphicon glyphicon-paste"></span>&nbsp;&nbsp;<b>Paste</b><br><small><i>insert clipboard content at the cursor position</i></small></div>'
                ]
            }
        },
        methods: {
            menuItemClicked: function(menu) {
                alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-dropdown {
        margin-right: 5px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
