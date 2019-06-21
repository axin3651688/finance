import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule, WjAutoComplete } from '@grapecity/wijmo.angular2.input';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService, TreeItem } from './app.data';

class searchItem {
  item: any;
  path: string;
  keywords: string
}
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('theTree') theTree: WjTreeView;
  treeData: TreeItem[];
  autoCompleteData: searchItem[];
  //
  constructor(@Inject(DataService) private dataService: DataService) {

  }
  //
  ngAfterViewInit() {
    this.theTree.itemsSource = this.dataService.getData();
    this.autoCompleteData = this._getSearchList(this.theTree.itemsSource);

  }
  //
  onSelectedIndexChanged(s: WjAutoComplete) {
    if (s.selectedItem) {
      this.theTree.selectedItem = s.selectedItem.item;
    }
  }

  private _getSearchList(items: TreeItem[], searchList?: null | searchItem[], path?: string | null): searchItem[] {
    // set defaults
    if (searchList == null) searchList = [];
    if (path == null) path = '';

    // add items and sub-items
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      searchList.push({
        item: item,
        path: path + item.header,
        keywords: item.keywords
      });
      if (item.items) {
        this._getSearchList(item.items, searchList, path + item.header + ' / ');
      }
    }
    return searchList;
  }

}
//
@NgModule({
  imports: [WjNavModule, WjInputModule, BrowserModule],
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

