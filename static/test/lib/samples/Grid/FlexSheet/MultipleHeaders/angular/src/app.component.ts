import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flex') flex: wjcSheet.FlexSheet;
    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            for (let row = 0; row < flex.rows.length; row++) {
                for (let col =  0; col < flex.columns.length; col++) {
                    flex.setCellData(row, col, row + col);
                }
            }
        });
    }

    addRowHeader() {
        this.flex.rowHeaders.columns.push(new wjcGrid.Column());
    }

    removeRowHeader() {
        let colCnt = this.flex.rowHeaders.columns.length;
        if (colCnt > 0){
            this.flex.rowHeaders.columns.removeAt(colCnt - 1);
        }
    }

    addColumnHeader() {
        this.flex.columnHeaders.rows.push(new wjcGrid.Row());
    }

    removeColumnHeader() {
        let rowCnt = this.flex.columnHeaders.rows.length;
        if (rowCnt > 0){
            this.flex.columnHeaders.rows.removeAt(rowCnt - 1);
        }
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

