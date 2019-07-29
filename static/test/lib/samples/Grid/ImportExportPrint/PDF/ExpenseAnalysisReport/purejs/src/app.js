import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as chart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { getEmployee } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let employee = getEmployee();
    //
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        headersVisibility: grid.HeadersVisibility.Column,
        allowMerging: grid.AllowMerging.All,
        itemsSource: employee.expenses.items,
        columns: [
            { header: 'Date', binding: 'date', format: 'd', minWidth: 80 },
            { header: 'Hotel', binding: 'hotel', format: 'c' },
            { header: 'Transport', binding: 'transport', format: 'c', minWidth: 80 },
            { header: 'Meal', binding: 'meal', format: 'c' },
            { header: 'Fuel', binding: 'fuel', format: 'c' },
            { header: 'Misc', binding: 'misc', format: 'c' }
        ]
    });
    //
    let flexPie = new chart.FlexPie('#flexPie', {
        itemsSource: ((totals) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.misc }
        ])(employee.expenses.totals),
        binding: 'value',
        bindingName: 'name',
        innerRadius: 0.75,
        dataLabel: {
            content: '{value:c1}',
            position: chart.PieLabelPosition.Inside
        }
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
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
        drawEmployee(doc, flexGrid, flexPie, employee, () => doc.end());
    });
}
//
function drawEmployee(doc, flexGrid, flexPie, employee, done) {
    let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime()), minDate = expenses[0].date, maxDate = expenses[expenses.length - 1].date, bold = new pdf.PdfFont('times', 10, 'normal', 'bold');
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
    doc.drawText('Expense details:', 0, y);
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
