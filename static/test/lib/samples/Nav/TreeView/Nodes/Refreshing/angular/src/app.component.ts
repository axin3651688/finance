import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('theTree') theTree: WjTreeView;
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    ngAfterViewInit() {
        this.theTree.selectedItem = this.theTree.itemsSource[0];
    }
    //
    onItemDataClick(s: WjTreeView) {
        this.theTree.selectedNode.refresh({
            header: 'given itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        });
    }
    //
    onItemSourceClick() {
        let node = this.theTree.selectedNode,
            arr = node.itemsSource;
        //
        arr[node.index] = {
            header: 'updated itemData ' + Date.now(),
            items: [
                { header: 'first child' },
                { header: 'second child' }
            ]
        };
        //
        node.refresh();
    }
    //
    onReloadClick() {
        this.theTree.loadTree(true);
        this.theTree.selectedItem = this.theTree.itemsSource[0];
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