import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
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
    tax = 0.0825;
    command = {
        // execute the command
        executeCommand: (arg: any) => {
            if (wijmo.isNumber(arg)) {
                this.tax += arg;
            }
        },
        //
        // check if a command can be executed
        canExecuteCommand: (arg: any) => {
            if (wijmo.isNumber(arg)) {
                let val = this.tax + arg;
                return val >= 0 && val <= 1;
            }
            return false;
        }
    };
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

