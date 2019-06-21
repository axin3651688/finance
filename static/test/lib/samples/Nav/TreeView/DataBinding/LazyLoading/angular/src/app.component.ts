import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';

class LazyItem {
  header: string;
  items: any[]
}
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  lazyItems: LazyItem[];
  items: any[] = [];
  lazyLoadFunction: Function;
  //
  constructor() {
    this.lazyItems = [ // start with three lazy-loaded nodes
      { header: 'Lazy Node 1', items: [] },
      { header: 'Lazy Node 2', items: [] },
      { header: 'Lazy Node 3', items: [] }];

    // lazy loading function
    this.lazyLoadFunction = this._lazyLoadFunction.bind(this);
  }

  private _lazyLoadFunction(node: wjNav.TreeNode, callback: Function) {
    setTimeout(function () { // simulate http delay
      var result = [ // simulate result
        { header: 'Another lazy node...', items: [] },
        { header: 'A non-lazy node without children' },
        {
          header: 'A non-lazy node with child nodes', items: [
            { header: 'hello' },
            { header: 'world' }]
        }
      ];
      callback(result); // return result to control
    }, 2500); // 2.5sec http delay
  }
}
//
@NgModule({
  imports: [WjNavModule, BrowserModule],
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

