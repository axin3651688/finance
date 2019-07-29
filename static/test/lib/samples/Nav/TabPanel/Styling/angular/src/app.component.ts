import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import wjCore from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjNavModule, WjTabPanel } from '@grapecity/wijmo.angular2.nav';
import { WjInputModule, WjComboBox } from '@grapecity/wijmo.angular2.input';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  //
  isAnimated = true;
  tabAligns = 'Left,Center,Right'.split(',');
  tabPositions = 'Left,Right,Above,Below'.split(',');
  constructor() {
  }

  tabAlignChanged(cmbTabAlign: WjComboBox, tabCss: WjTabPanel) {
    (tabCss.hostElement.querySelector('.wj-tabheaders') as HTMLElement).style.textAlign = cmbTabAlign.text;
  }

  tabPositionChanged(cmbTabPosition: WjComboBox, tabCss: WjTabPanel) {
    var host = tabCss.hostElement;
    cmbTabPosition.itemsSource.forEach(function (pos: string, index: number) {
      var clsName = 'tabs-' + pos.toLowerCase();
      wjCore.toggleClass(host, clsName, index == cmbTabPosition.selectedIndex);
    });
  }

  customHeaders(e: MouseEvent, tabCss: WjTabPanel) {
    wjCore.toggleClass(tabCss.hostElement, 'custom-headers', (e.target as HTMLInputElement).checked);
  }

}
//
@NgModule({
  imports: [WjNavModule, WjInputModule, FormsModule, BrowserModule],
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

