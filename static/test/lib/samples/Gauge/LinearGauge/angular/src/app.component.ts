import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    setDirection(g: gauge.LinearGauge, value: string) {
        let el = g.hostElement.style;
        //
        g.direction = <any>value;
        //
        switch (value) {
            case 'Left':
            case 'Right':
                el.height = '2em';
                el.width = '100%';
                break;
            case 'Up':
            case 'Down':
                el.height = '100%';
                el.width = '2em';
                break;
        }
    }
}
//
@NgModule({
    imports: [WjGaugeModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

