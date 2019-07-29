import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _showRanges = true;
    //
    gaugeValue = 75;
    radThickness = 0.2;
    linThickness = 0.4;
    //
    get showRanges() {
        return this._showRanges;
    }
    set showRanges(value: boolean) {
        if (this._showRanges !== value) {
            this.radThickness = value ? 0.2 : 1;
            this.linThickness = value ? 0.4 : 1;
            this._showRanges = value;
        }
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

