import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(200);
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // listen for clicks on column headers
        flex.sortingColumn.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let view = s.collectionView,
                sds = view.sortDescriptions;
            // prevent default behavior
            e.cancel = true;
            // if the control key is pressed, clear all sorts
            if (e.data.ctrlKey) {
                sds.clear();
                return;
            }  
            // flip direction or add new sort
            let prop = s.columns[e.col].binding,
                index = -1;
            for (let i = 0; i < sds.length && index < 0; i++) {
                if (sds[i].property == prop) {
                    index = i;
                }
            }
            let sd: wjcCore.SortDescription;
            if (index < 0) { // not found, add now
                sd = new wjcCore.SortDescription(prop, true);
                sds.push(sd);
            } else { // found, flip its direction
                sd = new wjcCore.SortDescription(prop, !sds[index].ascending);
                sds.splice(index, 1, sd);
            }
        });
    }
}
@NgModule({
  imports: [WjGridModule, BrowserModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

