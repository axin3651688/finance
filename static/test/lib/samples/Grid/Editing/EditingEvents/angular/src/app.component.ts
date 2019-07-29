import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
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
    eventLog: string = '';
    data: any[];
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];

    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.beginningEdit.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            this.eventLog = '';
            let col = s.columns[e.col];
            if (col.binding != 'overdue') {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    this.eventLog = 'Overdue items cannot be edited';
                }
			}
        });
        flex.cellEditEnding.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellEditEndingEventArgs) => {
            this.eventLog = '';
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
                if (!wjcCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    this.eventLog = 'Please enter a positive amount';
                }
            }
        });
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

