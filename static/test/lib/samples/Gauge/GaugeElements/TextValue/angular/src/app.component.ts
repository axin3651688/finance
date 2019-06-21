import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
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
    @ViewChild('theGauge') theGauge: gauge.RadialGauge;
    showText = 'All';
    //
    get customText() {
        return !!this.theGauge.getText;
    }
    set customText(value: boolean) {
        this.theGauge.getText = value ? this.getTextCallback : null;
    }
    //
    // getText callback function
    private getTextCallback(gauge: gauge.Gauge, part: string, value: number, text: string) {
        switch (part) {
            case 'value':
                if (value <= 10) return 'Empty!';
                if (value <= 25) return 'Low...';
                if (value <= 95) return 'Good';
                return 'Full';
            case 'min':
                return 'empty';
            case 'max':
                return 'full';
        }
        return text;
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

