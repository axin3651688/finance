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
    readonly dateSamples = [
        { format: 'd', description: 'Short Date Pattern' },
        { format: 'D', description: 'Long Date Pattern' },
        { format: 'f', description: 'Full Date/Time Pattern (short time)' },
        { format: 'F', description: 'Full Date/Time Pattern (long time)' },
        { format: 't', description: 'Short Time Pattern' },
        { format: 'T', description: 'Long Time Pattern' },
        { format: "'Q'Q yyyy", description: 'Quarter/Year' },
        { format: 'MMMM dd, yyyy', description: 'Custom format' }
    ];
    //
    readonly numberSamples = [
        { specifier: 'n*', description: 'Number' },
        { specifier: 'n*,', description: 'Number (thousands)' },
        { specifier: 'n*,,', description: 'Number (millions)' },
        { specifier: 'f*', description: 'Fixed-point' },
        { specifier: 'g*', description: 'General (no trailing zeros)' },
        { specifier: 'd*', description: 'Decimal (integers)' },
        { specifier: 'x*', description: 'Hexadecimal (integers)' },
        { specifier: 'c*', description: 'Currency' },
        { specifier: 'c*€', description: 'Currency (explicit currency symbol)' },
        { specifier: 'c* ', description: 'Currency (no currency symbol)' },
        { specifier: 'p*', description: 'Percent' }
    ];
    //
    numValue = 1234.5678;
    precision = 2;
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
    formatDate(format: string) {
        return wijmo.Globalize.format(new Date(), format);
    }
    //
    formatNumber(specifier: string) {
        let format = specifier.replace('*', this.precision.toString());
        return wijmo.Globalize.format(this.numValue, format);
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
        script.src = url;
        //
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

