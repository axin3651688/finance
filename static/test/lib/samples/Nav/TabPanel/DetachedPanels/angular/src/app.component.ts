import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTabPanel } from '@grapecity/wijmo.angular2.nav';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  selectedTabContent: string;
  //
  constructor() {
  }

  selectTab(s: WjTabPanel) {
    this.selectedTabContent = 'Content for tab <b>' +
      s.selectedTab.header.textContent +
      '</b>...';
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

