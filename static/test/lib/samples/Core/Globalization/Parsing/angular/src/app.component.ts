import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
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
    dateResult = '';
    numberResult = '';
    //
    private _culture = 'en';
    get culture(): string {
        return this._culture;
    }
    set culture(value: string) {
        if (this._culture != value) {
            this._culture = value;
            this._loadCulture(value);
        }
    }
    //
    parseDate(value: string, format: string) {
        let result = wijmo.Globalize.parseDate(value, format);
        //
        this.dateResult = wijmo.isDate(result)
            ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
            : '** Could not parse date... **';
    }
    //
    parseNumber(value: string, format: string) {
        let result = wijmo.Globalize.parseFloat(value, format);
        //
        this.numberResult = wijmo.isNumber(result)
            ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
            : '** Could not parse number... **';
    }
    //
    private _loadCulture(culture: string) {
        // apply new culture to page
        let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${culture}.js`,
            scripts = document.getElementsByTagName('script');
        //
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                script.parentElement.removeChild(script);
                break;
            }
        }
        //
        let script = document.createElement('script');
        script.onload = () => wijmo._updateCulture();
        //
        script.src = url;
        document.head.appendChild(script);
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

