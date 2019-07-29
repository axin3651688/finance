import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = [
        { header: 'Internet Explorer', value: 'IE' },
        { header: 'Chrome', value: 'CHR' },
        { header: 'Firefox', value: 'FFX' },
        { header: 'Safari', value: 'IOS' },
        { header: 'Opera', value: 'OPR' }
    ];
    //
    itemClicked(menu: input.Menu) {
        alert('Running ' + menu.selectedValue);
    }
}

//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

