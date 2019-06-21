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
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('thePopup') thePopup: input.Popup;
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    initGrid(grid: grid.FlexGrid) {
        grid.hostElement.addEventListener('keydown', e => {
            let view = grid.collectionView;
            //
            // looking for ctrl+Delete
            if (e.ctrlKey && e.keyCode == wijmo.Key.Delete && view.currentItem) {
                // prevent the grid from getting the key
                e.preventDefault();
                //
                // confirm row deletion
                this.thePopup.show(true, (sender: input.Popup) => {
                    // delete the row
                    if (sender.dialogResult == 'wj-hide-ok') {
                        (<wijmo.CollectionView>view).remove(view.currentItem);
                    }
                    //
                    // return focus to the grid
                    grid.focus();
                });
            }
        }, true);
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

