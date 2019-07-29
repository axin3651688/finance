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
  msg: string = "Ready";
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }
  //
  ngAfterViewInit() {
    var self = this;
    self.theTree.hostElement.addEventListener('click', function (e: MouseEvent) {
      if ((e.target as HTMLElement).tagName == 'A') {
        self.msg = wjCore.format('Navigating to <b>** {href} **</b>',
          e.target);
        e.preventDefault();
      }
    });
  }
  //
  onCustomCssClick(e: MouseEvent) {
    wjCore.toggleClass(this.theTree.hostElement, 'accordion', (e.target as HTMLInputElement).checked);
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

