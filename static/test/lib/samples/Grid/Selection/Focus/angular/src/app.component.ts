import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    private _getData() {
      let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
          data = [];
      for (let i = 0; i < countries.length; i++) {
        data.push({
          country: countries[i],
          downloads: Math.round(Math.random() * 20000),
          sales: Math.random() * 10000,
          expenses: Math.random() * 5000
        });
      }
      return data;
    }
    
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

