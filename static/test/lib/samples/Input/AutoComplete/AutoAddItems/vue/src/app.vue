<template>
    <div class="container-fluid">
        <h3>ComboBox</h3>
        <p>Type an item that is not on the list and move the focus to another control to add an item.</p>
        <wj-combo-box :itemsSource="countries" :isEditable="true" :lostFocus="lostFocus">
        </wj-combo-box>

        <h3>AutoComplete</h3>
        <p>Type an item that is not on the list and move the focus to another control to add an item.</p>
        <wj-auto-complete :itemsSource="countries" :lostFocus="lostFocus"></wj-auto-complete>

        <h3>Options</h3>
        <p>Here is the option list (it is updated as items are added to the list):</p>
        <wj-list-box :itemsSource="countries"></wj-list-box>
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
                countries: new wijmo.ObservableArray(['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'])
            }
        },
        methods: {
            lostFocus: function(sender) {
                let item = sender.text;
                if (item && this.countries.indexOf(item) < 0) {
                    this.countries.push(item);
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-listbox,
    .container-fluid .wj-dropdown {
        width: 250px;
    }
</style>
