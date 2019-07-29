import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as WjNav from '@grapecity/wijmo.nav';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
    allowDraggingParentNodes = true;
    allowDroppingIntoEmpty = true;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    onDragStart(e: WjNav.TreeNodeEventArgs) {
        if (e && e.node && e.node.hasChildren) {
            if (!this.allowDraggingParentNodes) {
                e.cancel = true; // prevent dragging parent nodes
            } else {
                e.node.isCollapsed = true; // collapse parent nodes when dragging
            }
        }
    }
    //
    onDragOver(e: WjNav.TreeNodeDragDropEventArgs) {
        if (!this.allowDroppingIntoEmpty && !e.dropTarget.hasChildren && (e.position == WjNav.DropPosition.Into)) {
            e.position = WjNav.DropPosition.Before;
        }
    }
}
//
@NgModule({
    imports: [WjNavModule, BrowserModule, FormsModule],
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