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
import { FormsModule } from '@angular/forms';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    // populate gauge with ranges
    createRanges(g: gauge.RadialGauge, cnt: number) {
        g.ranges.clear();
        //
        if (cnt) {
            let colorMin = new wijmo.Color('red'),
                colorMax = new wijmo.Color('green'),
                span = (g.max - g.min) / cnt;
            //
            for (let i = 0; i < cnt; i++) {
                let rng = new gauge.Range(),
                    color = wijmo.Color.interpolate(colorMin, colorMax, cnt > 1 ? i / (cnt - 1) : 0);
                //
                rng.min = g.min + i * span;
                rng.max = rng.min + span;
                rng.color = color.toString();
                g.ranges.push(rng);
            }
        }
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

