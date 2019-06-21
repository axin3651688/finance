import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private readonly _comboTableItemTemplate = '<table><tr>' +
        '<td>{country}</td>' +
        '<td class="number" title="GDP (million US$/year)">{gdpm:c0}</td>' +
        '<td class="number" title="Population (thousands)">{popk:n0}</td>' +
        '<td class="number" title="GDP/cap (US$/person/year)">{gdpcap:c0}</td>' +
        '</tr></table>';
    //
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    formatComboTableItem(e: input.FormatItemEventArgs) {
        e.item.innerHTML = wijmo.format(this._comboTableItemTemplate, e.data);
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
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

