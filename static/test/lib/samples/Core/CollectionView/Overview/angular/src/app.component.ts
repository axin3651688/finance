import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _timeOut: number;
    //
    cv: wijmo.CollectionView;
    groupedList: any[];
    filter: { id?: string, country?: string, color?: string, minAmount?: number | string };
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.cv = new wijmo.CollectionView(dataService.getData(500), {
            pageSize: 10,
            filter: this._filterFun.bind(this),
            newItemCreator: () => {
                var newItem = dataService.getData(1)[0];
                newItem.id = -1;
                return newItem;
            }
        });
        //
        this.groupedList = this.cv.items;
        //
        this.cv.collectionChanged.addHandler(() => {
            this.groupedList = this.cv.items;
            if (this.cv.groups && this.cv.groups.length > 0) {
                this.groupedList = [];
                this.cv.groups.forEach(group => this._addGroup(group));
            }
        });
        //
        this.filter = { id: '', country: '', color: '', minAmount: '' };
    }
    //
    doFilter() {
        if (this._timeOut) {
            clearTimeout(this._timeOut);
        }
        //
        this._timeOut = setTimeout(() => {
            this._timeOut = null;
            this.cv.refresh();
        }, 250);
    }
    //
    // IEditableCollectionView commands
    isEditing() {
        return this.cv.isEditingItem || this.cv.isAddingNew;
    }
    //
    edit() {
        this.cv.editItem(this.cv.currentItem);
    }
    //
    add() {
        this.cv.addNew();
    }
    //
    delete() {
        this.cv.remove(this.cv.currentItem);
    }
    //
    commit() {
        this.cv.commitEdit();
        this.cv.commitNew();
    }
    //
    cancel() {
        this.cv.cancelEdit();
        this.cv.cancelNew();
    }
    //
    moveCurrentTo(item: any) {
        if (!this.isEditing() && !this.isGroup(item)) {
            this.cv.moveCurrentTo(item);
        }
    }
    //
    // sorting
    getSort(propName: string) {
        let sd = this.cv.sortDescriptions;
        if (sd.length > 0 && sd[0].property == propName) {
            return sd[0].ascending ? '▲' : '▼';
        }
        return '◇';
    }
    //
    toggleSort(propName: string) {
        let sd = this.cv.sortDescriptions,
            ascending = true;
        //
        if (sd.length > 0 && sd[0].property == propName) {
            ascending = !sd[0].ascending;
        }
        //
        // remove any old sort descriptors and add the new one
        sd.splice(0, sd.length, new wijmo.SortDescription(propName, ascending));
    }
    //
    // grouping
    getGroup(propName: string) {
        let index = this._findGroup(propName);
        return index < 0
            ? /*'▯' +*/ Array(this.cv.groupDescriptions.length + 2).join('▷')
            : /*'▮' +*/ Array(index + 2).join('▶');
    }
    //
    toggleGroup(propName: string) {
        let gd = this.cv.groupDescriptions,
            index = this._findGroup(propName);
        //
        if (index >= 0) {
            gd.removeAt(index);
        } else {
            if (propName == 'amount') {
                // when grouping by amount, use ranges instead of specific values
                gd.push(new wijmo.PropertyGroupDescription(propName, (item: TDataItem) => {
                    if (item.amount > 1000) return 'Large Amounts';
                    if (item.amount > 100) return 'Medium Amounts';
                    if (item.amount > 0) return 'Small Amounts';
                    //
                    return 'Negative Amounts';
                }));
            } else {
                // group by specific property values
                gd.push(new wijmo.PropertyGroupDescription(propName));
            }
        }
    }
    //
    isGroup(item: any) {
        return item instanceof wijmo.CollectionViewGroup;
    }
    //
    private _addGroup(g: wijmo.CollectionViewGroup) {
        this.groupedList.push(g);
        //
        if (g.isBottomLevel) {
            g.items.forEach(item => this.groupedList.push(item));
        } else {
            g.groups.forEach(group => this._addGroup(group));
        }
    }
    //
    private _findGroup(propName: string) {
        let gd = this.cv.groupDescriptions;
        //
        for (let i = 0; i < gd.length; i++) {
            if (gd[i].propertyName == propName) {
                return i;
            }
        }
        //
        return -1;
    }
    //
    // filtering
    private _filterFun(item: TDataItem) {
        // check each filter parameter
        let f = this.filter;
        //
        if (f) {
            if ((f.id == 'odd' && item.id % 2 == 0) || (f.id == 'even' && item.id % 2 != 0)) {
                return false;
            }
            //
            if (f.country && item.country.indexOf(f.country) < 0) {
                return false;
            }
            //
            if (f.color && item.color.indexOf(f.color) < 0) {
                return false;
            }
            //
            if ((f.minAmount || f.minAmount === 0) && item.amount < f.minAmount) {
                return false;
            }
        }
        //
        // all passed, return true to include the item
        return true;
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
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