import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import { DataService, DataItem } from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flexGrid') flexGrid: wjGrid.FlexGrid;
    @ViewChild('selectionMode') selectionMode: wjInput.ComboBox;
    data: DataItem[];
    comboBoxData: string[];
    currentSelection: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData();
        this.comboBoxData = 'None,Cell,CellRange,Row,RowRange,ListBox'.split(',');
    }
    //
    initializeGrid() {
        this.flexGrid.onSelectionChanged(null);
    }
    //
    onTextChanged() {
        this.flexGrid.selectionMode = wjCore.asEnum(this.selectionMode.selectedIndex, wjGrid.SelectionMode);
    }
    //
    onSelectionChanged() {
        this.currentSelection = wjCore.format(
            '({row},{col})-({row2},{col2})',
            this.flexGrid.selection);
    }
    //
    onRefreshClick() {
        this.flexGrid.collectionView.refresh();
    }
    //
    onSelectClick() {
        this.selectionMode.text = 'CellRange';
        this.flexGrid.selection = new wjGrid.CellRange(0, 0, 1, 1);
    }
    //
    onListSelectClick() {
        this.selectionMode.text = 'ListBox';
        this.flexGrid.select(0, 0);
        setTimeout(() => {
            [0, 2, 4].forEach((index) => {
                this.flexGrid.rows[index].isSelected = true;
            });
        });
    }
}

@NgModule({
    imports: [WjGridModule, FormsModule, WjInputModule, BrowserModule],
    providers: [DataService],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

