import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    dataSvc: DataService;
    rowCount: number;
    cellCount: number;

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(100);
        this.dataSvc = dataSvc;
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        this.rowCount = flex.rows.length;	
        this.cellCount = flex.hostElement.querySelectorAll('.wj-cell').length;    
        flex.updatedView.addHandler((s: wjcGrid.FlexGrid) => {
			this.rowCount = s.rows.length;	
			this.cellCount = s.hostElement.querySelectorAll('.wj-cell').length;    
		});
        flex.scrollPositionChanged.addHandler((s: wjcGrid.FlexGrid) => {
            // if we're close to the bottom, add 20 items
            if (s.viewRange.bottomRow >= s.rows.length - 1) {
                this._addData(this.data, 20);
                s.collectionView.refresh();
            }
        });
    }

    // add random data to an array
    private _addData(data: any[], cnt: number) {
        let more = this.dataSvc.getData(cnt, data.length);
        for (let i = 0; i < more.length; i++) {
            data.push(more[i])
        }
    }
}

@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
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

