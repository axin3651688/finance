import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule, WjComboBox } from '@grapecity/wijmo.angular2.input';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  @ViewChild('cmbLevels') cmbLevels: WjComboBox;
  @ViewChild('cmbNodesPerLevel') cmbNodesPerLevel: WjComboBox;
  @ViewChild('theTree') theTree: WjTreeView;
  //
  levels = [1, 2, 3];
  nodesPerLevel = [5, 10, 20, 40];
  treeData: string[] = [];
  bindingMsg = '';
  //
  constructor() {
    this.treeData = this.getTreeData(5, 2);
  }

  refresh() {
    var start = Date.now();
    this.theTree.itemsSource = this.getTreeData(this.cmbNodesPerLevel.selectedValue, this.cmbLevels.selectedValue);
    this.theTree.loadTree(); // force immediate refresh
    this.bindingMsg = wjCore.format('Bound to <b>{cnt:no}</b> nodes in <b>{ms:n0}</b> ms.', {
      cnt: this.theTree.totalItemCount,
      ms: Date.now() - start
    });
  }

  getTreeData(cnt: number, levels: number) {
    var nodes = [];
    for (var i = 0; i < cnt; i++) {
      nodes.push(this.getNode_(0, i, cnt, levels))
    }
    return nodes;
  }

  private getNode_(level: number, id: number, cnt: number, levels: number) {

    // create node
    var node: any = {
      header: 'Node ' + (level + 1) + '.' + (id + 1),
    };

    // create child nodes
    if (level < levels - 1) {
      node.items = [];
      for (var i = 0; i < cnt; i++) {
        node.items.push(this.getNode_(level + 1, i, cnt, levels))
      }
    }
    return node;
  }
}
//
@NgModule({
  imports: [WjNavModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

