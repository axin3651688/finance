import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import {
  Component, Inject, enableProdMode, NgModule, ViewChild
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
export class AppComponent {
  @ViewChild('theTree') theTree: WjTreeView;
  data: TreeItem[];
  checkedItems: any[];
  tvChkStatus: string;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }
  //
  onCheckedItemsChanged() {
    var items = this.theTree.checkedItems,
      msg = '';
    if (items.length) {
      msg = '<p><b>Checked Items:</b></p><ol>\r\n';
      for (var i = 0; i < items.length; i++) {
        msg += '<li>' + items[i].header + '</li>\r\n';
      }
      msg += '</ol>';
    }
    this.tvChkStatus = msg;
  }
  //
  onCheckAllClick() {
    this.theTree.checkAllItems(true);
  }
  //
  onUncheckAllClick() {
    this.theTree.checkAllItems(false);
  }
  //
  onSaveStateClick() {
    this.checkedItems = this.theTree.checkedItems || [];
  }
  //
  onRestoreStateClick() {
    this.theTree.checkedItems = this.checkedItems;
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

