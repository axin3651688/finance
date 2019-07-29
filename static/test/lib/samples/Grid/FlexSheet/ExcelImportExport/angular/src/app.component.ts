import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    fileName: string = '';
    private _countries: string[];
    private _products: string[];

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(50);
        this._countries = dataSvc.countries;
        this._products = dataSvc.products;
    }

    @ViewChild('flex') flex: wjcSheet.FlexSheet;

    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        flex.deferUpdate(() => {
            let sheetIdx,
                sheetName,
                colIdx,
                rowIdx;

            // initialize the dataMap for the bound sheet.
            if (flex) {
                for (sheetIdx = 0; sheetIdx < flex.sheets.length; sheetIdx++) {
                    flex.selectedSheetIndex = sheetIdx;
                    sheetName = flex.selectedSheet.name;
                    if (sheetName === 'Country') {
                        let column = flex.columns.getColumn('countryId');
                        if (column && !column.dataMap) {
                            column.dataMap = this._buildDataMap(this._countries);
                        }
                        column = flex.columns.getColumn('productId');
                        if (column && !column.dataMap) {
                            column.dataMap = this._buildDataMap(this._products);
                        }
                        column = flex.columns.getColumn('amount');
                        if (column) {
                            column.format = 'c2';
                        }
                    } else {
                        for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                            for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                                flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                            }
                        }
                    }
                }
                flex.selectedSheetIndex = 0;
            }
        });
    }

    // Load xlsx file to FlexSheet.
    load () {
        let fileInput = <HTMLInputElement>document.getElementById('importFile');
        if (this.flex && fileInput.files[0]) {
            this.flex.loadAsync(fileInput.files[0]);
        }
    }

    // Save FlexSheet to xlsx file.
    save () {
        let fileName;
        if (!!this.fileName) {
            fileName = this.fileName;
        } else {
            fileName = 'FlexSheet.xlsx';
        }
        this.flex.saveAsync(fileName);
    }

    // build a data map from a string array using the indices as keys
    private _buildDataMap(items: string[]) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, 'key', 'value');
    };
}

@NgModule({
  imports: [WjGridSheetModule, BrowserModule, FormsModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

