import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('theRadialGauge') theRadialGauge: gauge.RadialGauge;
    @ViewChild('theLinearGauge') theLinearGauge: gauge.LinearGauge;
    @ViewChild('theVerticalGauge') theVerticalGauge: gauge.LinearGauge;
    stackRanges = true;
    //
    ngAfterViewInit() {
        window.setInterval(() => {
            let i = Math.floor(Math.random() * this.theRadialGauge.ranges.length),
                value = this.theRadialGauge.ranges[i].max + (4 * Math.random() - 2);
            //
            value = Math.min(100, Math.max(0, value));
            this.theRadialGauge.ranges[i].max = value;
            this.theLinearGauge.ranges[i].max = value;
            this.theVerticalGauge.ranges[i].max = value;
            //
            this.theRadialGauge.value = value;
            this.theLinearGauge.value = value;
            this.theVerticalGauge.value = value;
        }, 100);
    }
}
//
@NgModule({
    imports: [WjGaugeModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

