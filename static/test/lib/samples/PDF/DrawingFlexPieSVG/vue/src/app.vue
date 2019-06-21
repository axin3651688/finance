<template>
    <div class="container-fluid">
        <wj-flex-pie binding="value" bindingName="name" :innerRadius=0.75 :itemsSource="data" :initialized="initializeFlexPie">
            <wj-flex-pie-data-label content="{value:c1}" position="Inside"></wj-flex-pie-data-label>
        </wj-flex-pie>
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    //
    import Vue from 'vue';
    import { WjChartModule } from '@grapecity/wijmo.vue2.chart';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.chart.render';
    import * as pdf from '@grapecity/wijmo.pdf';
    //
    import { getExpenses } from './data';
    //
    let App = Vue.extend({
        name: 'app',
        data() {
            return {
                data: (totals => [
                    { name: 'Hotel', value: totals.hotel },
                    { name: 'Transport', value: totals.transport },
                    { name: 'Meal', value: totals.meal },
                    { name: 'Fuel', value: totals.fuel },
                    { name: 'Misc', value: totals.misc }
                ])(getExpenses().totals)
            }
        },
        methods: {
            initializeFlexPie(ctrl) {
               this.flexPie = ctrl;
            },
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                this.flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, url => {
                    doc.drawText('Total expenses by category:');
                    doc.drawSvg(url);
                    doc.end();
                });
            }
        }
    })
    //
    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .wj-flexpie {
        width: 500px;
    }
</style>
