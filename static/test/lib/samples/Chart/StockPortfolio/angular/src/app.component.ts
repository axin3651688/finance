import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GlbzPipe } from './GlbzPipe';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { AppSorter } from './AppSorter';
import { Portfolio } from './portfolio';
import * as wjcChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    portfolio: Portfolio;
    @ViewChild('chart') chart: wjcChart.FlexChart;
    cache = {};
    searchCompany: Function;
    constructor(@Inject(DataService) private dataService: DataService) {
        // create portfolio
        this.portfolio = new Portfolio();
        this.portfolio.view.currentChanged.addHandler(this._currentChanged, this);
        this.searchCompany = dataService.getCompany.bind(this);
    }

    getAmountColor(amount: number): string {
        return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
    }

    // update chart selection to match portfolio selection
    private _currentChanged() {
        var p = this.portfolio,
            chart = this.chart;
        if (chart && p) {
            var symbol = p.view.currentItem ? p.view.currentItem.symbol : null,
                selSeries = null;
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
    }

    // selection changed event handler for FlexChart
    selectionChanged(sender: wjcChart.FlexChart, args: any) {
        var chart = sender,
            symbol = chart.selection ? chart.selection.name : null,
            selSeries = null,
            portfolio = this.portfolio;
        //
        if(symbol == null) {
            portfolio.view.moveCurrentToPosition(-1);
        } else {
            for (var i = 0; i < portfolio.view.items.length; i++) {
                if (portfolio.view.items[i].symbol == symbol) {
                    portfolio.view.moveCurrentToPosition(i);
                    break;
                }
            }
        }
    };
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppComponent, AppSorter, GlbzPipe],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

