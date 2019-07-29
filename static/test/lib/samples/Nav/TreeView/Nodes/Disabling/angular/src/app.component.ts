import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import {
  Component, Inject, enableProdMode, NgModule, ViewChild
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
  @ViewChild('theTree') theTree: WjTreeView;
  data: TreeItem[];
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.data = dataService.getData();
  }
  onDisableNodeClick() {
    var nd = this.theTree.selectedNode;
    if (nd) {
      nd.isDisabled = true;
    }
  }
  //
  onEnableAllNodes() {
    for (var nd = this.theTree.getFirstNode(); nd; nd = nd.next()) {
      nd.isDisabled = false;
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

