import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: string[];
    tooltip: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.tooltip = '<b>{date:MMM dd}</b><br/>' +
            '<table>' +
            '<tr><td>high</td><td>{high:c}</td><tr/>' +
            '<tr><td>low</td><td>{low:c}</td><tr/>' +
            '<tr><td>open</td><td>{open:c}</td><tr/>' +
            '<tr><td>close</td><td>{close:c}</td><tr/>' +
            '</table>';
        this.palette = ['rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)', 
            'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)', 'rgba(20,20,20,1)'];
    }
}
//
@NgModule({
    imports: [WjChartModule, BrowserModule],
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

