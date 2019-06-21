import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    dataBad: any;
    dataGood: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        // Start with some data encoded as JSON (as it would arrive from a server)
        let json = dataService.getData();
        //
        // Decode the data
        // No special parsing for dates, the date field will contain strings
        this.dataBad = JSON.parse(json);
        //
        // Decode the data
        // Use with a Date reviver to restore date fields
        this.dataGood = JSON.parse(json, (key, value) => {
            if (typeof value === 'string') {
                // Parse dates saved as JSON-strings
                let m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/);
                if (m) {
                    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
                }
                //
                // Parse dates saved as OData-style strings
                m = value.match(/^\/Date\((\d+)\)$/);
                if (m) {
                    return new Date(parseInt(m[1]));
                }
            }
            return value;
        });
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
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

