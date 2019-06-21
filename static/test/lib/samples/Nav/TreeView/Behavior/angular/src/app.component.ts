import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
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
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }
  //
  ngAfterViewInit() {
    var tree = this.theTree;
    tree.selectedItem = this.data[0];
    // create checkboxes for the main properties
    var props = this.dataService.getOptions(),
      host = document.getElementById('properties'),
      tpl = '<label><input id="{prop}" type="checkbox"> {prop}</label>';
    props.forEach(function (prop) {
      var el = wjCore.createElement(tpl.replace(/\{prop\}/g, prop), host);
      el.querySelector('input').checked = tree[prop];
    });

    host.addEventListener('click', function (e: MouseEvent) {
      if (e.target instanceof HTMLInputElement) {
        tree[e.target.id] = e.target.checked;
      }
    })
  }
  //
  onTreeCollapsedLoadedItems() {
    this.theTree.collapseToLevel(0);
  }
  //
  onTreeExpandedLoadedItems() {
    this.theTree.collapseToLevel(100000);
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

