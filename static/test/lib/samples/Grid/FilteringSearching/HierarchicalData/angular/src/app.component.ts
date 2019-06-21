import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    filter(e: any) {
        let filter = (<HTMLInputElement>e.target).value.toLowerCase();
        this._applyHierarchicalFilter(this.flex, filter);
    }

    // update row visibility
    private _applyHierarchicalFilter(grid: wjcGrid.FlexGrid, filter: string) {
        let rows = grid.rows;
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i],
                state = row.dataItem,
                rng = row.getCellRange();
            // handle states (level 0)
            if (row.level == 0) {
                // check if the state name matches the filter
                let stateVisible = state.name.toLowerCase().indexOf(filter) >= 0;
                if (stateVisible) {
                    // it does, so show the state and all its cities
                    for (let j = rng.topRow; j <= rng.bottomRow; j++) {
                        rows[j].visible = true;
                    }
                } else {
                    // it does not, so check the cities
                    for (let j = rng.topRow + 1; j <= rng.bottomRow; j++) {
                        let city = rows[j].dataItem,
                            cityVisible = city.name.toLowerCase().indexOf(filter) >= 0;
                            rows[j].visible = cityVisible;
                        stateVisible = stateVisible || cityVisible;
                    }
                    // if at least one city is visible, the state is visible
                    rows[i].visible = stateVisible; 
                }
                // move on to the next group
                i = rng.bottomRow;
            }
        }
    }

    private _getData() {
        return [
            { name: 'Washington', type: 'state', population: 6971, cities: [
                { name: 'Seattle', type: 'city', population: 652 },
                { name: 'Spokane', type: 'city', population: 210 }]
            }, 
            { name: 'Oregon', type: 'state', population: 3930, cities: [
                { name: 'Portland', type: 'city', population: 609 },
                { name: 'Eugene', type: 'city', population: 159 }]
            },
            { name: 'California', type: 'state', population: 38330, cities: [
                { name: 'Los Angeles', type: 'city', population: 3884 },
                { name: 'San Diego', type: 'city', population: 1356 },
                { name: 'San Francisco', type: 'city', population: 837 }]
            }
       ];
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

