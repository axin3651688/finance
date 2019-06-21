import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';
import * as wjcInput from '@grapecity/wijmo.input';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    tableStyleNames: string[] = null;
    selectedTable: wjcSheet.Table = null;
    private _dataSvc: DataService;

    constructor(@Inject(DataService) dataSvc: DataService) {
        this._dataSvc = dataSvc;
    }

    @ViewChild('flex') flex: wjcSheet.FlexSheet;
    @ViewChild('cboTableStyles') cboTableStyles: wjcInput.ComboBox;

    initializeFlexSheet(flex: wjcSheet.FlexSheet) {
        let tableStyle: wjcSheet.TableStyle,
            table: wjcSheet.Table,
            i: number;

        this.tableStyleNames = [];
        for (i = 1; i <= 21; i++) {
            this.tableStyleNames.push('TableStyleLight' + i);
        }
        for (i = 1; i <= 28; i++) {
            this.tableStyleNames.push('TableStyleMedium' + i);
        }
        for (i = 1; i <= 11; i++) {
            this.tableStyleNames.push('TableStyleDark' + i);
        }

        tableStyle = flex.getBuiltInTableStyle('TableStyleDark9');
        table = flex.selectedSheet.addTableFromArray(2, 1, this._dataSvc.getTableData(10), null, 'Table1', tableStyle, { showTotalRow: true });

        flex.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
            let selection = args.range;
            if (selection.isValid) {
                this._getSelectedTable(selection, flex);
            } else {
                this.selectedTable = null;
            }
        });

        flex.updatedLayout.addHandler(() => {
            if (flex.selection && flex.selection.isValid) {
                this._getSelectedTable(flex.selection, flex);
            } else {
                this.selectedTable = null;
            }
        });
    }

    cboTableStylesInit(cboTableStyles: wjcInput.ComboBox) {
        cboTableStyles.selectedIndexChanged.addHandler(() => {
            // apply the table style for the selected table
            if (this.selectedTable) {
                var tableStyle = this.flex.getBuiltInTableStyle(cboTableStyles.selectedValue);
                this.selectedTable.style = tableStyle;
            }
        });
        if (this.selectedTable) {
            cboTableStyles.selectedValue = this.selectedTable.style.name;
        }
    }

    // Get selected table in FlexSheet.
    private _getSelectedTable(selection: wjcGrid.CellRange, flexSheet: wjcSheet.FlexSheet) {
        this.selectedTable = flexSheet.selectedSheet.findTable(selection.row, selection.col);
        if (this.selectedTable && this.cboTableStyles) {
            var tableStyle = flexSheet.getBuiltInTableStyle(this.selectedTable.style.name);
            if (tableStyle) {
                this.cboTableStyles.selectedValue = tableStyle.name;
            }
        }
    }
}

@NgModule({
  imports: [WjGridSheetModule, WjInputModule, BrowserModule, FormsModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

