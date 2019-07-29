import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    clearIncomplete = true;
    //
    validateMask(ctrl: input.InputMask) {
        wijmo.toggleClass(ctrl.hostElement, 'state-invalid', !ctrl.maskFull);
    }
    //
    lostFocus(ctrl: input.InputMask) {
        if (!ctrl.maskFull && !ctrl.isRequired && this.clearIncomplete) {
            ctrl.value = '';
        }
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

