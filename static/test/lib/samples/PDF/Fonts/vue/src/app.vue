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
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
                });
                //
                doc.drawText('This text uses the default document font, Times 10.');
                //
                doc.drawText('This text uses Times Bold Oblique 20.', null, null, { font: new pdf.PdfFont('times', 20, 'oblique', 'bold') });
                //
                doc.setFont(new pdf.PdfFont('helvetica'));
                doc.drawText('This text uses Helvetica 10.');
                doc.drawText('This text also uses Helvetica 10.');
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
