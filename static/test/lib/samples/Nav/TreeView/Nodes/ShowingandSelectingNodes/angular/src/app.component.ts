import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import {
  Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService, TreeItem } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('theTree') theTree: WjTreeView;
  data: TreeItem[];
  theItem: any;
  theNode: any;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }
  //
  ngAfterViewInit() {
    this.theItem = this._findItem(this.theTree.itemsSource, 'Work Table');
    this.theNode = this.theTree.getNode(this.theItem);
  }
  //
  onShowNode() {
    this.theNode.ensureVisible();
  }
  //
  onSelectNode() {
    this.theNode.select();
  }
  //
  _findItem(items: TreeItem[], text: string) {
    var node = null;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.header == text) {
        return item;
      }
      if (item.items) {
        item = this._findItem(item.items, text);
        if (item) {
          return item;
        }
      }
    }
    return null; //  not found
  }
}
//
@NgModule({
  imports: [WjNavModule, BrowserModule],
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

