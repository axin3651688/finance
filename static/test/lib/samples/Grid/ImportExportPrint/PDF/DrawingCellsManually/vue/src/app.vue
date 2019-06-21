<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="All" selectionMode="ListBox"
            :itemsSource="data" :formatItem="formatItem" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country" :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Color" binding="color"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';
    import * as grid from '@grapecity/wijmo.grid';

    new Vue({
        el: '#app',
        data: {
            data: getData(5)
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            formatItem(sender, e) {
                if (e.panel === sender.cells && sender.columns[e.col].binding === 'country') {
                    let data = (e.panel.rows[e.row]).dataItem;
                    //
                    e.cell.textContent = '';
                    //
                    // add flag image
                    let image = document.createElement('img');
                    image.src = `resources/${data['country']}.png`;
                    e.cell.appendChild(image);
                    //
                    // add non-breaking space
                    e.cell.appendChild(document.createTextNode('\u00A0'));
                    //
                    // add text
                    e.cell.appendChild(document.createTextNode(`${data['country']}`));
                }
            },
            exportPDF() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    maxPages: 10,
                    documentOptions: {
                        header: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        },
                        footer: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        }
                    },
                    customCellContent: true,
                    formatItem: (args) => {
                        if (args.panel.cellType === grid.CellType.Cell) {
                            if (args.panel.columns[args.col].binding === 'country') {
                                let r = args.contentRect,
                                    sz = args.canvas.measureText(args.data, args.style.font, {
                                        height: r.height,
                                        width: r.width
                                    }),
                                    image = args.canvas.openImage(`resources/${args.data}.png`),
                                    imageTop = r.top + (r.height - image.height) / 2,
                                    textTop = r.top + (r.height - sz.size.height) / 2;
                                //
                                // draw flag image
                                args.canvas.drawImage(image, r.left, imageTop);
                                //
                                // draw text
                                args.canvas.drawText(args.data, r.left + image.width + 3, textTop, {
                                    brush: args.style.color,
                                    font: args.style.font,
                                    height: r.height,
                                    width: r.width
                                });
                                //
                                // cancel standard cell content drawing
                                args.cancel = true;
                            }
                        }
                    }
                });
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .grid {
        margin-top: 20px;
        height: 200px;
    }
</style>