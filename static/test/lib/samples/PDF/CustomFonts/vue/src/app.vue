<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as pdf from '@grapecity/wijmo.pdf';
    //
    let App = Vue.extend({
        name: 'app',
        methods: {
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                doc.registerFont({
                    source: 'resources/fira/FiraSans-Regular.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'normal',
                    sansSerif: true
                });
                //
                doc.registerFont({
                    source: 'resources/fira/FiraSans-Bold.ttf',
                    name: 'fira',
                    style: 'normal',
                    weight: 'bold',
                    sansSerif: true
                });
                //
                doc.drawText('Here is the standard Times font.');
                //
                let font = new pdf.PdfFont('fira');
                doc.drawText('Here is the FiraSans-Regular font.', null, null, { font: font });
                //
                font.weight = 'bold';
                doc.drawText('Here is the FiraSans-Bold font.', null, null, { font: font });
                //
                doc.end();
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
</style>
