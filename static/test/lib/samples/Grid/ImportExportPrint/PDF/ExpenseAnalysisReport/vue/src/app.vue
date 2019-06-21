<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <div class="row">
            <div class="col-xs-6">
                <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="Column" allowMerging="All"
                    :itemsSource="employee.expenses.items" :initialized="initializeGrid">
                    <wj-flex-grid-column header="Date" binding="date" format="d" :minWidth=80></wj-flex-grid-column>
                    <wj-flex-grid-column header="Hotel" binding="hotel" format="c"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Transport" binding="transport" format="c" :minWidth=80></wj-flex-grid-column>
                    <wj-flex-grid-column header="Meal" binding="meal" format="c"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Fuel" binding="fuel" format="c"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Misc" binding="misc" format="c"></wj-flex-grid-column>
                </wj-flex-grid>
            </div>
            <div class="col-xs-6">
                <wj-flex-pie :itemsSource="totals" binding="value" bindingName="name" :innerRadius=0.75 :initialized="initializePie">
                    <wj-flex-pie-data-label content="{value:c1}" position="Inside"></wj-flex-pie-data-label>
                </wj-flex-pie>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getEmployee } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import { WjChartModule } from '@grapecity/wijmo.vue2.chart';
    import * as wijmo from '@grapecity/wijmo';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.chart.render';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';

    var employee = getEmployee();
    new Vue({
        el: '#app',
        data: {
            employee: employee,
            totals: ((totals) => [
                { name: 'Hotel', value: totals.hotel },
                { name: 'Transport', value: totals.transport },
                { name: 'Meal', value: totals.meal },
                { name: 'Fuel', value: totals.fuel },
                { name: 'Misc', value: totals.misc }
            ])(employee.expenses.totals)
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            initializePie(ctl) {
                this.flexPie = ctl;
            },
            exportPDF() {
                let doc = new pdf.PdfDocument({
                    header: {
                        declarative: {
                            text: 'Expense Analysis Report',
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
                this.drawEmployee(doc, this.flexGrid, this.flexPie, this.employee, () => doc.end());
            },
            drawEmployee(doc, flexGrid, flexPie, employee, done) {
                let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime()),
                    minDate = expenses[0].date,
                    maxDate = expenses[expenses.length - 1].date,
                    bold = new pdf.PdfFont('times', 10, 'normal', 'bold');
                //
                doc.moveDown(2);
                //
                doc.drawText('Name: ', undefined, undefined, { font: bold, continued: true });
                doc.drawText(employee.name);
                //
                doc.drawText('From: ', undefined, undefined, { font: bold, continued: true });
                doc.drawText(wijmo.changeType(minDate, wijmo.DataType.String, 'd'));
                //
                doc.drawText('To: ', undefined, undefined, { font: bold, continued: true });
                doc.drawText(wijmo.changeType(maxDate, wijmo.DataType.String, 'd'));
                //
                doc.moveDown(2);
                let y = doc.y;
                //
                doc.drawText('Expense details:', 0, y)
                doc.drawText('Total expenses by category:', doc.width * 0.5 + 20, y);
                y = doc.y;
                //
                gridPdf.FlexGridPdfConverter.draw(flexGrid, doc, doc.width * 0.5, null, {
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
                flexPie.saveImageToDataUrl(chart.ImageFormat.Png, (url) => {
                    doc.drawImage(url, doc.width * 0.5 + 20, y, { width: doc.width * 0.5 - 20 });
                    done();
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
        height: 200px;
    }
    
    .col-xs-6 {
        margin: 6px 0 0 0;
    }
</style>