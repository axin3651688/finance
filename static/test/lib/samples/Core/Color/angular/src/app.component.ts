import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    private _interval: number = null;
    gradient: wijmo.Color[] = [];
    //
    interpolate(start: string, end: string) {
        let c1 = new wijmo.Color(start),
            c2 = new wijmo.Color(end);
        //
        // calculate new gradient
        this.gradient = [];
        for (let i = 0, cnt = 80; i < cnt; i++) {
            this.gradient.push(wijmo.Color.interpolate(c1, c2, i / cnt));
        }
        //
        // animate the color
        let theColor = <HTMLElement>document.querySelector('#theColor');
        clearInterval(this._interval);
        this._interval = wijmo.animate((pct: number) => {
            theColor.style.background = wijmo.Color.interpolate(c1, c2, pct).toString();
        }, 2000);
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

