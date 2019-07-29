<template>
    <div class="container-fluid">
        <!-- Export button -->
            <button class="btn btn-default" v-on:click="export1">Export (customCellContent = false)</button>
            <button class="btn btn-default" v-on:click="export2">Export (customCellContent = true)</button>
            <button class="btn btn-default" v-on:click="export3">Export (customCellContent = false + formatItem
                callback)</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="All" selectionMode="ListBox"
            :formatItem="formatItem" :itemsSource="data" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country" width="*" :isReadOnly=true></wj-flex-grid-column>
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
    import * as grid from '@grapecity/wijmo.grid';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';

    new Vue({
        el: '#app',
        data: {
            data: getData(5)
        },
        methods:{
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
                    e.cell.appendChild(document.createTextNode(`${data['country']}-${data['capital']}`));
                }
            },
            export1() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    customCellContent: false
                });
            },
            export2() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    customCellContent: true
                });
            },
            export3() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    customCellContent: false,
                    formatItem: this.formatCountryCell
                });
            },
            formatCountryCell(args) {
                // if this is a regular grid cell...
                if (args.panel.cellType === grid.CellType.Cell) {
                    // ... that belongs to the 'country' column
                    if (args.panel.columns[args.col].binding === 'country') {
                        let
                            // get cell with custom content produced by a cell template or grid.formatItem handler
                            cell = args.getFormattedCell(),
                            // bound rectangle of cell's content area
                            contentRect = args.contentRect,
                            // construct flag image url based on country name passed in args.data 
                            image = args.canvas.openImage(`resources/${args.data}.png`),
                            imageTop = contentRect.top + (contentRect.height - image.height) / 2;

                        // draw flag image
                        args.canvas.drawImage(image, contentRect.left, imageTop);
                        // Draw custom cell text retrieved using the cell.textContent property,
                        // right to the image and in the args.textTop vertical position. The latter
                        // works because we draw text using default cell font.
                        args.canvas.drawText(cell.textContent.trim(), contentRect.left + image.width + 3, args.textTop);
                        // cancel standard cell content drawing
                        args.cancel = true;
                    }
                }
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }
    
    .grid {
        margin-top: 6px;
        height: 200px;
    }

    .btn { 
        margin: 2px 2px 2px 0; 
    }
</style>