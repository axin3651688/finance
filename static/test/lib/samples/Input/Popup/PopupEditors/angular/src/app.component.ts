import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
//
import { Component, enableProdMode, NgModule, ViewChild, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('thePopup') thePopup: input.Popup;
    countries: string[];
    data: TDataItem[];
    current: TDataItem;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.countries = dataService.getCountries();
        this.data = dataService.getData();
    }
    //
    // add 'edit button' to row header cells
    formatItem(sender: grid.FlexGrid, e: grid.FormatItemEventArgs) {
        if (e.panel == sender.rowHeaders && e.col == 0) {
            e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
        }
    }
    //
    initGrid(grid: grid.FlexGrid) {
        grid.hostElement.addEventListener('click', e => {
            let ht = grid.hitTest(e);
            //
            if (ht.panel == grid.rowHeaders) {
                // prepare form
                let item: TDataItem = grid.rows[ht.row].dataItem;
                //
                // clone the current data item
                this.current = { 
                    country: item.country,
                    expenses: item.expenses,
                    id: item.id,
                    overdue: item.overdue,
                    sales: item.sales
                 };
                //
                // show the form
                this.thePopup.show(true, (sender: input.Popup) => {
                    if (sender.dialogResult == 'wj-hide-ok') {
                        // commit changes if the user pressed the OK button
                        (<wijmo.CollectionView>grid.collectionView).editItem(item);
                        item.country = this.current.country;
                        item.sales = this.current.sales;
                        item.expenses = this.current.expenses;
                        (<wijmo.CollectionView>grid.collectionView).commitEdit();
                    }
                    //
                    // return focus to the grid
                    grid.focus();
                });
            }
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule],
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

