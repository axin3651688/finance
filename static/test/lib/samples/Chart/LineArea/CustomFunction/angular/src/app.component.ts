import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from '@grapecity/wijmo.angular2.chart.analytics';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    max = 2 * Math.PI;
    //
    yFunc(x: number) {
        return Math.sin(4 * x) * Math.cos(3 * x);
    }
    //
    paramXFunc(t: number) {
        return 10 * Math.cos(5 * t);
    }
    //
    paramYFunc(t: number) {
        return Math.sin(6 * t);
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnalyticsModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);