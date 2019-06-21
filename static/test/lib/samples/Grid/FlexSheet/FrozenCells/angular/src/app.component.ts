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
    isFrozen: boolean = false;

    @ViewChild('flex') flex: wjcSheet.FlexSheet;

    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            let colIdx: number,
                rowIdx: number;

            for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                    flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                }
            }
        });

        flex.selectedSheetChanged.addHandler(() => {
            if (flex.frozenColumns > 0 || flex.frozenRows > 0) {
                this.isFrozen = true;
            } else {
                this.isFrozen = false;
            }
        });
    }

    freezeCells() {
        this.flex.freezeAtCursor();
        if (this.flex.frozenColumns > 0 || this.flex.frozenRows > 0) {
            this.isFrozen = true;
        } else {
            this.isFrozen = false;
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

