import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    includeHeaders = true;
    private _hasHeaders = false;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    copying(sender: grid.FlexGrid, args: grid.CellRangeEventArgs) {
        this._hasHeaders = false;
        if (this.includeHeaders) {
            let text = sender.getClipString(),
                sel = sender.selection,
                hdr = '';
            //
            for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                if (hdr) hdr += '\t';
                hdr += sender.columns[c].header;
            }
            text = hdr + '\r\n' + text;
            //
            // put text with headers on the clipboard
            wijmo.Clipboard.copy(text);
            this._hasHeaders = true;
            //
            // prevent the grid from overwriting our clipboard content
            args.cancel = true;
        }
    }
    //
    pasting(sender: grid.FlexGrid, args: grid.CellRangeEventArgs) {
        if (this._hasHeaders) {
            args.cancel = true;
        }
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
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

