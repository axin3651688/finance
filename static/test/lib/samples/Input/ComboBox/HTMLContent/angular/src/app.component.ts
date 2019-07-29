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
    private readonly _template = '<div class="item">' +
        '<h1>{name}</h1>' +
        '<b>{city}</b> ({state})<br/>' +
        '{address}<br/>' +
        'Phone: <b>{phone}</b><br/>' +
        'Fax: <b>{fax}</b><br/>' +
        'Website: <a href="{site}" target="_blank">{site}</a><br/>' +
        '</div>';
    //
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    formatItem(e: input.FormatItemEventArgs) {
        let html = wijmo.format(this._template, e.data, (data: any, name: string, fmt: string, val: any) => {
            return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
        });
        e.item.innerHTML = html;
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

