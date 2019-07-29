import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, ViewChild, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _formatGroupHeaders = true;
    private _showCheckboxes = false;
    //
    @ViewChild('theListBox') theListBox: input.ListBox;
    data: wijmo.CollectionView;
    showGroups = true;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    get formatGroupHeaders() {
        return this._formatGroupHeaders;
    }
    set formatGroupHeaders(value: boolean) {
        if (this._formatGroupHeaders !== value) {
            this._formatGroupHeaders = value;
            this.data.refresh();
        }
    }
    //
    get showCheckboxes() {
        return this._showCheckboxes;
    }
    set showCheckboxes(value: boolean) {
        if (this._showCheckboxes !== value) {
            this._showCheckboxes = value;
            this.theListBox.checkedMemberPath = value ? 'checked' : '';
        }
    }
    //
    formatGroupHeader(e: input.FormatItemEventArgs) {
        if (this.formatGroupHeaders && e.index < 0 && e.data instanceof wijmo.CollectionViewGroup) {
            let group = e.data,
                code = this.dataService.getCountryCode(group.name);
            //
            if (code) {
                e.item.innerHTML = `<span class="flag-icon flag-icon-${code}"></span> ${group.name}`;
            }
        }
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
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

