import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    setupScrolling(ctrl: input.ListBox) {
        // add elements when the user scrolls to the bottom of the list
        ctrl.hostElement.addEventListener('scroll', e => {
            let el = <Element>e.target;
            //
            // near the bottom?
            if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
                //
                // add five elements to the list
                let arr = ctrl.itemsSource;
                for (let i = 0; i < 5; i++) {
                    arr.push('item ' + arr.length)
                }
                //
                // refresh the list and keep the scroll top
                let top = el.scrollTop;
                ctrl.collectionView.refresh();
                el.scrollTop = top;
                //
                // show how many items we have
                let cnt = document.querySelector('#count');
                cnt.textContent = `The list now has ${arr.length} items.`;
            }
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
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

