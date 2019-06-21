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
    initializeNeedleRounded(g: gauge.RadialGauge) {
        g.refreshed.addHandler((g: gauge.RadialGauge) => {
            this.updateNeedleRounded(g);
        });
    }
    //
    initializeNeedlePointed(g: gauge.RadialGauge) {
        g.refreshed.addHandler((g: gauge.RadialGauge) => {
            this.updateNeedlePointed(g);
        });
    }
    //
    // update needle element when gauge size or value change
    // pointed (diamond-shaped) needle
    updateNeedlePointed(g: gauge.RadialGauge) {
        if (!g.clientSize) {
            return;
        }
        //
        // add needle element if necessary
        let needle = g.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = g.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = this.getArgs(g);
        needle.setAttribute('d', wijmo.format('M {lft} {y} L {x} {bot} L {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    //
    // update needle element when gauge size or value change
    // rounded (drop-shaped) needle
    updateNeedleRounded(g: gauge.RadialGauge) {
        if (!g.clientSize) {
            return;
        }
        //
        // add needle element if necessary
        let needle = g.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = g.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = this.getArgs(g);
        needle.setAttribute('d', wijmo.format('M {lft} {y} A {wid} {wid} 0 0 0 {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    //
    // utilities
    private getArgs(g: gauge.RadialGauge) {
        let rc = g.clientSize,
            cx = rc.width / 2,
            cy = rc.height / 2,
            r = Math.min(rc.width, rc.height) / 2,
            wid = r / 10,
            pct = (g.max > g.min) ? (g.value - g.min) / (g.max - g.min) : 0,
            angle = g.startAngle + g.sweepAngle * wijmo.clamp(pct, 0, 1) - 90;
        //
        return {
            angle: angle,
            x: cx.toFixed(4),
            y: cy.toFixed(4),
            wid: wid.toFixed(4),
            lft: (cx - wid).toFixed(4),
            rgt: (cx + wid).toFixed(4),
            top: (cy - r).toFixed(4),
            bot: (cy + wid).toFixed(4)
        };
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

