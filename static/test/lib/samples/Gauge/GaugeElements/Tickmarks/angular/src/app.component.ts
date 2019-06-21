import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    showTicks = true;
    tickSpacing = 10;
    //
    changeTickWidth(gauge: gauge.RadialGauge, value: number) {
        (gauge.hostElement.querySelector('.wj-ticks') as HTMLElement).style.strokeWidth = value.toString();
    }
    //
    changeTickColor(gauge: gauge.RadialGauge, value: string) {
        (gauge.hostElement.querySelector('.wj-ticks') as HTMLElement).style.stroke = value;
    }
}
//
@NgModule({
    imports: [WjGaugeModule, WjInputModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

