import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    gifCtx = {
        loading: false,
        data: <any>null,
    }
    //
    gaugeCtx = {
        loading: false,
        data: <any>null,
        progress: 0,
        interval: <any>null
    }
    //
    constructor(@Inject(DataService) private dataService: DataService) {
    }
    //
    loadDataGif() {
        this.gifCtx.loading = true;
        this.dataService.getData((data) => {
            this.gifCtx.data = data;
            this.gifCtx.loading = false;
        }, 3000);
    }
    //
    loadDataGauge() {
        clearInterval(this.gaugeCtx.interval);
        //
        this.gaugeCtx.loading = true;
        this.gaugeCtx.progress = 0;
        this.gaugeCtx.interval = setInterval(() => {
            this.gaugeCtx.progress = (this.gaugeCtx.progress + 1) % 100;
        }, 50);
        //
        this.dataService.getData((data) => {
            clearInterval(this.gaugeCtx.interval);
            this.gaugeCtx.data = data;
            this.gaugeCtx.loading = false;
        }, 3000);
    }
}
//
@NgModule({
    imports: [WjGaugeModule, WjGridModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

