import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    mergeState: any = {};
    @ViewChild('flex') flex: wjcSheet.FlexSheet;

    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            for (let row = 0; row < flex.rows.length; row++) {
                for (let col =  0; col < flex.columns.length; col++) {
                    flex.setCellData(row, col, row + col);
                }
            }
        });
        flex.selectionChanged.addHandler(() => {
            this.mergeState = flex.getSelectionFormatState();
        });
    }

    mergeCells() {
        this.flex.mergeRange();
        this.mergeState = this.flex.getSelectionFormatState();
    }
}

@NgModule({
  imports: [WjGridSheetModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

