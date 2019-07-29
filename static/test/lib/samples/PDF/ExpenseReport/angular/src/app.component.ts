import 'bootstrap.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as pdf from '@grapecity/wijmo.pdf';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { IEmployee, getEmployees } from './app.data';
//
type TColumn = {
    header: string;
    binding: string;
    format: string;
}
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private readonly colWidth = 80;
    private readonly rowHeight = 18;
    //
    export() {
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
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
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
    }
    //
    private drawEmployee(doc: pdf.PdfDocument, employee: IEmployee) {
        let tot = employee.expenses.totals;
        let expenses = employee.expenses.items.sort((a, b) => a.date.getTime() - b.date.getTime());
        //
        let minDate = expenses[0].date,
            maxDate = expenses[expenses.length - 1].date,
            columns: TColumn[] = [
                { header: 'Date', binding: 'date', format: 'd' },
                { header: 'Description', binding: 'description', format: 'c' },
                { header: 'Hotel', binding: 'hotel', format: 'c' },
                { header: 'Transport', binding: 'transport', format: 'c' },
                { header: 'Meal', binding: 'meal', format: 'c' },
                { header: 'Fuel', binding: 'fuel', format: 'c' },
                { header: 'Misc', binding: 'misc', format: 'c' },
                { header: 'Total', binding: 'total', format: 'c' }
            ],
            bold = new pdf.PdfFont('times', 10, 'normal', 'bold');
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
        let scale = doc.width / (columns.length * this.colWidth),
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
        this.renderRow(doc, y, columns, (column: TColumn) => column.header, null, bold, '#fad9cd');
        //
        y += this.rowHeight;
        //
        // body
        expenses.forEach(item => {
            this.renderRow(doc, y, columns, (column: TColumn) => item[column.binding], (column: TColumn) => column.format);
            y += this.rowHeight;
        });
        //
        // footer
        let totRow = ['Total', '', tot.hotel, tot.transport, tot.meal, tot.fuel, tot.misc, tot.total];
        this.renderRow(doc, y, totRow, null, () => 'c', bold, '#fad9cd');
        //
        y += this.rowHeight;
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
        this.checkLineAvailable(doc);
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
        this.checkLineAvailable(doc);
        //
        y = doc.y;
        sz = doc.drawText('Approved by:', 0, y);
        doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
        sz = doc.drawText('Date:', 300, y);
        doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
    }
    //
    private checkLineAvailable(doc: pdf.PdfDocument) {
        if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
            doc.addPage();
        }
    }
    //
    private renderRow(doc: pdf.PdfDocument, y: number, values: any[], valueGetter: Function, formatGetter: Function, font?: pdf.PdfFont, brush?: pdf.PdfBrush | string) {
        values.forEach((v: any, idx: number) => {
            let x = idx * this.colWidth;
            //
            doc.paths
                .rect(x, y, this.colWidth, this.rowHeight)
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
                height: this.rowHeight,
                width: this.colWidth
            });
        });
    }
}
//
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);