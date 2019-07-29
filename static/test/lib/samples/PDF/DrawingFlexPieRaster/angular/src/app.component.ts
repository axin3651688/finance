import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import * as pdf from '@grapecity/wijmo.pdf';
import '@grapecity/wijmo.chart.render';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { IExpense, DataService } from './app.data';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    @ViewChild('flexPie') flexPie: chart.FlexPie;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = ((totals: IExpense) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.misc }
        ])(dataService.getExpenses().totals);
    }
    //
    export() {
        let doc = new pdf.PdfDocument({
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        this.flexPie.saveImageToDataUrl(chart.ImageFormat.Png, (url: string) => {
            doc.drawText('Total expenses by category:');
            doc.drawImage(url);
            doc.end();
        });
    }
}
//
@NgModule({
    imports: [WjChartModule, BrowserModule],
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