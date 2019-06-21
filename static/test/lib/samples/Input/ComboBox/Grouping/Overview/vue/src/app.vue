<template>
    <div class="container-fluid">
        <label>
            Show Groups
            <input id="showGroups" type="checkbox" v-model="showGroups">
        </label>
        <label>
            Format Group Headers
            <input id="formatItem" type="checkbox" v-model="formatGroupHeaders" @change="onFormatItemChanged">
        </label>
        <label>
            Show Checkboxes
            <input id="checkBoxes" type="checkbox" v-model="showCheckboxes">
        </label>

        <div class="row">
            <div class="col-xs-6">
                <h4>
                    ComboBox
                </h4>
                <wj-combo-box :showGroups="showGroups" :formatItem="formatGroupHeader"
                    displayMemberPath="city" :itemsSource="data" :initialized="initCombo">
                </wj-combo-box>
            </div>
            <div class="col-xs-6">
                <h4>
                    ListBox
                </h4>
                <wj-list-box :showGroups="showGroups" :formatItem="formatGroupHeader"
                    :checkedMemberPath="showCheckboxes ? 'checked' : ''"
                    displayMemberPath="city" :itemsSource="data" :initialized="initList">
                </wj-list-box>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import { getData, getCountryCode } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getData(),
                showGroups: true,
                showCheckboxes: false,
                formatGroupHeaders: true,
                theCombo: null,
                theList: null
            }
        },
        methods: {
            initCombo: function(combo){
                this.theCombo = combo;
            },
            initList: function(list){
                this.theList = list;
            },
            formatGroupHeader: function(sender, e) {
                if (this.formatGroupHeaders && e.index < 0 && e.data instanceof wijmo.CollectionViewGroup) {
                    let group = e.data,
                        code = getCountryCode(group.name);
                    //
                    if (code) {
                        e.item.innerHTML = `<span class="flag-icon flag-icon-${code}"></span> ${group.name}`;
                    }
                }
            },
            onFormatItemChanged: function() {
                this.data.refresh();
            }
        },
        mounted() {
            // To make the formatItem event work
            this.theCombo.invalidate();
            this.theList.invalidate();
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.css';

    .container-fluid .wj-listbox {
        height: 200px;
        display: block;
    }

    .container-fluid .wj-listbox .wj-listbox-item {
        line-height: 2em;
    }

    .container-fluid .wj-listbox .wj-listbox-item.wj-header {
        opacity: 1;
        position: sticky;
        top: 0;
    }

    label {
        margin: 0 24px;
    }

    body {
        margin-bottom: 40px;
    }
</style>