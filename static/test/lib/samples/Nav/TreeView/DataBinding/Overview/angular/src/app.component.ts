import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService } from './app.data';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  data: any[];
  selectionInnerHtml: string;
  clickInnerHtml: string;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }

  selectedItemChanged(s: WjTreeView) {
    this.selectionInnerHtml = wjCore.format('You selected item <b>{header}</b>.', s.selectedItem);
  }

  itemClicked(s: WjTreeView) {
    this.clickInnerHtml = wjCore.format('You clicked item <b>{header}</b>.', s.selectedItem);
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

