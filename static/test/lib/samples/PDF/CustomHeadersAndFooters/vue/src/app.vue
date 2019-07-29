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
                        declarative: {
                            text: '\tTitle\t&[Page]',
                            font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                        }
                    },
                    footer: {
                        declarative: {
                            text: '\t&[Page]\\&[Pages]',
                            brush: '#3173c0',
                            font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                        }
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                doc.drawText('Lorem ipsum');
                //
                doc.addPage();
                doc.drawText('Lorem ipsum');
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
