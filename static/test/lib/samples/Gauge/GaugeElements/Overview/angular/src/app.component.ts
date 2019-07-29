import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
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
    setTooltips(g: gauge.RadialGauge) {
        // add some tooltips
        let tt = new wijmo.Tooltip(),
            host = g.hostElement;
        //
        tt.setTooltip(host.querySelector('.wj-face'), 'Face');
        tt.setTooltip(host.querySelector('.wj-pointer'), 'Pointer');
        tt.setTooltip(host.querySelector('.wj-thumb'), 'Thumb');
        tt.setTooltip(host.querySelector('.wj-ranges'), 'Ranges');
        tt.setTooltip(host.querySelector('.wj-ticks'), 'Tickmarks');
        tt.setTooltip(host.querySelector('.wj-value'), 'Text: Value');
        tt.setTooltip(host.querySelector('.wj-min'), 'Text: Min');
        tt.setTooltip(host.querySelector('.wj-max'), 'Text: Max');
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

