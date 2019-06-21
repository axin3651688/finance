<template>
    <div class="container-fluid">
        <wj-popup :style="{width: small ? '20%' : '40%'}" :class="[clsDialogText || 'wj-dialog', 'wj-popup']" role="dialog" :initialized="initPopup">
            <div :class="clsHeaderText || 'wj-dialog-header'">
                <h4>{{ headerText }}</h4>
            </div>
            <div :class="clsBodyText || 'wj-dialog-body'">
                <p>{{ bodyText }}</p>
                <input v-if="typeText == 'Prompt'" :class="clsInputText || 'form-control'">
            </div>
            <div :class="clsFooterText || 'wj-dialog-footer'">
                <button :class="[clsOKText || 'wj-btn',' wj-hide-ok']">{{ okText || "OK" }}</button>
                <button :class="[clsCancelText || 'wj-btn', 'wj-hide']">{{ cancelText || "Cancel" }}</button>
            </div>
        </wj-popup>

        <div class="form-group">
            <label for="btnShow">Show</label>
            <button id="btnShow" class="btn btn-primary" @click="typeText == 'Alert' ? showAlert(thePopup) : showPrompt(thePopup)">
                Show {{ typeText }}
            </button>
        </div>

        <div class="row">
            <div class="col-xs-6">
                <!-- important options -->
                <div class="form-group">
                    <label for="type">Type</label>
                    <wj-combo-box id="type" :itemsSource="itemSource" :selectedIndexChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="header">Header</label>
                    <wj-combo-box id="header" :text="'Header'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <wj-combo-box id="body" :text="'Dialog message.'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="small">Small</label>
                    <input id="small" type="checkbox" v-model="small">
                </div>
                <div class="form-group">
                    <label for="ok">OK Text</label>
                    <wj-combo-box id="ok" :text="'OK'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="cancel">Cancel Text</label>
                    <wj-combo-box id="cancel" :text="'Cancel'" :textChanged="textChanged"></wj-combo-box>
                </div>
            </div>

            <div class="col-xs-6">
                <!-- details -->
                <div class="form-group">
                    <label for="clsDialog">Dialog Class</label>
                    <wj-combo-box id="clsDialog" :text="'modal-dialog'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsHeader">Header Class</label>
                    <wj-combo-box id="clsHeader" :text="'modal-header'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsBody">Body Class</label>
                    <wj-combo-box id="clsBody" :text="'modal-body'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsInput">Input Class</label>
                    <wj-combo-box id="clsInput" :text="'form-control'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsFooter">Footer Class</label>
                    <wj-combo-box id="clsFooter" :text="'modal-footer'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsOK">OK Class</label>
                    <wj-combo-box id="clsOK" :text="'btn btn-primary'" :textChanged="textChanged"></wj-combo-box>
                </div>
                <div class="form-group">
                    <label for="clsCancel">Cancel Class</label>
                    <wj-combo-box id="clsCancel" :text="'btn btn-default'" :textChanged="textChanged"></wj-combo-box>
                </div>
            </div>
        </div>
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
        data: function(){
            return {
                itemSource: ['Alert', 'Prompt'],
                clsDialogText : 'modal-dialog',
                small: false,
                clsHeaderText: 'modal-header',
                headerText: 'Header',
                clsBodyText: 'modal-body',
                bodyText: 'Dialog message.',
                clsInputText: 'form-control',
                clsFooterText: 'modal-footer',
                clsOKText: 'btn btn-primary',
                okText: 'OK',
                clsCancelText: 'btn btn-default',
                cancelText: 'Cancel',
                typeText: 'Alert'
            }
        },
        methods: {
            initPopup: function(popup){
                this.thePopup = popup;
            },
            textChanged: function(combo){
                this[combo.hostElement.id+'Text']  = combo.text;
            },
            showAlert: function(popup) {
                popup.show(true, (sender) => {
                    alert('you entered: ' + sender.dialogResult);
                });
            },
            showPrompt: function(popup) {
                popup.show(true, (sender) => {
                    let result = sender.dialogResult.indexOf('ok') > -1
                        ? popup.hostElement.querySelector('input').value
                        : null;
                    alert('you entered: ' + result);
                });
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 90px;
        text-align: right;
        margin-right: 6px;
    }

    .container-fluid .wj-combobox {
        width: 140px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
