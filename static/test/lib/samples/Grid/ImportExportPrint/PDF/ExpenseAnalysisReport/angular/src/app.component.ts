import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService, IEmployee, IExpense } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    employee: IEmployee;
    totals: any[];
    @ViewChild('flexGrid') flexGrid: grid.FlexGrid;
    @ViewChild('flexPie') flexPie: chart.FlexPie;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.employee = dataService.getEmployee();
        //
        this.totals = ((totals: IExpense) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.misc }
        ])(this.employee.expenses.totals);
    }
    //
    export() {
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
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        this.drawEmployee(doc, this.flexGrid, this.flexPie, this.employee, () => doc.end());
    }
    //
    drawEmployee(doc: pdf.PdfDocument, flexGrid: grid.FlexGrid, flexPie: chart.FlexPie, employee: IEmployee, done: Function) {
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
        flexPie.saveImageToDataUrl(chart.ImageFormat.Png, (url: string) => {
            doc.drawImage(url, doc.width * 0.5 + 20, y, { width: doc.width * 0.5 - 20 });
            done();
        });
    }
}
//
@NgModule({
    imports: [WjGridModule, WjChartModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);