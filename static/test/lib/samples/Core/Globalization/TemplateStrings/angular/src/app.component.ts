import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    format1() {
        let msg = wijmo.format('Welcome {name}! You have {miles:n0} miles in your account.', {
            name: 'Joe',
            miles: 2332123
        });
        alert(msg);
    }
    //
    format2() {
        let msg = wijmo.format('{name}, thanks for being a customer since {date:D}.', {
            name: 'Joe',
            date: new Date()
        });
        alert(msg);
    }
}
//
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

