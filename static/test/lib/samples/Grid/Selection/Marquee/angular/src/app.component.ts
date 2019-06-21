import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    gridGetFocus() {
      this.flex.focus();
    }

    showCustomMarquee(e: Event) {
      wjcCore.toggleClass(this.flex.hostElement, 'customMarquee', (<HTMLInputElement>e.target).checked);
      this.flex.invalidate();
      this.flex.focus();
    }

    highlightActive(e: Event) {
      wjcCore.toggleClass(this.flex.hostElement, 'highlightActive', (<HTMLInputElement>e.target).checked);
      this.flex.focus();
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule, FormsModule],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

