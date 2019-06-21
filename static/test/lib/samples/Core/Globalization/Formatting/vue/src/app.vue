<template>
    <div class="container-fluid">
        <p>
            <wj-menu :header="'Culture: <b>' + selectedItem.text + '</b>'" displayMemberPath="text"
                :itemsSource="itemsSource" selectedValuePath="value" :selectedIndexChanged="selectedIndexChanged">
            </wj-menu>
        </p>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">Dates</h4>
            </div>
            <div class="panel-body">
                <table class="table table-condensed">
                    <thead>
                        <th>format</th>
                        <th>description</th>
                        <th>result</th>
                    </thead>
                    <tbody>
                        <tr v-for="item of dateSamples" :key="item.id">
                            <td>
                                <b>{{ item.format }}</b>
                            </td>
                            <td>{{ item.description }}</td>
                            <td>{{ formatDate(item.format) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">Numbers</h4>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="theValue">Value</label>
                    <wj-input-number id="theValue" :value="numValue" :valueChanged="numberValueChanged" :step="1">
                    </wj-input-number>
                </div>
                <div class="form-group">
                    <label for="thePrecision">Precision</label>
                    <wj-input-number id="thePrecision" :value="precision" :valueChanged="precisionValueChanged" :step="1" :min="0" :max="10">
                    </wj-input-number>
                </div>
            </div>
            <div class="panel-body">
                <table class="table table-condensed">
                    <thead>
                        <th>specifier</th>
                        <th>description</th>
                        <th class="text-right">result</th>
                    </thead>
                    <tbody>
                        <tr v-for="item of numberSamples" :key="item.id">
                            <td>
                                <b>{{ item.specifier }}</b>
                            </td>
                            <td>{{ item.description }}</td>
                            <td class="text-right">{{ formatNumber(item.specifier) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.input';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                itemsSource: [
                    { value: 'en', text: 'English (US)' },
                    { value: 'en-GB', text: 'English (UK)' },
                    { value: 'es', text: 'Spanish' },
                    { value: 'de', text: 'German' },
                    { value: 'it', text: 'Italian' },
                    { value: 'fr', text: 'French' },
                    { value: 'pt', text: 'Portuguese' },
                    { value: 'ru', text: 'Russian' },
                    { value: 'ja', text: 'Japanese' },
                    { value: 'ko', text: 'Korean' },
                    { value: 'zh', text: 'Chinese' }
                ],
                dateSamples: [
                    { format: 'd', description: 'Short Date Pattern' },
                    { format: 'D', description: 'Long Date Pattern' },
                    { format: 'f', description: 'Full Date/Time Pattern (short time)' },
                    { format: 'F', description: 'Full Date/Time Pattern (long time)' },
                    { format: 't', description: 'Short Time Pattern' },
                    { format: 'T', description: 'Long Time Pattern' },
                    { format: "'Q'Q yyyy", description: 'Quarter/Year' },
                    { format: 'MMMM dd, yyyy', description: 'Custom format' }
                ],
                numberSamples: [
                    { specifier: 'n*', description: 'Number' },
                    { specifier: 'n*,', description: 'Number (thousands)' },
                    { specifier: 'n*,,', description: 'Number (millions)' },
                    { specifier: 'f*', description: 'Fixed-point' },
                    { specifier: 'g*', description: 'General (no trailing zeros)' },
                    { specifier: 'd*', description: 'Decimal (integers)' },
                    { specifier: 'x*', description: 'Hexadecimal (integers)' },
                    { specifier: 'c*', description: 'Currency' },
                    {
                        specifier: 'c*€',
                        description: 'Currency (explicit currency symbol)'
                    },
                    { specifier: 'c* ', description: 'Currency (no currency symbol)' },
                    { specifier: 'p*', description: 'Percent' }
                ],
                numValue: 1234.5678,
                precision: 2,
                selectedItem: {
                    value: 'en',
                    text: 'English (US)'
                }
            };
        },
        methods: {
            formatDate(format) {
                return wijmo.Globalize.format(new Date(), format);
            },
            formatNumber(specifier) {
                let format = specifier.replace('*', this.precision.toString());
                return wijmo.Globalize.format(this.numValue, format);
            },
            loadCulture(culture) {
                // apply new culture to page
                let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${culture}.js`,
                scripts = document.getElementsByTagName('script');
                //
                for (let i = 0; i < scripts.length; i++) {
                    let script = scripts[i];
                    if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                        script.parentElement.removeChild(script);
                        break;
                    }
                }
                //
                let script = document.createElement('script');
                script.onload = () => {
                    wijmo._updateCulture();
                    this.$forceUpdate();
                };
                //
                script.src = url;
                //
                document.head.appendChild(script);
            },
            selectedIndexChanged(sender) {
                if (sender.selectedItem) {
                    this.selectedItem = sender.selectedItem;
                    this.loadCulture(sender.selectedItem.value);
                }
            },
            numberValueChanged(sender) {
                this.numValue = sender.value;
            },
            precisionValueChanged(sender) {
                this.precision = sender.value;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>