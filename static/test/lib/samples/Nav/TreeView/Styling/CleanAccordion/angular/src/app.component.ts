import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjNav from '@grapecity/wijmo.nav';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService, TreeItem } from './app.data';

// define template for the details
var itemTemplate = '<div class="item">' +
  '<b>{city}</b> ({state})<br/>' +
  '{address}<br/>' +
  'Phone: <b>{phone}</b><br/>' +
  'Fax: <b>{fax}</b><br/>' +
  'Website: <a href="{site}">{site}</a><br/>' +
  '</div>';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('theTree') theTree: WjTreeView;
  data: any[];
  clickMsg: string;
  selectionMsg: string;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = this._getTreeData(dataService.getData());
  }
  //
  ngAfterViewInit() {
    var theTree = this.theTree;
    theTree.selectedItem = theTree.itemsSource[0];
    // handle up-arrow key to skip details
    theTree.hostElement.addEventListener('keydown', function (e) {
      var node = null;
      switch (e.keyCode) {
        case wjCore.Key.Up:
          node = theTree.selectedNode.previousSibling();
          break;
        case wjCore.Key.Down:
          node = theTree.selectedNode.nextSibling();
          break;
      }
      if (node) {
        theTree.selectedNode = node;
        e.preventDefault();
      }
    });
  }
  //
  onFormatItem(s: WjTreeView, e: wjNav.FormatNodeEventArgs) {
    switch (e.level) {
      //
      // level 0: wrap header in an H1 tag
      case 0:
        e.element.innerHTML = '<h1>' + e.dataItem.header + '<h1>';
        break;
      //
      // level 1: use template to create details
      case 1:
        var html = wjCore.format(itemTemplate, e.dataItem, function (data: TreeItem, name: string, fmt: Function | undefined, val: string) {
          if (wjCore.isString(data[name])) {
            val = wjCore.escapeHtml(data[name]);
          }
          return val;
        });
        e.element.innerHTML = html;
        break;
    }

  }
  //
  onSelectedItemChanged() {
    var theTree = this.theTree;
    var node = theTree.selectedNode;
    if (node && node.parentNode) {
      node = theTree.selectedNode = node.parentNode;
    }
    node.isCollapsed = false;
    document.getElementById('selected').textContent = node.dataItem.header;
  }
  //
  _getTreeData(data: TreeItem[]) {
    var treeData = [];
    for (var i = 0; i < data.length; i++) {
      treeData.push({
        header: data[i].name,
        detail: [data[i]]
      });
    }
    return treeData;
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

