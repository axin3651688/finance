import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.input';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];
    private _currentEditItem: any = null;

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.rows.defaultSize = 40;
        // custom formatter to paint buttons and editors
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.cells) {
                let col = s.columns[e.col],
                    item = s.rows[e.row].dataItem;
                if (item == this._currentEditItem) {
                    // create editors and buttons for the item being edited
                    switch (col.binding) {
                    case 'buttons':
                        e.cell.innerHTML = document.getElementById('tplBtnEditMode').innerHTML;
                        e.cell['dataItem'] = item;
                        break;
                    case 'country':
                    case 'sales':
                    case 'expenses':
                        e.cell.innerHTML = '<input class="form-control" ' +
                        'id="' + col.binding + '" ' +
                        'value="' + s.getCellData(e.row, e.col, true) + '"/>';
                        break;
                    }
                } else {
                    // create buttons for items not being edited
                    switch (col.binding) {
                    case 'buttons':
                        e.cell.innerHTML = document.getElementById('tplBtnViewMode').innerHTML;
                        e.cell['dataItem'] = item;
                        break;
                    }
                }
            }
        });

        // handle button clicks
        flex.addEventListener(flex.hostElement, 'click', (e: MouseEvent) => {
            let targetBtn: HTMLButtonElement;
            if (e.target instanceof HTMLButtonElement) {
                targetBtn = e.target;
            } else if (e.target instanceof HTMLSpanElement && e.target.classList.contains('glyphicon')) {
                targetBtn = e.target.parentElement as HTMLButtonElement;
            }
            if (targetBtn) {
                // get button's data item
                let item = wjcCore.closest(targetBtn, '.wj-cell')['dataItem'];
                // handle buttons
                switch (targetBtn.id) {
                    // start editing this item
                    case 'btnEdit':
                        this._editItem(item);
                        break;
                    // remove this item from the collection
                    case 'btnDelete':
                        (<wjcCore.CollectionView>flex.collectionView).remove(item);
                        break;
                    // commit edits
                    case 'btnOK':
                        this._commitEdit();
                        break;
                    // cancel edits
                    case 'btnCancel':
                        this._cancelEdit();
                        break;
                }
            }
        });

        // exit edit mode when scrolling the grid or losing focus
        flex.scrollPositionChanged.addHandler(this._cancelEdit.bind(this));
        flex.lostFocus.addHandler(this._cancelEdit.bind(this));
    }

    private _getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }

        return data;
    }

    private _editItem(item: any) {
        this._cancelEdit();
        this._currentEditItem = item;
        this.flex.invalidate();
    }

    private _commitEdit() {
        if (this._currentEditItem) {
            this.flex.columns.forEach((col: wjcGrid.Column) => {
                let input = <HTMLInputElement>this.flex.hostElement.querySelector('#' + col.binding);
                if (input) {
                    let value = wjcCore.changeType(input.value, col.dataType, col.format);
                    if (wjcCore.getType(value) == col.dataType) {
                        this._currentEditItem[col.binding] = value;
                    }
                }
            });
        }
        this._currentEditItem = null;
        this.flex.invalidate();
    }

    private _cancelEdit() {
        if (this._currentEditItem) {
            this._currentEditItem = null;
            this.flex.invalidate();
        }
    }
}

@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

