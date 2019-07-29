import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    quickEdit: boolean = true;

    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(100);
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.columnHeaders) {
                if (s.columns[e.col].binding == 'sel') {
                    e.cell.innerHTML = '<input class="select-all" tabindex="-1" type="checkbox">';
                    this._updateSelectAllBox(s);
                }
            } else if (e.panel == s.cells) {
                wjcCore.setAttribute(
                    e.cell.parentElement,
                    'aria-selected',
                    s.rows[e.row].dataItem.sel
                );
            }
        });

        // initialize column widths
        flex.autoSizeColumns(null, null, null, 18);

        // select/de-select all items when user clicks the check box on the header
        flex.hostElement.addEventListener('click', (e: MouseEvent) => {
            if (wjcCore.hasClass(<HTMLInputElement>e.target, 'select-all') &&
                e.target instanceof HTMLInputElement) {
                flex.deferUpdate(() => {
                    flex.collectionView.items.forEach((item: any) => {
                        item.sel = (<HTMLInputElement>e.target).checked;
                    });
                });
            }
        });
    }

     // update the select all checkbox state
     private _updateSelectAllBox(grid: wjcGrid.FlexGrid) {
        let cb = grid.hostElement.querySelector('.select-all');
        if (cb instanceof HTMLInputElement) {
            let items = grid.collectionView.items,
            last = null,
            indeterminate = false;
            for (let i = 0; i < items.length; i++) {
                if (last != null && items[i].sel != last) {
                    indeterminate = true;
                    break;
                }
                last = items[i].sel;
            }
            cb.checked = last;
            if (indeterminate) {
                cb.indeterminate = true;
            }
        }
    }
}

@NgModule({
  imports: [WjGridModule, FormsModule, BrowserModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

