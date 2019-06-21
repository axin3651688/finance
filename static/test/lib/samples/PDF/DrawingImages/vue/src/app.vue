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
                    header: {
                        height: 0 // no header 
                    },
                    footer: {
                        height: 0 // no footer
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                let image = 'resources/wijmo1.png';
                //
                doc.drawText('This image is rendered in its original size:');
                doc.drawImage(image);
                doc.moveDown();
                //
                doc.drawText('This image is scaled to fit the width of 100:');
                doc.drawImage(image, null, null, { width: 100 });
                doc.moveDown();
                //
                doc.drawText('This image is scaled to fit the height of 25:');
                doc.drawImage(image, null, null, { height: 25 });
                doc.moveDown();
                //
                doc.drawText('This image is stretched to fit a rectangle of dimensions 100x25:');
                doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
                doc.drawImage(image, null, null, {
                    width: 100,
                    height: 25
                });
                doc.moveDown();
                //
                doc.drawText('This image is centered and stretched proportionally to fit a rectangle of dimensions 100x25:');
                doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
                doc.drawImage(image, null, null, {
                    width: 100,
                    height: 25,
                    stretchProportionally: true,
                    align: pdf.PdfImageHorizontalAlign.Center
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
