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
import { ExtendedSelectionManager } from './app.extendedSelectionManager';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    private _xsm: ExtendedSelectionManager;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // add an extended selection manager to the grid
        this._xsm = new ExtendedSelectionManager(flex);
        this._xsm.selectedRanges.collectionChanged.addHandler((s: any, e: wjcCore.NotifyCollectionChangedEventArgs) => {
            let arr = this._xsm.selectedRanges;
            console.log('selectedRanges: ' + arr.length);
            for (let i = 0; i < arr.length; i++) {
                console.log('  ' + i + wjcCore.format(': ({row},{col})-({row2}-{col2})', arr[i]));
            }
        });
    }

    listSelectedCells() {
        // get selected ranges or regular selection
    	let ranges = this._xsm.selectedRanges.length ? this._xsm.selectedRanges : [ this.flex.selection ];
        // build message
        let msg = ranges.length > 1 ? ranges.length + ' ranges selected:' : 'Single range selected:';
        ranges.forEach((rng: wjcGrid.CellRange, index: number) => {
            msg += '\n' + index + wjcCore.format(': ({row},{col})-({row2}-{col2})', rng);
        });
        // show the message
        alert(msg);
    }

    private _getData() {
        // create some random data
        let data = [];
        let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
        for (let i = 0; i < 300; i++) {
            data.push({
                id: i,
                from: countries[i % countries.length],
                to: countries[(i+1) % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                amount: Math.random() * 10000,
                extra: Math.random() * 10000,
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

