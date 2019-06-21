import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { AppPipesModule } from './app.pipe';
import { DataService } from './app.data';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  private _itemCount = 500;
    private _culture = 'en';
    private _dataMaps = true;
    private _formatting = true;
    private _filter = '';
    private _toFilter: any;
    private _thisFilterFunction: wjcCore.IPredicate;
    private _groupBy = '';
    private _pageSize = 0;

    protected dataSvc: DataService;
    data: any[];
    // references FlexGrid named 'flex' in the view
    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    // DataSvc will be passed by derived classes
    constructor( @Inject(DataService) dataSvc: DataService) {
        this.dataSvc = dataSvc;

        this._thisFilterFunction = this._filterFunction.bind(this);
        this.data = dataSvc.getData(this.itemCount);
    }

    get itemCount(): number {
        return this._itemCount;
    }
    set itemCount(value: number) {
        if (this._itemCount != value) {
            this._itemCount = value;
            this.data = this.dataSvc.getData(this.itemCount);
            this.groupBy = '';
        }
    }

    get dataMaps(): boolean {
        return this._dataMaps;
    }
    set dataMaps(value: boolean) {
        if (this._dataMaps != value) {
            this._dataMaps = value;
            this._updateDataMaps();
        }
    }

    get formatting(): boolean {
        return this._formatting;
    }
    set formatting(value: boolean) {
        if (this._formatting != value) {
            this._formatting = value;
            this._updateFormatting();
        }
    }

    get culture(): string {
        return this._culture;
    }
    set culture(value: string) {
        if (this._culture != value) {
            this._culture = value;
            this._loadCultureInfo();
        }
    }

    get filter(): string {
        return this._filter;
    }
    set filter(value: string) {
        if (this._filter != value) {
            this._filter = value;
            this._applyFilter();
        }
    }

    get groupBy(): string {
        return this._groupBy;
    }
    set groupBy(value: string) {
        if (this._groupBy != value) {
            this._groupBy = value;
            this._applyGroupBy();
        }
    }

    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(value: number) {
        if (this._pageSize != value) {
            this._pageSize = value;
            if (this.flex) {
                (<wjcCore.IPagedCollectionView>this.flex.collectionView).pageSize = value;
            }
        }
    }

    ngAfterViewInit() {
        if (this.flex) {
            this.updateDataMapSettings();
        }
    }

    // update data maps, formatting, paging now and when the itemsSource changes
    itemsSourceChangedHandler() {
        var flex = this.flex;
        if (!flex) {
            return;
        }

        // make columns 25% wider (for readability and to show how)
        for (var i = 0; i < flex.columns.length; i++) {
            flex.columns[i].width = flex.columns[i].renderSize * 1.25;
        }

        // update data maps and formatting
        this.updateDataMapSettings();

        // set page size on the grid's internal collectionView
        if (flex.collectionView && this.pageSize) {
            (<wjcCore.IPagedCollectionView>flex.collectionView).pageSize = this.pageSize;
        }
    };

    updateDataMapSettings() {
        this._updateDataMaps();
        this._updateFormatting();
    }

    toggleColumnVisibility() {
        var flex = this.flex;
        var col = flex.columns[0];
        col.visible = !col.visible;
    };
    changeColumnSize() {
        var flex = this.flex;
        var col = flex.columns[0];
        col.visible = true;
        col.width = col.width < 0 ? 60 : -1;
        col = flex.rowHeaders.columns[0];
        col.width = col.width < 0 ? 40 : -1;
    };
    toggleRowVisibility() {
        var flex = this.flex;
        var row = flex.rows[0];
        row.visible = !row.visible;
    };
    changeRowSize() {
        var flex = this.flex;
        var row = flex.rows[0];
        row.visible = true;
        row.height = row.height < 0 ? 80 : -1;
        row = flex.columnHeaders.rows[0];
        row.height = row.height < 0 ? 80 : -1;
    };
    changeDefaultRowSize() {
        var flex = this.flex;
        flex.rows.defaultSize = flex.rows.defaultSize == 28 ? 65 : 28;
    };
    changeScrollPosition() {
        var flex = this.flex;
        if (flex.scrollPosition.y == 0) {
            var sz = flex.scrollSize;
            flex.scrollPosition = new wjcCore.Point(-sz.width / 2, -sz.height / 2);
        } else {
            flex.scrollPosition = new wjcCore.Point(0, 0);
        }
    };

    // apply/remove data maps
    private _updateDataMaps() {
        var flex = this.flex;
        if (flex) {
            var colCountry = flex.columns.getColumn('countryId');
            var colProduct = flex.columns.getColumn('productId');
            var colColor = flex.columns.getColumn('colorId');
            if (colCountry && colProduct && colColor) {
                if (this.dataMaps == true) {
                    colCountry.showDropDown = true; // show drop-down for countries
                    colProduct.showDropDown = false; // don't show it for products
                    colColor.showDropDown = false; // or colors (just to show how)
                    colCountry.dataMap = this._buildDataMap(this.dataSvc.getCountries());
                    colProduct.dataMap = this._buildDataMap(this.dataSvc.getProducts());
                    colColor.dataMap = this._buildDataMap(this.dataSvc.getColors());
                } else {
                    colCountry.dataMap = null;
                    colProduct.dataMap = null;
                    colColor.dataMap = null;
                }
            }
        }
    }

// build a data map from a string array using the indices as keys
    private _buildDataMap(items: any[]): wjcGrid.DataMap {
        var map = [];
        for (var i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, 'key', 'value');
    }

    // apply/remove column formatting
    private _updateFormatting() {
        var flex = this.flex;
        if (flex) {
            var fmt = this.formatting;
            this._setColumnFormat('amount', fmt ? 'c' : null);
            this._setColumnFormat('amount2', fmt ? 'c' : null);
            this._setColumnFormat('discount', fmt ? 'p0' : null);
            this._setColumnFormat('start', fmt ? 'MMM d yy' : null);
            this._setColumnFormat('end', fmt ? 'HH:mm' : null);
        }
    }
    private _setColumnFormat(name: string, format: string) {
        var col = this.flex.columns.getColumn(name);
        if (col) {
            col.format = format;
        }
    }

    private _loadCultureInfo() {
        wjcCore.httpRequest('bin/Devel/sources/cultures/wijmo.culture.' + this.culture + '.js', {
            dataType: 'script',
            success: (xhr: XMLHttpRequest) => {
                eval(xhr.response);
                wjcCore.Control.invalidateAll();
            }
        });
    }

    // ICollectionView filter function
    private _filterFunction(item: any) {
        var f = this.filter;
        if (f && item) {

            // split string into terms to enable multi-field searches such as 'us gadget red'
            var terms = f.toUpperCase().split(' ');

            // look for any term in any string field
            for (var i = 0; i < terms.length; i++) {
                var termFound = false;
                for (var key in item) {
                    var value = item[key];
                    if (wjcCore.isString(value) && value.toUpperCase().indexOf(terms[i]) > -1) {
                        termFound = true;
                        break;
                    }
                }

                // fail if any of the terms is not found
                if (!termFound) {
                    return false;
                }
            }
        }

        // include item in view
        return true;
    }

    // apply filter (applied on a 500 ms timeOut)
    protected _applyFilter() {
        if (this._toFilter) {
            clearTimeout(this._toFilter);
        }
        var self = this;
        this._toFilter = setTimeout(function () {
            self._toFilter = null;
            if (self.flex) {
                var cv = self.flex.collectionView;
                if (cv) {
                    if (cv.filter != self._thisFilterFunction) {
                        cv.filter = self._thisFilterFunction;
                    } else {
                        cv.refresh();
                    }
                }
            }
        }, 500);
    }

    private _applyGroupBy() {
        if (this.flex) {

            // get the collection view, start update
            var cv = this.flex.collectionView;
            cv.beginUpdate();

            // clear existing groups
            cv.groupDescriptions.clear();

            // add new groups
            var groupNames = this.groupBy.split('/'),
                groupDesc;
            for (var i = 0; i < groupNames.length; i++) {
                var propName = groupNames[i].toLowerCase();
                if (propName == 'amount') {

                    // group amounts in ranges
                    // (could use the mapping function to group countries into continents, 
                    // names into initials, etc)
                    groupDesc = new wjcCore.PropertyGroupDescription(propName, function (item:any, prop: string) {
                        var value = item[prop];
                        if (value > 1000) return 'Large Amounts';
                        if (value > 100) return 'Medium Amounts';
                        if (value > 0) return 'Small Amounts';
                        return 'Negative';
                    });
                    cv.groupDescriptions.push(groupDesc);
                } else if (propName) {

                    // group other properties by their specific values
                    groupDesc = new wjcCore.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }

            // done updating
            cv.endUpdate();
        }
    }
}
//
@NgModule({
  imports: [WjInputModule, WjGridModule, AppPipesModule, BrowserModule, FormsModule],
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

