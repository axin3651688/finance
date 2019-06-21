import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartFinanceModule } from '@grapecity/wijmo.angular2.chart.finance';
import { DataService } from './app.data';
import * as core from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartFinance from '@grapecity/wijmo.chart.finance';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    item: string;
    options: any;
    style: any;
    altStyle: any;
    title: string;
    // references control in the view
    @ViewChild('theChart') theChart: wjChartFinance.FinancialChart;
    @ViewChild('inputNumber') inputNumber: wjInput.InputNumber;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.options = {
            kagi: {
                reversalAmount: 1,
                rangeMode: 'Fixed',
                fields: 'Close'
            }
        };
        this.style = {
            stroke: 'rgb(136, 189, 230)'
        };
        this.altStyle = {
            stroke: 'rgb(136, 189, 230)'
        };
    }
    //
    tooltip(ht: wjChart.HitTestInfo) {
        var date = ht.item && ht.item.date ? ht.item.date : null,
            content = '';
        //
        if (core.isDate(date)) {
            date = core.Globalize.formatDate(date, 'MM/dd/yy');
        }
        if (ht && ht.item) {
            content =
               '<b>' + ht.name + '</b><br/>' +
               'Date: ' + date + '<br/>' +
               'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
               'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
               'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
               'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
               'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
        }
        return content;
    }
    //
    optionChanged() {
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }

    reversalAmountChanged(input: wjInput.InputNumber) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }

    rangeModeChanged(menu: wjInput.Menu) {
        var reversalInput = this.inputNumber;
        if (menu.selectedValue === 'Percentage') {
            reversalInput.format = 'p0';
            reversalInput.min = 0;
            reversalInput.max = 1;
            reversalInput.value = core.clamp(reversalInput.value, 0, .05);
            reversalInput.step = 0.05;
        } else if (menu.selectedValue === 'ATR') {
            reversalInput.format = 'n0';
            reversalInput.min = 2;
            reversalInput.max = this.data.length - 2;
            reversalInput.value = core.clamp(reversalInput.value, 14, this.data.length - 2);
            reversalInput.step = 1;
        } else {
            reversalInput.format = 'n0';
            reversalInput.min = 1;
            reversalInput.max = null;
            reversalInput.value = 1;
            reversalInput.step = 1;
        }
        this.optionChanged();
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartFinanceModule, BrowserModule],
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

