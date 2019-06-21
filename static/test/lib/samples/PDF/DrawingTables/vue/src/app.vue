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
    import { getData } from './data'
    //
    let App = Vue.extend({
        name: 'app',
        methods: {
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    header: {
                        height: 0
                    },
                    footer: {
                        height: 0
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                let colWidth = 100,
                    rowHeight = 18,
                    data = getData(50),
                    dataKeyMap = ['id', 'product', 'country'],
                    y = 0;
                //
                for (let i = 0; i < 50; i++) {
                    for (let j = 0; j < dataKeyMap.length; j++) {
                        let x = j * colWidth;
                        //
                        doc.paths
                            .rect(x, y, colWidth, rowHeight)
                            .stroke();
                        //
                        doc.drawText(data[i][dataKeyMap[j]] + '', x + 2, y + 2, {
                            height: rowHeight,
                            width: colWidth
                        });
                    }
                    //
                    y += rowHeight;
                    //
                    if (y >= doc.height) {
                        y = 0;
                        doc.addPage();
                    }
                }
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
