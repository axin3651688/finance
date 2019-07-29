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
    import { getEmployees } from './data'
    //
    let App = Vue.extend({
        name: 'app',
        colWidth: 80,
        rowHeight: 18,
        methods: {
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
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
                });
                //
                getEmployees().forEach((employee, i, arr) => {
                    this.$_drawEmployee(doc, employee);
                    //
                    if (i < arr.length - 1) {
                        doc.addPage();
                    }
                });
                //
                doc.end();
            },
            //
            $_drawEmployee(doc, employee) {
                let tot = employee.expenses.totals;
                let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime());
                //
                let minDate = expenses[0].date,
                    maxDate = expenses[expenses.length - 1].date,
                    columns = [
                        { header: 'Date', binding: 'date', format: 'd' },
                        { header: 'Description', binding: 'description', format: 'c' },
                        { header: 'Hotel', binding: 'hotel', format: 'c' },
                        { header: 'Transport', binding: 'transport', format: 'c' },
                        { header: 'Meal', binding: 'meal', format: 'c' },
                        { header: 'Fuel', binding: 'fuel', format: 'c' },
                        { header: 'Misc', binding: 'misc', format: 'c' },
                        { header: 'Total', binding: 'total', format: 'c' }
                    ],
                    bold = new pdf.PdfFont('times', 10, 'normal', 'bold'),
                    colWidth = this.$options.colWidth,
                    rowHeight = this.$options.rowHeight;
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
                // * draw table *
                doc.saveState();
                //
                y = 0;
                let scale = doc.width / (columns.length * colWidth),
                    docY = doc.y;
                //
                if (scale > 1) {
                    scale = 1;
                }
                //
                doc.scale(scale, scale, new wijmo.Point(0, docY));
                doc.translate(0, docY);
                //
                // header
                this.$_renderRow(doc, y, columns, column => column.header, null, bold, '#fad9cd');
                //
                y += rowHeight;
                //
                // body
                expenses.forEach(item => {
                    this.$_renderRow(doc, y, columns, column => item[column.binding], column => column.format);
                    y += rowHeight;
                });
                //
                // footer
                let totRow = ['Total', '', tot.hotel, tot.transport, tot.meal, tot.fuel, tot.misc, tot.total];
                this.$_renderRow(doc, y, totRow, null, () => 'c', bold, '#fad9cd');
                //
                y += rowHeight;
                //
                doc.y = docY + y * scale;
                //
                doc.restoreState();
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
                this.$_checkLineAvailable(doc);
                //
                let thinPen = new pdf.PdfPen('#000000', 0.5)
                //
                y = doc.y;
                let sz = doc.drawText('Employee signature:', 0, y);
                doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
                sz = doc.drawText('Date:', 300, y);
                doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
                //
                doc.moveDown();
                //
                this.$_checkLineAvailable(doc);
                //
                y = doc.y;
                sz = doc.drawText('Approved by:', 0, y);
                doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
                sz = doc.drawText('Date:', 300, y);
                doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
            },
            //
            $_checkLineAvailable(doc) {
                if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
                    doc.addPage();
                }
            },
            //
            $_renderRow(doc, y, values, valueGetter, formatGetter, font, brush) {
                let colWidth = this.$options.colWidth,
                    rowHeight = this.$options.rowHeight;
                //
                values.forEach((v, idx) => {
                    let x = idx * colWidth;
                    //
                    doc.paths
                        .rect(x, y, colWidth, rowHeight)
                        .fill(brush || '#f4b19b');
                    //
                    let value = valueGetter != null ? valueGetter(v) : v || '';
                    let format = formatGetter != null ? formatGetter(v) : '';
                    //
                    if (value !== 'Total') {
                        value = wijmo.changeType(value, wijmo.DataType.String, format);
                    }
                    //
                    doc.drawText(value, x + 3, y + 5, {
                        font: font,
                        height: rowHeight,
                        width: colWidth
                    });
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
</style>
