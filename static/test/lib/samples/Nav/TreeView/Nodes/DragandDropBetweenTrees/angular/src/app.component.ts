import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as WjNav from '@grapecity/wijmo.nav';
import {
  Component, Inject, enableProdMode, NgModule
} from '@angular/core';
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
  data: TreeItem[];
  anotherData: TreeItem[];
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
    this.anotherData = dataService.getAnotherData();
  }
  //
  onDragOverBetweenTrees(s: WjTreeView, e: WjNav.TreeNodeDragDropEventArgs) {
    var t1 = e.dragSource.treeView;
    var t2 = e.dropTarget.treeView;
    //
    // prevent dragging within trees
    if (t1 == t2 && !(document.getElementById('dragWithin') as HTMLInputElement).checked) {
      e.cancel = true;
    }
    //
    // allow dragging between trees
    if (t1 != t2 && (document.getElementById('dragBetween') as HTMLInputElement).checked) {
      e.cancel = false;
    }
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

