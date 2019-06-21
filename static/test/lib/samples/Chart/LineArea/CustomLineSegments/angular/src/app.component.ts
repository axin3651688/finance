import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    itemFormatter(engine: wjChart.IRenderEngine, ht: wjChart.HitTestInfo, defaultFormat: Function) {
        let binding = 'downloads';
        //
        // check that this is the right series/element
        if (ht.series.binding == binding && ht.pointIndex > 0 &&
            ht.chartElement == wjChart.ChartElement.SeriesSymbol) {
            //
            // get current and previous values
            let chart = ht.series.chart,
                items = chart.collectionView.items,
                valNow = items[ht.pointIndex][binding],
                valPrev = items[ht.pointIndex - 1][binding];
            //
            // add line if value is increasing
            if (valNow > valPrev) {
                let pt1 = chart.dataToPoint(ht.pointIndex, valNow),
                    pt2 = chart.dataToPoint(ht.pointIndex - 1, valPrev);
                //
                engine.drawLine(pt1.x, pt1.y, pt2.x, pt2.y, null, {
                    stroke: 'gold',
                    strokeWidth: 6
                });
            }
        }
        //
        // render element as usual
        defaultFormat();
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