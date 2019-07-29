import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    dashboard = [
        { heading: 'Revenue', sub: 'US$, thousands', max: 400, actual: 345, target: 340, bad: 210, good: 300 },
        { heading: 'Profit', sub: '%', max: 50, actual: 37, target: 32, bad: 20, good: 30 },
        { heading: 'Order Size', sub: 'US$, average', max: 600, actual: 320, target: 520, bad: 400, good: 500 },
        { heading: 'New Customers', sub: 'count', max: 1500, actual: 1100, target: 1000, bad: 600, good: 900 },
        { heading: 'Satisfaction', sub: '0 to 5', max: 5, actual: 4, target: 4.5, bad: 2.5, good: 4.5 },
    ]
}
//
@NgModule({
    imports: [WjGaugeModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

