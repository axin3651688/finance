<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <div id="flexGrid" class="grid"></div>
        <div id="flexGridFooter" class="gridFooter"></div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getEmployees } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.chart.render';
    import * as grid from '@grapecity/wijmo.grid';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';

    new Vue({
        el: '#app',
        data: {
        },
        methods:{
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    header: {
                        declarative: {
                            text: 'Expense Report\t&[Page]\\&[Pages]',
                            font: new pdf.PdfFont('times', 12),
                            brush: '#bfc1c2'
                        }
                    },
                    lineGap: 2,
                    pageSettings: {
                        margins: {
                            left: 36,
                            right: 36,
                            top: 36,
                            bottom: 36
                        }
                    },
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
                });
                //
                getEmployees().forEach((employee, i, arr) => {
                    this.drawEmployee(doc, employee);
                    //
                    if (i < arr.length - 1) {
                        doc.addPage();
                    }
                });
                //
                doc.end();
            },
            drawEmployee(doc, employee) {
                let tot = employee.expenses.totals;
                let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime());
                //
                let minDate = expenses[0].date,
                    maxDate = expenses[expenses.length - 1].date,
                    columns = [
                        { header: 'Date', binding: 'date', width: 105 },
                        { header: 'Description', binding: 'description', format: 'c', width: 105 },
                        { header: 'Hotel', binding: 'hotel', format: 'c', width: 105 },
                        { header: 'Transport', binding: 'transport', format: 'c', width: 105 },
                        { header: 'Meal', binding: 'meal', format: 'c', width: 105 },
                        { header: 'Fuel', binding: 'fuel', format: 'c', width: 105 },
                        { header: 'Misc', binding: 'misc', format: 'c', width: 105 },
                        { header: 'Total', binding: 'total', format: 'c', width: 105 }
                    ],
                    bold = new pdf.PdfFont('times', 10, 'normal', 'bold'),
                    thinPen = new pdf.PdfPen('#000000', 0.5);
                //
                let flexGrid,
                    footer;
                //
                try {
                    // * setup FlexGrid *
                    flexGrid = new grid.FlexGrid('#flexGrid');
                    footer = new grid.FlexGrid('#flexGridFooter');
                    //
                    flexGrid.initialize({
                        autoGenerateColumns: false,
                        allowMerging: grid.AllowMerging.All,
                        columns: columns,
                        headersVisibility: grid.HeadersVisibility.Column,
                        itemsSource: expenses
                    });
                    //
                    footer.initialize({
                        allowMerging: grid.AllowMerging.All,
                        autoGenerateColumns: false,
                        headersVisibility: grid.HeadersVisibility.None,
                        columns: columns,
                        itemsSource: [{
                            date: null,
                            description: null,
                            hotel: tot.hotel,
                            transport: tot.transport,
                            meal: tot.meal,
                            fuel: tot.fuel,
                            misc: tot.misc,
                            total: tot.total
                        }]
                    });
                    //
                    footer.cells.setCellData(0, 'date', 'Total', false);
                    footer.cells.setCellData(0, 'description', 'Total', false);
                    footer.cells.rows[0].allowMerging = true;
                    //
                    // * draw captions *
                    doc.drawText('Purpose: ', null, null, { font: bold, continued: true });
                    doc.drawText(employee.purpose);
                    //
                    doc.drawText('From: ', 380, 0, { font: bold, continued: true });
                    doc.drawText(wijmo.changeType(minDate, wijmo.DataType.String, 'd'));
                    //
                    doc.drawText('To: ', 470, 0, { font: bold, continued: true });
                    doc.drawText(wijmo.changeType(maxDate, wijmo.DataType.String, 'd'));
                    //
                    doc.moveDown(2);
                    //
                    let y = doc.y;
                    doc.drawText('Name: ', 20, y, { font: bold, continued: true });
                    doc.drawText(employee.name);
                    //
                    doc.drawText('Position: ', 190, y, { font: bold, continued: true });
                    doc.drawText(employee.position);
                    //
                    doc.drawText('SSN: ', 360, y, { font: bold, continued: true });
                    doc.drawText(employee.ssn);
                    //
                    y = doc.y;
                    doc.drawText('Department: ', 20, y, { font: bold, continued: true });
                    doc.drawText(employee.department);
                    //
                    doc.drawText('Manager: ', 190, y, { font: bold, continued: true });
                    doc.drawText(employee.manager);
                    //
                    doc.drawText('Employee ID: ', 360, y, { font: bold, continued: true });
                    doc.drawText(employee.id);
                    //
                    doc.moveDown(2);
                    //
                    // draw FlexGrid
                    gridPdf.FlexGridPdfConverter.draw(flexGrid, doc, doc.width, null, {
                        styles: {
                            cellStyle: {
                                backgroundColor: '#ffffff',
                                borderColor: '#c6c6c6'
                            },
                            altCellStyle: {
                                backgroundColor: '#f9f9f9'
                            },
                            groupCellStyle: {
                                font: { weight: 'bold' },
                                backgroundColor: '#dddddd'
                            },
                            headerCellStyle: {
                                backgroundColor: '#eaeaea'
                            }
                        }
                    });
                    //
                    // draw footer
                    gridPdf.FlexGridPdfConverter.draw(footer, doc, doc.width, null, {
                        styles: {
                            cellStyle: {
                                font: { weight: 'bold' },
                                backgroundColor: '#dddddd',
                                borderColor: '#c6c6c6'
                            }
                        }
                    });
                    //
                    doc.moveDown(2);
                    //
                    // * draw captions *
                    doc.drawText('Subtotal: ', 400, doc.y, { font: bold, continued: true });
                    doc.drawText(wijmo.changeType(tot.total - employee.advance, wijmo.DataType.String, 'c'));
                    //
                    doc.drawText('Cash Advance: ', 400, doc.y, { font: bold, continued: true });
                    doc.drawText(wijmo.changeType(employee.advance, wijmo.DataType.String, 'c'));
                    //
                    doc.drawText('Total: ', 400, doc.y, { font: bold, continued: true });
                    doc.drawText(wijmo.changeType(tot.total, wijmo.DataType.String, 'c'));
                    doc.moveDown(2);
                    //
                    this.checkLineAvailable(doc);
                    //
                    y = doc.y;
                    let sz = doc.drawText('Employee signature: ', 0, y);
                    doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
                    sz = doc.drawText('Date: ', 300, y);
                    doc.paths.moveTo(300 + sz.size.width + 5, doc.y).lineTo(300 + sz.size.width + 100, doc.y).stroke(thinPen);
                    doc.moveDown();
                    //
                    this.checkLineAvailable(doc);
                    //
                    y = doc.y;
                    sz = doc.drawText('Approved by: ', 0, y);
                    doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
                    sz = doc.drawText('Date: ', 300, y);
                    doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 100, doc.y).stroke(thinPen);
                }
                finally {
                    if (flexGrid) {
                        flexGrid.dispose();
                    }
                    //
                    if (footer) {
                        footer.dispose();
                    }
                }
            },
            checkLineAvailable(doc) {
                if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
                    doc.addPage();
                }
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .grid,
    .gridFooter {
        visibility: hidden;
    }
</style>