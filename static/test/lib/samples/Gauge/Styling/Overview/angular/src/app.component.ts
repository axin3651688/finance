import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    color = new wijmo.Color('grey');
    //
    initGauge(g: gauge.RadialGauge, color: string) {
        g.isReadOnly = false;
        g.thumbSize = 10;
        g.hasShadow = false;
        g.min = 0;
        g.max = 255;
        g.step = 5;
        g.showTicks = true;
        g.tickSpacing = 25;
        g.face.thickness = 0.2;
        g.pointer.thickness = 0.3;
        g.pointer.color = color;
        g.hostElement.style.color = color;
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

