import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData(200);
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        let tooltip = new wjcCore.Tooltip();
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.cells) {
                let item = s.rows[e.row].dataItem,
                    binding = s.columns[e.col].binding,
                    note = item.notes ? item.notes[binding] : null;
                wjcCore.toggleClass(e.cell, 'wj-has-notes', note != null);
                if (note != null) {
                    tooltip.setTooltip(e.cell, '<b>Note:</b><br/>' + note);
                }
            }
        });
      
        // clear all tooltips when updating the view
        flex.updatingView.addHandler(() => {
            tooltip.dispose();
        });
    }

    private _getData(cnt: number) {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];

        // create the data
        for (let i = 0; i < cnt; i++) {
            data.push({
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }

        // add some notes
        for (let i = 0; i < data.length; i++) {
            let item: any = data[i],
                notes: any = {};
            if (item.sales < 5000) {
                notes.sales = 'What\'s going on in <b>' + item.country + '</b>?';
            }
            if (item.downloads < 20000) {
                notes.downloads = 'Too few downloads, check adwords...';
            }
            if (item.expenses > 40000) {
                notes.expenses = 'We\'re spending too much here!';
            }
            if (item.country == countries[0] && !item.active) {
                notes.country = 'Why isn\'t this active?';
            }
            if (Object.keys(notes).length) {
                item.notes = notes;
            }
        }

        // done
        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

