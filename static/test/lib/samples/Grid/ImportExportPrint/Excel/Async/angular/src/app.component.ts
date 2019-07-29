import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    fileName: string = '';
    includeColumnHeader = true;
    customContent = false;

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getProductOrders(500);
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    initializeFlexSheet(flex: wjcGrid.FlexGrid) {
        let groupNames = ['Product', 'Country', 'Amount'],
            cv,
            propName,
            groupDesc;

        // get the collection view, start update
        cv = flex.collectionView;
        cv.beginUpdate();

        // clear existing groups
        cv.groupDescriptions.clear();

        // add new groups
        for (let i = 0; i < groupNames.length; i++) {
            propName = groupNames[i].toLowerCase();
            if (propName == 'amount') {

                // group amounts in ranges
                // (could use the mapping function to group countries into continents, 
                // names into initials, etc)
                groupDesc = new wjcCore.PropertyGroupDescription(propName, (item: any, prop: string) => {
                    let value = item[prop];
                    if (value > 1000) return 'Large Amounts';
                    if (value > 100) return 'Medium Amounts';
                    if (value > 0) return 'Small Amounts';
                    return 'Negative';
                });
                cv.groupDescriptions.push(groupDesc);
            } else if (propName) {

                // group other properties by their specific values
                groupDesc = new wjcCore.PropertyGroupDescription(propName);
                cv.groupDescriptions.push(groupDesc);
            }
        }

        // done updating
        cv.endUpdate();
    }

    save() {
        wjcGridXlsx.FlexGridXlsxConverter.saveAsync(this.flex,
            {
                includeColumnHeaders: this.includeColumnHeader,
                includeCellStyles: false,
                formatItem: this.customContent ? this._exportFormatItem : null
            },
            'FlexGrid.xlsx');
    }

    load() {
        let fileInput = <HTMLInputElement>document.getElementById('importFile');
        if (fileInput.files[0]) {
            this.customContent = false;
            wjcGridXlsx.FlexGridXlsxConverter.loadAsync(this.flex, fileInput.files[0], { includeColumnHeaders: this.includeColumnHeader });
        }
    }

    private _exportFormatItem(args: wjcGridXlsx.XlsxFormatItemEventArgs) {
        var p = args.panel,
            row = args.row,
            col = args.col,
            xlsxCell = args.xlsxCell,
            cell: HTMLElement,
            color: string;

        if (p.cellType === wjcGrid.CellType.Cell) {
            if (p.columns[col].binding === 'color') {
                //color = p.rows[row].dataItem['color'];
                if (xlsxCell.value) {
                    if (!xlsxCell.style.font) {
                        xlsxCell.style.font = {};
                    }
                    xlsxCell.style.font.color = (<string>xlsxCell.value).toLowerCase();
                }
            } else if (p.columns[col].binding === 'active' && p.rows[row] instanceof wjcGrid.GroupRow) {
                cell = args.getFormattedCell();
                xlsxCell.value = cell.textContent.trim();
                xlsxCell.style.hAlign = wjcXlsx.HAlign.Left;
            }
        }
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule, FormsModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

