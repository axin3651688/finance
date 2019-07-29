<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import * as pdf from '@grapecity/wijmo.pdf';
    //
    let App = Vue.extend({
        name: 'app',
        methods: {
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    header: {
                        height: 0 // no header 
                    },
                    footer: {
                        height: 0 // no footer
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                let c1 = new wijmo.Color('#3173c0');
                let c2 = new wijmo.Color('#e69500');
                //
                // Use a bigger font to show fills and strokes clearly.
                doc.setFont(new pdf.PdfFont('times', 20));
                //
                doc.drawText('Lorem ', null, null, {
                    continued: true
                });
                //
                doc.drawText('ipsum ', null, null, {
                    continued: true,
                    stroke: true
                });
                //
                doc.drawText('dolor ', null, null, {
                    continued: true,
                    brush: new pdf.PdfSolidBrush(c1),
                    fill: true,
                    // Override the stroke property. The text settings are retained between drawText calls if the continued property is used.
                    stroke: false
                });
                //
                doc.drawText('sit ', null, null, {
                    continued: true,
                    pen: new pdf.PdfPen(c2),
                    fill: false,
                    stroke: true
                });
                //
                doc.drawText('amet.', null, null, {
                    // A shorthand equivalent of new wijmo.pdf.PdfSolidBrush(c1)
                    brush: c1,
                    // A shorthand equivalent of new wijmo.pdf.PdfPen(c2)
                    pen: c2,
                    fill: true,
                    stroke: true
                });
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
