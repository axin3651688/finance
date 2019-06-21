import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    showPicker(picker: input.ListBox, ref: Element, e: MouseEvent) {
        wijmo.showPopup(picker.hostElement, ref, false, true, false);
        picker.focus();
        e.preventDefault();
    }
    //
    hidePicker(picker: input.ListBox) {
        wijmo.hidePopup(picker.hostElement)
    }
    //
    saveLayout(flex: grid.FlexGrid) {
        localStorage.setItem('myLayout', flex.columnLayout);
    }
    //
    restoreLayout(flex: grid.FlexGrid) {
        let layout = localStorage.getItem('myLayout');
        if (layout) {
            flex.columnLayout = layout;
        }
    }
}
//
@NgModule({
    imports: [WjGridModule, WjInputModule, BrowserModule],
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

