import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjNav from '@grapecity/wijmo.nav';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    lazyLoadFunction = (node: wjNav.TreeNode, callback: Function) => {
        setTimeout(() => {
            let result = this._getLazyData();
            callback(result);
        }, 1000);
    }
    //
    onIsCollapsedChanging(e: wjNav.TreeNodeEventArgs) {
        let node = e.node,
            tree = node.treeView;
        //
        if (!node.isCollapsed && node.dataItem.reload) {
            // remove previous lazy-loaded items from data source
            node.dataItem.items = [];
            //
            // re-bind the tree to remove the old nodes
            tree.loadTree();
        }
    }
    //
    // lazy data (re-loaded when opening nodes)
    private _getLazyData() {
        let creationTime = wjCore.Globalize.format(new Date(), 'hh:mm:ss');
        //
        return [
            { header: 'Empty Node at: ' + creationTime },
            {
                header: 'Node with child nodes at: ' + creationTime,
                items: [
                    { header: 'hello' },
                    { header: 'world' }
                ]
            },
            { header: 'Lazy node <i>(reload when opening)</i>', items: <any>[], reload: true },
        ]
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

