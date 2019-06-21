import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _fmtPluralStr = JSON.stringify({
        count: 'count',
        when: {
            0: 'No items selected.',
            1: 'A single item is selected.',
            2: 'A pair is selected.',
            3: 'A trio is selected.',
            4: 'A quartet is selected.',
            'other': '{count:n0} items are selected.'
        }
    });
    //
    format(value: string) {
        return wijmo.format(this._fmtPluralStr, {
            count: value
        });
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

