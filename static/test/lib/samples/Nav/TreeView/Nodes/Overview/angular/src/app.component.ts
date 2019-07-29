import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService, TreeItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('theTree') theTree: WjTreeView;
    data: TreeItem[];
    scanResult: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    onLoadedItems() {
        this._scan(true);
    }
    //
    scanNode(s: WjTreeView) {
        this._scan(true);
    }
    //
    _scan(visible: boolean) {
        let result = '';
        for (let node = this.theTree.nodes[0]; node; node = node.next(visible)) {
            result +=
                wjCore.format('{header}', node.dataItem) +
                wjCore.format(' <span class="node-info">(level: {level}, index: {index}, isCollapsed: {isCollapsed})</span><br/>', node);
        }
        this.scanResult = result;
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